import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { projects, getProjectBySlug, getAdjacentProjects } from "@/data/projects";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectContent from "@/components/project/ProjectContent";
import ProjectGallery from "@/components/project/ProjectGallery";
import ProjectTeam from "@/components/project/ProjectTeam";
import ProjectCTA from "@/components/project/ProjectCTA";
import ProjectNav from "@/components/project/ProjectNav";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const locale = (await getLocale()) as "fr" | "en";

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <>
      <Header />
      <main className="project-page">
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

        <ProjectNav prev={prev} next={next} />
      </main>
      <Footer />
    </>
  );
}
