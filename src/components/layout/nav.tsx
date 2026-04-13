import { Link, useRouterState } from "@tanstack/react-router";
import { getLocale, locales, setLocale } from "#/paraglide/runtime.js";
import * as m from "#/paraglide/messages/_index.js";
import { useNavStuck } from "#/hooks/use-nav-stuck.js";

import type { Locale } from "#/paraglide/runtime.js";

const NAV_ITEMS = [
  { label: () => m.nav_works(), to: "/works" },
  { label: () => m.nav_about(), to: "/about" },
  { label: () => m.nav_contact(), to: "/contact" },
] as const;

export function Nav() {
  const stuck = useNavStuck();
  const currentLocale = getLocale();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const handleLocaleChange = (locale: Locale) => {
    if (locale !== currentLocale) {
      setLocale(locale);
    }
  };

  return (
    <nav
      aria-label={m.nav_aria_label()}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        stuck
          ? "border-b border-border bg-bg/[0.88] py-[18px] px-12 backdrop-blur-[16px]"
          : "border-b border-transparent bg-transparent py-6 px-12"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-display text-xl font-bold tracking-tight text-text">
          yuuki<span className="text-accent">.</span>
        </Link>

        {/* Nav Links */}
        <ul className="flex gap-9 list-none">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.to);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`font-mono text-xs tracking-[0.12em] uppercase transition-colors ${
                    isActive ? "text-text" : "text-muted hover:text-text"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label()}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Lang Switch */}
        <div
          role="group"
          aria-label={m.nav_lang_switch_label()}
          className="flex gap-0.5 rounded border border-border2 bg-surface p-[3px] font-mono text-[11px] tracking-wider"
        >
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              className={`cursor-pointer rounded-sm px-2.5 py-1 transition-all ${
                locale === currentLocale
                  ? "bg-accent font-medium text-bg"
                  : "bg-transparent text-muted hover:text-text"
              }`}
              aria-pressed={locale === currentLocale}
            >
              {locale.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
