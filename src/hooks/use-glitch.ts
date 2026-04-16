import { useEffect, useState } from "react";

interface UseGlitchOptions {
  /** 発火間隔 (ms)。デフォルト: 3800 */
  interval?: number;
  /** 1 回のグリッチ表示時間 (ms)。デフォルト: 220 */
  duration?: number;
}

/**
 * 周期的に true -> false を繰り返し、`.glitch.on` クラス切替用のフラグを返す。
 * mock portfolio-mock.html の Hero 見出しグリッチを React 化したもの。
 */
export function useGlitch({ interval = 3800, duration = 220 }: UseGlitchOptions = {}) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    let durationTimer: ReturnType<typeof setTimeout> | undefined;
    const intervalId = setInterval(() => {
      setOn(true);
      durationTimer = setTimeout(() => setOn(false), duration);
    }, interval);
    return () => {
      clearInterval(intervalId);
      if (durationTimer !== undefined) clearTimeout(durationTimer);
    };
  }, [interval, duration]);

  return on;
}
