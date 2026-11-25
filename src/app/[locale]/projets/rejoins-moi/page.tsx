import { getLocale } from "next-intl/server";
import ProjectShell from "@/components/project/ProjectShell";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectInfoStrip from "@/components/project/ProjectInfoStrip";
import ProjectSection from "@/components/project/ProjectSection";
import RichText from "@/components/project/RichText";
import ProjectLinkCard from "@/components/project/ProjectLinkCard";
import ProjectCarousel from "@/components/project/ProjectCarousel";
import ProjectImages from "@/components/project/ProjectImages";
import ProjectCTA from "@/components/project/ProjectCTA";
import ProjectNav from "@/components/project/ProjectNav";
import { getAdjacentProjects, getProjectBySlug } from "@/data/projects";

const SLUG = "rejoins-moi";
const DIR = "/images/RMALFDM";
const HERO_IMAGE = `${DIR}/cover.webp`;
const DEMO = "https://jodie-hann.itch.io/rejoins-moi-avant-la-fin-du-monde";

// Whiteboard photos from the jam brainstorms.
const BRAINSTORM_IMAGES = [
  { src: `${DIR}/brainstorming-1.webp`, alt: "Brainstorming : objectifs et mécaniques" },
  { src: `${DIR}/brainstorming-2.webp`, alt: "Brainstorming : indices et checkpoints" },
  { src: `${DIR}/brainstorming-3.webp`, alt: "Brainstorming : appel et indices dans la ville" },
];

// In-game posters and illustrations.
const POSTER_IMAGES = [
  { src: `${DIR}/affiche-boulangerie.webp`, alt: "Affiche de la boulangerie" },
  { src: `${DIR}/illustration-1.webp`, alt: "Illustration : les deux amoureux face à l'explosion" },
  { src: `${DIR}/affiche-cafe.webp`, alt: "Affiche « Coffee »" },
  { src: `${DIR}/affiche-cigarettes.webp`, alt: "Affiche « Carlboro »" },
  { src: `${DIR}/affiche-soda.webp`, alt: "Affiche « Seven-Up »" },
  { src: `${DIR}/affiche-information.webp`, alt: "Affiche « Information Now »" },
  { src: `${DIR}/illustration-2.webp`, alt: "Illustration : seul face à l'explosion" },
];

// Unreal Engine work-in-progress shots.
const DEV_IMAGES = [
  { src: `${DIR}/dev-laverie.webp`, alt: "Façade de la laverie" },
  { src: `${DIR}/dev-appartement.webp`, alt: "Appartement du joueur" },
  { src: `${DIR}/dev-tv-shop.webp`, alt: "Façade du Tv Shop" },
  { src: `${DIR}/dev-carte.webp`, alt: "Vue du dessus de la ville" },
];

const GAME_OVER_IMAGES = [{ src: `${DIR}/game-over.webp`, alt: "Écran Game Over" }];

const COPY = {
  fr: {
    tagline: "Angoisse & Labyrinthe",
    date: "23 – 26 Janvier 2024",
    status: "Game Jam (3 jours)",
    teamLabel: "3 GD · 3 3D · 3 graphistes",
    roleLabel: "Game Designer / Scénariste / Assistante dev",
    genres: ["Exploration", "Horreur", "Course contre la montre"],
    labels: { concept: "Concept", work: "Mon travail", story: "Histoire", team: "L'équipe" },
    brainstorm: "Extraits de brainstorming",
    devCaption: "Images issues du développement",
    cta: "Jouer",
    topCta: "Jouer au jeu",
    openLink: "Ouvrir le lien",
    concept:
      "<b>Trouvez le bon chemin, cherchez du signal téléphonique pour communiquer avec votre partenaire, et retrouvez-le avant que la centrale nucléaire n'explose.</b>\nCe petit jeu, développé sur Unreal Engine 5 à l'occasion de la Game Jam Brassart 2024, propose un gameplay qui joue sur l'ambiance et le stress. Il a été développé autour du thème « Connexion Lost ».",
    work:
      "Scénariste, Narrative Design, Level Design et System Design.\nDurant cette Game Jam, en tant que game designer la plus expérimentée de l'équipe, j'ai organisé différents brainstormings pour faire naître l'idée du projet et cadrer l'équipe vers une direction claire.\nJ'ai ensuite majoritairement travaillé la narration environnementale et le system design, en lien avec le level design. Ma mission : permettre au joueur de comprendre comment naviguer et s'orienter dans le jeu sans navigation assistée, tout en lui donnant la sensation de se perdre et d'être submergé par l'urgence et la lourdeur de son environnement.\nJ'ai également assisté <b>Noé INGLEBERT</b> dans le développement et l'intégration des assets sur UE5.",
    story:
      "Vous êtes réveillé avant l'aube par des tremblements et de l'agitation. Vous décidez d'allumer votre télévision, et découvrez que votre ville est en alerte suite à un problème dans sa centrale nucléaire. Est-ce la fin du monde ? C'est alors que votre téléphone reçoit quelques derniers messages avant que la connexion ne soit coupée. C'est votre bien-aimé, paniqué.\nVous voulez le revoir une dernière fois.",
    team:
      "Ce jeu a été réalisé en seulement 3 jours par une équipe de 9 élèves : 3 en 3D, 2 en arts graphiques, 1 en design graphique et 3 en game design.",
  },
  en: {
    tagline: "Anxiety & Labyrinth",
    date: "January 23 – 26, 2024",
    status: "Game Jam (3 days)",
    teamLabel: "3 GD · 3 3D · 3 artists",
    roleLabel: "Game Designer / Writer / Dev assistant",
    genres: ["Exploration", "Horror", "Race against time"],
    labels: { concept: "Concept", work: "My work", story: "Story", team: "The team" },
    brainstorm: "Brainstorming excerpts",
    devCaption: "Development screenshots",
    cta: "Play",
    topCta: "Play the game",
    openLink: "Open link",
    concept:
      "<b>Find the right path, search for a phone signal to reach your partner, and find them before the nuclear plant explodes.</b>\nThis small game, made in Unreal Engine 5 for the Brassart 2024 Game Jam, offers gameplay built on atmosphere and stress. It was developed around the theme “Connection Lost”.",
    work:
      "Writer, Narrative Design, Level Design and System Design.\nDuring this game jam, as the most experienced game designer on the team, I ran several brainstorming sessions to spark the project's idea and steer the team toward a clear direction.\nI then mostly worked on environmental storytelling and system design, hand in hand with level design. My goal: let players understand how to navigate and find their way without any guidance, while making them feel lost and overwhelmed by the urgency and heaviness of their surroundings.\nI also assisted <b>Noé INGLEBERT</b> with development and asset integration in UE5.",
    story:
      "You're woken before dawn by tremors and commotion. You turn on the TV and discover that your city is on alert after an incident at its nuclear plant. Is this the end of the world? Then your phone receives a few last messages before the connection drops. It's your beloved, panicking.\nYou want to see them one last time.",
    team:
      "This game was made in just 3 days by a team of 9 students: 3 in 3D, 2 in graphic arts, 1 in graphic design and 3 in game design.",
  },
};

export default async function RejoinsMoiPage() {
  const locale = (await getLocale()) as "fr" | "en";
  const c = COPY[locale];
  const { prev, next } = getAdjacentProjects(SLUG);
  const project = getProjectBySlug(SLUG);

  return (
    <ProjectShell>
      <ProjectHero
        title="REJOINS-MOI AVANT LA FIN DU MONDE"
        tagline={c.tagline}
        date={c.date}
        heroImage={HERO_IMAGE}
      />

      <ProjectInfoStrip
        status="released"
        statusLabel={c.status}
        teamLabel={c.teamLabel}
        roleLabel={c.roleLabel}
        engine="Unreal Engine 5"
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
              kind="game"
            />
          </div>
        </ProjectSection>

        <ProjectSection label={c.labels.work}>
          <div className="project-section__lead">
            <RichText text={c.work} />
          </div>
          <p className="project-subheading">{c.brainstorm}</p>
          <ProjectImages images={BRAINSTORM_IMAGES} className="project-images--photo" style={{ paddingTop: 0 }} />
        </ProjectSection>

        <ProjectSection label={c.labels.story}>
          <div className="project-section__lead">
            <RichText text={c.story} />
          </div>
          <ProjectCarousel className="project-carousel--wide" images={POSTER_IMAGES} />
          <ProjectCarousel className="project-carousel--photo" images={DEV_IMAGES} />
          <p className="project-caption">{c.devCaption}</p>
        </ProjectSection>

        <ProjectSection label={c.labels.team}>
          <div className="project-section__lead">
            <RichText text={c.team} />
          </div>
          <ProjectImages images={GAME_OVER_IMAGES} className="project-images--bare" />
        </ProjectSection>
      </div>

      <ProjectCTA ctaLabel={c.cta} ctaUrl={DEMO} socialLinks={project?.socialLinks} />
      <ProjectNav prev={prev} next={next} />
    </ProjectShell>
  );
}
