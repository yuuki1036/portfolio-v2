import { createFileRoute } from "@tanstack/react-router";
import { Section } from "#/components/layout/section.js";
import { Reveal } from "#/components/ui/reveal.js";
import { SectionHeading } from "#/components/ui/section-heading.js";
import { SectionLabel } from "#/components/ui/section-label.js";
import { WorkCard } from "#/components/ui/work-card.js";
import { WORKS } from "#/data/works.js";
import * as m from "#/paraglide/messages/_index.js";

export const Route = createFileRoute("/works/")({ component: WorksIndex });

function WorksIndex() {
  return (
    <Section variant="contained" className="pt-[160px]">
      <SectionLabel index="01" label="Selected Works" className="mb-6" />
      <SectionHeading as="h1" size="lg" className="mb-16">
        {m.nav_works()}
      </SectionHeading>
      <div className="grid grid-cols-1 gap-px border border-border bg-border lg:grid-cols-3">
        {WORKS.map((work, i) => (
          <Reveal key={work.slug} delay={i * 0.1} className="bg-bg">
            <WorkCard
              work={work}
              to="/works/$slug"
              params={{ slug: work.slug }}
              priority={i === 0}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
