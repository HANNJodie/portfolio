"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { projects } from "@/data/projects";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale() as "fr" | "en";
  const featured = projects.slice(0, 4);

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
        {/* Identity */}
        <div className="hero__card hero__card--identity">
          <div>
            <p className="hero__available">● Disponible</p>
            <h1 className="hero__name">{t("title")}.</h1>
            <p className="hero__tagline">{t("tagline")}</p>
          </div>
          <div className="hero__identity-footer">
            <p className="hero__role">{t("subtitle")}</p>
          </div>
        </div>

        {/* Photo card */}
        <Link href="/a-propos" className="hero__card hero__card--photo">
          <div className="hero__photo-frame">
            <Image
              src="https://jodiehann.wordpress.com/wp-content/uploads/2024/01/img_2896-1.jpg"
              alt="Jodie Hann"
              fill
              sizes="(max-width: 1024px) 50vw, 20vw"
              style={{ objectFit: "cover", objectPosition: "center top" }}
              unoptimized
            />
            <div className="hero__photo-overlay" />
          </div>
          <span className="hero__photo-badge">● À propos de moi</span>
          <span className="hero__photo-location">Lyon, FR</span>
          <div className="hero__photo-cta">↗</div>
        </Link>

        {/* Projects 1–3 */}
        {featured.slice(0, 3).map((project, i) => (
          <Link
            key={project.slug}
            href={`/projets/${project.slug}` as `/projets/${string}`}
            className={`hero__card hero__card--project hero__card--project-${i + 1}${i === 0 ? " hero__card--featured" : ""}`}
          >
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              style={{ objectFit: "cover" }}
              unoptimized
            />
            <div className="hero__project-overlay" />
            <span className="hero__project-num">
              {`0${i + 1}`}{i === 0 ? " · FEATURED" : ""}
            </span>
            <div className="hero__project-info">
              <h3 className="hero__project-title">{project.title}</h3>
              <p className="hero__project-tagline">{project.tagline[locale]}</p>
            </div>
          </Link>
        ))}

        {/* Project 4 compact */}
        <Link
          href={`/projets/${featured[3].slug}` as `/projets/${string}`}
          className="hero__card hero__card--project hero__card--compact"
        >
          <Image
            src={featured[3].heroImage}
            alt={featured[3].title}
            fill
            sizes="(max-width: 1024px) 50vw, 20vw"
            style={{ objectFit: "cover" }}
            unoptimized
          />
          <div className="hero__project-overlay" />
          <span className="hero__project-num">04</span>
          <div className="hero__project-info">
            <h3 className="hero__project-title">{featured[3].title}</h3>
            <p className="hero__project-tagline">{featured[3].tagline[locale]}</p>
          </div>
        </Link>

        {/* CTA */}
        <button className="hero__card hero__card--cta" onClick={scrollToProjects}>
          <p className="hero__cta-text">Voir tous mes projets</p>
          <span className="hero__cta-count">{projects.length}&thinsp;→</span>
          <div className="hero__cta-arrow">↗</div>
        </button>
      </div>
    </section>
  );
}
