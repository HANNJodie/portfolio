"use client";

import { useLocale, useTranslations } from "next-intl";
import { projects, upcomingProjects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Link } from "@/i18n/routing";
import Image from "next/image";

const mainProjects = projects.filter((p) => !p.jam);
const jamProjects = projects.filter((p) => p.jam);

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
        {mainProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
          />
        ))}
      </div>

      {/* Game jams: compact text rows, the cover slides in on hover */}
      {jamProjects.length > 0 && (
        <div className="project-grid__jams">
          <SectionTitle title={t("jams")} />

          <ScrollReveal>
            <ul className="jam-list">
              {jamProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projets/${project.slug}` as `/projets/${string}`}
                    className="jam-list__row"
                  >
                    <span className="jam-list__bg" aria-hidden="true">
                      <Image src={project.heroImage} alt="" fill sizes="50vw" unoptimized />
                    </span>
                    <span className="jam-list__year">{project.date[locale].match(/\d{4}/)?.[0]}</span>
                    <span className="jam-list__text">
                      <span className="jam-list__title">{project.title}</span>
                      <span className="jam-list__meta">
                        {[project.tagline[locale], project.engine].filter(Boolean).join(" · ")}
                      </span>
                    </span>
                    <span className="jam-list__arrow" aria-hidden="true">
                      <ArrowRightIcon />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      )}
    </section>
  );
}
