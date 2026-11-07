import { expect, test } from "@playwright/test";

/**
 * 全ルートの smoke test。各ルートについて
 *   - ステータス 200
 *   - <html lang> が期待する locale
 *   - <h1> に期待するテキスト（h1 を持たないページは null で検証を省く）
 * を検証する。
 */

type RouteCase = {
  path: string;
  lang: "ja" | "en";
  h1: string | RegExp | null;
};

const CONTACT_H1 = /Let's build\s*something\./;

const ROUTES: RouteCase[] = [
  { path: "/", lang: "ja", h1: "yuuki1036" },
  { path: "/about", lang: "ja", h1: "yuuki1036" },
  { path: "/contact", lang: "ja", h1: CONTACT_H1 },
  // works 一覧はカードのグリッドだけで h1 を持たない
  { path: "/works", lang: "ja", h1: null },
  { path: "/works/hitokoto", lang: "ja", h1: "ひとこと" },
  { path: "/blog", lang: "ja", h1: "blog" },
  { path: "/blog/hello-world", lang: "ja", h1: "blog / hello-world" },
  { path: "/en/", lang: "en", h1: "yuuki1036" },
  { path: "/en/about", lang: "en", h1: "yuuki1036" },
  { path: "/en/contact", lang: "en", h1: CONTACT_H1 },
  { path: "/en/works", lang: "en", h1: null },
  { path: "/en/works/hitokoto", lang: "en", h1: "ひとこと" },
  { path: "/en/blog", lang: "en", h1: "blog" },
  { path: "/en/blog/hello-world", lang: "en", h1: "blog / hello-world" },
];

for (const route of ROUTES) {
  test(`${route.path} returns 200 with lang=${route.lang}`, async ({ page }) => {
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(200);

    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe(route.lang);

    if (route.h1 !== null) {
      await expect(page.locator("h1")).toHaveText(route.h1);
    }
  });
}
