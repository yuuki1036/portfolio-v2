import type { ReactNode } from "react";
import { Nav } from "./nav";
import { Footer } from "./footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
    </div>
  );
}
