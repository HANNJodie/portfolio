import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ProjectGrid from "@/components/home/ProjectGrid";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProjectGrid />
      </main>
      <Footer />
    </>
  );
}
