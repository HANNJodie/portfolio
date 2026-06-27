import { getLocale } from "next-intl/server";
import ProjectShell from "@/components/project/ProjectShell";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectNav from "@/components/project/ProjectNav";
import { getAdjacentProjects } from "@/data/projects";

const SLUG = "cycles";
const HERO_IMAGE = "/images/CYCLES/cover.png";

const COPY = {
  fr: { tagline: "Sauver l'humanité", date: "Janvier – Août 2023" },
  en: { tagline: "Save humanity", date: "January – August 2023" },
};

export default async function CyclesPage() {
  const locale = (await getLocale()) as "fr" | "en";
  const c = COPY[locale];
  const { prev, next } = getAdjacentProjects(SLUG);

  return (
    <ProjectShell>
      <ProjectHero title="CYCLES" tagline={c.tagline} date={c.date} heroImage={HERO_IMAGE} />

      {/* TODO: contenu de la page CYCLES */}

      <ProjectNav prev={prev} next={next} />
    </ProjectShell>
  );
}
