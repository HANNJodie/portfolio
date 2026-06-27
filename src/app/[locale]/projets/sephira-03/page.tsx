import { getLocale } from "next-intl/server";
import ProjectShell from "@/components/project/ProjectShell";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectNav from "@/components/project/ProjectNav";
import { getAdjacentProjects } from "@/data/projects";

const SLUG = "sephira-03";
const HERO_IMAGE = "/images/SEPHIRA/city_baniere_3.webp";

const COPY = {
  fr: { tagline: "Aventure, Infiltration, Robots et Yakuzas", date: "Avril 2023 – Juillet 2024" },
  en: { tagline: "Adventure, Infiltration, Robots and Yakuzas", date: "April 2023 – July 2024" },
};

export default async function SephiraPage() {
  const locale = (await getLocale()) as "fr" | "en";
  const c = COPY[locale];
  const { prev, next } = getAdjacentProjects(SLUG);

  return (
    <ProjectShell>
      <ProjectHero title="SEPHIRA-03" tagline={c.tagline} date={c.date} heroImage={HERO_IMAGE} />

      {/* TODO: contenu de la page SEPHIRA-03 */}

      <ProjectNav prev={prev} next={next} />
    </ProjectShell>
  );
}
