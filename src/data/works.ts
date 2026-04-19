/**
 * Works のデータ。Home の Works ハイライト（全件表示）と `/works` 一覧で共用。
 * `/works/[slug]` 詳細ページは別 Issue。一覧カードは `launch` or `source` への外部リンクで暫定接続。
 */

export interface Work {
  /** 後続 `/works/[slug]` 用の識別子 */
  slug: string;
  /** カード上部のメタ表示（"YYYY — Category" 形式） */
  meta: string;
  title: string;
  desc: string;
  tags: readonly string[];
  /** サムネ画像（`public/images/works/` 配下の絶対パス） */
  thumbnail: string;
  /** デモサイト URL（無い場合は省略） */
  launch?: string;
  /** ソースコード URL（GitHub 等） */
  source: string;
}

export const WORKS: readonly Work[] = [
  {
    slug: "hitokoto",
    meta: "2023 — Personal / SNS",
    title: "ひとこと",
    desc: "シンプルなつぶやきSNS。Next.js × Sanity CMS で構築した個人開発フルスタックアプリ。",
    tags: ["Next.js", "TypeScript", "Sanity"],
    thumbnail: "/images/works/hitokoto-main.png",
    launch: "https://hitokoto-eosin.vercel.app",
    source: "https://github.com/yuuki1036/nextjs-twitter",
  },
  {
    slug: "netfjix",
    meta: "2021 — Personal / Clone UI",
    title: "Netfjix",
    desc: "Next.js × TMDb API で構築した Netflix 風の映画情報 UI。",
    tags: ["Next.js", "TypeScript", "TMDb"],
    thumbnail: "/images/works/netfjix-main.png",
    launch: "https://nextjs-netflix-clone-ten.vercel.app/",
    source: "https://github.com/yuuki1036/nextjs-netflix-clone",
  },
  {
    slug: "53st",
    meta: "2021 — Personal / Bot",
    title: "53ST",
    desc: "ごみ捨て支援 LINE ボット。Python + AWS Lambda で実装。収集スケジュールをLINEでリマインド。",
    tags: ["Python3", "AWS", "LINE API"],
    thumbnail: "/images/works/53st-main.png",
    source: "https://github.com/yuuki1036/trash-disposal-notification",
  },
];
