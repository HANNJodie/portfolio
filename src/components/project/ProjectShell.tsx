import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Common chrome for a project page: header + main wrapper + footer.
export default function ProjectShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="project-page">{children}</main>
      <Footer />
    </>
  );
}
