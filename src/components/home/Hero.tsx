"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/routing";

export default function Hero() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".hero__subtitle",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
      .fromTo(
        ".hero__title",
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 },
        "-=0.3"
      )
      .fromTo(
        ".hero__description",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        ".hero__cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        ".hero__scroll-indicator",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.1"
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

      <div className="hero__content">
        <p className="hero__subtitle" style={{ opacity: 0 }}>
          {t("subtitle")}
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
