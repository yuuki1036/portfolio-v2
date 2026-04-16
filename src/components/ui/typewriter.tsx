import type { ComponentProps } from "react";
import { useTypewriter } from "#/hooks/use-typewriter.js";

interface TypewriterProps extends Omit<ComponentProps<"span">, "children"> {
  /** ロール（単語）配列 */
  roles: readonly string[];
  /** 点滅カーソルを表示するか。デフォルト: true */
  showCaret?: boolean;
  /** 最初の打鍵までの遅延 (ms) */
  startDelay?: number;
  /** 1 文字を打つ速度 (ms) */
  typeSpeed?: number;
  /** 1 文字を消す速度 (ms) */
  deleteSpeed?: number;
  /** 打ち終わってから消し始めるまでの待機 (ms) */
  holdDuration?: number;
}

export function Typewriter({
  roles,
  showCaret = true,
  startDelay,
  typeSpeed,
  deleteSpeed,
  holdDuration,
  className,
  ...props
}: TypewriterProps) {
  const text = useTypewriter({ roles, startDelay, typeSpeed, deleteSpeed, holdDuration });
  return (
    <span className={className} {...props}>
      <span>{text}</span>
      {showCaret && <span className="tw-caret" aria-hidden="true" />}
    </span>
  );
}
