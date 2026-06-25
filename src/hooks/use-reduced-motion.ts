import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * `prefers-reduced-motion: reduce` が有効かを返す（SSR セーフ）。
 * サーバー / 初期 hydration では false を返し、クライアントで matchMedia を
 * 購読して OS 設定の変更に追従する。CSS の media query では止められない
 * JS 駆動アニメ（setTimeout/setInterval ループ等）の抑制判定に使う。
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
