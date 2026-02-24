import ProjectLayout from "@/components/project/ProjectLayout";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectContent from "@/components/project/ProjectContent";
import ProjectGallery from "@/components/project/ProjectGallery";
import ProjectTeam from "@/components/project/ProjectTeam";
import ProjectCTA from "@/components/project/ProjectCTA";

export default function LePeupleAuxMilleDieuxPage() {
  return (
    <ProjectLayout slug="le-peuple-aux-mille-dieux">
      {({ project, locale }) => (
        <>
          <ProjectHero
            title={project.title}
            tagline={project.tagline[locale]}
            date={project.date[locale]}
            heroImage={project.heroImage}
          />

          <ProjectContent
            description={project.description[locale]}
            role={project.role?.[locale]}
            story={project.story?.[locale]}
            goal={project.goal?.[locale]}
            gameplay={project.gameplay?.[locale]}
          />

          <ProjectGallery images={project.images} title={project.title} />

          {project.team && <ProjectTeam team={project.team[locale]} />}

          <ProjectCTA
            ctaLabel={project.ctaLabel?.[locale]}
            ctaUrl={project.ctaUrl}
            socialLinks={project.socialLinks}
            downloadables={project.downloadables}
          />
        </>
      )}
    </ProjectLayout>
  );
}
