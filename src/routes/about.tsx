import { createFileRoute } from "@tanstack/react-router";
import { Section } from "#/components/layout/section.js";
import { ButtonLink } from "#/components/ui/button.js";
import { Glitch } from "#/components/ui/glitch.js";
import { Reveal } from "#/components/ui/reveal.js";
import { SectionHeading } from "#/components/ui/section-heading.js";
import { SectionLabel } from "#/components/ui/section-label.js";
import { StatsGrid } from "#/components/ui/stats-grid.js";
import { STATS } from "#/data/stats.js";

export const Route = createFileRoute("/about")({ component: About });

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/yuuki1036" },
  { label: "Zenn", href: "https://zenn.dev/yuuki1036" },
  { label: "X", href: "https://x.com/yuuki1036" },
] as const;

function About() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative flex min-h-screen items-center overflow-hidden px-12 pt-[120px] pb-20"
      >
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[3fr_2fr] items-center gap-16">
          <Reveal className="min-w-0">
            <h1 className="font-display text-[clamp(40px,5vw,72px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-text">
              <Glitch>yuuki1036</Glitch>
            </h1>
            <div className="mt-9 mb-9 space-y-4">
              <p className="font-sans text-[15px] font-light leading-[1.88] text-muted">
                北陸出身、東京在住のソフトウェアエンジニア。
              </p>
              <p className="font-sans text-[15px] font-light leading-[1.88] text-muted">
                国内のスタートアップで 6 年以上、TypeScript と React
                を軸にプロダクト開発に携わってきました。設計・パフォーマンス・開発体験の三点が関心領域です。
              </p>
              <p className="font-sans text-[15px] font-light leading-[1.88] text-muted">
                現在はフリーランスとして、一緒に良いものを作れるチーム・個人を探しています。
              </p>
            </div>
            <div className="mb-7 font-mono text-[11px] uppercase tracking-[0.28em] text-sub">
              Software Engineer
            </div>
            <ButtonLink
              href="https://github.com/yuuki1036"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="sm"
            >
              GitHub →
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.15} className="flex justify-center">
            <img
              src="/images/avatar.jpg"
              alt="yuuki1036 avatar"
              className="aspect-square w-full max-w-sm border border-border object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* ── STATS ── */}
      <Section variant="full" id="stats">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <SectionLabel index="01" label="By the numbers" className="mb-16" />
          </Reveal>
          <Reveal delay={0.1}>
            <StatsGrid stats={STATS} />
          </Reveal>
        </div>
      </Section>

      {/* ── CONNECT ── */}
      <Section
        variant="full"
        id="connect"
        className="relative overflow-hidden text-center !py-[160px]"
      >
        <Reveal>
          <SectionLabel index="02" label="Connect" className="mb-12" />
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading as="h2" size="md" className="mb-7">
            Let's keep
            <br />
            <em>in touch.</em>
          </SectionHeading>
          <p className="mb-11 font-sans text-[15px] font-light text-muted">
            SNS でも繋がりましょう。お気軽にどうぞ。
          </p>
          <ul className="flex items-center justify-center gap-10 font-mono text-[11px] uppercase tracking-[0.28em]">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sub transition-colors duration-200 hover:text-accent"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>
    </>
  );
}
