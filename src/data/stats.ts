/**
 * About Stats のデータ。Home の About プレビューと後続 `/about` 詳細ページで共用予定。
 * 表示ロジック（特殊値の letter-spacing 調整等）は `<StatsGrid>` 側で扱う。
 */

export interface Stat {
  /** 数値表示（"6", "20", "3", "∞" 等） */
  value: string;
  /** 数字に続く記号（"+", "×" 等）。省略時は表示なし */
  sup?: string;
  /** ラベル（"Years Exp." 等） */
  label: string;
}

export const STATS: readonly Stat[] = [
  { value: "6", sup: "+", label: "Years Exp." },
  { value: "20", sup: "+", label: "Projects" },
  { value: "3", sup: "×", label: "Tech Lead" },
  { value: "∞", label: "TS Lines" },
];
