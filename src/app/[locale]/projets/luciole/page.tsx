import { getLocale } from "next-intl/server";
import ProjectShell from "@/components/project/ProjectShell";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectNav from "@/components/project/ProjectNav";
import { getAdjacentProjects } from "@/data/projects";

const SLUG = "luciole";
const HERO_IMAGE = "/images/LUCIOLE/cover.webp";

const COPY = {
  fr: { tagline: "Retrouve ta lumière", date: "Janvier 2023 – ? (En cours)" },
  en: { tagline: "Find your light again", date: "January 2023 – ? (Ongoing)" },
};

export default async function LuciolePage() {
  const locale = (await getLocale()) as "fr" | "en";
  const c = COPY[locale];
  const { prev, next } = getAdjacentProjects(SLUG);

  return (
    <ProjectShell>
      <ProjectHero title="LUCIOLE" tagline={c.tagline} date={c.date} heroImage={HERO_IMAGE} />

      {/* TODO: contenu de la page LUCIOLE */}

      <ProjectNav prev={prev} next={next} />
    </ProjectShell>
  );
}
