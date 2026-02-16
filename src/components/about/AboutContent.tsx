"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import { LinkedInIcon, MailIcon, PhoneIcon, DownloadIcon } from "@/components/ui/Icons";

const favoriteGames = [
  "Zelda: BOTW",
  "Zelda: Wind Waker",
  "Gris",
  "Rayman Origins",
  "Jusant",
  "Trine 2",
  "Alice Madness Return",
];

const hobbies = [
  { fr: "Dessin", en: "Drawing" },
  { fr: "Danse", en: "Dance" },
  { fr: "Écriture", en: "Writing" },
  { fr: "Craft", en: "Craft" },
  { fr: "Musique", en: "Music" },
  { fr: "Animation", en: "Animation" },
  { fr: "Sci-Fi", en: "Sci-Fi" },
  { fr: "Fantastique", en: "Fantasy" },
  { fr: "Horreur", en: "Horror" },
  { fr: "Nature et Science", en: "Nature & Science" },
];

export default function AboutContent({ locale }: { locale: "fr" | "en" }) {
  const t = useTranslations("about");

  return (
    <div className="about">
      {/* Hero */}
      <section className="about__hero">
        <ScrollReveal>
          <div className="about__photo-wrapper">
            <motion.div
              className="about__photo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src="https://jodiehann.wordpress.com/wp-content/uploads/2024/01/img_2896-1.jpg"
                alt="Jodie Hann"
                width={280}
                height={280}
                unoptimized
                className="about__photo-img"
              />
            </motion.div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <p className="about__label">{t("label")}</p>
          <GradientText as="h1" className="about__title">
            {t("title")}
          </GradientText>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="about__bio">{t("bio1")}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="about__bio">{t("bio2")}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="about__bio">{t("bio3")}</p>
        </ScrollReveal>
      </section>

      {/* CV */}
      <ScrollReveal>
        <section className="about__cv">
          <h2>{t("cv")}</h2>
          <div style={{ marginTop: "2rem" }}>
            <Button
              variant="primary"
              size="large"
              icon
              href="https://jodiehann.wordpress.com/wp-content/uploads/2025/01/hann_jodie_cv-1.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadIcon />
              {t("downloadCV")}
            </Button>
          </div>
        </section>
      </ScrollReveal>

      {/* Interests */}
      <section className="about__interests">
        <ScrollReveal>
          <h2 style={{ textAlign: "center", marginBottom: "3rem" }}>{t("interests")}</h2>
        </ScrollReveal>

        <div className="about__interests-category">
          <ScrollReveal>
            <p className="about__interests-label">{t("favoriteGames")}</p>
          </ScrollReveal>
          <div className="about__interests-tags">
            {favoriteGames.map((game, i) => (
              <ScrollReveal key={game} delay={i * 0.05}>
                <motion.span
                  className="about__interest-tag"
                  whileHover={{ y: -2, scale: 1.05 }}
                >
                  🎮 {game}
                </motion.span>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="about__interests-category">
          <ScrollReveal>
            <p className="about__interests-label">{t("hobbies")}</p>
          </ScrollReveal>
          <div className="about__interests-tags">
            {hobbies.map((hobby, i) => (
              <ScrollReveal key={hobby.en} delay={i * 0.05}>
                <motion.span
                  className="about__interest-tag"
                  whileHover={{ y: -2, scale: 1.05 }}
                >
                  {locale === "fr" ? hobby.fr : hobby.en}
                </motion.span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Extra links */}
      <ScrollReveal>
        <section className="about__extra">
          <h3>{t("moreWork")}</h3>
          <p style={{ color: "#6B7280", marginTop: "0.75rem", marginBottom: "1.5rem" }}>
            {t("moreWorkDesc")}
          </p>
          <Button
            variant="secondary"
            size="large"
            icon
            href="https://jodie-hann.itch.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("visitItchio")}
          </Button>
        </section>
      </ScrollReveal>

      {/* Contact */}
      <ScrollReveal>
        <section className="about__contact">
          <h2>{t("contact")}</h2>
          <div className="about__contact-grid">
            <a
              href="https://www.linkedin.com/in/jodie-hann-aba373220/"
              target="_blank"
              rel="noopener noreferrer"
              className="about__contact-item"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <a href="mailto:jodieml.hann@gmail.com" className="about__contact-item">
              <MailIcon />
              jodieml.hann@gmail.com
            </a>
            <a href="tel:+33659833037" className="about__contact-item">
              <PhoneIcon />
              06 59 83 30 37
            </a>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
