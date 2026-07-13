"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { OpenInNewIcon, LinkedInIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

const EASE = [0.22, 1, 0.36, 1] as const;

const BASE_DELAY = 0.35;

// `useLayoutEffect` warns during SSR; fall back to `useEffect` on the server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Slide-in helper: enters along `axis` from `distance`, settles at origin.
const slideIn = (axis: "x" | "y", distance: number) => ({
  hidden: { opacity: 0, [axis]: distance },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: EASE, delay: BASE_DELAY } },
});

const fromBottom = (delay: number) => ({
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE, delay: BASE_DELAY + delay } },
});

// True below the desktop breakpoint (1024px). Starts at `false` so the first
// client render matches the server (which always assumes desktop), then reads
// the real viewport in a layout effect — before paint and before framer-motion
// starts the entrance — so the correct direction is captured without a
// hydration mismatch.
function useBelowDesktop() {
  const query = "(max-width: 1023.98px)";
  const [below, setBelow] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setBelow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return below;
}

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale() as "fr" | "en";
  const featured = projects.slice(0, 4);
  const belowDesktop = useBelowDesktop();

  // Below desktop: name drops from the top, photo slides from the left.
  // Desktop: name from the left, photo from the right.
  const identityVariants = belowDesktop ? slideIn("y", -40) : slideIn("x", -40);
  const photoVariants = belowDesktop ? slideIn("x", -40) : slideIn("x", 40);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__blob hero__blob--3" />
      </div>

      <div className="hero__bento">
        {/* Identity — slide from left */}
        <motion.div
          className="hero__card hero__card--identity"
          variants={identityVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <p className="hero__available">● {t("available")}</p>
            <h1 className="hero__name">{t("title")}.</h1>
            <p className="hero__tagline">{t("tagline")}</p>
          </div>
          <div className="hero__identity-footer">
            <p className="hero__role">{t("subtitle")}</p>
            <div className="hero__contact-links">
              <a
                href="https://www.linkedin.com/in/jodie-hann/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__contact-link"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
                <span className="hero__contact-label">in/jodie-hann</span>
              </a>
              <a
                href="mailto:jodieml.hann@gmail.com"
                className="hero__contact-link"
                aria-label="Email"
              >
                <MailIcon />
                <span className="hero__contact-label">jodieml.hann@gmail.com</span>
              </a>
              <a
                href="tel:+33659823037"
                className="hero__contact-link"
                aria-label="Téléphone"
              >
                <PhoneIcon />
                <span className="hero__contact-label">+33 6 59 82 30 37</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Photo — slide from right, same delay as identity */}
        <MotionLink
          href="/a-propos"
          className="hero__card hero__card--photo"
          variants={photoVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero__photo-frame">
            <Image
              src="/images/ME/photo_cv_test_4k.webp"
              alt="Jodie Hann"
              fill
              quality={100}
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="hero__photo-img hero__photo-img--mobile"
              style={{ objectFit: "cover", objectPosition: "center 10%" }}
            />
            <Image
              src="/images/ME/photo_cv_test_3_4k.webp"
              alt="Jodie Hann"
              fill
              quality={100}
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="hero__photo-img hero__photo-img--desktop"
              style={{ objectFit: "cover", objectPosition: "center 10%" }}
            />
            <div className="hero__photo-overlay" />
          </div>
          <span className="hero__photo-badge">● {t("ctaAbout")}</span>
          <span className="hero__photo-location">Lyon, FR</span>
          <div className="hero__photo-cta"><OpenInNewIcon /></div>
        </MotionLink>

        {/* Projects 1–3 — slide from bottom, staggered */}
        {featured.slice(0, 3).map((project, i) => (
          <MotionLink
            key={project.slug}
            href={`/projets/${project.slug}` as `/projets/${string}`}
            className={`hero__card hero__card--project hero__card--project-${i + 1}${i === 0 ? " hero__card--featured" : ""}`}
            variants={fromBottom(0.3 + i * 0.12)}
            initial="hidden"
            animate="visible"
          >
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              style={{ objectFit: "cover" }}
            />
            <div className="hero__project-overlay" />
            <span className="hero__project-num">
              {`0${i + 1}`}{i === 0 ? ` · ${t("featured")}` : ""}
            </span>
            <div className="hero__project-info">
              <h3 className="hero__project-title">{project.title}</h3>
              <p className="hero__project-tagline">{project.tagline[locale]}</p>
            </div>
          </MotionLink>
        ))}

        {/* Project 4 compact */}
        <MotionLink
          href={`/projets/${featured[3].slug}` as `/projets/${string}`}
          className="hero__card hero__card--project hero__card--compact"
          variants={fromBottom(0.3 + 3 * 0.12)}
          initial="hidden"
          animate="visible"
        >
          <Image
            src={featured[3].heroImage}
            alt={featured[3].title}
            fill
            sizes="(max-width: 1024px) 50vw, 20vw"
            style={{ objectFit: "cover" }}
          />
          <div className="hero__project-overlay" />
          <span className="hero__project-num">04</span>
          <div className="hero__project-info">
            <h3 className="hero__project-title">{featured[3].title}</h3>
            <p className="hero__project-tagline">{featured[3].tagline[locale]}</p>
          </div>
        </MotionLink>

        {/* CTA */}
        <motion.button
          className="hero__card hero__card--cta"
          onClick={scrollToProjects}
          variants={fromBottom(0.3 + 4 * 0.12)}
          initial="hidden"
          animate="visible"
        >
          <p className="hero__cta-text">{t("ctaAll")}</p>
          <span className="hero__cta-count">{projects.length}&thinsp;&thinsp;→</span>
          <div className="hero__cta-arrow"><OpenInNewIcon /></div>
        </motion.button>
      </div>
    </section>
  );
}
