import { z } from "zod";

/**
 * サーバー側 env 取り出しの統一入口。
 *
 * Cloudflare Workers では module-level で `process.env` を読むと空になるため、
 * 必ず関数として実行時に呼ぶこと。`createServerFn` の `.handler()` 内から呼べば
 * nitro Cloudflare adapter 経由で `process.env` に binding が出ている前提。
 *
 * - `TURNSTILE_SITE_KEY` は client に流す前提のため secret 扱いではない（loader 経由で UI へ）
 * - 他は server-only
 */
const serverEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  CONTACT_TO_EMAIL: z.string().email(),
  CONTACT_FROM_EMAIL: z.string().email(),
  TURNSTILE_SITE_KEY: z.string().min(1),
  TURNSTILE_SECRET_KEY: z.string().min(1),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function getServerEnv(): ServerEnv {
  const result = serverEnvSchema.safeParse(process.env);
  if (!result.success) {
    const missing = result.error.issues.map((issue) => issue.path.join(".")).join(", ");
    throw new Error(`Server env が未設定または不正です: ${missing}`);
  }
  return result.data;
}
