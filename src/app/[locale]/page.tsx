import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ProjectGrid from "@/components/home/ProjectGrid";
import { Analytics } from "@vercel/analytics/next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    alternates: {
      // French is the default locale and has no prefix ("/").
      canonical: locale === "en" ? "/en" : "/",
      languages: {
        fr: "/",
        en: "/en",
        "x-default": "/",
      },
    },
  };
}

export default function HomePage() {
  return (
    <>
      <Analytics />
      <Header />
      <main>
        <Hero />
        <ProjectGrid />
      </main>
      <Footer />
    </>
  );
}
