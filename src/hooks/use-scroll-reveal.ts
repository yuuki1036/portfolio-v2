import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  /** IntersectionObserver の threshold。デフォルト: 0.08 */
  threshold?: number;
  /** IntersectionObserver の rootMargin */
  rootMargin?: string;
}

/**
 * 要素が viewport に入ったら一度だけ `visible = true` に切り替える hook。
 * ref を監視対象の要素に渡す。
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.08,
  rootMargin,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}
