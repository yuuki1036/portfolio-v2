import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/works/")({ component: WorksIndex });

function WorksIndex() {
  return (
    <section>
      <h1>works</h1>
    </section>
  );
}
