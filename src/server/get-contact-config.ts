import { createServerFn } from "@tanstack/react-start";
import { getServerEnv } from "#/lib/env.server.js";

/**
 * `/contact` route の loader から呼ぶサーバー関数。
 * クライアント側で必要な Turnstile site key だけを取り出して返す。
 * secret は当然返さない。
 */
export const getContactConfig = createServerFn({ method: "GET" }).handler(() => {
  const env = getServerEnv();
  return { turnstileSiteKey: env.TURNSTILE_SITE_KEY };
});
