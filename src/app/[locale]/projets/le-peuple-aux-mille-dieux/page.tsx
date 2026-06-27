import { getLocale } from "next-intl/server";
import ProjectShell from "@/components/project/ProjectShell";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectNav from "@/components/project/ProjectNav";
import { getAdjacentProjects } from "@/data/projects";

const SLUG = "le-peuple-aux-mille-dieux";
const HERO_IMAGE = "/images/LE PEUPLE AUX MILLE DIEUX/cover.webp";

const COPY = {
  fr: { tagline: "Cartes et Mythologie", date: "Novembre – Décembre 2021" },
  en: { tagline: "Cards and Mythology", date: "November – December 2021" },
};

export default async function PeupleMilleDieuxPage() {
  const locale = (await getLocale()) as "fr" | "en";
  const c = COPY[locale];
  const { prev, next } = getAdjacentProjects(SLUG);

  return (
    <ProjectShell>
      <ProjectHero
        title="LE PEUPLE AUX MILLE DIEUX"
        tagline={c.tagline}
        date={c.date}
        heroImage={HERO_IMAGE}
      />

      {/* TODO: contenu de la page LE PEUPLE AUX MILLE DIEUX */}

      <ProjectNav prev={prev} next={next} />
    </ProjectShell>
  );
}
