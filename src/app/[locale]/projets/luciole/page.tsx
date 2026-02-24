import ProjectLayout from "@/components/project/ProjectLayout";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectContent from "@/components/project/ProjectContent";
import ProjectGallery from "@/components/project/ProjectGallery";
import ProjectTeam from "@/components/project/ProjectTeam";
import ProjectCTA from "@/components/project/ProjectCTA";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const IMAGES = {
  // Description
  story1:     "/images/LUCIOLE/Projet_20240110042356.jpg",
  story2:     "/images/LUCIOLE/Lecteur multimédia 18_05_2024 18_04_24.png",
  story3:     "/images/LUCIOLE/frame6.png",
  story4:     "/images/LUCIOLE/escalier_jour.png",
  // Gameplay
  gameplay1: "/images/LUCIOLE/Lecteur multimédia 18_05_2024 18_04_24.png",
  gameplay2: "/images/LUCIOLE/Lecteur multimédia 18_05_2024 18_03_34.png",
  gameplay3: "/images/LUCIOLE/LUCIOLE 18_05_2024 17_51_57.png",
  gameplay4: "/images/LUCIOLE/Lecteur multimédia 18_05_2024 18_03_02.png",
} as const;

export default async function LuciolePage() {
  const t = await getTranslations("projectPage");
  return (
    <ProjectLayout slug="luciole">
      {({ project, locale }) => (
        <>
          <ProjectHero
            title={project.title}
            tagline={project.tagline[locale]}
            date={project.date[locale]}
            heroImage={project.heroImage}
          />

          <div className="project-page__content" style={{ paddingBottom: 0 }}>
          
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
            <ScrollReveal className="project-page__section">
              <p className="project-page__section-label">{t("role")}</p>
              <div className="project-page__section-text">{project.role?.[locale]}</div>
            </ScrollReveal>

            {/* Histoire */}
            <ScrollReveal className="project-page__section">
              <p className="project-page__section-label">{t("story")}</p>
              <div className="project-page__section-text">{project.story?.[locale]}</div>
            </ScrollReveal>

            {/* Images histoire — rangée 1 (portrait + paysage) */}
            <ScrollReveal>
              <div className="luciole-story-1">
                <div className="luciole-story-1__item luciole-story-1__item--portrait">
                  <Image src={IMAGES.story1} alt="LUCIOLE" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <div className="luciole-story-1__item luciole-story-1__item--landscape">
                  <Image src={IMAGES.story2} alt="LUCIOLE" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
              </div>
            </ScrollReveal>
            
            {/* Images histoire — rangée 2 (large + carré) */}
            <ScrollReveal>
              <div className="luciole-story-2">
                <div className="luciole-story-2__item luciole-story-2__item--wide">
                  <Image src={IMAGES.story3} alt="LUCIOLE" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <div className="luciole-story-2__item luciole-story-2__item--square">
                  <Image src={IMAGES.story4} alt="LUCIOLE" fill style={{ objectFit: "cover" }} unoptimized />
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

            {/* Images gameplay (2 côte à côte) */}
            <ScrollReveal>
              <div className="luciole-gameplay">
                <div className="luciole-gameplay__item">
                  <Image src={IMAGES.gameplay1} alt="LUCIOLE" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <div className="luciole-gameplay__item">
                  <Image src={IMAGES.gameplay2} alt="LUCIOLE" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
              </div>
            </ScrollReveal>

            {/* Images gameplay 2 (2 côte à côte) */}
            <ScrollReveal>
              <div className="luciole-gameplay">
                <div className="luciole-gameplay__item">
                  <Image src={IMAGES.gameplay3} alt="LUCIOLE" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <div className="luciole-gameplay__item">
                  <Image src={IMAGES.gameplay4} alt="LUCIOLE" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
              </div>
            </ScrollReveal>
          
          </div>

          <ProjectGallery images={project.images} title={project.title} />

          {project.team && <ProjectTeam team={project.team[locale]} />}
        </>
      )}
    </ProjectLayout>
  );
}
