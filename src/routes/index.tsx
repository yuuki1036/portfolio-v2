import { Link, createFileRoute } from "@tanstack/react-router";
import { Section } from "#/components/layout/section.js";
import { ButtonLink } from "#/components/ui/button.js";
import { ButtonRouterLink } from "#/components/ui/button-router-link.js";
import { Glitch } from "#/components/ui/glitch.js";
import { Reveal } from "#/components/ui/reveal.js";
import { SectionHeading } from "#/components/ui/section-heading.js";
import { SectionLabel } from "#/components/ui/section-label.js";
import { StatsGrid } from "#/components/ui/stats-grid.js";
import { Typewriter } from "#/components/ui/typewriter.js";
import { WorkCard } from "#/components/ui/work-card.js";
import { STATS } from "#/data/stats.js";
import { WORKS } from "#/data/works.js";

export const Route = createFileRoute("/")({ component: Home });

const ROLES = [
  "TypeScript Engineer_",
  "Frontend Tech Lead_",
  "React Specialist_",
  "UI/UX Craftsman_",
  "TanStack Enthusiast_",
] as const;

function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative flex min-h-screen flex-col justify-center overflow-hidden px-12 pt-[120px] pb-20"
      >
        <div className="hero-glow" aria-hidden="true" />

        <p className="hero-eyebrow mb-9 font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
          Frontend Tech Lead × 6 years
        </p>

        <h1 className="mb-1 font-display text-[clamp(76px,11.5vw,156px)] font-extrabold leading-[0.9] tracking-[-0.035em] text-text">
          <span className="name-line">
            <span>
              <Glitch>YUKI</Glitch>
            </span>
          </span>
          <span className="name-line">
            <span>MIYASHITA</span>
          </span>
        </h1>

        <div className="hero-role mt-11 mb-[52px]">
          <div className="flex items-center gap-[14px] text-[clamp(19px,2.6vw,30px)] font-light text-sub">
            <span className="text-dim">—</span>
            <Typewriter
              roles={ROLES}
              className="font-normal text-text [&>span:first-child]:inline-block [&>span:first-child]:min-w-[min(320px,80vw)]"
            />
          </div>
          <p className="mt-[14px] max-w-[420px] font-sans text-[15px] font-light leading-[1.85] text-muted">
            TypeScript・React でプロダクト開発を加速させる
            <br />
            フロントエンドエンジニア。
            <br />
            スタートアップの成長を技術で支えます。
          </p>
        </div>

        <div className="hero-cta flex items-center gap-[14px]">
          <ButtonRouterLink to="/works" variant="primary" size="md">
            View Works →
          </ButtonRouterLink>
          <ButtonRouterLink to="/contact" variant="outline" size="md">
            Get in Touch
          </ButtonRouterLink>
        </div>

        <div className="scroll-hint absolute bottom-11 left-12 flex items-center gap-[14px] font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span className="s-line" aria-hidden="true" />
          <span>scroll</span>
        </div>
      </section>

      {/* ── WORKS ── */}
      <Section variant="contained" id="works">
        <Reveal>
          <SectionLabel index="02" label="Selected Works" className="mb-16" />
        </Reveal>
        <div className="grid grid-cols-3 gap-px border border-border bg-border">
          {WORKS.map((work, i) => (
            <Reveal key={work.slug} delay={i * 0.1} className="bg-bg">
              <WorkCard work={work} to="/works" />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-right">
          <ButtonRouterLink to="/works" variant="outline" size="sm">
            See all works →
          </ButtonRouterLink>
        </div>
      </Section>

      {/* ── ABOUT ── */}
      <Section variant="full" id="about">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <SectionLabel index="03" label="About" className="mb-16" />
          </Reveal>
          <div className="grid grid-cols-2 items-start gap-20">
            <Reveal>
              <SectionHeading as="h2" size="md" className="mb-9">
                Building fast,
                <br />
                <em>shipping</em> faster.
              </SectionHeading>
              <p className="mb-4 font-sans text-[15px] font-light leading-[1.88] text-muted">
                北陸出身。6年以上のフロントエンドエンジニア経験を持ち、スタートアップでのプロダクト開発をリードしてきました。
              </p>
              <p className="mb-4 font-sans text-[15px] font-light leading-[1.88] text-muted">
                TypeScript・React・Next.js
                を中心に、パフォーマンス最適化・コンポーネント設計・チームの開発体験向上に注力しています。
              </p>
              <Link
                to="/about"
                className="group mt-6 inline-flex items-center font-mono text-xs uppercase tracking-[0.15em] text-sub transition-colors duration-200 hover:text-accent"
              >
                Full profile
                <span
                  aria-hidden="true"
                  className="ml-2 transition-[margin-left] duration-200 group-hover:ml-[14px]"
                >
                  →
                </span>
              </Link>
            </Reveal>
            <Reveal delay={0.15}>
              <StatsGrid stats={STATS} />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── CONTACT ── */}
      <Section
        variant="full"
        id="contact"
        className="relative overflow-hidden text-center !py-[160px]"
      >
        <div className="ct-glow" aria-hidden="true" />
        <Reveal className="relative">
          <SectionHeading as="h2" size="lg" className="mb-7">
            Let's build
            <br />
            <em>something.</em>
          </SectionHeading>
          <p className="mb-[52px] font-sans text-base font-light text-muted">
            新しいプロジェクトのご相談、お気軽にどうぞ。
          </p>
          <ButtonLink href="mailto:hello@yuuki1036.com" variant="primary" size="md">
            hello@yuuki1036.com →
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
