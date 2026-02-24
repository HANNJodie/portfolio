import { getTranslations } from "next-intl/server";
import ProjectLayout from "@/components/project/ProjectLayout";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectGallery from "@/components/project/ProjectGallery";
import ProjectTeam from "@/components/project/ProjectTeam";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

const IMAGES = {
  // Description
  desc1:     "/images/SEPHIRA/Image_Sequence_004_0216.jpg",
  desc2:     "/images/SEPHIRA/Image_Sequence_004_0795.jpg",
  // Histoire — rangée 1
  story1:    "/images/SEPHIRA/computer.png",
  story2:    "/images/SEPHIRA/Keter__Miniature 0.png",
  story3:    "/images/SEPHIRA/Binah01_UnityRender_002_0000.png",
  // Histoire — rangée 2
  story4:    "/images/SEPHIRA/imageketercopie.png",
  story5:    "/images/SEPHIRA/Unity_VVUAdA5AKm.png",
  story6:    "/images/SEPHIRA/Render2 (2).png",
  // Gameplay
  gameplay1: "/images/SEPHIRA/Final_concept_drone.png",
  gameplay2: "/images/SEPHIRA/Nouvelle_recrue.png",
} as const;

export default async function SephiraPage() {
  const t = await getTranslations("projectPage");

  return (
    <ProjectLayout slug="sephira-03">
      {({ project, locale }) => (
        <>
          <ProjectHero
            title={project.title}
            tagline={project.tagline[locale]}
            date={project.date[locale]}
            heroImage={"/images/SEPHIRA/city_baniere_1.png"}
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

            {/* Images description (2 côte à côte) */}
            <ScrollReveal>
              <div className="sephira-desc">
                <div className="sephira-desc__item">
                  <Image src={IMAGES.desc1} alt="SEPHIRA-03" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <div className="sephira-desc__item">
                  <Image src={IMAGES.desc2} alt="SEPHIRA-03" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
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

            {/* Images histoire — rangée 1 (2 côte à côte) */}
            <ScrollReveal>
              <div className="sephira-story-1">
                <div className="sephira-story-1__item">
                  <Image src={IMAGES.story1} alt="SEPHIRA-03" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <div className="sephira-story-1__item">
                  <Image src={IMAGES.story5} alt="SEPHIRA-03" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
              </div>
            </ScrollReveal>
            
            {/* Images histoire — rangée 2 (3 côte à côte) */}
            <ScrollReveal>
              <div className="sephira-story-2">
                <div className="sephira-story-2__item sephira-story-2__item--square">
                  <Image src={IMAGES.story4} alt="SEPHIRA-03" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <div className="sephira-story-2__item sephira-story-2__item--square">
                  <Image src={IMAGES.story2} alt="SEPHIRA-03" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <div className="sephira-story-2__item sephira-story-2__item--landscape">
                  <Image src={IMAGES.story3} alt="SEPHIRA-03" fill style={{ objectFit: "cover" }} unoptimized />
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
              <div className="sephira-gameplay">
                <div className="sephira-gameplay__item">
                  <Image src={IMAGES.gameplay1} alt="SEPHIRA-03" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <div className="sephira-gameplay__item">
                  <Image src={IMAGES.gameplay2} alt="SEPHIRA-03" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Galerie */}
          <ProjectGallery images={project.images} title={project.title} />

          {/* Équipe */}
          {project.team && <ProjectTeam team={project.team[locale]} />}
        </>
      )}
    </ProjectLayout>
  );
}
