import { getLocale } from "next-intl/server";
import ProjectShell from "@/components/project/ProjectShell";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectNav from "@/components/project/ProjectNav";
import { getAdjacentProjects } from "@/data/projects";

const SLUG = "rejoins-moi";
const HERO_IMAGE = "/images/RMALFDM/cover.webp";

const COPY = {
  fr: { tagline: "Amour & Apocalypse", date: "23 – 26 Janvier 2024" },
  en: { tagline: "Love & Apocalypse", date: "January 23 – 26, 2024" },
};

export default async function RejoinsMoiPage() {
  const locale = (await getLocale()) as "fr" | "en";
  const c = COPY[locale];
  const { prev, next } = getAdjacentProjects(SLUG);

  return (
    <ProjectShell>
      <ProjectHero
        title="REJOINS-MOI AVANT LA FIN DU MONDE"
        tagline={c.tagline}
        date={c.date}
        heroImage={HERO_IMAGE}
      />

      {/* TODO: contenu de la page REJOINS-MOI AVANT LA FIN DU MONDE */}

      <ProjectNav prev={prev} next={next} />
    </ProjectShell>
  );
}
