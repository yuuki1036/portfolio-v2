import handler, { createServerEntry } from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server.js";

export default createServerEntry({
  fetch(request) {
    // paraglideMiddleware が URL/cookie からロケールを検出し AsyncLocalStorage に
    // セットしてから handler を呼ぶ。request は変換せず元のものを渡し、URL rewrite
    // は TanStack Router の rewrite hook (deLocalizeUrl/localizeUrl) に任せる。
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
});
