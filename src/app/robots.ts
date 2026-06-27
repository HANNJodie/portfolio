import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jodiehann.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/fr",
        disallow: ["/fr/", "/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
