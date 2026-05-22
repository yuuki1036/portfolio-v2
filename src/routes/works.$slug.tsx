import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Section } from "#/components/layout/section.js";
import { ButtonLink } from "#/components/ui/button.js";
import { Reveal } from "#/components/ui/reveal.js";
import { SectionHeading } from "#/components/ui/section-heading.js";
import { SectionLabel } from "#/components/ui/section-label.js";
import { findWorkBySlug } from "#/data/works.js";

export const Route = createFileRoute("/works/$slug")({
  component: WorksDetail,
  loader: ({ params }) => {
    const work = findWorkBySlug(params.slug);
    if (!work) throw notFound();
    return { work };
  },
  notFoundComponent: WorksNotFound,
});

function WorksDetail() {
  const { work } = Route.useLoaderData();
  const {
    meta,
    title,
    tagline,
    overview,
    spec,
    highlights,
    tags,
    thumbnail,
    subImage,
    launch,
    source,
  } = work;

  return (
    <article>
      <Section variant="contained" className="!pt-[160px] !pb-[80px]">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{meta}</p>
        <SectionHeading as="h1" size="lg" className="mb-8">
          {title}
        </SectionHeading>
        <p className="max-w-2xl text-[15px] leading-[1.7] text-sub">{tagline}</p>
      </Section>

      <Section variant="contained" className="!py-0">
        <Reveal>
          <div className="overflow-hidden border border-border bg-surface2">
            <img
              src={thumbnail}
              alt={title}
              loading="eager"
              decoding="async"
              className="h-auto w-full object-cover"
            />
          </div>
        </Reveal>
      </Section>

      <Section variant="contained">
        <Reveal>
          <SectionLabel index="01" label="Overview" className="mb-10" />
        </Reveal>
        <div className="grid gap-8">
          {overview.map((paragraph, i) => (
            <Reveal key={i} delay={0.1 * (i + 1)}>
              <p className="max-w-3xl text-[15px] leading-[1.85] text-text">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section variant="contained" className="!pt-0">
        <Reveal>
          <SectionLabel index="02" label="Tech Stack" className="mb-10" />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2">
            {Object.entries(spec).map(([key, value]) => (
              <div key={key} className="flex flex-col gap-2 bg-bg px-6 py-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {key}
                </span>
                <span className="text-[14px] leading-[1.5] text-text">{value}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[2px] border border-border2 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-sub"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section variant="contained" className="!pt-0">
        <Reveal>
          <SectionLabel index="03" label="Highlights" className="mb-10" />
        </Reveal>
        <ul className="grid gap-px border border-border bg-border">
          {highlights.map((item, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <li className="flex gap-4 bg-bg px-6 py-5 text-[14px] leading-[1.7] text-text">
                <span className="shrink-0 font-mono text-[11px] text-accent" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section variant="contained" className="!pt-0">
        <Reveal>
          <div className="overflow-hidden border border-border bg-surface2">
            <img
              src={subImage}
              alt={`${title} — sub`}
              loading="lazy"
              decoding="async"
              className="h-auto w-full object-cover"
            />
          </div>
        </Reveal>
      </Section>

      <Section variant="contained" className="!pt-0 !pb-[160px]">
        <Reveal>
          <SectionLabel index="04" label="Links" className="mb-10" />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-4">
            {launch && (
              <ButtonLink
                href={launch}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Launch ↗
              </ButtonLink>
            )}
            <ButtonLink
              href={source}
              variant="outline"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source ↗
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-16 border-t border-border pt-8">
            <Link
              to="/works"
              className="group inline-flex items-center font-mono text-[12px] uppercase tracking-[0.2em] text-sub transition-colors hover:text-accent"
            >
              <span
                aria-hidden="true"
                className="mr-2 transition-[margin-right] duration-200 group-hover:mr-[14px]"
              >
                ←
              </span>
              Back to Works
            </Link>
          </div>
        </Reveal>
      </Section>
    </article>
  );
}

function WorksNotFound() {
  return (
    <Section variant="contained" className="!pt-[200px] !pb-[160px]">
      <SectionLabel index="404" label="Not Found" className="mb-6" />
      <SectionHeading as="h1" size="md" className="mb-8">
        Work <em>not found</em>
      </SectionHeading>
      <p className="mb-10 max-w-xl text-[15px] leading-[1.7] text-sub">
        指定された slug に紐づく Work は存在しないか、削除された可能性があります。
      </p>
      <Link
        to="/works"
        className="group inline-flex items-center font-mono text-[12px] uppercase tracking-[0.2em] text-sub transition-colors hover:text-accent"
      >
        <span
          aria-hidden="true"
          className="mr-2 transition-[margin-right] duration-200 group-hover:mr-[14px]"
        >
          ←
        </span>
        Back to Works
      </Link>
    </Section>
  );
}
