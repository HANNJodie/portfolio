import { getLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutContent from "@/components/about/AboutContent";
import { localizedAlternates } from "@/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "en" ? "About" : "À propos",
    alternates: localizedAlternates("/a-propos", locale),
  };
}

export default async function AboutPage() {
  const locale = (await getLocale()) as "fr" | "en";

  return (
    <>
      <Header />
      <main>
        <AboutContent locale={locale} />
      </main>
      <Footer />
    </>
  );
}
