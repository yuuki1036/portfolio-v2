import { expect, test } from "@playwright/test";

/**
 * 全ルートの smoke test。PFV2-1 時点の placeholder ページに対して
 *   - ステータス 200
 *   - <html lang> が期待する locale
 *   - <h1> に期待するテキスト
 * を検証する。
 */

type RouteCase = {
  path: string;
  lang: "ja" | "en";
  h1: string;
};

const ROUTES: RouteCase[] = [
  { path: "/", lang: "ja", h1: "yuuki1036 — home" },
  { path: "/about", lang: "ja", h1: "about" },
  { path: "/contact", lang: "ja", h1: "contact" },
  { path: "/works", lang: "ja", h1: "works" },
  { path: "/works/sample-slug", lang: "ja", h1: "works / sample-slug" },
  { path: "/blog", lang: "ja", h1: "blog" },
  { path: "/blog/hello-world", lang: "ja", h1: "blog / hello-world" },
  { path: "/en/", lang: "en", h1: "yuuki1036 — home" },
  { path: "/en/about", lang: "en", h1: "about" },
  { path: "/en/contact", lang: "en", h1: "contact" },
  { path: "/en/works", lang: "en", h1: "works" },
  { path: "/en/works/sample-slug", lang: "en", h1: "works / sample-slug" },
  { path: "/en/blog", lang: "en", h1: "blog" },
  { path: "/en/blog/hello-world", lang: "en", h1: "blog / hello-world" },
];

for (const route of ROUTES) {
  test(`${route.path} returns 200 with lang=${route.lang}`, async ({ page }) => {
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(200);

    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe(route.lang);

    await expect(page.locator("h1")).toHaveText(route.h1);
  });
}
