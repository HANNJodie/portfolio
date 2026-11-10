import { getLocale } from "next-intl/server";
import ProjectShell from "@/components/project/ProjectShell";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectInfoStrip from "@/components/project/ProjectInfoStrip";
import ProjectSection from "@/components/project/ProjectSection";
import RichText from "@/components/project/RichText";
import ProjectLinkCard from "@/components/project/ProjectLinkCard";
import ProjectImages from "@/components/project/ProjectImages";
import ProjectCarousel from "@/components/project/ProjectCarousel";
import ProjectVideo from "@/components/project/ProjectVideo";
import ProjectCTA from "@/components/project/ProjectCTA";
import ProjectNav from "@/components/project/ProjectNav";
import { getAdjacentProjects } from "@/data/projects";

const SLUG = "n-etre-qu-humain";
const DIR = "/images/VOX MILO";
const HERO_IMAGE = `${DIR}/cover.webp`;
const FILM_URL = "https://youtu.be/ok_76FNiaVE";
const SOUNDTRACK_ID = "2QwlIPYhqQs";
const TEAM_REEL = "https://www.instagram.com/reels/DWWGFbxAGU_/";
const AWARD_POST = "https://www.instagram.com/p/DWJhb6dCH9g";
const QUINZAINE_POST = "https://www.instagram.com/p/DYmHwv5iOTL";
const INSTAGRAM = "https://www.instagram.com/latelierdureel";
const YOUTUBE = "https://youtube.com/@latelier_du_reel";
const FACEBOOK = "https://www.facebook.com/share/193UWgv9zG/";

const STORYBOARD_IMAGES = [1, 2, 3, 4].map((n) => ({
  src: `${DIR}/storyboard-${n}.webp`,
  alt: `Storyboard ${n}`,
}));
const POSTER_IMAGES = [{ src: `${DIR}/affiche.webp`, alt: "Affiche — N'Être qu'Humain" }];
const AWARD_IMAGES = [{ src: `${DIR}/remise-des-prix.webp`, alt: "Remise des prix Vox Milo 2026" }];
const QUINZAINE_IMAGES = [
  { src: `${DIR}/quinzaine-1.webp`, alt: "Quinzaine des Réalisateurs, Cannes 2026" },
  { src: `${DIR}/quinzaine-2.webp`, alt: "Rencontre avec l'équipe du film" },
];
const GALLERY_IMAGES = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
  src: `${DIR}/photo-${n}.webp`,
  alt: `N'Être qu'Humain — photo ${n}`,
}));

const COPY = {
  fr: {
    tagline: "Court métrage - Vox Milo 2026",
    date: "Octobre 2025 – Mai 2026",
    status: "Terminé · Primé",
    devPeriod: "7 mois",
    teamLabel: "8 personnes",
    roleLabel: "Réalisatrice",
    editingLabel: "Montage",
    themesLabel: "Thèmes",
    genres: ["Solitude", "IA", "Relations sociales", "Isolement", "Monde virtuel", "Amour", "Jeunesse"],
    labels: {
      project: "Le projet",
      work: "Mon travail",
      story: "Histoire",
      team: "L'équipe",
      award: "Remise des prix à Cannes",
      quinzaine: "La Quinzaine des Réalisateurs",
      soundtrack: "Écouter la bande originale",
      gallery: "En images",
    },
    watch: "Voir le film",
    watchSub: "Sur YouTube",
    teamCard: "L'équipe en vidéo",
    teamCardSub: "Sur Instagram",
    storyboardHeading: "Extraits du storyboard",
    seePost: "Voir la publication",
    project:
      "« N'Être qu'Humain » est un court métrage de 7 minutes réalisé par une équipe de jeunes amateurs dans le cadre du Festival Vox Milo 2026. Lauréat de sa catégorie, il a remporté le prix « Graine de Cinéaste », permettant à ses membres d'être invités à la Quinzaine des Réalisateurs de Cannes en mai 2026.\nLe court métrage traite de la solitude croissante chez les jeunes malgré l'avènement d'un monde hyperconnecté, ainsi que des dangers d'une barrière de plus en plus floue entre le réel et le virtuel.",
    work:
      "J'ai eu l'honneur d'être nommée réalisatrice sur ce projet, un rôle que j'ai pris très à cœur afin d'offrir à mon groupe une chance de monter sur le podium et de partir à Cannes.\nDe par mon rôle, il m'incombait de diriger et motiver l'équipe, guider le projet, organiser toutes les étapes de la réalisation, et superviser l'ensemble pour qu'il corresponde à une vision artistique et véhicule un message fort.\nJ'ai donc mis en place un planning, organisé et supervisé des réunions régulières, et fait de mon mieux pour faire ressortir le travail et les intentions de chacun des membres dans le rendu final. Il était évidemment impératif de prendre des décisions parfois difficiles, et de rebondir en cas de difficultés.\nJ'ai également :\n- Grandement participé à l'écriture du scénario\n- Créé l'ensemble du storyboard\n- Assisté à la prise de vue\n- Réalisé le montage du court métrage sur DaVinci Resolve\n- Composé et interprété les bandes originales du projet\n- Mis en place des plans pour la communication du film\nLe tout avec l'aide précieuse de mon équipe.\nTous les décors ont été aménagés à la main par l'équipe, qui a su apprendre à utiliser du matériel professionnel pour le tournage, le tout organisé sur l'espace de 3 jours.",
    storyboardCaption:
      "Le document a été réalisé rapidement afin de donner à l'équipe un support pour le tournage des différents plans. Il est rempli de fautes de frappe et d'orthographe qui n'avaient pas d'intérêt à être corrigées, et contient du langage familier. Merci de ne pas en tenir rigueur.",
    story:
      "Connecté au monde entier, mais profondément seul, Gabriel est un jeune homme confronté aux dérives de notre société moderne. Pour échapper à une détresse grandissante, vers quoi peut-il se tourner ?",
    team:
      "Le projet a été réalisé par une équipe de 8 jeunes amateurs : <b>Jodie HANN</b>, <b>Océane CASTEL--GICQUEL</b>, <b>Gabriel ROBINET</b>, <b>Nicolas GUIQUE</b>, <b>Celena ESCOBAR</b>, <b>Elyne LEFEVRE</b> et <b>Lola BELLET</b>.\nLe tout sous le regard bienveillant de <b>Nicolas MINISCALCO</b>, accompagnateur de la Mission Locale du Coudon au Gapeau.",
    quinzaine:
      "En tant que réalisatrice, j'ai eu la chance de pouvoir me rendre à la Quinzaine des Réalisateurs à Cannes en mai 2026, où j'ai pu voir de nombreux films d'auteurs et de grands réalisateurs, discuter avec leurs créateurs et leurs équipes, et assister et participer à des sessions de Q&A. Ce fut une expérience particulièrement enrichissante, où j'ai pu grandement cultiver mes compétences et mes connaissances dans le domaine de la narration et du cinéma.",
    quinzaineCaption: (
      <>
        Rencontre pro autour du film d&apos;animation <i>Carmen, l&apos;oiseau rebelle</i> réalisé par Sébastien Laudenbach
      </>
    ),
    soundtrack: "Auteure-compositrice-interprète : <b>Jodie HANN</b> · Piano : <b>Nicolas GUIQUE</b>",
  },
  en: {
    tagline: "Short film - Vox Milo 2026",
    date: "October 2025 – May 2026",
    status: "Finished · Award-winning",
    devPeriod: "7 months",
    teamLabel: "8 people",
    roleLabel: "Director",
    editingLabel: "Editing",
    themesLabel: "Themes",
    genres: ["Loneliness", "AI", "Social relationships", "Isolation", "Virtual world", "Love", "Youth"],
    labels: {
      project: "The project",
      work: "My work",
      story: "Story",
      team: "The team",
      award: "Award ceremony in Cannes",
      quinzaine: "The Directors' Fortnight",
      soundtrack: "Listen to the soundtrack",
      gallery: "In pictures",
    },
    watch: "Watch the film",
    watchSub: "On YouTube",
    teamCard: "Meet the team",
    teamCardSub: "On Instagram",
    storyboardHeading: "Storyboard excerpts",
    seePost: "See the post",
    project:
      "“N'Être qu'Humain” (Only Human) is a 7-minute short film made by a team of young amateurs for the Vox Milo 2026 Festival. Winner of its category, it received the “Graine de Cinéaste” award, which earned its members an invitation to the Directors' Fortnight (Quinzaine des Réalisateurs) in Cannes in May 2026.\nThe film explores the growing loneliness of young people despite the rise of a hyperconnected world, as well as the dangers of an ever-blurrier line between the real and the virtual.",
    work:
      "I had the honor of being appointed director on this project, a role I took very much to heart, to give my group a real chance at the podium and a trip to Cannes.\nIn this role, it was up to me to lead and motivate the team, steer the project, organize every stage of production, and oversee everything so that it served an artistic vision and carried a strong message.\nI therefore set up a schedule, organized and ran regular meetings, and did my best to bring out each member's work and intentions in the final cut. Of course, I sometimes had to make tough decisions and bounce back when things got difficult.\nI also:\n- Played a major part in writing the script\n- Created the entire storyboard\n- Assisted with the shooting\n- Edited the short film in DaVinci Resolve\n- Composed and performed the film's soundtrack\n- Set up the film's communication plan\nAll with the invaluable help of my team.\nAll the sets were dressed by hand by the team, who learned to use professional equipment for the shoot, all organized over the span of 3 days.",
    storyboardCaption:
      "This document was made quickly to give the team a reference for shooting the different shots. It is full of typos and spelling mistakes that were not worth correcting, and contains informal language. Please don't hold it against us.",
    story:
      "Connected to the whole world, yet deeply alone, Gabriel is a young man facing the excesses of our modern society. To escape his growing distress, where can he turn?",
    team:
      "The project was made by a team of 8 young amateurs: <b>Jodie HANN</b>, <b>Océane CASTEL--GICQUEL</b>, <b>Gabriel ROBINET</b>, <b>Nicolas GUIQUE</b>, <b>Celena ESCOBAR</b>, <b>Elyne LEFEVRE</b> and <b>Lola BELLET</b>.\nAll under the caring eye of <b>Nicolas MINISCALCO</b>, youth advisor at the Mission Locale du Coudon au Gapeau.",
    quinzaine:
      "As the director, I had the chance to attend the Directors' Fortnight in Cannes in May 2026, where I watched many auteur films and works by great directors, talked with their creators and crews, and attended and took part in Q&A sessions. It was a particularly enriching experience that greatly helped me grow my skills and knowledge of storytelling and filmmaking.",
    quinzaineCaption: (
      <>
        Professional talk around the animated film <i>Carmen, l&apos;oiseau rebelle</i> directed by Sébastien Laudenbach
      </>
    ),
    soundtrack: "Songwriter, composer & performer: <b>Jodie HANN</b> · Piano: <b>Nicolas GUIQUE</b>",
  },
};

export default async function NEtreQuHumainPage() {
  const locale = (await getLocale()) as "fr" | "en";
  const c = COPY[locale];
  const { prev, next } = getAdjacentProjects(SLUG);

  const postLink = (href: string) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {c.seePost}
    </a>
  );

  return (
    <ProjectShell>
      <ProjectHero title="N'ÊTRE QU'HUMAIN" tagline={c.tagline} date={c.date} heroImage={HERO_IMAGE} />

      <ProjectInfoStrip
        status="released"
        statusLabel={c.status}
        devPeriod={c.devPeriod}
        teamLabel={c.teamLabel}
        roleLabel={c.roleLabel}
        engine="DaVinci Resolve"
        engineLabel={c.editingLabel}
        genres={c.genres}
        genresLabel={c.themesLabel}
      />

      <div className="project-sections">
        <ProjectSection label={c.labels.project}>
          <div className="project-section__concept">
            <div className="project-section__lead">
              <RichText text={c.project} />
            </div>
            <ProjectLinkCard href={FILM_URL} title={c.watch} subtitle={c.watchSub} />
          </div>
        </ProjectSection>

        <ProjectSection label={c.labels.work}>
          <div className="project-section__lead">
            <RichText text={c.work} />
          </div>
          <p className="project-subheading">{c.storyboardHeading}</p>
          <ProjectImages
            className="project-images--a4 project-images--two-cols"
            images={STORYBOARD_IMAGES}
            style={{ paddingTop: 0 }}
          />
          <p className="project-caption">{c.storyboardCaption}</p>
        </ProjectSection>

        <ProjectSection label={c.labels.story}>
          <div className="project-split project-split--poster">
            <ProjectImages className="project-images--poster" images={POSTER_IMAGES} style={{ paddingTop: 0 }} />
            <div className="project-section__lead">
              <RichText text={c.story} />
            </div>
          </div>
        </ProjectSection>

        <ProjectSection label={c.labels.team}>
          <div className="project-section__concept">
            <div className="project-section__lead">
              <RichText text={c.team} />
            </div>
            <ProjectLinkCard href={TEAM_REEL} title={c.teamCard} subtitle={c.teamCardSub} />
          </div>
        </ProjectSection>

        <ProjectSection label={c.labels.award}>
          <ProjectImages
            className="project-images--photo"
            images={AWARD_IMAGES}
            style={{ paddingTop: 0 }}
            credit={postLink(AWARD_POST)}
          />
        </ProjectSection>

        <ProjectSection label={c.labels.quinzaine}>
          <div className="project-section__lead">
            <RichText text={c.quinzaine} />
          </div>
          <ProjectImages
            className="project-images--tall project-images--two-cols"
            images={QUINZAINE_IMAGES}
            credit={
              <>
                {c.quinzaineCaption} · {postLink(QUINZAINE_POST)}
              </>
            }
          />
        </ProjectSection>

        <ProjectSection label={c.labels.soundtrack}>
          <ProjectVideo videoId={SOUNDTRACK_ID} title={c.labels.soundtrack} />
          <p className="project-caption" dangerouslySetInnerHTML={{ __html: c.soundtrack }} />
        </ProjectSection>

        <ProjectSection label={c.labels.gallery}>
          <ProjectCarousel className="project-carousel--wide" images={GALLERY_IMAGES} />
        </ProjectSection>
      </div>

      <ProjectCTA
        ctaLabel={c.watch}
        ctaUrl={FILM_URL}
        socialLinks={[
          { platform: "Instagram", url: INSTAGRAM },
          { platform: "YouTube", url: YOUTUBE },
          { platform: "Facebook", url: FACEBOOK },
        ]}
      />

      <ProjectNav prev={prev} next={next} />
    </ProjectShell>
  );
}
