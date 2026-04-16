import type { ComponentProps } from "react";

type SectionVariant = "contained" | "full";

interface SectionProps extends ComponentProps<"section"> {
  /** mock .sec 相当（contained, max-w-5xl）または .sec-full 相当（full-bleed + border-top）。デフォルト: "contained" */
  variant?: SectionVariant;
}

/**
 * ページ内セクション共通ラッパ。mock portfolio-mock.html の .sec / .sec-full に対応。
 * - contained: 内側 div で `mx-auto max-w-5xl` を適用（Nav/Footer と整合）
 * - full: border-top を付与し、幅制限なし（内側は呼び出し側で自由に組む）
 */
export function Section({ variant = "contained", className, children, ...props }: SectionProps) {
  const borderClass = variant === "full" ? "border-t border-border" : "";
  return (
    <section className={`py-[120px] px-12 ${borderClass} ${className ?? ""}`} {...props}>
      {variant === "contained" ? <div className="mx-auto max-w-5xl">{children}</div> : children}
    </section>
  );
}
