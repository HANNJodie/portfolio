import { getLocale } from "next-intl/server";
import ProjectShell from "@/components/project/ProjectShell";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectNav from "@/components/project/ProjectNav";
import { getAdjacentProjects } from "@/data/projects";

const SLUG = "quest-for-life";
const HERO_IMAGE = "/images/QUEST FOR LIFE/cover.webp";

const COPY = {
  fr: { tagline: "Angoisse et Labyrinthe", date: "25 – 27 Janvier 2023" },
  en: { tagline: "Dread and Labyrinth", date: "January 25 – 27, 2023" },
};

export default async function QuestForLifePage() {
  const locale = (await getLocale()) as "fr" | "en";
  const c = COPY[locale];
  const { prev, next } = getAdjacentProjects(SLUG);

  return (
    <ProjectShell>
      <ProjectHero title="QUEST FOR LIFE" tagline={c.tagline} date={c.date} heroImage={HERO_IMAGE} />

      {/* TODO: contenu de la page QUEST FOR LIFE */}

      <ProjectNav prev={prev} next={next} />
    </ProjectShell>
  );
}
