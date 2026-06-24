import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        params: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "dark" | "light" | "auto";
          size?: "normal" | "compact" | "flexible";
        },
      ) => string;
      remove: (id: string) => void;
      reset: (id: string) => void;
    };
  }
}

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  className?: string;
}

/**
 * Cloudflare Turnstile widget の薄いラッパ。
 *
 * api.js は `/contact` route の `head()`（contact.tsx）で async ロードしている前提。
 * script が未ロードなら `requestAnimationFrame` でリトライする。callback は ref に
 * 保持して再 render を防ぐ。既に widget を render 済みなら二重 render しないようガードする。
 */
export function Turnstile({ siteKey, onVerify, onExpire, onError, className }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const callbacksRef = useRef({ onVerify, onExpire, onError });
  callbacksRef.current = { onVerify, onExpire, onError };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;

    function tryRender() {
      if (cancelled || !container) return;
      // 既に render 済みなら二重 render しない（rAF リトライ中の effect 再実行ガード）。
      if (widgetIdRef.current) return;
      if (!window.turnstile) {
        requestAnimationFrame(tryRender);
        return;
      }
      widgetIdRef.current = window.turnstile.render(container, {
        sitekey: siteKey,
        callback: (token) => callbacksRef.current.onVerify(token),
        "expired-callback": () => callbacksRef.current.onExpire?.(),
        "error-callback": () => callbacksRef.current.onError?.(),
        theme: "dark",
      });
    }
    tryRender();

    return () => {
      cancelled = true;
      const id = widgetIdRef.current;
      // remove 可否に関わらず ref は必ず null 化する（次回 effect で再 render させるため）。
      // script 未ロード等で remove できない場合はログを残す（widget が残留しうる）。
      if (id) {
        if (window.turnstile) {
          window.turnstile.remove(id);
        } else {
          console.warn("Turnstile: cleanup 時に window.turnstile が未定義で remove をスキップ");
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  return <div ref={containerRef} className={className} />;
}
