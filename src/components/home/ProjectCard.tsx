"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Project } from "@/types/project";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const t = useTranslations("projects");
  const locale = useLocale() as "fr" | "en";

  return (
    <ScrollReveal delay={index * 0.1}>
      <Link href={`/projets/${project.slug}` as `/projets/${string}`}>
        <motion.article
          className={`project-card ${featured ? "project-card--featured" : ""}`}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="project-card__image">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              sizes={featured ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
              style={{ objectFit: "cover" }}
              unoptimized
            />
            <div className="project-card__overlay">
              <span className="project-card__overlay-tag">
                {project.tagline[locale]}
              </span>
            </div>
          </div>

          <div className="project-card__body">
            <span className={`project-card__status project-card__status--${project.status}`}>
              {t(`status.${project.status}`)}
            </span>
            <h3 className="project-card__title">{project.title}</h3>
            <p className="project-card__date">{project.date[locale]}</p>
            <p className="project-card__excerpt">{project.description[locale]}</p>
          </div>
        </motion.article>
      </Link>
    </ScrollReveal>
  );
}
