import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jodiehann.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // Only the two home pages are indexable: "/" (French) and "/en" (English).
        // The trailing "$" anchors the match so subpaths stay blocked by "disallow: /".
        allow: ["/"]
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
