/**
 * IP 単位の簡易 rate-limit。
 *
 * **TODO**: 現状は in-memory Map で、Cloudflare Workers では
 * インスタンスごとにリセットされるため実質ザル防御になる。
 * Cloudflare Pages デプロイ Issue で KV / Durable Objects への
 * 移行を行うこと。本ファイルの interface (`checkRateLimit`) は
 * その差し替えに耐える形にしてある（同期関数だが、storage 化
 * する際は Promise 化して呼び出し側を `await` に変える）。
 *
 * 無制限増殖の暫定対策として、読み取り時に期限切れエントリを間引く
 * lazy GC を入れている（KV/DO 移行時は TTL で自然解決し不要になる）。
 */

interface RateLimitState {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitState>();

/** lazy GC の最終実行時刻。毎回の全走査を避けるためスイープ頻度を間引く。 */
let lastSweepAt = 0;
const SWEEP_INTERVAL_MS = 60_000;

/** 期限切れエントリを間引く（最短 SWEEP_INTERVAL_MS 間隔）。Map の無制限増殖を防ぐ。 */
function sweepExpired(now: number): void {
  if (now - lastSweepAt < SWEEP_INTERVAL_MS) return;
  lastSweepAt = now;
  for (const [key, state] of store) {
    if (state.resetAt <= now) store.delete(key);
  }
}

export interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

const DEFAULTS: RateLimitOptions = { limit: 5, windowMs: 60_000 };

export function checkRateLimit(key: string, options: RateLimitOptions = DEFAULTS): RateLimitResult {
  const now = Date.now();
  sweepExpired(now);
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + options.windowMs;
    store.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: options.limit - 1, resetAt };
  }

  if (existing.count >= options.limit) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: options.limit - existing.count,
    resetAt: existing.resetAt,
  };
}

/** test 用に store をクリアする。production code からは呼ばない想定。 */
export function __resetRateLimitStore(): void {
  store.clear();
}
