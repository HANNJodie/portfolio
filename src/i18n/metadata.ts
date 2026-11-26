import type { Metadata } from "next";
import { getProjectBySlug } from "@/data/projects";

// Canonical + hreflang for a French path (no prefix); English lives under "/en".
export function localizedAlternates(path: string, locale: string): Metadata["alternates"] {
  const fr = path || "/";
  const en = `/en${path}`;
  return {
    canonical: locale === "en" ? en : fr,
    languages: { fr, en, "x-default": fr },
  };
}

// Title, description and alternates of a project page, from src/data/projects.ts.
export async function projectMetadata(
  slug: string,
  params: Promise<{ locale: string }>,
): Promise<Metadata> {
  const { locale } = await params;
  const project = getProjectBySlug(slug);
  const lang = locale === "en" ? "en" : "fr";

  return {
    title: project?.title,
    description: project?.description[lang],
    alternates: localizedAlternates(`/projets/${slug}`, locale),
  };
}
