import { ReactNode } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ProjectSectionProps {
  label: string;
  children: ReactNode;
  className?: string;
}

// A labeled content section (violet caps label + body). The body is free-form
// so each project page can compose text, media, galleries, etc. as it likes.
export default function ProjectSection({ label, children, className = "" }: ProjectSectionProps) {
  return (
    <ScrollReveal className={`project-section ${className}`.trim()}>
      <p className="project-section__label">{label}</p>
      {children}
    </ScrollReveal>
  );
}
