import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import type { Work } from "#/data/works.js";

interface WorkCardProps {
  work: Work;
  /** 遷移先（Home からは全件 `/works`、後続 `/works/[slug]` 詳細実装で個別 slug に切替予定） */
  to: LinkProps["to"];
  className?: string;
}

/**
 * 作品カード（mock portfolio-mock.html `.wcard` 相当）。
 * Reveal stagger は呼び出し側で `<Reveal delay={0.1}>` でラップする。
 */
export function WorkCard({ work, to, className }: WorkCardProps) {
  const { meta, title, desc, tags, placeholder } = work;
  return (
    <Link
      to={to}
      className={`group relative block overflow-hidden bg-bg transition-colors duration-300 hover:bg-surface ${
        className ?? ""
      }`}
    >
      {/* Image placeholder */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface2">
        <div
          className="flex h-full w-full select-none items-center justify-center font-display text-[52px] font-extrabold tracking-[-0.04em] transition-[transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:brightness-125"
          style={{ background: placeholder.gradient, color: placeholder.color }}
          aria-hidden="true"
        >
          {placeholder.text}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-bg/65 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div
            className="flex h-[50px] w-[50px] -rotate-45 scale-[0.6] items-center justify-center rounded-full border border-accent text-[22px] font-light text-accent transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0 group-hover:scale-100"
            aria-hidden="true"
          >
            ↗
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="border-t border-border p-[26px]">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{meta}</p>
        <h3 className="mb-[10px] font-display text-[20px] font-bold leading-[1.2] text-text transition-colors duration-200 group-hover:text-accent">
          {title}
        </h3>
        <p className="mb-[18px] text-[13px] leading-[1.75] text-muted">{desc}</p>
        <div className="flex flex-wrap gap-[6px]">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[2px] border border-border2 px-[9px] py-[3px] font-mono text-[10px] uppercase tracking-[0.1em] text-muted transition-colors duration-200 group-hover:border-accent group-hover:text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
