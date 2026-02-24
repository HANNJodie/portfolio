import { getTranslations } from "next-intl/server";
import ProjectLayout from "@/components/project/ProjectLayout";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectTeam from "@/components/project/ProjectTeam";
import ProjectCTA from "@/components/project/ProjectCTA";
import ProjectImage from "@/components/project/ProjectImage";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

// Remplacer ces chemins avec les vraies images
const IMAGES = {
  story1:    "/images/ASCEND/cover.png",
  story2:    "/images/ASCEND/cave.png",
  story3:    "/images/ASCEND/light.png",
  gameplay1: "/images/ASCEND/cave.png",
  gameplay2: "/images/ASCEND/light.png",
  gameplay3: "/images/ASCEND/cave.png",
  final:     "/images/ASCEND/crashed.jpg",
} as const;

// Remplacer VIDEO_ID par l'ID YouTube réel
const YOUTUBE_EMBED = "https://www.youtube.com/embed/I08kpA1PAkU?si=ZVTp6J93FMD6G8_Y";

export default async function AscendPage() {
  const t = await getTranslations("projectPage");

  return (
    <ProjectLayout slug="ascend">
      {({ project, locale }) => (
        <>
          <ProjectHero
            title={project.title}
            tagline={project.tagline[locale]}
            date={project.date[locale]}
            heroImage={project.heroImage}
          />

          <div className="project-page__content">

            {/* Description */}
            <ScrollReveal className="project-page__section">
              <p className="project-page__section-label">{t("description")}</p>
              <div className="project-page__section-text">
                <p>{project.description[locale]}</p>
              </div>
              <div className="project-page__cta" style={{ borderTop: "none", marginTop: 0}}>
                <Button
                  variant="primary"
                  size="large"
                  icon
                  href={project.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.ctaLabel?.[locale]}
                </Button>
              </div>
            </ScrollReveal>

            {/* Rôle */}
            <ScrollReveal delay={0.05} className="project-page__section">
              <p className="project-page__section-label">{t("role")}</p>
              <div className="project-page__section-text">{project.role?.[locale]}</div>
            </ScrollReveal>

            {/* Histoire */}
            <ScrollReveal delay={0.1} className="project-page__section">
              <p className="project-page__section-label">{t("story")}</p>
              <div className="project-page__section-text">{project.story?.[locale]}</div>
            </ScrollReveal>

            {/* Image histoire (seule, pleine largeur du contenu) */}
            <ScrollReveal>
              <div className="project-page__image-single">
                <Image
                  src={IMAGES.story1}
                  alt="ASCEND"
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </div>
            </ScrollReveal>

            {/* Images histoire (2 côte à côte) */}
            <ScrollReveal>
              <div className="project-page__image-row project-page__image-row--2">
                <div className="project-page__image-row-item">
                  <Image src={IMAGES.story2} alt="ASCEND" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <div className="project-page__image-row-item">
                  <Image src={IMAGES.story3} alt="ASCEND" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
              </div>
            </ScrollReveal>

            {/* But */}
            <ScrollReveal className="project-page__section">
              <p className="project-page__section-label">{t("goal")}</p>
              <div className="project-page__section-text">{project.goal?.[locale]}</div>
            </ScrollReveal>

            {/* Gameplay */}
            <ScrollReveal className="project-page__section">
              <p className="project-page__section-label">{t("gameplay")}</p>
              <div className="project-page__section-text">{project.gameplay?.[locale]}</div>
            </ScrollReveal>

            {/* Vidéo YouTube */}
            <ScrollReveal>
              <div className="project-page__video">
                <iframe
                  src={YOUTUBE_EMBED}
                  title="ASCEND"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </ScrollReveal>

            {/* Images gameplay (3 côte à côte) */}
            <ScrollReveal>
              <div className="project-page__image-row project-page__image-row--3">
                <div className="project-page__image-row-item">
                  <Image src={IMAGES.gameplay1} alt="ASCEND" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <div className="project-page__image-row-item">
                  <Image src={IMAGES.gameplay2} alt="ASCEND" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <div className="project-page__image-row-item">
                  <Image src={IMAGES.gameplay3} alt="ASCEND" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Équipe */}
          {project.team && <ProjectTeam team={project.team[locale]} />}

          {/* Image finale pleine largeur */}
          <ProjectImage src={IMAGES.final} alt="ASCEND"/>

          {/* CTA devblog (bas de page) */}
          <ProjectCTA
            ctaLabel={project.ctaLabel?.[locale]}
            ctaUrl={project.ctaUrl}
            socialLinks={project.socialLinks}
            downloadables={project.downloadables}
          />
        </>
      )}
    </ProjectLayout>
  );
}
