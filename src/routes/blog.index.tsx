import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/")({ component: BlogIndex });

function BlogIndex() {
  return (
    <section>
      <h1>blog</h1>
    </section>
  );
}
