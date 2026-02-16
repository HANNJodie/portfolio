import { getLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutContent from "@/components/about/AboutContent";

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
