import { getLocale } from "next-intl/server";
import ProjectShell from "@/components/project/ProjectShell";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectInfoStrip from "@/components/project/ProjectInfoStrip";
import ProjectSection from "@/components/project/ProjectSection";
import RichText from "@/components/project/RichText";
import ProjectLinkCard from "@/components/project/ProjectLinkCard";
import ProjectDownloadCTA from "@/components/project/ProjectDownloadCTA";
import ProjectCarousel from "@/components/project/ProjectCarousel";
import ProjectCTA from "@/components/project/ProjectCTA";
import ProjectNav from "@/components/project/ProjectNav";
import { GamepadIcon, DownloadIcon } from "@/components/ui/Icons";
import { getAdjacentProjects, getProjectBySlug } from "@/data/projects";

const SLUG = "cycles";
const HERO_IMAGE = "/images/CYCLES/cover.png";
const DEMO = "https://jodie-hann.itch.io/cycles";
const GDD_URL = "https://jodiehann.wordpress.com/wp-content/uploads/2024/03/gdd_cycles-2.docx";

// Dialogue & map screenshots showing the gauge UI.
const GAMEPLAY_IMAGES = [
  { src: "/images/CYCLES/image (10).png", alt: "Dialogue avec Marie Bardane" },
  { src: "/images/CYCLES/image.png", alt: "Dialogue avec Shabun" },
  { src: "/images/CYCLES/image (11).png", alt: "Carte et jauges de la société" },
  { src: "/images/CYCLES/tchat.png", alt: "Daliogue avec Lucien Moa" },
];

// Main character portraits.
const CHARACTER_IMAGES = [
  { src: "/images/CYCLES/djo_asset.png", alt: "Djo" },
  { src: "/images/CYCLES/asset_pretre.png", alt: "Le Grand Prêtre" },
  { src: "/images/CYCLES/asset_ordre.png", alt: "Ordre" },
  { src: "/images/CYCLES/asset_investisseur.png", alt: "Investisseur" },
];

const COPY = {
  fr: {
    tagline: "Sauver l'humanité",
    date: "Janvier – Mars 2023",
    status: "Terminé",
    devPeriod: "3 mois",
    teamLabel: "4 GD",
    roleLabel: "Game Lead",
    genres: ["Visual novel", "Aventure", "Stratégie", "Science-fiction"],
    labels: { concept: "Concept", work: "Mon travail", gameplay: "Gameplay", story: "Histoire", team: "L'équipe" },
    cta: "Jouer",
    topCta: "Jouer au jeu",
    openLink: "Ouvrir le lien",
    gddLabel: "Game Design Document",
    gddTitle: "Télécharger le GDD",
    gddType: "DOCX",
    concept:
      "CYCLES est un Visual Novel stratégique, se déroulant dans un hyperfutur où le soleil doit être maintenu en vie par les mains de l'homme. Rencontrez des personnages importants, analysez bien ce qu'ils ont à vous dire, faites des choix en prenant en compte l'état actuel de votre société. Gardez un équilibre entre les jauges et menez à bien votre mission.",
    work:
      "En tant que chef de projet, j'ai été en charge de toute son organisation :\n- Gestion du temps, création de rétroplanning.\n- Attribution des tâches.\n- Gestion d'équipe, supervision et mise en place des réunions, brainstormings, playtests, etc.\n- Rédaction des documents (GDD).\nCela m'a permis d'apprendre à avoir une vision holistique du développement d'un jeu.\nEn plus de cela, j'ai surtout travaillé sur :\n- La narration.\n- La création de personnages et l'écriture de dialogues.\n- Le design des mécaniques de choix et de poids des actions.\n- L'équilibrage.\n- La direction artistique et la réalisation de tous les visuels du jeu.",
    gameplay:
      "Faites les bons choix pour arriver à la fin du cycle sans que l'humanité ne soit détruite. Pour cela, maintenez un équilibre entre toutes les jauges qui représentent les pôles de la société.\nLorsque les jauges prennent une couleur foncée (verte ou rouge), elles sont dans un état proche d'une potentielle catastrophe. Si elles dépassent le seuil maximum ou minimum, le cycle se termine immédiatement par l'une des fins en rapport avec la jauge concernée. Il faut alors recommencer un cycle, et ce jusqu'à mener la mission à bien.",
    story:
      "Le soleil menace de s'éteindre, comme à chaque cycle, et l'humanité lance pour la énième fois une mission d'envergure visant à le faire repartir. Vous incarnez une intelligence artificielle, créée pour parcourir tous les scénarios possibles, et trouver le bon pour empêcher la fin du monde. Vos choix seront complexes, et souvent décisifs.\nDans ce jeu, les choix ont d'importantes répercussions et définissent aussi bien notre histoire que notre façon de jouer.",
    team:
      "CYCLES est un jeu vidéo réalisé dans le cadre d'un projet d'étude par une équipe de 4 Game Designer, <b>Jodie HANN</b>, <b>Camille CHERCHOUR</b>, <b>Yvan MOALIC</b> et <b>Alexandre BIANCHINI</b>.",
  },
  en: {
    tagline: "Save humanity",
    date: "January – March 2023",
    status: "Finished",
    devPeriod: "3 months",
    teamLabel: "4 GD",
    roleLabel: "Game Lead",
    genres: ["Visual novel", "Adventure", "Strategy", "Science fiction"],
    labels: { concept: "Concept", work: "My work", gameplay: "Gameplay", story: "Story", team: "The team" },
    cta: "Play",
    topCta: "Play the game",
    openLink: "Open link",
    gddLabel: "Game Design Document",
    gddTitle: "Download the GDD",
    gddType: "DOCX",
    concept:
      "CYCLES is a strategic Visual Novel set in a hyperfuture where the sun must be kept alive by human hands. Meet important characters, carefully analyze what they have to say, and make choices that take your society's current state into account. Keep the gauges balanced and see your mission through.",
    work:
      "As project lead, I was in charge of its entire organization:\n- Time management, creating the reverse schedule.\n- Task assignment.\n- Team management, supervising and setting up meetings, brainstorms, playtests, etc.\n- Writing the documentation (GDD).\nThis taught me to develop a holistic view of game development.\nOn top of that, I mainly worked on:\n- Narrative.\n- Character creation and dialogue writing.\n- Designing the choice and action-weight mechanics.\n- Balancing.\n- Art direction and creating all the game's visuals.",
    gameplay:
      "Make the right choices to reach the end of the cycle without humanity being destroyed. To do so, keep a balance between all the gauges representing society's pillars.\nWhen a gauge turns a darker color (green or red), it is approaching a potential catastrophe. If it crosses the maximum or minimum threshold, the cycle ends immediately with one of the endings tied to that gauge. You then have to start a new cycle, until you finally see the mission through.",
    story:
      "The sun threatens to go out, as it does every cycle, and humanity launches, for the umpteenth time, a large-scale mission to restart it. You play an artificial intelligence, created to explore every possible scenario and find the right one to prevent the end of the world. Your choices will be complex, and often decisive.\nIn this game, choices carry significant consequences and shape both our story and the way we play.",
    team:
      "CYCLES is a video game made as a school project by a team of 4 Game Designers, <b>Jodie HANN</b>, <b>Camille CHERCHOUR</b>, <b>Yvan MOALIC</b>, and <b>Alexandre BIANCHINI</b>.",
  },
};

export default async function CyclesPage() {
  const locale = (await getLocale()) as "fr" | "en";
  const c = COPY[locale];
  const { prev, next } = getAdjacentProjects(SLUG);
  const project = getProjectBySlug(SLUG);

  return (
    <ProjectShell>
      <ProjectHero title="CYCLES" tagline={c.tagline} date={c.date} heroImage={HERO_IMAGE} />

      <ProjectInfoStrip
        status="released"
        statusLabel={c.status}
        devPeriod={c.devPeriod}
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
            <ProjectLinkCard
              href={DEMO}
              title={c.topCta}
              subtitle={c.openLink}
              icon={<GamepadIcon />}
            />
          </div>
        </ProjectSection>

        <ProjectSection label={c.labels.work}>
          <div className="project-section__lead">
            <RichText text={c.work} />
          </div>
          <ProjectDownloadCTA
            href={GDD_URL}
            eyebrow={c.gddLabel}
            title={c.gddTitle}
            actionLabel={c.gddType}
            icon={<DownloadIcon />}
          />
        </ProjectSection>

        <ProjectSection label={c.labels.gameplay}>
          <div className="project-section__lead">
            <RichText text={c.gameplay} />
          </div>
          <ProjectCarousel images={GAMEPLAY_IMAGES} />
        </ProjectSection>

        <ProjectSection label={c.labels.story}>
          <div className="project-split project-split--portrait">
            <div className="project-section__lead">
              <RichText text={c.story} />
            </div>
            <ProjectCarousel className="project-carousel--portrait" images={CHARACTER_IMAGES} />
          </div>
        </ProjectSection>

        <ProjectSection label={c.labels.team}>
          <div className="project-section__lead">
            <RichText text={c.team} />
          </div>
        </ProjectSection>
      </div>

      <ProjectCTA
        ctaLabel={c.cta}
        ctaUrl={DEMO}
        socialLinks={project?.socialLinks}
      />

      <ProjectNav prev={prev} next={next} />
    </ProjectShell>
  );
}
