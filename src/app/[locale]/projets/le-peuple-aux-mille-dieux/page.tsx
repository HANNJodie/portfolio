import { getLocale } from "next-intl/server";
import ProjectShell from "@/components/project/ProjectShell";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectInfoStrip from "@/components/project/ProjectInfoStrip";
import ProjectSection from "@/components/project/ProjectSection";
import RichText from "@/components/project/RichText";
import ProjectImages from "@/components/project/ProjectImages";
import ProjectCarousel from "@/components/project/ProjectCarousel";
import ProjectNav from "@/components/project/ProjectNav";
import { getAdjacentProjects } from "@/data/projects";

const SLUG = "le-peuple-aux-mille-dieux";
const DIR = "/images/LE PEUPLE AUX MILLE DIEUX";
const HERO_IMAGE = `${DIR}/cover.webp`;

// "Offrande" cards.
const CONCEPT_IMAGES = [
  { src: `${DIR}/carte-offrande-vase-casse.webp`, alt: "Carte « Vase cassé »" },
  { src: `${DIR}/carte-offrande-nourriture-lune.webp`, alt: "Carte « Offrande » Nourriture (Lune)" },
  { src: `${DIR}/carte-offrande-priere-soleil.webp`, alt: "Carte « Offrande » Prière (Soleil)" },
];

// The four "Dieu" cards, two per sheet.
const GOD_CARD_IMAGES = [
  { src: `${DIR}/cartes-dieux-1.webp`, alt: "Cartes « Dieu » : Arina et Lewani" },
  { src: `${DIR}/cartes-dieux-2.webp`, alt: "Cartes « Dieu » : Tarund et Wurunkatte" },
];

// Rule booklet.
const GAMEPLAY_IMAGES = [
  { src: `${DIR}/IMG_0152.webp`, alt: "Livret de règles : sommaire et composition de la boîte" },
  { src: `${DIR}/IMG_0156.webp`, alt: "Livret de règles : mise en place et règles du jeu" },
  { src: `${DIR}/IMG_0158.webp`, alt: "Livret de règles : fin du jeu et pouvoirs des dieux" },
  { src: `${DIR}/IMG_0163-light.webp`, alt: "Livret de règles : quatrième de couverture" },
];

// Playtest photos.
const GALLERY_IMAGES = [
  { src: `${DIR}/IMG_0138.webp`, alt: "Cartes « Dieu » sur la table" },
  { src: `${DIR}/IMG_0294.webp`, alt: "Trois cartes « Vase cassé »" },
  { src: `${DIR}/IMG_0214.webp`, alt: "Main de cartes « Offrande »" },
  { src: `${DIR}/IMG_0210.webp`, alt: "Partie en cours" },
  { src: `${DIR}/IMG_0261.webp`, alt: "Cartes « Sanctuaire » sur la table" },
  { src: `${DIR}/IMG_0236.webp`, alt: "Mélange de la pioche" },
  { src: `${DIR}/IMG_0284.webp`, alt: "Échange de cartes entre joueurs" },
  { src: `${DIR}/IMG_0193.webp`, alt: "Main de cartes" },
];

const COPY = {
  fr: {
    tagline: "Cartes et Mythologie",
    date: "Novembre – Décembre 2021",
    status: "Terminé",
    devPeriod: "1 mois",
    teamLabel: "4 GD, 2 Arts graphiques, 1 illustratrice",
    roleLabel: "Directrice artistique, UI/UX Designer",
    supportLabel: "Support",
    support: "Jeu de plateau physique",
    genres: ["Jeu de société", "Cartes", "Stratégie", "Mémoire", "Multijoueur", "Historique"],
    labels: {
      concept: "Concept",
      work: "Mon travail",
      gameplay: "Gameplay",
      team: "L'équipe",
      gallery: "Galerie photo",
    },
    concept:
      "« Le peuple aux mille dieux » est un jeu de plateau sur le thème de la civilisation hittite, où le but de chaque joueur est de constituer la meilleure offrande de cartes possible, pour éviter que son dieu ne parte chez l'ennemi.\n<i>« Jouez en famille ou entre amis, mettez-vous des bâtons dans les roues, et remportez la partie dans ce jeu rapide et convivial. »</i>",
    work:
      "Sur ce projet, j'ai été en charge de la direction artistique, pour laquelle j'ai donc dû :\n- Réaliser des documents de charte graphique et d'intentions pour définir la direction artistique du jeu (palettes de couleurs, style graphique, inspirations et références).\n- Réaliser un document de références, de recherches et d'intentions pour respecter le contexte historique du thème de la civilisation hittite.\n- Faire le lien avec l'équipe graphique : effectuer les demandes, les retours et le contrôle de leur travail, des assets et des livrables demandés.\nEn lien avec ce rôle, j'ai travaillé et défini « l'interface » du jeu de façon à rendre l'expérience utilisateur la plus agréable, fluide et compréhensible possible (UI/UX), une partie vraiment majeure d'un jeu de plateau. Plus précisément, cela inclut le système de disposition modulable des cartes et du plateau, ainsi que les visuels rattachés pour l'indiquer intuitivement.\nJ'ai également été en charge de la production physique de la maquette, ce qui inclut de trouver des fournisseurs et de gérer l'impression des cartes, de la boîte et du livret de règles, ainsi que leur assemblage.\nPour finir, j'ai participé aux playtests et à leur organisation, tout au long du développement et du peaufinage du concept. Et évidemment à la création des règles, du lore, ainsi qu'aux recherches historiques.",
    gameplayNote:
      "* Lorsqu'un joueur échange une carte avec un autre, ce dernier ne peut pas lui rééchanger de carte pendant son prochain tour.",
    team:
      "Le projet a été réalisé par une équipe de 4 Game Designers en première année d'études : <b>Jodie HANN</b>, <b>Thomas COURTY</b>, <b>Enzo LOPEZ</b> et <b>Luca PIRINOLI</b> ; ainsi que 2 étudiants en arts graphiques : <b>Léane LOUBERE</b> et <b>Mathilde HOCHART</b> ; avec l'aide et la participation d'<b>Ilona HANN</b> en tant qu'illustratrice.",
  },
  en: {
    tagline: "Cards and Mythology",
    date: "November – December 2021",
    status: "Finished",
    devPeriod: "1 month",
    teamLabel: "4 GD, 2 graphic artists, 1 illustrator",
    roleLabel: "Art Director, UI/UX Designer",
    supportLabel: "Platform",
    support: "Physical board game",
    genres: ["Board game", "Cards", "Strategy", "Memory", "Multiplayer", "Historical"],
    labels: {
      concept: "Concept",
      work: "My work",
      gameplay: "Gameplay",
      team: "The team",
      gallery: "Photo gallery",
    },
    concept:
      "“Le peuple aux mille dieux” (The People of a Thousand Gods) is a board game themed around the Hittite civilization, in which each player aims to put together the best possible card offering, to keep their god from leaving for the enemy.\n<i>“Play with family or friends, put a spoke in each other's wheels, and win the game in this fast and friendly title.”</i>",
    work:
      "On this project, I was in charge of the art direction, for which I had to:\n- Create style guide and intent documents to define the game's art direction (color palettes, graphic style, inspirations and references).\n- Create a references, research and intent document to stay true to the historical context of the Hittite civilization theme.\n- Act as the link with the art team: making requests, giving feedback and reviewing their work, assets and requested deliverables.\nAlongside this role, I worked on and defined the game's “interface”, to make the user experience as pleasant, smooth and understandable as possible (UI/UX), a truly major part of a board game. More specifically, this includes the modular card and board layout system, along with the visuals that make it intuitive.\nI was also in charge of physically producing the prototype, which meant finding suppliers and managing the printing of the cards, the box and the rulebook, as well as assembling them.\nFinally, I took part in the playtests and their organization throughout the development and refinement of the concept. And of course in writing the rules and the lore, and in the historical research.",
    gameplayNote:
      "* When a player trades a card with another player, the latter can't trade a card back with them during their next turn.",
    team:
      "The project was made by a team of 4 first-year Game Design students: <b>Jodie HANN</b>, <b>Thomas COURTY</b>, <b>Enzo LOPEZ</b> and <b>Luca PIRINOLI</b>; along with 2 graphic arts students: <b>Léane LOUBERE</b> and <b>Mathilde HOCHART</b>; with the help and participation of <b>Ilona HANN</b> as illustrator.",
  },
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

      <ProjectInfoStrip
        status="released"
        statusLabel={c.status}
        devPeriod={c.devPeriod}
        teamLabel={c.teamLabel}
        roleLabel={c.roleLabel}
        engine={c.support}
        engineLabel={c.supportLabel}
        genres={c.genres}
      />

      {/* No playable link for this project: bottom padding keeps the nav from sticking to the gallery. */}
      <div className="project-sections" style={{ paddingBottom: "4rem" }}>
        <ProjectSection label={c.labels.concept}>
          <div className="project-section__lead">
            <RichText text={c.concept} />
          </div>
          <ProjectImages className="project-images--card project-images--three-cols" images={CONCEPT_IMAGES} />
        </ProjectSection>

        <ProjectSection label={c.labels.work}>
          <div className="project-section__lead">
            <RichText text={c.work} />
          </div>
          <ProjectImages
            className="project-images--sheet project-images--two-cols"
            images={GOD_CARD_IMAGES}
          />
        </ProjectSection>

        <ProjectSection label={c.labels.gameplay}>
          <ProjectImages
            className="project-images--photo project-images--two-cols"
            images={GAMEPLAY_IMAGES}
            style={{ paddingTop: 0 }}
          />
          <p className="project-caption" style={{ marginTop: "1rem" }}>{c.gameplayNote}</p>
        </ProjectSection>

        <ProjectSection label={c.labels.team}>
          <div className="project-section__lead">
            <RichText text={c.team} />
          </div>
        </ProjectSection>

        <ProjectSection label={c.labels.gallery}>
          <ProjectCarousel className="project-carousel--photo" images={GALLERY_IMAGES} />
        </ProjectSection>
      </div>

      <ProjectNav prev={prev} next={next} />
    </ProjectShell>
  );
}
