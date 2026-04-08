import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$slug")({ component: BlogDetail });

function BlogDetail() {
  const { slug } = Route.useParams();
  return (
    <article>
      <h1>blog / {slug}</h1>
    </article>
  );
}
