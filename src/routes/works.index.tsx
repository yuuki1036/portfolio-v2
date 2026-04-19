import { createFileRoute } from "@tanstack/react-router";
import { Section } from "#/components/layout/section.js";
import { Reveal } from "#/components/ui/reveal.js";
import { WorkCard } from "#/components/ui/work-card.js";
import { WORKS } from "#/data/works.js";

export const Route = createFileRoute("/works/")({ component: WorksIndex });

function WorksIndex() {
  return (
    <Section variant="contained" className="pt-[160px]">
      <div className="grid grid-cols-1 gap-px border border-border bg-border lg:grid-cols-3">
        {WORKS.map((work, i) => (
          <Reveal key={work.slug} delay={i * 0.1} className="bg-bg">
            <WorkCard work={work} href={work.launch ?? work.source} priority={i === 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
