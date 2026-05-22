/**
 * Works のデータ。Home の Works ハイライト（全件表示）・`/works` 一覧・`/works/$slug` 詳細で共用。
 * ja のみ。i18n（en）対応は別 Issue で全ページ一括対応する。
 */

export interface Work {
  /** `/works/$slug` 用の識別子 */
  slug: string;
  /** カード上部のメタ表示（"YYYY — Category" 形式） */
  meta: string;
  title: string;
  /** カード本文の 1 行説明 */
  desc: string;
  /** case study Hero の補助テキスト */
  tagline: string;
  /** Overview 段落配列（1: what / 2: motivation） */
  overview: readonly string[];
  /** Tech stack の補助スペック（key-value） */
  spec: Readonly<Record<string, string>>;
  /** Highlights 箇条書き 3-5 項目 */
  highlights: readonly string[];
  tags: readonly string[];
  /** メイン画像（`public/images/works/{slug}-main.png`） */
  thumbnail: string;
  /** サブ画像（`public/images/works/{slug}-add.png`） */
  subImage: string;
  /** デモサイト URL（無い場合は省略） */
  launch?: string;
  /** ソースコード URL */
  source: string;
}

export const WORKS: readonly Work[] = [
  {
    slug: "hitokoto",
    meta: "2023 — Personal / SNS",
    title: "ひとこと",
    desc: "シンプルなつぶやきSNS。Next.js × Sanity CMS で構築した個人開発フルスタックアプリ。",
    tagline: "つぶやきSNS",
    overview: [
      "React 製の Twitter クローン。Next.js + Sanity（ヘッドレス CMS）で構築し、next-auth による Twitter ソーシャルログインを実装。未ログインでも投稿・リプライ・リツイート・いいねが行えるよう UX を設計した。",
      "Twitter を題材に React の SPA 構成・非同期通信・認証フローを体系的に学ぶことを目的に着手した個人開発プロジェクト。",
    ],
    spec: {
      Platform: "Web",
      Language: "TypeScript",
      Framework: "Next.js",
      Styling: "Tailwind CSS",
      CMS: "Sanity",
      Auth: "next-auth",
      Hosting: "Vercel",
    },
    highlights: [
      "スクロール起点の無限スクロールでタイムラインを非同期取得",
      "Twitter ソーシャルログイン（next-auth）",
      "未ログイン状態でも投稿・アクションが可能な UX 設計",
      "レスポンシブデザイン",
    ],
    tags: ["Next.js", "TypeScript", "Sanity"],
    thumbnail: "/images/works/hitokoto-main.png",
    subImage: "/images/works/hitokoto-add.png",
    launch: "https://hitokoto-eosin.vercel.app",
    source: "https://github.com/yuuki1036/nextjs-twitter",
  },
  {
    slug: "netfjix",
    meta: "2021 — Personal / Clone UI",
    title: "Netfjix",
    desc: "Next.js × TMDb API で構築した Netflix 風の映画情報 UI。",
    tagline: "映画情報サイト",
    overview: [
      "Netflix を模した Next.js 製の映画情報サイト。TMDb API からジャンル別の人気作を取得しジャケット画像のグリッドで一覧表示。クリックするとあらすじと予告動画を自動再生し、Hero イメージは人気作からランダムに選ばれる。",
      "アプリライクな UI を題材に Next.js / React + TypeScript / 外部 API fetch / 動画埋め込みを学習するために着手したプロジェクト。",
    ],
    spec: {
      Platform: "Web",
      Language: "TypeScript",
      Framework: "Next.js",
      Styling: "Tailwind CSS",
      API: "TMDb",
      Hosting: "Vercel",
    },
    highlights: [
      "TMDb API からジャンル別人気作を自動取得・更新",
      "Hero イメージは人気作からランダム選出",
      "Next.js Image による画像最適化で高速描画",
      "予告動画の埋め込み自動再生",
      "レスポンシブデザイン",
    ],
    tags: ["Next.js", "TypeScript", "TMDb"],
    thumbnail: "/images/works/netfjix-main.png",
    subImage: "/images/works/netfjix-add.png",
    launch: "https://nextjs-netflix-clone-ten.vercel.app/",
    source: "https://github.com/yuuki1036/nextjs-netflix-clone",
  },
  {
    slug: "53st",
    meta: "2021 — Personal / Bot",
    title: "53ST",
    desc: "ごみ捨て支援 LINE ボット。Python + AWS Lambda で実装。収集スケジュールをLINEでリマインド。",
    tagline: "ごみ捨て支援 LINE ボット",
    overview: [
      "LINE と AWS Lambda を連携させたサーバーレスのごみ捨てサポートボット。曜日ごとに設定した収集スケジュールを毎朝 LINE で通知し、設定操作も LINE トーク上で完結する。",
      "LINE Bot 開発を題材に AWS のサーバーレスアーキテクチャ（Lambda + API Gateway + DynamoDB）と NoSQL を学習するために着手したプロジェクト。",
    ],
    spec: {
      Platform: "LINE",
      Language: "Python 3",
      Architecture: "AWS Lambda, API Gateway",
      DB: "DynamoDB",
    },
    highlights: [
      "サーバーレス構成（Lambda + API Gateway + DynamoDB）",
      "毎朝の定時通知で収集スケジュールをリマインド",
      "操作が LINE トーク上で完結する UX",
      "LINE 友だち追加だけで利用開始可能",
    ],
    tags: ["Python3", "AWS", "LINE API"],
    thumbnail: "/images/works/53st-main.png",
    subImage: "/images/works/53st-add.png",
    source: "https://github.com/yuuki1036/trash-disposal-notification",
  },
];

/** `slug` から Work を取得。見つからない場合 undefined */
export function findWorkBySlug(slug: string): Work | undefined {
  return WORKS.find((w) => w.slug === slug);
}
