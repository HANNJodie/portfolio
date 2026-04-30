"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { LinkedInIcon, MailIcon, PhoneIcon, DownloadIcon, OpenInNewIcon } from "@/components/ui/Icons";

const EASE = [0.22, 1, 0.36, 1] as const;
const BASE_DELAY = 0.35;

const fromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE, delay: BASE_DELAY } },
};

const fromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE, delay: BASE_DELAY } },
};

const fromBottom = (delay: number) => ({
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE, delay: BASE_DELAY + delay } },
});

const favoriteGames = [
  "Zelda: BOTW",
  "Zelda: Wind Waker",
  "Gris",
  "Rayman Origins",
  "Jusant",
  "Trine 2",
  "Alice Madness Return",
  "Tomb Raider (2016)",
  "Castle Crashers",
  "Honkai: Star Rail",
  "The Last of Us",
  "Minecraft",
  "Control",
  "Little Nightmares"
];

const hobbies = [
  { fr: "Dessin", en: "Drawing", emoji: "✏️" },
  { fr: "Danse", en: "Dance", emoji: "💃" },
  { fr: "Écriture", en: "Writing", emoji: "📝" },
  { fr: "Craft", en: "Craft", emoji: "✂️" },
  { fr: "Musique", en: "Music", emoji: "🎵" },
  { fr: "Cinéma", en: "Cinema", emoji: "🎬" },
  { fr: "Sci-Fi", en: "Sci-Fi", emoji: "🚀" },
  { fr: "Fantastique", en: "Fantasy", emoji: "🧙" },
  { fr: "Horreur", en: "Horror", emoji: "👻" },
  { fr: "Nature et Science", en: "Nature & Science", emoji: "🌿" },
];

export default function AboutContent({ locale }: { locale: "fr" | "en" }) {
  const t = useTranslations("about");

  return (
    <div className="about">
      {/* Aurora blobs */}
      <div className="about__bg" aria-hidden>
        <div className="about__blob about__blob--1" />
        <div className="about__blob about__blob--2" />
        <div className="about__blob about__blob--3" />
      </div>

      {/* ── Bento 1 : Identity ─────────────────────────────────── */}
      <section className="about__section">
        <div className="about__bento about__bento--intro">
          {/* Photo */}
          <motion.div
            className="about__card about__card--photo"
            variants={fromLeft}
            initial="hidden"
            animate="visible"
          >
            <div className="about__photo-frame">
              <Image
                src="https://jodiehann.wordpress.com/wp-content/uploads/2024/01/img_2896-1.jpg"
                alt="Jodie Hann"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
              <div className="about__photo-overlay" />
            </div>
            <span className="about__photo-badge">● {t("label")}</span>
            <span className="about__photo-location">Lyon, FR</span>
          </motion.div>

          {/* Identity */}
          <motion.div
            className="about__card about__card--identity"
            variants={fromRight}
            initial="hidden"
            animate="visible"
          >
            <p className="about__label">{t("label")}</p>
            <h1 className="about__title">{t("title")}</h1>
            <p className="about__bio about__bio--lead">{t("bio1")}</p>
          </motion.div>

          {/* Bio 2 */}
          <motion.div
            className="about__card about__card--bio about__card--bio-2"
            variants={fromBottom(0.3)}
            initial="hidden"
            animate="visible"
          >
            <span className="about__card-num">02</span>
            <p className="about__bio">{t("bio2")}</p>
          </motion.div>

          {/* Bio 3 */}
          <motion.div
            className="about__card about__card--bio about__card--bio-3"
            variants={fromBottom(0.42)}
            initial="hidden"
            animate="visible"
          >
            <span className="about__card-num">03</span>
            <p className="about__bio">{t("bio3")}</p>
          </motion.div>
        </div>
      </section>

      {/* ── Bento 2 : CV + Interests ───────────────────────────── */}
      <section className="about__section">
        <div className="about__bento about__bento--skills">
          {/* CV — dark gradient hero card */}
          <motion.a
            href="https://jodiehann.wordpress.com/wp-content/uploads/2025/01/hann_jodie_cv-1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="about__card about__card--cv"
            variants={fromBottom(0.54)}
            initial="hidden"
            animate="visible"
          >
            <div className="about__cv-glow" aria-hidden />
            <span className="about__card-eyebrow">{t("cv")}</span>
            <h2 className="about__card-title">{t("downloadCV")}</h2>
            <div className="about__cv-action">
              <DownloadIcon />
              <span>PDF</span>
            </div>
          </motion.a>

          {/* Itch.io */}
          <motion.a
            href="https://jodie-hann.itch.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="about__card about__card--itch"
            variants={fromBottom(0.66)}
            initial="hidden"
            animate="visible"
          >
            <span className="about__card-eyebrow">{t("moreWork")}</span>
            <h3 className="about__card-title">{t("itchioPage")}</h3>
            <p className="about__card-desc">{t("moreWorkDesc")}</p>
            <div className="about__itch-arrow"><OpenInNewIcon /></div>
          </motion.a>

          {/* Games */}
          <motion.div
            className="about__card about__card--games"
            variants={fromBottom(0.78)}
            initial="hidden"
            animate="visible"
          >
            <span className="about__card-eyebrow">{t("favoriteGames")}</span>
            <div className="about__tags">
              {favoriteGames.map((game) => (
                <span key={game} className="about__tag about__tag--game">
                  <span className="about__tag-icon">🎮</span>
                  {game}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Hobbies */}
          <motion.div
            className="about__card about__card--hobbies"
            variants={fromBottom(0.9)}
            initial="hidden"
            animate="visible"
          >
            <span className="about__card-eyebrow">{t("hobbies")}</span>
            <div className="about__tags">
              {hobbies.map((hobby) => (
                <span key={hobby.en} className="about__tag">
                  <span className="about__tag-icon">{hobby.emoji}</span>
                  {locale === "fr" ? hobby.fr : hobby.en}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Bento 3 : Contact ──────────────────────────────────── */}
      <section className="about__section about__section--contact">
        <div className="about__bento about__bento--contact">
          <motion.div
            className="about__card about__card--contact-title"
            variants={fromLeft}
            initial="hidden"
            animate="visible"
          >
            <span className="about__card-eyebrow">{t("contact")}</span>
            <h2 className="about__card-title">
              {locale === "fr" ? "Travaillons ensemble." : "Let's work together."}
            </h2>
          </motion.div>

          <motion.a
            href="https://www.linkedin.com/in/jodie-hanndan/"
            target="_blank"
            rel="noopener noreferrer"
            className="about__card about__card--contact about__card--contact-linkedin"
            variants={fromBottom(1.02)}
            initial="hidden"
            animate="visible"
          >
            <div className="about__contact-info">
              <LinkedInIcon />
              <div>
                <span className="about__contact-label">LinkedIn</span>
                <span className="about__contact-value">in/jodie-hann</span>
              </div>
            </div>
            <div className="about__contact-arrow"><OpenInNewIcon /></div>
          </motion.a>

          <motion.a
            href="mailto:jodieml.hann@gmail.com"
            className="about__card about__card--contact about__card--contact-mail"
            variants={fromBottom(1.14)}
            initial="hidden"
            animate="visible"
          >
            <div className="about__contact-info">
              <MailIcon />
              <div>
                <span className="about__contact-label">Email</span>
                <span className="about__contact-value">jodieml.hann@gmail.com</span>
              </div>
            </div>
            <div className="about__contact-arrow"><OpenInNewIcon /></div>
          </motion.a>

          <motion.a
            href="tel:+33659823037"
            className="about__card about__card--contact about__card--contact-phone"
            variants={fromBottom(1.26)}
            initial="hidden"
            animate="visible"
          >
            <div className="about__contact-info">
              <PhoneIcon />
              <div>
                <span className="about__contact-label">{locale === "fr" ? "Téléphone" : "Phone"}</span>
                <span className="about__contact-value">06 59 82 30 37</span>
              </div>
            </div>
            <div className="about__contact-arrow"><OpenInNewIcon /></div>
          </motion.a>
        </div>
      </section>
    </div>
  );
}
