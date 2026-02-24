import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getProjectBySlug, getAdjacentProjects } from "@/data/projects";
import { Project } from "@/types/project";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectNav from "@/components/project/ProjectNav";

interface ProjectLayoutProps {
  slug: string;
  children: (props: { project: Project; locale: "fr" | "en" }) => React.ReactNode;
}

export default async function ProjectLayout({ slug, children }: ProjectLayoutProps) {
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
        {children({ project, locale })}
        <ProjectNav prev={prev} next={next} />
      </main>
      <Footer />
    </>
  );
}
