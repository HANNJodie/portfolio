"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import LangSwitcher from "@/components/ui/LangSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { href: "/" as const, label: t("projects") },
    { href: "/a-propos" as const, label: t("about") },
  ];

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header__inner">
          <Link href="/" className="header__brand">
            <span className="header__brand-title">Game Designer</span>
            <span className="header__brand-name">Jodie Hann</span>
          </Link>

          <nav className="header__nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`header__link ${
                  pathname === link.href ? "header__link--active" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
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
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link href={link.href} className="mobile-menu__link">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
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
