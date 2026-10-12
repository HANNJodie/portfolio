import { getLocale } from "next-intl/server";
import ProjectShell from "@/components/project/ProjectShell";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectInfoStrip from "@/components/project/ProjectInfoStrip";
import ProjectSection from "@/components/project/ProjectSection";
import RichText from "@/components/project/RichText";
import ProjectLinkCard from "@/components/project/ProjectLinkCard";
import ProjectImages from "@/components/project/ProjectImages";
import ProjectCTA from "@/components/project/ProjectCTA";
import ProjectNav from "@/components/project/ProjectNav";
import Recommendation from "@/components/about/Recommendation";
import { getAdjacentProjects } from "@/data/projects";

const SLUG = "my-morning-routine";
const HERO_IMAGE = "/images/MY MORNING ROUTINE/cover.webp";
const ONE_PAGER_URL = "/images/MY MORNING ROUTINE/DAU_GD_Goals_Jodie_HANN_v2.pdf";
const LINKEDIN_POST = "https://lnkd.in/p/ehgnphdS";
// Collapsed embed (text cut with "…more"); its height is set in .project-embed.
const LINKEDIN_EMBED = "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7467236829319090176?collapsed=1";

const PRESENTATION_IMAGES = [
  { src: "/images/MY MORNING ROUTINE/presentation.gif", alt: "Extrait de présentation" },
];

const GAMEPLAY_IMAGES = [
  { src: "/images/MY MORNING ROUTINE/Diapositive2.JPG", alt: "Core concept" },
  { src: "/images/MY MORNING ROUTINE/Diapositive15.JPG", alt: "Game loops" },
  { src: "/images/MY MORNING ROUTINE/Diapositive16.JPG", alt: "Summary" },
  { src: "/images/MY MORNING ROUTINE/Diapositive18.JPG", alt: "USP" },
];

const STORY_IMAGES = [
  { src: "/images/MY MORNING ROUTINE/Diapositive3.JPG", alt: "Scénario / synopsis" },
  { src: "/images/MY MORNING ROUTINE/Diapositive4.JPG", alt: "Camille" },
];

const COPY = {
  fr: {
    tagline: "L'horreur du quotidien - Mentorat Ubisoft",
    date: "Novembre 2025 – Mai 2026",
    status: "Documentation",
    devPeriod: "6 mois",
    teamLabel: "Jodie HANN · Mentor : Nicolaï Maldavsky",
    roleLabel: "Game Designer",
    genres: ["Puzzle", "Escape game", "Casual", "Cozy", "Horreur psychologique"],
    labels: {
      concept: "Concept",
      work: "Mon travail",
      presentation: "Extraits de présentation",
      gameplay: "Gameplay",
      story: "Histoire",
      mentorship: "Le mentorat",
    },
    onePagerTitle: "One pager : concept initial",
    openLink: "Ouvrir le lien",
    concept:
      "« My Morning Routine » est un jeu solo dans lequel vous accomplissez des tâches en interagissant avec votre environnement et tentez de compléter une simple routine matinale. Mais derrière cette apparente simplicité se cache une histoire aux multiples facettes, ainsi que de nombreux mystères à découvrir.\nRéalisé pendant le mentorat « Develop at Ubisoft » avec l'accompagnement de <b>Nicolaï Maldavsky</b>, il ne s'agit pas que d'un projet, mais d'une grande expérience d'apprentissage qui a énormément enrichi mon parcours.",
    work:
      "Après avoir choisi le thème proposé par le mentorat, « My Morning Routine », j'ai travaillé durant toute la durée du mentorat sur la conceptualisation de cette idée de game design, ce qui comprend notamment :\n- Objectif\n- Concept\n- Gameplay\n- Narration\n- Level design\n- Onboarding\n- UI/UX\nEt ce, à travers plusieurs étapes aux livrables concrets, dont :\n- Le one pager du concept initial : pitch, genres, cible, 3C, objectifs, difficultés possibles, expérience attendue, etc.\n- L'approfondissement d'une mécanique centrale du jeu et sa présentation.\n- La présentation finale du projet et de sa planification en vue d'un prototypage (réalisée au studio d'Ubisoft Paris).\nTout du long, j'ai été suivie par <b>Nicolaï Maldavsky</b>, lors de points réguliers où il a su me conseiller, pointer les lacunes de mon travail et les points d'amélioration, et me donner des exemples concrets issus de son expérience pour que je puisse améliorer le tout en autonomie. Ainsi que par l'équipe du mentorat et divers intervenants, grâce à des visios sur différents thèmes liés.\nCela m'a permis de travailler ma rigueur, ma technique et mon attention aux détails réellement importants dans la création d'un jeu à but commercial. De mieux comprendre le déroulement du développement d'un projet dans un studio professionnel. Mais aussi de me rendre compte de mes propres forces et connaissances, et de prendre confiance en celles-ci.",
    story:
      "Plongez dans l'esprit fragmenté de Camille, une jeune femme perdue entre passé et avenir après avoir vécu trop de nouveaux départs. À travers son quotidien, déballez ses souvenirs, reconstruisez son identité et aidez-la à redécouvrir qui elle est, un petit pas à la fois.",
    mentorship:
      "Durant 6 mois, j'ai pu échanger avec d'autres juniors, ainsi qu'avec des professionnels expérimentés dans diverses disciplines du jeu vidéo, ce qui a grandement enrichi ma compréhension du milieu.\nJ'ai pu voir de mes propres yeux le fonctionnement du studio et du développement de ses projets, et obtenir des retours concrets sur mon travail lors de la présentation finale à Paris.\nCela en a fait l'une de mes expériences les plus proches du milieu professionnel, et je suis fière des compétences que j'ai pu y perfectionner.",
  },
  en: {
    tagline: "The horror of everyday life - Ubisoft Mentorship",
    date: "November 2025 – May 2026",
    status: "Documentation",
    devPeriod: "6 months",
    teamLabel: "Jodie HANN · Mentor: Nicolaï Maldavsky",
    roleLabel: "Game Designer",
    genres: ["Puzzle", "Escape game", "Casual", "Cozy", "Psychological horror"],
    labels: {
      concept: "Concept",
      work: "My work",
      presentation: "Presentation excerpts",
      gameplay: "Gameplay",
      story: "Story",
      mentorship: "The mentorship",
    },
    onePagerTitle: "One pager: initial concept",
    openLink: "Open link",
    concept:
      "“My Morning Routine” is a single-player game in which you complete tasks by interacting with your environment while trying to get through a simple morning routine. But behind this apparent simplicity lies a multifaceted story, along with many mysteries to uncover.\nMade during the “Develop at Ubisoft” mentorship with the guidance of <b>Nicolaï Maldavsky</b>, it is not just a project, but a great learning experience that has greatly enriched my journey.",
    work:
      "After choosing the theme offered by the mentorship, “My Morning Routine”, I spent the whole mentorship conceptualizing this game design idea, which notably includes:\n- Objective\n- Concept\n- Gameplay\n- Narrative\n- Level design\n- Onboarding\n- UI/UX\nAll of this through several stages with concrete deliverables, including:\n- The one pager of the initial concept: pitch, genres, target, 3C, objectives, possible difficulties, intended experience, etc.\n- Deepening one of the game's core mechanics and presenting it.\n- The final presentation of the project and its planning for prototyping (held at the Ubisoft Paris studio).\nThroughout, I was followed by <b>Nicolaï Maldavsky</b> in regular check-ins, where he advised me, pointed out the gaps in my work and areas for improvement, and gave me concrete examples from his experience so I could improve everything on my own. As well as by the mentorship team and various speakers, through video calls on related topics.\nThis helped me sharpen my rigor, my technique and my attention to the details that truly matter when creating a commercially viable game. It gave me a better understanding of how a project is developed in a professional studio. And it also made me aware of my own strengths and knowledge, and helped me gain confidence in them.",
    story:
      "Dive into the fragmented mind of Camille, a young woman lost between past and future after going through too many fresh starts. Through her daily life, unpack her memories, rebuild her identity and help her rediscover who she is, one small step at a time.",
    mentorship:
      "Over 6 months, I was able to exchange with other juniors, as well as with experienced professionals from various video game disciplines, which greatly enriched my understanding of the industry.\nI saw first-hand how the studio works and how its projects are developed, and received concrete feedback on my work during the final presentation in Paris.\nThis made it one of my experiences closest to the professional world, and I am proud of the skills I was able to refine there.",
  },
};

export default async function MyMorningRoutinePage() {
  const locale = (await getLocale()) as "fr" | "en";
  const c = COPY[locale];
  const { prev, next } = getAdjacentProjects(SLUG);

  return (
    <ProjectShell>
      <ProjectHero title="MY MORNING ROUTINE" tagline={c.tagline} date={c.date} heroImage={HERO_IMAGE} />

      <ProjectInfoStrip
        status="released"
        statusLabel={c.status}
        devPeriod={c.devPeriod}
        teamLabel={c.teamLabel}
        roleLabel={c.roleLabel}
        genres={c.genres}
      />

      <div className="project-sections">
        <ProjectSection label={c.labels.concept}>
          <div className="project-section__concept">
            <div className="project-section__lead">
              <RichText text={c.concept} />
            </div>
            {ONE_PAGER_URL && (
              <ProjectLinkCard href={ONE_PAGER_URL} title={c.onePagerTitle} subtitle={c.openLink} />
            )}
          </div>
        </ProjectSection>

        <ProjectSection label={c.labels.work}>
          <div className="project-section__lead">
            <RichText text={c.work} />
          </div>
        </ProjectSection>

        <ProjectSection label={c.labels.presentation}>
          <ProjectImages className="project-images--wide" images={PRESENTATION_IMAGES} style={{ paddingTop: 0 }} />
        </ProjectSection>

        <ProjectSection label={c.labels.gameplay}>
          <ProjectImages className="project-images--wide project-images--two-cols" images={GAMEPLAY_IMAGES} style={{ paddingTop: 0 }} />
        </ProjectSection>

        <ProjectSection label={c.labels.story}>
          <div className="project-section__lead">
            <RichText text={c.story} />
          </div>
          <ProjectImages className="project-images--wide" images={STORY_IMAGES} />
        </ProjectSection>

        <ProjectSection label={c.labels.mentorship}>
          <div className="project-section__lead">
            <RichText text={c.mentorship} />
          </div>
          <div className="project-embed">
            <iframe src={LINKEDIN_EMBED} allowFullScreen title="LinkedIn" />
          </div>
        </ProjectSection>

        <div style={{ margin: "4rem 0" }}>
          <Recommendation />
        </div>
      </div>

      <ProjectCTA
        socialLinks={[
          { platform: "One pager", url: ONE_PAGER_URL },
          { platform: "LinkedIn", url: LINKEDIN_POST },
        ]}
      />

      <ProjectNav prev={prev} next={next} />
    </ProjectShell>
  );
}
