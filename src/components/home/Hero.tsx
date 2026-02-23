"use client";

import { useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { projects } from "@/data/projects";

// Pre-defined bubble positions spread across the hero
const BUBBLE_SLOTS = [
  { top: "13%", left: "10%", size: 190 },
  { top: "10%", right: "6%", size: 110 },
  { bottom: "30%", left: "25%", size: 200 },
  { top: "55%", right: "3%", size: 120 },
  { bottom: "18%", left: "8%", size: 115 },
  { bottom: "12%", right: "12%", size: 105 },
  { top: "12%", left: "35%", size: 100 },
  { bottom: "28%", right: "22%", size: 85 },
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Hero() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);

  // Randomize project images once on mount
  const bubbleImages = useMemo(() => {
    const images = shuffleArray(projects.map((p) => p.heroImage));
    return BUBBLE_SLOTS.map((slot, i) => ({
      ...slot,
      src: images[i % images.length],
      delay: i === 0 ? 0.5 : i * 0.8,
    }));
  }, []);

  const subtitleText = t("subtitle");

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate text first (faster)
    tl.fromTo(
      ".hero__subtitle",
      { opacity: 0 },
      { opacity: 1, duration: 0.2 }
    )
      .fromTo(
        ".hero__subtitle-letter",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.25,
          stagger: 0.02,
          ease: "back.out(1.7)",
        },
        "-=0.1"
      )
      .fromTo(
        ".hero__title",
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5 },
        "-=0.15"
      )
      .fromTo(
        ".hero__description",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35 },
        "-=0.2"
      )
      .fromTo(
        ".hero__cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3 },
        "-=0.15"
      )
      // Then animate bubbles and portrait
      .fromTo(
        ".hero__bubble",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.4)",
        },
        "+=1"
      )
      .fromTo(
        ".hero__portrait",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.2)" },
        "-=0.4"
      )
      .fromTo(
        ".hero__scroll-indicator",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.3"
      );
  }, { scope: containerRef });

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero" ref={containerRef}>
      <div className="hero__bg">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__blob hero__blob--3" />
      </div>

      {/* Floating project image bubbles */}
      <div className="hero__bubbles" aria-hidden="true">
        {bubbleImages.map((bubble, i) => {
          const posStyle: React.CSSProperties = {
            top: bubble.top,
            left: bubble.left,
            right: bubble.right,
            bottom: bubble.bottom,
            width: bubble.size,
            height: bubble.size,
            animationDelay: `${bubble.delay}s`,
          };
          return (
            <div
              key={i}
              className={`hero__bubble hero__bubble--${i + 1}`}
              style={{ ...posStyle, opacity: 0 }}
            >
              <Image
                src={bubble.src}
                alt=""
                fill
                sizes={`${bubble.size}px`}
                style={{ objectFit: "cover" }}
                unoptimized
              />
            </div>
          );
        })}

        {/* Static portrait bubble */}
        <div className="hero__portrait" style={{ opacity: 0 }}>
          <Image
            src="https://jodiehann.wordpress.com/wp-content/uploads/2024/01/img_2896-1.jpg"
            alt="Jodie Hann"
            fill
            sizes="160px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className="hero__content">
        <p className="hero__subtitle" style={{ opacity: 0 }}>
          {subtitleText.split("").map((char, i) => (
            <span
              key={i}
              className="hero__subtitle-letter"
              style={{ opacity: 0 }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>
        <h1 className="hero__title" style={{ opacity: 0 }}>
          {t("title")}
        </h1>
        <p className="hero__description" style={{ opacity: 0 }}>
          {t("description")}
        </p>
        <div className="hero__cta" style={{ opacity: 0 }}>
          <Button variant="primary" size="large" icon onClick={scrollToProjects}>
            {t("cta")}
          </Button>
          <Link href="/a-propos" className="btn btn--secondary btn--large">
            {t("ctaAbout")}
          </Link>
        </div>
      </div>

      <div className="hero__scroll-indicator" style={{ opacity: 0 }}>
        {t("scroll")}
      </div>
    </section>
  );
}
