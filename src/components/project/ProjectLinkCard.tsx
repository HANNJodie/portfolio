import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import {
  ExternalLinkIcon,
  ArrowRightIcon,
  GamepadIcon,
  DocumentIcon,
  PlayIcon,
  CodeIcon,
} from "@/components/ui/Icons";

export type LinkKind = "link" | "game" | "document" | "video" | "devblog";

const KIND_ICON: Record<LinkKind, ReactNode> = {
  link: <ExternalLinkIcon />,
  game: <GamepadIcon />,
  document: <DocumentIcon />,
  video: <PlayIcon />,
  devblog: <CodeIcon />,
};

interface ProjectLinkCardProps {
  href: string;
  title: string;
  subtitle: string;
  // Drives the eyebrow label and the large watermark icon.
  kind?: LinkKind;
}

// Small link card used beside text: a compact take on ProjectDownloadCTA
// (dark surface, violet/pink glow) with the link type as a watermark icon.
export default function ProjectLinkCard({ href, title, subtitle, kind = "link" }: ProjectLinkCardProps) {
  const t = useTranslations("projectPage.linkKind");

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="project-link-card">
      <span className="project-link-card__glow" aria-hidden />
      <span className="project-link-card__watermark" aria-hidden>
        {KIND_ICON[kind]}
      </span>
      <span className="project-link-card__eyebrow">{t(kind)}</span>
      <span className="project-link-card__body">
        <span className="project-link-card__title">{title}</span>
        <span className="project-link-card__sub">
          {subtitle}
          <ArrowRightIcon />
        </span>
      </span>
    </a>
  );
}
