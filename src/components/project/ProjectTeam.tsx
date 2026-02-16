"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ProjectTeamProps {
  team: string;
}

export default function ProjectTeam({ team }: ProjectTeamProps) {
  const t = useTranslations("projectPage");

  return (
    <ScrollReveal>
      <div className="project-page__content">
        <div className="project-page__section">
          <p className="project-page__section-label">{t("team")}</p>
          <p className="project-page__section-text">{team}</p>
        </div>
      </div>
    </ScrollReveal>
  );
}
