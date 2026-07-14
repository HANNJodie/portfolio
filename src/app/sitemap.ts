import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jodiehann.com";

// Paths for the French (default) locale, without a locale prefix.
// The English versions are served under the "/en" prefix.
const paths = [
  "",
  "/a-propos",
  "/projets/cycles",
  "/projets/le-peuple-aux-mille-dieux",
  "/projets/quest-for-life",
  "/projets/rejoins-moi",
  "/projets/ascend",
  "/projets/luciole",
  "/projets/sephira-03",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return paths.flatMap((path) => {
    const frUrl = `${BASE_URL}${path}`;
    const enUrl = `${BASE_URL}/en${path}`;
    const isHome = path === "";

    const alternates = {
      languages: {
        fr: frUrl,
        en: enUrl,
        "x-default": frUrl,
      },
    };

    return [
      {
        url: frUrl,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: isHome ? 1.0 : 0.8,
        alternates,
      },
      {
        url: enUrl,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: isHome ? 0.6 : 0.5,
        alternates,
      },
    ];
  });
}
