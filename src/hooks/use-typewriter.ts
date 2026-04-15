import { useEffect, useRef, useState } from "react";

interface UseTypewriterOptions {
  /** ロール（単語）配列。順次サイクル表示される */
  roles: readonly string[];
  /** 最初の打鍵までの遅延 (ms)。デフォルト: 1600 */
  startDelay?: number;
  /** 1 文字を打つ速度 (ms)。デフォルト: 78 */
  typeSpeed?: number;
  /** 1 文字を消す速度 (ms)。デフォルト: 38 */
  deleteSpeed?: number;
  /** 打ち終わってから消し始めるまでの待機 (ms)。デフォルト: 2200 */
  holdDuration?: number;
}

/**
 * ロール配列を順次タイプライター表示する hook。現在表示中の部分文字列を返す。
 * mock portfolio-mock.html の Hero ロール表示を React 化したもの。
 *
 * `roles` は ref で保持し、参照が変わっても effect は再起動しない。
 * 実行中に配列内容を差し替えたい場合は hook を再マウントすること。
 */
export function useTypewriter({
  roles,
  startDelay = 1600,
  typeSpeed = 78,
  deleteSpeed = 38,
  holdDuration = 2200,
}: UseTypewriterOptions) {
  const [text, setText] = useState("");
  const rolesRef = useRef(roles);
  rolesRef.current = roles;

  useEffect(() => {
    if (rolesRef.current.length === 0) return;

    let ri = 0;
    let ci = 0;
    let del = false;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      const arr = rolesRef.current;
      const word = arr[ri] ?? "";
      const next = del ? word.slice(0, Math.max(0, ci - 1)) : word.slice(0, ci + 1);
      setText(next);

      if (del) ci--;
      else ci++;

      if (!del && ci === word.length) {
        timer = setTimeout(() => {
          del = true;
          timer = setTimeout(step, deleteSpeed);
        }, holdDuration);
        return;
      }
      if (del && ci === 0) {
        del = false;
        ri = (ri + 1) % arr.length;
      }
      timer = setTimeout(step, del ? deleteSpeed : typeSpeed);
    };

    timer = setTimeout(step, startDelay);
    return () => clearTimeout(timer);
  }, [startDelay, typeSpeed, deleteSpeed, holdDuration]);

  return text;
}
