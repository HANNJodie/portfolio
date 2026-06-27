import { getLocale } from "next-intl/server";
import ProjectShell from "@/components/project/ProjectShell";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectBento from "@/components/project/ProjectBento";
import ProjectSection from "@/components/project/ProjectSection";
import RichText from "@/components/project/RichText";
import ProjectLinkCard from "@/components/project/ProjectLinkCard";
import ProjectVideo from "@/components/project/ProjectVideo";
import ProjectImages from "@/components/project/ProjectImages";
import ProjectCTA from "@/components/project/ProjectCTA";
import ProjectNav from "@/components/project/ProjectNav";
import { getAdjacentProjects } from "@/data/projects";

const SLUG = "ascend";
const HERO_IMAGE = "/images/ASCEND/cover.webp";
const DEVBLOG = "https://ascend-devblog.carrd.co/";
const VIDEO_ID = "I08kpA1PAkU";

const COPY = {
  fr: {
    tagline: "Retourner au paradis",
    date: "Février 2025 – ? 2028",
    cta: "DEVBLOG",
    openLink: "Ouvrir le lien",
    conceptArtsBy: "Concept arts réalisé par",
    teamLabel: "Jodie HANN & Enzo POLI",
    roleLabel: "Game, Level, & Narrative Designer",
    genres: ["Parcours", "Première personne", '"Walking Simulator"', "Aventure", "Fantaisie céleste"],
    labels: { concept: "Concept", work: "Mon travail", gameplay: "Gameplay" },
    concept:
      "ASCEND est un jeu de parcours à la première personne avec des aspirations narratives et contemplatives. Le joueur incarne un ange qui essaie de retourner au paradis après en avoir été déchu pour avoir détruit le monde des hommes. Sur son chemin il apprendra de ces erreurs et tentera d'en réparer leurs conséquences.",
    work:
      "Nous sommes deux à travailler sur ASCEND et collaborons donc sur toutes les parties. Mon collègue se concentre davantage sur le system design et le code ; Et moi sur la partie conceptuelle, avec un accent sur le Narrative Design, le Level Design, et l'aspect visuel. Je participe également au design des mécaniques et du gameplay. Nous partageons aussi la gestion du projet.\nPour le moment, cela inclue par exemple :\n- La création d'une structure générale pour le projet, liant les niveaux au gameplay et à la narration.\n- La rédaction de document précis sur le déroulement des niveaux, incluant notamment : les mécaniques introduites et utilisés ; le découpage de leur structure macro et micro, et le rythme attendu ; leur ambiance et les éléments clef visuels, sonores, etc. qui y contribuent ; ainsi que la narration associée, son évolution, et les éléments qui la transmettent.\n- L'écriture d'une bible d'univers pour développer un monde riche qui permettra une forte narration environnementale.\n- La recherche et documentation de nombreuses références pour enrichir le concept et son univers.\n- Des réunions et brainstormings sur les différentes mécaniques du jeu pour détailler leur fonctionnement.\n- De nombreux playtests sur les premiers prototypes pour vérifier l'intérêt du concept, approfondir et peaufiner le fonctionnement des contrôles de base, et mettre en place les systèmes de lumière et d'optimisation.\n- La planification globale du projet et sa documentation à l'aide de Notion, la mise en place de rétroplanning, de suivie de tâches.",
  },
  en: {
    tagline: "Return to paradise",
    date: "February 2025 – ? 2028",
    cta: "DEVBLOG",
    openLink: "Open link",
    conceptArtsBy: "Concept art by",
    teamLabel: "Jodie HANN & Enzo POLI",
    roleLabel: "Game, Level, & Narrative Designer",
    genres: ["Parkour", "First-person", '"Walking Simulator"', "Adventure", "Celestial Fantasy"],
    labels: { concept: "Concept", work: "My work", gameplay: "Gameplay" },
    concept:
      "ASCEND is a first-person journey game with narrative and contemplative aspirations. The player embodies an angel trying to return to paradise after being cast out for destroying the world of men. Along the way, they will learn from their mistakes and attempt to repair the consequences.",
    work:
      "Two of us work on ASCEND and therefore collaborate on every part. My colleague focuses more on system design and code; while I handle the conceptual side, with an emphasis on Narrative Design, Level Design, and the visual aspect. I also take part in designing the mechanics and gameplay. We also share project management.\nFor now, this includes for example:\n- Creating an overall structure for the project, linking the levels to the gameplay and the narrative.\n- Writing detailed documents on how the levels unfold, including: the mechanics introduced and used; the breakdown of their macro and micro structure, and the intended pacing; their atmosphere and the key visual, audio, etc. elements that contribute to it; as well as the associated narrative, its evolution, and the elements that convey it.\n- Writing a world bible to develop a rich world that will enable strong environmental storytelling.\n- Researching and documenting numerous references to enrich the concept and its universe.\n- Meetings and brainstorms on the various game mechanics to detail how they work.\n- Numerous playtests on the first prototypes to verify the concept's appeal, deepen and refine the basic controls, and set up the lighting and optimization systems.\n- Overall project planning and documentation using Notion, setting up a reverse schedule and task tracking.",
  },
};

export default async function AscendPage() {
  const locale = (await getLocale()) as "fr" | "en";
  const c = COPY[locale];
  const { prev, next } = getAdjacentProjects(SLUG);

  return (
    <ProjectShell>
      <ProjectHero title="ASCEND" tagline={c.tagline} date={c.date} heroImage={HERO_IMAGE} />

      <ProjectBento
        status="in-development"
        teamLabel={c.teamLabel}
        roleLabel={c.roleLabel}
        engine="Unity"
        genres={c.genres}
      />

      <div className="project-sections">
        <ProjectSection label={c.labels.concept}>
          <div className="project-section__concept">
            <div className="project-section__lead">
              <RichText text={c.concept} />
            </div>
            <ProjectLinkCard href={DEVBLOG} title={c.cta} subtitle={c.openLink} />
          </div>
        </ProjectSection>

        <ProjectSection label={c.labels.work}>
          <div className="project-section__lead">
            <RichText text={c.work} />
          </div>
        </ProjectSection>

        <ProjectImages
          images={[
            { src: "/images/ASCEND/22 (1).webp", alt: "ASCEND" },
            { src: "/images/ASCEND/22 (2).webp", alt: "ASCEND" },
          ]}
          credit={
            <>
              {c.conceptArtsBy}{" "}
              <a
                href="https://www.linkedin.com/in/mathis-palomba-2abb90222/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mathis Palomba
              </a>
            </>
          }
        />

        <ProjectSection label={c.labels.gameplay}>
          <ProjectVideo videoId={VIDEO_ID} title={c.labels.gameplay} />
        </ProjectSection>

        <ProjectImages
          images={[
            { src: "/images/ASCEND/d75f31ca.jpg", alt: "ASCEND" },
            { src: "/images/ASCEND/b5a97eddb7.jpg", alt: "ASCEND" },
            { src: "/images/ASCEND/f3409263.jpg", alt: "ASCEND" },
          ]}
        />

        <ProjectImages
          images={[{ src: "/images/ASCEND/ascend_banner3.webp", alt: "ASCEND" }]}
        />
      </div>

      <ProjectCTA ctaLabel={c.cta} ctaUrl={DEVBLOG} />

      <ProjectNav prev={prev} next={next} />
    </ProjectShell>
  );
}
