"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Project } from "@/types/project";

interface ProjectNavProps {
  prev: Project | null;
  next: Project | null;
}

export default function ProjectNav({ prev, next }: ProjectNavProps) {
  const t = useTranslations("projectPage");

  return (
    <nav className="project-page__nav">
      {prev ? (
        <Link
          href={`/projets/${prev.slug}` as `/projets/${string}`}
          className="project-page__nav-link"
        >
          <span className="project-page__nav-label">
            ← {t("prev")}
          </span>
          <span className="project-page__nav-title">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/projets/${next.slug}` as `/projets/${string}`}
          className="project-page__nav-link project-page__nav-link--next"
        >
          <span className="project-page__nav-label">
            {t("next")} →
          </span>
          <span className="project-page__nav-title">{next.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
