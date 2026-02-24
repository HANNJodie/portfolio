"use client";

import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ProjectContentProps {
  description: ReactNode;
  role?: ReactNode;
  story?: ReactNode;
  goal?: ReactNode;
  gameplay?: ReactNode;
}

export default function ProjectContent({
  description,
  role,
  story,
  goal,
  gameplay,
}: ProjectContentProps) {
  const t = useTranslations("projectPage");

  const sections = [
    { key: "description", label: t("description"), content: description },
    role ? { key: "role", label: t("role"), content: role } : null,
    story ? { key: "story", label: t("story"), content: story } : null,
    goal ? { key: "goal", label: t("goal"), content: goal } : null,
    gameplay ? { key: "gameplay", label: t("gameplay"), content: gameplay } : null,
  ].filter(Boolean) as { key: string; label: string; content: ReactNode }[];

  return (
    <div className="project-page__content">
      {sections.map((section, i) => (
        <ScrollReveal key={section.key} delay={i * 0.05} className="project-page__section">
          <p className="project-page__section-label">{section.label}</p>
          <div className="project-page__section-text">{section.content}</div>
        </ScrollReveal>
      ))}
    </div>
  );
}
