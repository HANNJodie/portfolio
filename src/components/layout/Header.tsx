"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import LangSwitcher from "@/components/ui/LangSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<"home" | "projects">("home");

  const isHomePage = pathname === "/";

  // Scroll detection for header style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection on home page
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const projectsEl = document.getElementById("projects");
      if (!projectsEl) {
        setActiveSection("home");
        return;
      }
      const rect = projectsEl.getBoundingClientRect();
      setActiveSection(rect.top <= 100 ? "projects" : "home");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Scroll to section after navigation from another page
  useEffect(() => {
    if (!isHomePage) return;
    const scrollTo = sessionStorage.getItem("scrollTo");
    if (scrollTo) {
      sessionStorage.removeItem("scrollTo");
      setTimeout(() => {
        const el = document.getElementById(scrollTo);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, [isHomePage]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleScrollToTop = useCallback(() => {
    setMenuOpen(false);
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  }, [isHomePage, router]);

  const handleScrollToProjects = useCallback(() => {
    setMenuOpen(false);
    if (isHomePage) {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      sessionStorage.setItem("scrollTo", "projects");
      router.push("/");
    }
  }, [isHomePage, router]);

  const isHomeActive = isHomePage && activeSection === "home";
  const isProjectsActive = isHomePage && activeSection === "projects";
  const isAboutActive = pathname === "/a-propos";

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header__inner">
          <Link href="/" className="header__brand">
            <span className="header__brand-title">Game Designer</span>
            <span className="header__brand-name">Jodie Hann</span>
          </Link>

          <nav className="header__nav">
            <button
              onClick={handleScrollToTop}
              className={`header__link ${isHomeActive ? "header__link--active" : ""}`}
            >
              {t("home")}
            </button>
            <button
              onClick={handleScrollToProjects}
              className={`header__link ${isProjectsActive ? "header__link--active" : ""}`}
            >
              {t("projects")}
            </button>
            <Link
              href="/a-propos"
              className={`header__link ${isAboutActive ? "header__link--active" : ""}`}
            >
              {t("about")}
            </Link>
          </nav>

          <div className="header__actions">
            <LangSwitcher />
            <button
              className={`header__burger ${menuOpen ? "header__burger--open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="mobile-menu__nav">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <button onClick={handleScrollToTop} className="mobile-menu__link">
                  {t("home")}
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <button onClick={handleScrollToProjects} className="mobile-menu__link">
                  {t("projects")}
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/a-propos" className="mobile-menu__link">
                  {t("about")}
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <LangSwitcher />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
