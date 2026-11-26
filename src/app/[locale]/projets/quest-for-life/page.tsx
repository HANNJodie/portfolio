import { projectMetadata } from "@/i18n/metadata";
import { getLocale } from "next-intl/server";
import ProjectShell from "@/components/project/ProjectShell";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectInfoStrip from "@/components/project/ProjectInfoStrip";
import ProjectTabs from "@/components/project/ProjectTabs";
import RichText from "@/components/project/RichText";
import ProjectLinkCard from "@/components/project/ProjectLinkCard";
import ProjectImages from "@/components/project/ProjectImages";
import ProjectCarousel from "@/components/project/ProjectCarousel";
import ProjectNav from "@/components/project/ProjectNav";
import { getAdjacentProjects } from "@/data/projects";

const SLUG = "quest-for-life";

export const generateMetadata = ({ params }: { params: Promise<{ locale: string }> }) =>
  projectMetadata(SLUG, params);

const DIR = "/images/QUEST FOR LIFE";
const HERO_IMAGE = `${DIR}/cover.webp`;
const DEMO = "https://jodie-hann.itch.io/quest-for-life";

// In-game screenshots.
const SCREEN_IMAGES = [
  { src: `${DIR}/screen-labyrinthe.webp`, alt: "Le labyrinthe éclairé aux torches" },
  { src: `${DIR}/screen-mort.webp`, alt: "Écran « Vous êtes mort »" },
  { src: `${DIR}/screen-salle-1.webp`, alt: "La salle de départ et les morceaux de carte" },
  { src: `${DIR}/screen-salle-2.webp`, alt: "Les tables de la salle de départ" },
];

// Concept art of the starting room.
const CONCEPT_IMAGES = [
  { src: `${DIR}/concept-salle-1.webp`, alt: "Concept art de la salle de départ" },
  { src: `${DIR}/concept-salle-2.webp`, alt: "Concept art de la salle de départ, autre angle" },
];

const BOX_IMAGES = [
  { src: `${DIR}/jaquette-face.webp`, alt: "Jaquette de Quest for Life, face avant" },
  { src: `${DIR}/jaquette-dos.webp`, alt: "Jaquette de Quest for Life, dos" },
];

const COPY = {
  fr: {
    tagline: "Angoisse & Labyrinthe",
    date: "Avril 2023",
    status: "Game Jam (3 jours)",
    teamLabel: "1 GD · 4 3D · 5 graphistes",
    roleLabel: "Game Designer / Dev",
    genres: ["Aventure", "Énigmes", "Speedrun", "Horreur"],
    labels: { concept: "Concept", work: "Mon travail", story: "Histoire", team: "L'équipe" },
    topCta: "Jouer au jeu",
    openLink: "Ouvrir le lien",
    concept:
      "Mélangeant énigmes, ambiance horrifique et course contre la montre, Quest For Life vous fait vivre une expérience stressante et immersive dans laquelle vous devrez trouver une échappatoire à la planque de votre kidnappeur. Cherchez et comprenez les indices jusqu'à pouvoir parcourir le labyrinthe sans qu'il ne vous rattrape.\nLe jeu a été développé à l'occasion de la Game Jam Brassart 2023, pour PC, sur Unreal Engine 4. Il a remporté la catégorie Jeux vidéo.",
    workIntro:
      "Seule membre du groupe à avoir des compétences en développement, et seule game designer, j'ai dû créer un concept très simple à réaliser, qui puisse mettre en avant les compétences des autres membres : en l'occurrence, exploiter au maximum les graphismes grâce à un concept basé sur l'ambiance.\nJ'ai donc :",
    work:
      "- Organisé le projet et le travail d'équipe sur les 3 jours de Game Jam.\n- Conçu les règles et les mécaniques.\n- Pensé la narration et la façon de la transmettre par les décors et l'ambiance.\n- Développé l'intégralité du mini-jeu sur Unreal Engine 4.\n- Intégré les assets et construit une partie du level design.\n- Playtesté et fait tester le jeu pour l'équilibrer un minimum.",
    workOutro:
      "Le tout dans le but d'obtenir un court projet jouable à la fin de l'évènement pour le présenter au jury. Le projet a remporté la Game Jam Brassart 2023.",
    story:
      "Vous ouvrez les yeux dans une salle mystérieuse, sans savoir ce qui vous est arrivé. Très vite, vous allez découvrir que vous êtes la proie d'un dangereux psychopathe, et devrez trouver un moyen de lui échapper. Courez le plus rapidement possible à travers le labyrinthe, car le temps est compté.",
    team:
      "Ce jeu a été réalisé en seulement 3 jours par une équipe de 10 élèves : 4 en 3D, 4 en arts graphiques, 1 en design graphique et 1 en game design.",
  },
  en: {
    tagline: "Dread & Labyrinth",
    date: "April 2023",
    status: "Game Jam (3 days)",
    teamLabel: "1 GD · 4 3D · 5 artists",
    roleLabel: "Game Designer / Dev",
    genres: ["Adventure", "Puzzle", "Speedrun", "Horror"],
    labels: { concept: "Concept", work: "My work", story: "Story", team: "The team" },
    topCta: "Play the game",
    openLink: "Open link",
    concept:
      "Blending puzzles, a horror atmosphere and a race against time, Quest For Life puts you through a stressful, immersive experience in which you must find a way out of your kidnapper's hideout. Search for clues and figure them out until you can make it through the maze before he catches you.\nThe game was made for the Brassart 2023 Game Jam, for PC, in Unreal Engine 4. It won the Video Games category.",
    workIntro:
      "As the only member of the group with development skills, and the only game designer, I had to come up with a concept that was very simple to build and could showcase the other members' skills: here, making the most of the art through a concept built on atmosphere.\nSo I:",
    work:
      "- Organized the project and the teamwork over the 3 days of the jam.\n- Designed the rules and mechanics.\n- Shaped the narrative and how to convey it through the sets and atmosphere.\n- Developed the entire mini-game in Unreal Engine 4.\n- Integrated the assets and built part of the level design.\n- Playtested the game and had it tested to balance it as best I could.",
    workOutro:
      "All with the goal of delivering a short, playable project by the end of the event to present to the jury. The project won the Brassart 2023 Game Jam.",
    story:
      "You open your eyes in a mysterious room, with no idea what happened to you. You soon discover that you are the prey of a dangerous psychopath, and must find a way to escape him. Run through the maze as fast as you can: time is running out.",
    team:
      "This game was made in just 3 days by a team of 10 students: 4 in 3D, 4 in graphic arts, 1 in graphic design and 1 in game design.",
  },
};

export default async function QuestForLifePage() {
  const locale = (await getLocale()) as "fr" | "en";
  const c = COPY[locale];
  const { prev, next } = getAdjacentProjects(SLUG);

  return (
    <ProjectShell>
      <ProjectHero title="QUEST FOR LIFE" tagline={c.tagline} date={c.date} heroImage={HERO_IMAGE} compact />

      <ProjectInfoStrip
        status="released"
        statusLabel={c.status}
        teamLabel={c.teamLabel}
        roleLabel={c.roleLabel}
        engine="Unreal Engine 4"
        genres={c.genres}
      />

      <ProjectTabs
        tabs={[
          {
            label: c.labels.concept,
            content: (
              <div className="project-section__concept">
                <div className="project-section__lead">
                  <RichText text={c.concept} />
                </div>
                <ProjectLinkCard href={DEMO} title={c.topCta} subtitle={c.openLink} kind="game" />
              </div>
            ),
          },
          {
            label: c.labels.work,
            content: (
              <>
                <div className="project-section__lead">
                  <RichText text={c.workIntro} />
                </div>
                <div className="project-split project-split--media">
                  <div className="project-section__lead">
                    <RichText text={c.work} />
                  </div>
                  <ProjectCarousel className="project-carousel--square" images={SCREEN_IMAGES} />
                </div>
                <div className="project-section__lead project-section__outro">
                  <RichText text={c.workOutro} />
                </div>
              </>
            ),
          },
          {
            label: c.labels.story,
            content: (
              <>
                <div className="project-section__lead">
                  <RichText text={c.story} />
                </div>
                <ProjectImages images={CONCEPT_IMAGES} className="project-images--photo project-images--two-cols" />
              </>
            ),
          },
          {
            label: c.labels.team,
            content: (
              <>
                <div className="project-section__lead">
                  <RichText text={c.team} />
                </div>
                <ProjectImages images={BOX_IMAGES} className="project-images--box project-images--two-cols" />
              </>
            ),
          },
        ]}
      />

      <ProjectNav prev={prev} next={next} />
    </ProjectShell>
  );
}
