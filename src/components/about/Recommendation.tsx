"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { LinkedInGlyph, OpenInNewIcon } from "@/components/ui/Icons";

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export default function Recommendation() {
  const t = useTranslations("about.recommendation");

  return (
    <section className="about__section" aria-label={t("eyebrow")}>
      <motion.article
        className="rec"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Giant gradient quotation mark — the signature anchor */}
        <span className="rec__quote" aria-hidden>&ldquo;</span>

        <header className="rec__head">
          <span className="rec__badge" aria-hidden>
            <LinkedInGlyph />
          </span>
          <span className="rec__eyebrow">{t("eyebrow")}</span>
        </header>

        <div className="rec__body">
          <p className="rec__para">{t("body1")}</p>
          <p className="rec__para">{t("body2")}</p>
          <p className="rec__highlight">{t("highlight")}</p>
        </div>

        <footer className="rec__footer">
          <div className="rec__author">
            <span className="rec__avatar">
              <Image
                src="/images/nicolai-maldavsky.jpg"
                alt={t("name")}
                fill
                sizes="56px"
                style={{ objectFit: "cover" }}
              />
              <span className="rec__avatar-badge" aria-hidden>
                <LinkedInGlyph />
              </span>
            </span>

            <div className="rec__author-meta">
              <span className="rec__name">{t("name")}</span>
              <span className="rec__role">{t("role")}</span>
              <span className="rec__relation">{t("relation")} · {t("date")}</span>
            </div>
          </div>

          <a
            href="https://www.linkedin.com/in/jodie-hann/"
            target="_blank"
            rel="noopener noreferrer"
            className="rec__link"
          >
            <span>{t("link")}</span>
            <OpenInNewIcon />
          </a>
        </footer>
      </motion.article>
    </section>
  );
}
