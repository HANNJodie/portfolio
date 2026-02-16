"use client";

import { useLocale, useTranslations } from "next-intl";
import { projects, upcomingProjects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ProjectGrid() {
  const t = useTranslations("projects");
  const locale = useLocale() as "fr" | "en";

  return (
    <section id="projects" className="project-grid">
      <SectionTitle
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Upcoming projects */}
      {upcomingProjects.length > 0 && (
        <ScrollReveal>
          <div className="project-grid__upcoming">
            {upcomingProjects.map((p, i) => (
              <div key={i} className="upcoming-badge">
                <span className="upcoming-badge__dot" />
                {locale === "fr" ? p.title : p.titleEn} — {t("upcoming")}
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* Project cards */}
      <div className="project-grid__grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            featured={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
