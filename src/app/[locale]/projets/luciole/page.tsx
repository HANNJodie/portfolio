import { getLocale } from "next-intl/server";
import ProjectShell from "@/components/project/ProjectShell";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectBento from "@/components/project/ProjectBento";
import ProjectSection from "@/components/project/ProjectSection";
import RichText from "@/components/project/RichText";
import ProjectLinkCard from "@/components/project/ProjectLinkCard";
import ProjectMasonry from "@/components/project/ProjectMasonry";
import ProjectCarousel from "@/components/project/ProjectCarousel";
import ProjectVideo from "@/components/project/ProjectVideo";
import ProjectCTA from "@/components/project/ProjectCTA";
import ProjectNav from "@/components/project/ProjectNav";
import { GamepadIcon } from "@/components/ui/Icons";
import { getAdjacentProjects, getProjectBySlug } from "@/data/projects";

const SLUG = "luciole";
const HERO_IMAGE = "/images/LUCIOLE/cover.webp";
const DEMO = "https://jodie-hann.itch.io/luciole";
const MUSIC_VIDEO_ID = "gqvsZ6Q8eBs"; // « Lifetime » — The OWLS are not (Sophie Laporte)

// Placeholder art blocks — swap the URLs for the real assets when they are ready.
// Four square concept thumbnails; the square frame crops whatever ratio is dropped in.
// Ordered so the two-column masonry balances: a tall portrait + a short wide
// shot fill the left column, two near-square shots the right.
const CONCEPT_IMAGES = [
  { src: "/images/LUCIOLE/luciole-concept.jpg", alt: "Image conceptuelle 1", width: 1200, height: 1928 },
  { src: "/images/LUCIOLE/squelettons.jpg", alt: "Image conceptuelle 2", width: 2000, height: 1128 },
  { src: "/images/LUCIOLE/stairs.png", alt: "Image conceptuelle 3", width: 2642, height: 2844 },
  { src: "/images/LUCIOLE/grabbed.jpg", alt: "Image conceptuelle 4", width: 889, height: 928 },
];

// Six wide slides for the story carousel.
const STORY_IMAGES = [
  { src: "/images/LUCIOLE/hands.png", alt: "Histoire 1" },
  { src: "/images/LUCIOLE/eyes.png", alt: "Histoire 2" },
  { src: "/images/LUCIOLE/smile.png", alt: "Histoire 3" },
  { src: "/images/LUCIOLE/watched.png", alt: "Histoire 4" },
  { src: "/images/LUCIOLE/statue.png", alt: "Histoire 5" },
  { src: "/images/LUCIOLE/child.png", alt: "Histoire 6" },
];

const COPY = {
  fr: {
    tagline: "Retrouve ta lumière",
    date: "2023 – ? (En pause)",
    status: "En pause (Prototype)",
    teamLabel: "Jodie Hann (Projet personnel)",
    genres: ["Plateformer 2D", "Aventure", "Puzzle", "Narratif", "Walking simulator", "Atmosphérique"],
    labels: { concept: "Concept", work: "Mon travail", gameplay: "Gameplay", story: "Histoire", music: "Musique" },
    cta: "Tester le prototype",
    openLink: "Ouvrir le lien",
    conceptImages: "Images conceptuelles",
    musicCaption: "« Lifetime » — The OWLS are not",
    concept:
      "LUCIOLE est un projet de jeu de plateforme en 2D, entre narration, ambiance et puzzle. Ce petit jeu est une métaphore du temps qui passe et du passage à l'âge adulte. Avancer à travers les niveaux pour retrouver des parties de votre lumière perdue et grandir. Utiliser votre lumière pour vous protéger des menaces, révéler des éléments du décor et trouver votre chemin dans ces environnements obscurs.",
    work:
      "Puisqu'il est développé en solo, j'ai réalisé sur le projet :\n- La création de la structure du jeu, de la narration et comment la transmettre de façon environnementale dans un jeu muet.\n- Le design des mécaniques.\n- Le développement du prototype et son level design.\n- Le design des personnages et des environnements.\n- La création à la main de tous les assets 2D et animations.\n- Le design sonore ainsi qu'un travail important sur tous les éléments qui servent l'atmosphère.",
    gameplay:
      "Inspiré des livres à « lampes magiques », LUCIOLE propose des mécaniques de plateformes simples, basées sur l'ombre et la lumière. Surtout centré sur l'ambiance et les émotions, le jeu oscille entre le mignon enfantin et l'horreur.",
    story:
      "Luciole est notre petite lumière intérieure. Les cris, les pleurs, la douleur, la haine, la peur… toutes les émotions négatives et les épreuves difficiles de la vie l'ont affaiblie, jusqu'à ce qu'on se sente un peu perdu, voire complètement perdu. Mais cette petite lumière n'est pas totalement éteinte, et elle se bat en nous, quelque part, en même temps que nous, pour retrouver sa lumière, pour trouver son chemin, pour éclairer à nouveau la voie. Alors que notre âme meurtrie d'enfant se cache quelque part en nous, déboussolée, effrayée, il est temps de la retrouver et de l'aider à faire ce petit pas en avant qui vous fait si peur.\nLe monde dans notre esprit est parfois sombre, mais le soleil se lèvera à nouveau demain matin.",
    music:
      "Le prototype du jeu utilise le titre <b>Lifetime</b> par <b>The OWLS are not</b>, avec l'aimable permission de la compositrice <b>Sophie Laporte</b>. Dans la version finale du jeu, une version originale de la musique sera présente.",
  },
  en: {
    tagline: "Find your light again",
    date: "2023 – ? (On hiatus)",
    status: "On hiatus (Prototype)",
    teamLabel: "Jodie Hann (Personal project)",
    genres: ["2D Platformer", "Adventure", "Puzzle", "Narrative", "Walking simulator", "Atmospheric"],
    labels: { concept: "Concept", work: "My work", gameplay: "Gameplay", story: "Story", music: "Music" },
    cta: "Test the prototype",
    openLink: "Open link",
    conceptImages: "Concept images",
    musicCaption: "“Lifetime” — The OWLS are not",
    concept:
      "LUCIOLE is a 2D platformer project blending narrative, atmosphere and puzzle. This little game is a metaphor for the passing of time and the transition to adulthood. Move through the levels to recover parts of your lost light and grow. Use your light to protect yourself from threats, reveal elements of the scenery, and find your way through these dark environments.",
    work:
      "Since it is developed solo, on this project I handled:\n- Creating the game's structure, the narrative, and how to convey it environmentally in a silent game.\n- Designing the mechanics.\n- Developing the prototype and its level design.\n- Designing the characters and environments.\n- Hand-crafting all the 2D assets and animations.\n- The sound design, along with significant work on every element that serves the atmosphere.",
    gameplay:
      "Inspired by “magic lamp” books, LUCIOLE offers simple platforming mechanics based on shadow and light. Focused above all on atmosphere and emotion, the game oscillates between childlike cuteness and horror.",
    story:
      "Luciole is our little inner light. Screams, tears, pain, hatred, fear… all the negative emotions and hard trials of life have weakened it, until we feel a little lost, or even completely lost. But this little light is not entirely extinguished, and it fights within us, somewhere, alongside us, to find its light again, to find its way, to light the path once more. While our bruised child's soul hides somewhere within us, disoriented and afraid, it is time to find it again and help it take that little step forward that scares you so much.\nThe world within our mind is sometimes dark, but the sun will rise again tomorrow morning.",
    music:
      "The game's prototype uses the track <b>Lifetime</b> by <b>The OWLS are not</b>, with the kind permission of composer <b>Sophie Laporte</b>. In the final version of the game, an original version of the music will be present.",
  },
};

export default async function LuciolePage() {
  const locale = (await getLocale()) as "fr" | "en";
  const c = COPY[locale];
  const { prev, next } = getAdjacentProjects(SLUG);
  const project = getProjectBySlug(SLUG);

  return (
    <ProjectShell>
      <ProjectHero title="LUCIOLE" tagline={c.tagline} date={c.date} heroImage={HERO_IMAGE} />

      <ProjectBento
        status="hiatus"
        statusLabel={c.status}
        teamLabel={c.teamLabel}
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
              title={c.cta}
              subtitle={c.openLink}
              icon={<GamepadIcon />}
            />
          </div>
        </ProjectSection>

        <ProjectSection label={c.labels.work}>
          <div className="project-section__lead">
            <RichText text={c.work} />
          </div>
        </ProjectSection>

        <ProjectSection label={c.labels.gameplay}>
          <div className="project-section__lead">
            <RichText text={c.gameplay} />
          </div>
          <div className="concept-images">
            <ProjectMasonry images={CONCEPT_IMAGES} />
            <p className="project-images__credit">{c.conceptImages}</p>
          </div>
        </ProjectSection>

        <ProjectSection label={c.labels.story}>
          <div className="project-section__lead">
            <RichText text={c.story} />
          </div>
          <ProjectCarousel images={STORY_IMAGES} />
        </ProjectSection>

        <ProjectSection label={c.labels.music}>
          <div className="project-section__lead">
            <RichText text={c.music} />
          </div>
          <ProjectVideo videoId={MUSIC_VIDEO_ID} title="Lifetime — The OWLS are not" />
          <p className="project-caption">{c.musicCaption}</p>
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
