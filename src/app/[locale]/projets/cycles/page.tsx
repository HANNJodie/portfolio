import ProjectLayout from "@/components/project/ProjectLayout";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectContent from "@/components/project/ProjectContent";
import ProjectGallery from "@/components/project/ProjectGallery";
import ProjectTeam from "@/components/project/ProjectTeam";
import ProjectCTA from "@/components/project/ProjectCTA";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { getTranslations } from "next-intl/server";


const IMAGES = {
  story1:    "/images/CYCLES/image.png",
  story2:    "/images/CYCLES/Asset_background_eden.png",
  gameplay1: "/images/CYCLES/asset_pretre.png",
  gameplay2: "/images/CYCLES/asset_shabun.png",
  gameplay3: "/images/CYCLES/djo_asset.png",
  final:     "/images/CYCLES/asset_win.png",
} as const;

export default async function CyclesPage() {
  const t = await getTranslations("projectPage");

  return (
    <ProjectLayout slug="cycles">
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
            <ScrollReveal delay={0.05} className="project-page__section">
              <p className="project-page__section-label">{t("role")}</p>
              <div className="project-page__section-text">{project.role?.[locale]}</div>
            </ScrollReveal>

            {/* Histoire */}
            <ScrollReveal delay={0.1} className="project-page__section">
              <p className="project-page__section-label">{t("story")}</p>
              <div className="project-page__section-text">{project.story?.[locale]}</div>
            </ScrollReveal>

            {/* Images histoire (2 côte à côte) */}
            <ScrollReveal>
              <div className="cycles-story-row">
                <div className="cycles-story-row__item">
                  <Image src={IMAGES.story1} alt="CYCLES" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <div className="cycles-story-row__item">
                  <Image src={IMAGES.story2} alt="CYCLES" fill style={{ objectFit: "cover" }} unoptimized />
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

            {/* Images gameplay (3 côte à côte) */}
            <ScrollReveal>
              <div className="cycles-gameplay">
                <div className="cycles-gameplay__item">
                  <Image src={IMAGES.gameplay1} alt="CYCLES" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <div className="cycles-gameplay__item">
                  <Image src={IMAGES.gameplay2} alt="CYCLES" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <div className="cycles-gameplay__item">
                  <Image src={IMAGES.gameplay3} alt="CYCLES" fill style={{ objectFit: "cover" }} unoptimized />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Équipe */}
          {project.team && <ProjectTeam team={project.team[locale]} />}

          {/* Image finale pleine largeur */}
          <div className="cycles-final__container" style={{ paddingTop: 0}}>
            <ScrollReveal>
              <div className="cycles-final" style={{ paddingTop: 0}}>
                <Image
                  src={IMAGES.final}
                  alt="CYCLES"
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </div>
            </ScrollReveal>
          </div>
        </>
      )}
    </ProjectLayout>
  );
}
