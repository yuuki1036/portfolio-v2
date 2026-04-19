import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import type { Work } from "#/data/works.js";

interface WorkCardCommonProps {
  work: Work;
  className?: string;
  /** LCP 候補となる先頭カード等で eager fetch にする場合 true */
  priority?: boolean;
}

/**
 * `to`（内部遷移）か `href`（外部リンク）のいずれか一方を必須にする判別共用型。
 * 両方省略・両方指定を tsc で検出する。
 */
type WorkCardProps =
  | (WorkCardCommonProps & { to: LinkProps["to"]; href?: never })
  | (WorkCardCommonProps & { href: string; to?: never });

/**
 * 作品カード（mock portfolio-mock.html `.wcard` 相当）。
 * Reveal stagger は呼び出し側で `<Reveal delay={0.1}>` でラップする。
 *
 * - Home 等の内部遷移: `<WorkCard work={work} to="/works" />`
 * - 一覧からの外部リンク: `<WorkCard work={work} href={work.launch ?? work.source} />`
 */
export function WorkCard(props: WorkCardProps) {
  const { work, className, priority } = props;
  const { meta, title, desc, tags, thumbnail } = work;
  const rootClass = `group relative block overflow-hidden bg-bg transition-colors duration-300 hover:bg-surface ${
    className ?? ""
  }`;

  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-surface2">
        <img
          src={thumbnail}
          alt={title}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-[transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:brightness-125"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-bg/65 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div
            className="flex h-[50px] w-[50px] -rotate-45 scale-[0.6] items-center justify-center rounded-full border border-accent text-[22px] font-light text-accent transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0 group-hover:scale-100"
            aria-hidden="true"
          >
            ↗
          </div>
        </div>
      </div>

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
    </>
  );

  if (props.href !== undefined) {
    return (
      <a href={props.href} target="_blank" rel="noopener noreferrer" className={rootClass}>
        {body}
      </a>
    );
  }

  return (
    <Link to={props.to} className={rootClass}>
      {body}
    </Link>
  );
}
