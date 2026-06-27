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
  return [
    {
      url: `${BASE_URL}/fr`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
  ];
}
