import type { ComponentProps } from "react";
import { useScrollReveal } from "#/hooks/use-scroll-reveal.js";

interface RevealProps extends ComponentProps<"div"> {
  /** transition-delay の秒数。デフォルト: 0 */
  delay?: number;
  /** IntersectionObserver の threshold */
  threshold?: number;
  /** IntersectionObserver の rootMargin */
  rootMargin?: string;
}

/**
 * viewport に入ったら fade-in + translateY で現れる wrapper。
 * 一度表示されたら監視を解除する（アニメーションは一度きり）。
 */
export function Reveal({
  delay = 0,
  threshold,
  rootMargin,
  className,
  style,
  children,
  ...props
}: RevealProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({ threshold, rootMargin });
  return (
    <div
      ref={ref}
      className={`rv ${visible ? "vis" : ""} ${className ?? ""}`}
      style={{ transitionDelay: delay ? `${delay}s` : undefined, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
