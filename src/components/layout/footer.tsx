import { Github } from "lucide-react";
import * as m from "#/paraglide/messages/_index.js";

const SOCIAL_LINKS = [
  {
    label: () => m.footer_github_label(),
    href: "https://github.com/yuuki1036",
    icon: Github,
  },
  {
    label: () => m.footer_zenn_label(),
    href: "https://zenn.dev/yuuki1036",
    icon: null,
    text: "Zenn",
  },
  {
    label: () => m.footer_x_label(),
    href: "https://x.com/yuuki_and_and",
    icon: null,
    text: "X",
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear().toString();
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-12 py-8">
        <p className="font-mono text-[11px] tracking-wider text-muted">
          {m.footer_copyright({ year })}
        </p>
        <ul className="flex gap-7 list-none">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label()}
                className="font-mono text-[11px] tracking-wider uppercase text-muted transition-colors hover:text-accent"
              >
                {link.icon ? <link.icon size={16} /> : link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
