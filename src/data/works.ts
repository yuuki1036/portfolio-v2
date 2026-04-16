/**
 * Works のデータ。Home の Works ハイライト（先頭 3 件）と後続 `/works` 一覧で共用予定。
 * 詳細ページ（`/works/[slug]`）の slug 設計は別 Issue。Home からは全件 `/works` 一覧へ遷移。
 */

export interface WorkPlaceholder {
  /** 画像 placeholder の中央テキスト（例: "CO₂", "一言", "53ST"） */
  text: string;
  /** placeholder の background gradient（CSS 値そのまま） */
  gradient: string;
  /** placeholder のテキスト色（CSS 値そのまま） */
  color: string;
}

export interface Work {
  /** 後続 `/works/[slug]` 用の識別子 */
  slug: string;
  /** カード上部のメタ表示（"YYYY — Category" 形式） */
  meta: string;
  title: string;
  desc: string;
  tags: readonly string[];
  placeholder: WorkPlaceholder;
}

export const WORKS: readonly Work[] = [
  {
    slug: "co2-dashboard",
    meta: "2023 — SaaS / Dashboard",
    title: "CO₂ Emissions Dashboard",
    desc: "CO₂排出量の可視化SaaS。複雑なサプライチェーンデータをインタラクティブなダッシュボードで直感的に表現。",
    tags: ["TypeScript", "React", "Next.js", "Recharts"],
    placeholder: {
      text: "CO₂",
      gradient: "linear-gradient(135deg,#131310 0%,#1e1e18 100%)",
      color: "#2a2a22",
    },
  },
  {
    slug: "hitokoto",
    meta: "2022 — Personal / SNS",
    title: "ひとこと",
    desc: "シンプルなつぶやきSNS。Next.js × Sanity CMS で構築した個人開発フルスタックアプリ。",
    tags: ["Next.js", "TypeScript", "Sanity"],
    placeholder: {
      text: "一言",
      gradient: "linear-gradient(135deg,#131310 0%,#1e1b18 100%)",
      color: "#2a2620",
    },
  },
  {
    slug: "53st",
    meta: "2021 — Personal / Bot",
    title: "53ST",
    desc: "ごみ捨て支援 LINE ボット。Python + AWS Lambda で実装。収集スケジュールをLINEでリマインド。",
    tags: ["Python3", "AWS", "LINE API"],
    placeholder: {
      text: "53ST",
      gradient: "linear-gradient(135deg,#131310 0%,#181e1b 100%)",
      color: "#20281e",
    },
  },
];
