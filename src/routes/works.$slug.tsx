import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/works/$slug")({ component: WorksDetail });

function WorksDetail() {
  const { slug } = Route.useParams();
  return (
    <article>
      <h1>works / {slug}</h1>
    </article>
  );
}
