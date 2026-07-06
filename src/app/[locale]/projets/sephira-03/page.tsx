import { getLocale } from "next-intl/server";
import ProjectShell from "@/components/project/ProjectShell";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectBento from "@/components/project/ProjectBento";
import ProjectSection from "@/components/project/ProjectSection";
import RichText from "@/components/project/RichText";
import ProjectLinkCard from "@/components/project/ProjectLinkCard";
import ProjectVideo from "@/components/project/ProjectVideo";
import ProjectImages from "@/components/project/ProjectImages";
import ProjectMasonry from "@/components/project/ProjectMasonry";
import ProjectCarousel from "@/components/project/ProjectCarousel";
import ProjectCTA from "@/components/project/ProjectCTA";
import ProjectNav from "@/components/project/ProjectNav";
import { GamepadIcon } from "@/components/ui/Icons";
import { getAdjacentProjects, getProjectBySlug } from "@/data/projects";

const SLUG = "sephira-03";
const HERO_IMAGE = "/images/SEPHIRA/city_baniere_1.webp";
const DEMO = "https://myusernameisskave.itch.io/sephira-03";
const VIDEO_ID = "7flM6P4W3zo";
const STORY_VIDEO_ID = "QKqOhYhjD9w";

// Placeholder art blocks — swap the URLs for the real assets when they are ready.
const GDD_IMAGES = [
  { src: "https://placehold.co/600x800/1a1a2e/e0e0f0?text=GDD+1", alt: "Extrait du GDD 1" },
  { src: "https://placehold.co/600x800/16213e/e0e0f0?text=GDD+2", alt: "Extrait du GDD 2" },
  { src: "https://placehold.co/600x800/0f3460/e0e0f0?text=GDD+3", alt: "Extrait du GDD 3" },
  { src: "https://placehold.co/600x800/533483/e0e0f0?text=GDD+4", alt: "Extrait du GDD 4" },
];

const GAMEPLAY_ASIDE = {
  src: "https://placehold.co/600x800/1a1a2e/e0e0f0?text=Infiltration",
  alt: "Système d'infiltration",
};

const GAMEPLAY_WIDE = [
  { src: "/images/SEPHIRA/nouvelle-recrue.png", alt: "Nouvelle recrue" },
  { src: "/images/SEPHIRA/final-concept-drone.png", alt: "Concept final drone" },
];

// Mixed landscape / portrait shots — ordered to alternate orientations so the
// masonry columns balance out. Intrinsic sizes keep each image's true ratio.
const MOSAIC_IMAGES = [
  { src: "/images/SEPHIRA/computer.png", alt: "Poste de surveillance", width: 1613, height: 902 },
  { src: "/images/SEPHIRA/keter-3d.png", alt: "Kether — rendu 3D", width: 964, height: 1080 },
  { src: "/images/SEPHIRA/spawnpoint.png", alt: "Point de départ", width: 1206, height: 897 },
  { src: "/images/SEPHIRA/binah-render.png", alt: "Binah — rendu", width: 1920, height: 1080 },
  { src: "/images/SEPHIRA/keter-concept.png", alt: "Kether — concept art", width: 584, height: 817 },
  { src: "/images/SEPHIRA/binah-render-crop.png", alt: "Binah — gros plan", width: 409, height: 357 },
];

const TEAM_IMAGES = [
  { src: "/images/SEPHIRA/freedom.jpg", alt: "SEPHIRA-03 1" },
  { src: "/images/SEPHIRA/hallway1.png", alt: "SEPHIRA-03 2" },
  { src: "/images/SEPHIRA/buildings.png", alt: "SEPHIRA-03 3" },
  { src: "/images/SEPHIRA/cameras.jpg", alt: "SEPHIRA-03 4" },
  { src: "/images/SEPHIRA/city1.jpg", alt: "SEPHIRA-03 5" },
  { src: "/images/SEPHIRA/city2.png", alt: "SEPHIRA-03 6" },
];

const COPY = {
  fr: {
    tagline: "Aventure, Infiltration, Robots et Yakuzas",
    date: "Avril 2023 – Juillet 2024",
    status: "Fini (Démo)",
    teamLabel: "4 Game Designer · 3 3D Artists · 3 OST Maker",
    roleLabel: "Game Lead",
    genres: ["Action", "Aventure", "Infiltration", "Point & clic", "Rétro cyberpunk"],
    labels: { concept: "Concept", work: "Mon travail", gameplay: "Gameplay", story: "Histoire", team: "L'équipe" },
    cta: "Jouer à la démo",
    openLink: "Ouvrir le lien",
    gddExtracts: "Extraits du GDD",
    gddCaption: "Extrait du GDD",
    playDemo: "Pour jouer à la démo :",
    concept:
      "SEPHIRA-03 est un point and clic d'aventure et d'infiltration en temps réel, mêlant phases d'énigmes et d'action, tout en suivant une narration prenante dans une ambiance cyberpunk rétrofuturiste des années 80 à 2000. Prenez contrôle des caméras de sécurité pour accomplir votre objectif à l'aide du robot Binah, qui développera au cours de l'histoire une conscience humaine, et tissera des liens avec le personnage du joueur.",
    work:
      "En tant que cheffe de projet, j'ai été en charge de toute <b>l'organisation & gestion du projet</b> ainsi que de l'équipe. J'ai supervisé chacun des domaines du jeu pour que les intentions soient respectées. J'ai su tenir le respect de mes camarades, et les garder engagés dans leur travail, ainsi que prendre les décisions parfois difficiles nécessaire pour que le projet puisse arriver à complétion. Garante de la cohérence, je suis intervenue dans <b>l'écriture et la Narration</b>, le <b>Level Design</b>, le <b>System Design</b>, la <b>Direction Artistique</b>, et plus.\nCela inclue :\n- Organisation des réunions, mise en place de rétroplannings, d'un Notion partagé pour tenir la planification de chaque étape du projet sur 1 année, et de système de tâches pour l'équipe.\n- Création de la trame principale du projet, supervision et coécriture du scenario.\n- Co-design des différentes mécaniques et de leur fonctionnement.\n- Level design et habillage complet du niveau 3 « Echafaudage », 0 « Intro - Chambre » et Menu ; et partiel des niveaux 2 « Ville » et 5 « Kether ». Développement partiel des mécaniques du niveau « Kether ».\n- Rédaction d'un GDD détaillé séparé en plusieurs documents dédiés à un aspect du jeu.\n- Implémentation des assets (3D, Sons et Musiques, Textures, etc…).\n- Supervision et mise en relation de l'équipe GD avec les pôles 3D et OST.\n- Création de chartes graphiques & documents de descriptions précis sur le design voulu des personnages, des assets d'environnement, des textures, etc. De même pour les musiques originales.\n- Gestion et développement des shaders.\n- Design de l'UI & de son fonctionnement, et création des assets.\n- Grande partie du Sound Design.\nCe projet est l'un des plus difficiles et enrichissants sur lequel j'ai pu travailler, et il m'a vraiment appris énormément sur le processus de préproduction et production d'un jeu. Entre le travail en équipe interdisciplinaire, les nombreux aléas qui ont pu survenir tout du long et que nous avons su braver, et la nécessité de rebondir rapidement, j'en suis sortie grandie.",
    gameplay:
      "Parcourez un mégabuilding en vous déplaçant à travers le système de surveillance que vous avez piraté. Aidez Binah à monter en haut du bâtiment, et soyez témoin de son évolution vers la conscience humaine.\nLe jeu se concentre sur son pilier : l'infiltration. Mettant de côté les combats au profit d'un système poussé de détection, prenant en compte la lumière, la distance, la partie visible du corps, ou encore le son.",
    story:
      "Vous avez fait l'acquisition d'une clef USB de piratage, mais elle ne vous a pas donné accès à ce que vous cherchiez. À la place, vous voilà dans le système de sécurité du clan yakuza GINKGO, et ils ne vont pas laisser passer ça.\nPire encore, vous avez été témoin de leurs étranges expériences sur des robots, et maintenant il ne vous reste qu'à utiliser l'un d'entre eux pour effacer votre trace et garantir votre sécurité. Mais quel comportement étrange, cette Binah possède une IA tellement développée, et son histoire est plus qu'intrigante. Dans quoi vous vous êtes encore fourré ?",
    team:
      "SEPHIRA-03 est un jeu vidéo réalisé dans le cadre d'un projet de fin d'étude par une équipe de 4 Game Designer, <b>Jodie HANN</b>, <b>Enzo POLI</b>, <b>Alexis LION</b> et <b>Loïck MAHEO</b>. Ainsi que 3 artistes 3D, <b>Mattis AUDEBOURG</b>, <b>Léa COQUARD</b> et <b>Christelle CUTAYAR</b>.\nLes bandes originales sont composées par <b>Ilona HANN</b> et <b>Sophie LAPORTE</b>. Avec des musiques exclusives composées et fournies par <b>Jean-Phillipe HANN</b>.",
  },
  en: {
    tagline: "Adventure, Infiltration, Robots and Yakuzas",
    date: "April 2023 – July 2024",
    status: "Finished (Demo)",
    teamLabel: "4 GD · 3 3D · 3 OST",
    roleLabel: "Game Lead",
    genres: ["Action", "Adventure", "Stealth", "Point & click", "Retro cyberpunk"],
    labels: { concept: "Concept", work: "My work", gameplay: "Gameplay", story: "Story", team: "The team" },
    cta: "Play the demo",
    openLink: "Open link",
    gddExtracts: "GDD extracts",
    gddCaption: "GDD excerpt",
    playDemo: "To play the demo:",
    concept:
      "SEPHIRA-03 is a real-time adventure and stealth point-and-click, blending puzzle and action phases while following a gripping narrative in a retrofuturistic cyberpunk atmosphere spanning the 80s to the 2000s. Take control of the security cameras to accomplish your objective with the help of the robot Binah, who will develop a human consciousness over the course of the story and forge bonds with the player's character.",
    work:
      "As project lead, I was in charge of all <b>project organization & management</b> as well as the team. I supervised each area of the game to make sure the intentions were respected. I managed to keep my teammates' respect and keep them engaged in their work, as well as make the sometimes difficult decisions needed for the project to reach completion. As the guardian of coherence, I contributed to <b>writing and Narrative</b>, <b>Level Design</b>, <b>System Design</b>, <b>Art Direction</b>, and more.\nThis includes:\n- Organizing meetings, setting up reverse schedules, a shared Notion to track the planning of each project step over 1 year, and a task system for the team.\n- Creating the project's main storyline, supervising and co-writing the scenario.\n- Co-designing the various mechanics and how they work.\n- Level design and full dressing of level 3 \"Scaffolding\", 0 \"Intro - Bedroom\" and Menu; and partial work on levels 2 \"City\" and 5 \"Kether\". Partial development of the \"Kether\" level mechanics.\n- Writing a detailed GDD split into several documents each dedicated to one aspect of the game.\n- Implementing assets (3D, Sounds and Music, Textures, etc…).\n- Supervising and connecting the GD team with the 3D and OST departments.\n- Creating style guides & precise description documents on the intended design of characters, environment assets, textures, etc. Likewise for the original music.\n- Managing and developing the shaders.\n- Designing the UI & how it works, and creating its assets.\n- A large part of the Sound Design.\nThis project is one of the most difficult and rewarding I've had the chance to work on, and it truly taught me an enormous amount about the pre-production and production process of a game. Between working in an interdisciplinary team, the many setbacks that arose throughout and that we managed to overcome, and the need to bounce back quickly, I came out of it stronger.",
    gameplay:
      "Navigate a megabuilding by moving through the surveillance system you hacked. Help Binah reach the top of the building, and witness her evolution toward human consciousness.\nThe game focuses on its core pillar: stealth. Setting combat aside in favor of an advanced detection system that accounts for light, distance, the visible part of the body, and even sound.",
    story:
      "You acquired a hacking USB key, but it didn't give you access to what you were looking for. Instead, here you are inside the security system of the GINKGO yakuza clan, and they won't let that slide.\nWorse still, you witnessed their strange experiments on robots, and now your only option is to use one of them to erase your tracks and ensure your safety. But what strange behavior — this Binah has such a highly developed AI, and her story is more than intriguing. What have you gotten yourself into this time?",
    team:
      "SEPHIRA-03 is a video game made as a final-year project by a team of 4 Game Designers, <b>Jodie HANN</b>, <b>Enzo POLI</b>, <b>Alexis LION</b> and <b>Loïck MAHEO</b>. Along with 3 3D artists, <b>Mattis AUDEBOURG</b>, <b>Léa COQUARD</b> and <b>Christelle CUTAYAR</b>.\nThe original soundtracks are composed by <b>Ilona HANN</b> and <b>Sophie LAPORTE</b>. With exclusive tracks composed and provided by <b>Jean-Phillipe HANN</b>.",
  },
};

export default async function SephiraPage() {
  const locale = (await getLocale()) as "fr" | "en";
  const c = COPY[locale];
  const { prev, next } = getAdjacentProjects(SLUG);
  const project = getProjectBySlug(SLUG);

  return (
    <ProjectShell>
      <ProjectHero title="SEPHIRA-03" tagline={c.tagline} date={c.date} heroImage={HERO_IMAGE} />

      <ProjectBento
        status="released"
        statusLabel={c.status}
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
          <p className="project-subheading">{c.gddExtracts}</p>
          <ProjectImages className="project-images--portrait" images={GDD_IMAGES} style={{ paddingTop: 0 }} />
        </ProjectSection>

        <ProjectSection label={c.labels.gameplay}>
          <div className="project-split">
            <div className="project-section__lead">
              <RichText text={c.gameplay} />
            </div>
            <ProjectImages
              className="project-images--aside"
              images={[GAMEPLAY_ASIDE]}
              credit={c.gddCaption}
            />
          </div>

          <ProjectVideo videoId={VIDEO_ID} title={c.labels.gameplay} />

          <ProjectImages className="project-images--wide" images={GAMEPLAY_WIDE} />
        </ProjectSection>

        <ProjectSection label={c.labels.story}>
          <div className="project-section__lead">
            <RichText text={c.story} />
          </div>

          <ProjectVideo videoId={STORY_VIDEO_ID} title={c.labels.story} />

          <ProjectMasonry images={MOSAIC_IMAGES} />
        </ProjectSection>

        <ProjectSection label={c.labels.team}>
          <div className="project-section__lead">
            <RichText text={c.team} />
          </div>
          <ProjectCarousel images={TEAM_IMAGES} />
        </ProjectSection>
      </div>

      <ProjectCTA
        ctaLabel={c.cta}
        ctaUrl={DEMO}
        note={c.playDemo}
        socialLinks={project?.socialLinks}
      />

      <ProjectNav prev={prev} next={next} />
    </ProjectShell>
  );
}
