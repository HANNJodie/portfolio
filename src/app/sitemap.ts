import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jodiehann.com";
const locales = ["fr", "en"] as const;

type Alternates = {
  languages: Record<string, string>;
};

function buildAlternates(path: string): Alternates {
  return {
    languages: Object.fromEntries(
      locales.map((locale) => [locale, `${BASE_URL}/${locale}${path}`])
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1.0 },
    { path: "/a-propos", priority: 0.8 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap(
    ({ path, priority }) =>
      locales.map((locale) => ({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority,
        alternates: buildAlternates(path),
      }))
  );

  const projectEntries: MetadataRoute.Sitemap = projects.flatMap((project) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/projets/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: buildAlternates(`/projets/${project.slug}`),
    }))
  );

  return [...staticEntries, ...projectEntries];
}
