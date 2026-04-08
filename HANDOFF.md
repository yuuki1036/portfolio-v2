# portfolio-v2 セットアップ引き継ぎ

作成日: 2026-04-08
旧 repo: `~/Projects/nextjs-homepage`（本番稼働中・凍結予定）

## 背景

`nextjs-homepage` を **TanStack Start へのリアーキテクチャ + デザイン刷新** するにあたり、フレームワークが根本から別物（Next.js App Router → TanStack Start, Vite/Vinxi）かつデザインも全面刷新のため、新規 repo で進めることにした。

## 決定事項

| 項目                 | 内容                                                                |
| -------------------- | ------------------------------------------------------------------- |
| repo 名              | `portfolio-v2`                                                      |
| ローカルパス         | `~/Projects/portfolio-v2/`                                          |
| GitHub push          | 後で（**public** repo として作成予定）                              |
| フレームワーク       | TanStack Start (React 19, Vite 7, Tailwind v4, nitro)               |
| ツールチェーン       | **Vite+ (`vp`)** ─ Oxlint/Oxfmt/Vitest 4/Rolldown 統合              |
| パッケージマネージャ | pnpm 10 (Vite+ がラップ)                                            |
| Animation            | Framer Motion                                                       |
| i18n                 | **paraglide-js** (next-intl は Next 専用なので NG)                  |
| Form                 | TanStack Form + Resend                                              |
| Blog/MDX             | Velite or Contentlayer v2 (要選定)                                  |
| OGP                  | Cloudflare Workers + satori 想定 (要設計)                           |
| **Deploy**           | **Cloudflare Pages**（旧 HANDOFF の Vercel から変更）               |
| デザイン             | mock 確認済み (`.claude/from-claude-mock/`、warm dark × amber gold) |
| ドメイン             | `yuuki1036.com` 切替予定                                            |
| 旧 repo の扱い       | 本番稼働継続・`main` は触らない                                     |

## 現在の状態

- [x] `~/Projects/portfolio-v2/` ディレクトリ作成
- [x] `git init` 実行済み
- [x] TanStack Start プロジェクト初期化（`create-start-app` + `tanstack-query` add-on）
- [x] **Vite+ 採用 + `vp migrate` 実行** ─ scripts を `vp dev/build/test/check` に切替済み
- [x] 初回コミット (`59ff560`)
- [x] indie プロジェクト初期化（`.claude/indie/portfolio-v2/`、ローカル専用）
- [x] `.claude/` 全体を gitignore に追加（indie ファイルもローカル管理に統一）
- [x] mock 確認 (`.claude/from-claude-mock/`) ＋ knowledge への永続化
- [x] `routeTree.gen.ts` を fmt/lint 除外
- [ ] **branding 決定**（yuuki1036 / 屋号 / 本名）─ 全コンテンツに影響、最優先
- [ ] paraglide-js セットアップ
- [ ] デザイントークン投入（Tailwind v4 + フォント）
- [ ] mock HTML をコンポーネント分解
- [ ] 持ち越し資産のコピー（旧 repo の Works データ・画像・i18n 文字列）
- [ ] Issue 起票（次セッションで `/indie-issue-create` 開始）

## 既知の課題 / Follow-up

- **pre-commit hook が `git commit` 経由で失敗**: `.vite-hooks/pre-commit` (`vp staged`) を git が起動するとき、`vite.config.ts` の loader 解決でコケる (`ERR_UNKNOWN_FILE_EXTENSION`)。直接実行や `sh .vite-hooks/pre-commit` だと成功するため、git hook 環境固有の問題と推定（vp 0.1.16 の若さも一因）。当面は手動 `vp check` 後に `--no-verify` で運用 or hook 内で `~/.vite-plus/env` を明示 source する案を検討。
- **`vite-tsconfig-paths` プラグイン削除**: Vite が tsconfig paths を native サポートしたため不要。`resolve.tsconfigPaths: true` に置換する（warning が `vp dev`/`vp check` のたびに出る）。

## 次の手順

### 1. branding 決定

yuuki1036 / 屋号 / 本名 のどれで打ち出すか決める。全コンテンツ（Hero, About, OG, ロゴ）に影響するため、Issue 起票より先に確定したい。

### 2. Issue 起票（想定スコープ）

> 旧 HANDOFF の想定から **service 削除・blog 追加・deploy を CF Pages に変更** している。

- `PORTFOLIO-V2-1`: TanStack Start 初期セットアップ（routing, Tailwind v4, paraglide-js, Framer Motion）
- `PORTFOLIO-V2-2`: デザインシステム構築（mock の token・コンポーネント分解）
- `PORTFOLIO-V2-3`: ページ実装（home / works / works/[slug] / about / blog / blog/[slug] / contact）
- `PORTFOLIO-V2-4`: Blog 環境（Velite or Contentlayer v2 + MDX）
- `PORTFOLIO-V2-5`: サーバー機能（TanStack Form + Resend, reCAPTCHA, 動的 OG, レート制限）
- `PORTFOLIO-V2-6`: **Cloudflare Pages** デプロイ・ドメイン切替・CSP nonce 移植

## 旧 repo から持ち越す資産

| 種別             | パス（旧 repo）               | 備考                                                      |
| ---------------- | ----------------------------- | --------------------------------------------------------- |
| Works データ     | `_posts/*.json`               | そのまま流用                                              |
| Works 画像       | `public/images/works/*`       | `{slug}-main.png`, `{slug}-preview.png`, `{slug}-add.png` |
| i18n 文字列      | `lib/locales/`                | `ja`, `en`                                                |
| 環境変数テンプレ | `.env.example`                | Resend, reCAPTCHA, GA 等                                  |
| knowledge        | `.claude/indie/hp/knowledge/` | 参照用コピー                                              |

## 廃棄候補（新 repo で再検討）

- `@amcharts/amcharts5`（スキルツリー） — TanStack + デザイン刷新で別 UI になる可能性
- `next-themes` — TanStack 用の代替に差し替え
- `swr` — TanStack Query に統一
- `@vercel/og` — OG 画像生成は satori 直接 or 代替を検討
- `proxy.ts` — Next.js 固有機構なので破棄、TanStack の middleware 相当へ移植

## Next.js 固有で移植に注意が必要なもの

- **CSP nonce 生成**（`proxy.ts`）→ TanStack Start での同等実装を調査
- **レート制限**（`lib/rate-limit.ts` インメモリ）→ 流用可
- **入力検証**（zod）→ 流用可
- **App Router の file-based routing** → TanStack Router の流儀（`routes/` + `createFileRoute`）に書き換え
- **RSC** → TanStack は loader + server function パターン。データフェッチを全面書き換え

## 参考

- 旧 repo: `~/Projects/nextjs-homepage`
- 旧 Issue 履歴: `~/Projects/nextjs-homepage/.claude/indie/hp/issues/`
- 旧 CLAUDE.md: `~/Projects/nextjs-homepage/CLAUDE.md`（技術スタック・ページ構成の参考）
