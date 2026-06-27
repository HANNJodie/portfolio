import { ReactNode } from "react";
import { ExternalLinkIcon, ArrowRightIcon } from "@/components/ui/Icons";

interface ProjectLinkCardProps {
  href: string;
  title: string;
  subtitle: string;
  icon?: ReactNode;
}

// The small "Devblog" style link card (gradient icon + arrow) used beside text.
// The leading icon can be overridden (defaults to an external-link icon).
export default function ProjectLinkCard({ href, title, subtitle, icon }: ProjectLinkCardProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="project-link-card">
      <div className="project-link-card__top">
        <span className="project-link-card__icon">{icon ?? <ExternalLinkIcon />}</span>
        <span className="project-link-card__arrow">
          <ArrowRightIcon />
        </span>
      </div>
      <div>
        <p className="project-link-card__title">{title}</p>
        <p className="project-link-card__sub">{subtitle}</p>
      </div>
    </a>
  );
}
