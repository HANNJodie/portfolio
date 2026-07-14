import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ProjectGrid from "@/components/home/ProjectGrid";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

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
