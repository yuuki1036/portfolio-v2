import type { ComponentProps } from "react";

type HeadingLevel = "h1" | "h2";
type HeadingSize = "md" | "lg";

/**
 * - md: mock .about-h 相当（clamp(38px, 5vw, 64px) / line-height 1.0 / tracking -0.025em）
 * - lg: mock .ct-h 相当（clamp(48px, 7vw, 96px) / line-height .95 / tracking -0.04em）
 */
const sizeStyles: Record<HeadingSize, string> = {
  md: "text-[clamp(38px,5vw,64px)] leading-[1] tracking-[-0.025em]",
  lg: "text-[clamp(48px,7vw,96px)] leading-[0.95] tracking-[-0.04em]",
};

const baseStyles = "font-display font-extrabold text-text [&_em]:not-italic [&_em]:text-accent";

interface SectionHeadingProps extends ComponentProps<"h1"> {
  /** 出力タグ。セクション内の見出しは h2、ページのメインヘッダーのみ h1。デフォルト: "h2" */
  as?: HeadingLevel;
  /** mock .about-h / .ct-h に対応。デフォルト: "md" */
  size?: HeadingSize;
}

/**
 * Display 大見出し（mock .about-h / .ct-h 相当）。
 * 子要素の <em> はアクセント色で強調される（italic は解除）。
 */
export function SectionHeading({
  as = "h2",
  size = "md",
  className,
  children,
  ...props
}: SectionHeadingProps) {
  const Tag = as;
  return (
    <Tag className={`${baseStyles} ${sizeStyles[size]} ${className ?? ""}`} {...props}>
      {children}
    </Tag>
  );
}
