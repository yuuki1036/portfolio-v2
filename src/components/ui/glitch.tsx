import type { ComponentProps } from "react";
import { useGlitch } from "#/hooks/use-glitch.js";

interface GlitchProps extends ComponentProps<"span"> {
  /** 発火間隔 (ms)。デフォルト: 3800 */
  interval?: number;
  /** グリッチ表示時間 (ms)。デフォルト: 220 */
  duration?: number;
  /** 表示テキスト。`data-text` にも同じ値が入る */
  children: string;
}

/**
 * グリッチエフェクト付きテキスト。
 * `children` は文字列のみ（`::before` / `::after` 擬似要素が `data-text` を参照するため）。
 */
export function Glitch({ interval, duration, className, children, ...props }: GlitchProps) {
  const on = useGlitch({ interval, duration });
  return (
    <span className={`glitch ${on ? "on" : ""} ${className ?? ""}`} data-text={children} {...props}>
      {children}
    </span>
  );
}
