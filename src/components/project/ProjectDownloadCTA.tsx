import { ReactNode } from "react";

interface ProjectDownloadCTAProps {
  href: string;
  eyebrow: string;
  title: string;
  actionLabel: string;
  icon: ReactNode;
}

// Big dark hero-style CTA button — same visual language as the About page's
// "Download CV" card (dark surface, violet/pink glow, pill action button).
export default function ProjectDownloadCTA({ href, eyebrow, title, actionLabel, icon }: ProjectDownloadCTAProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="project-download-cta">
      <div className="project-download-cta__glow" aria-hidden />
      <div className="project-download-cta__text">
        <span className="project-download-cta__eyebrow">{eyebrow}</span>
        <h3 className="project-download-cta__title">{title}</h3>
      </div>
      <div className="project-download-cta__action">
        {icon}
        <span>{actionLabel}</span>
      </div>
    </a>
  );
}
