import type { MetadataRoute } from "next";

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

  return staticRoutes.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
      alternates: buildAlternates(path),
    }))
  );
}
