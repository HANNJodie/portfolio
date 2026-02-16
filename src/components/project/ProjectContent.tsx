"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ProjectContentProps {
  description: string;
  role?: string;
  story?: string;
  goal?: string;
  gameplay?: string;
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
  ].filter(Boolean) as { key: string; label: string; content: string }[];

  return (
    <div className="project-page__content">
      {sections.map((section, i) => (
        <ScrollReveal key={section.key} delay={i * 0.05} className="project-page__section">
          <p className="project-page__section-label">{section.label}</p>
          <p className="project-page__section-text">{section.content}</p>
        </ScrollReveal>
      ))}
    </div>
  );
}
