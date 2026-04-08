import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  return (
    <main>
      <h1>contact</h1>
    </main>
  );
}
