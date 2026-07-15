import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jodiehann.wordpress.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  async headers() {
    return [
      {
        // Images optimisées par Next (<Image>)
        source: "/_next/image",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        // Fichiers images statiques dans /public
        source: "/:path*.(jpg|jpeg|png|gif|webp|avif|svg|ico)",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
