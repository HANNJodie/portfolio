"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon, ExternalLinkIcon, DownloadIcon } from "@/components/ui/Icons";
import { useTranslations } from "next-intl";
import { ProjectDownloadable, ProjectSocialLink } from "@/types/project";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ProjectCTAProps {
  ctaLabel?: string;
  ctaUrl?: string;
  note?: string;
  socialLinks?: ProjectSocialLink[];
  downloadables?: ProjectDownloadable[];
}

export default function ProjectCTA({
  ctaLabel,
  ctaUrl,
  note,
  socialLinks,
  downloadables,
}: ProjectCTAProps) {
  const t = useTranslations("projectPage");

  const hasContent =
    (ctaUrl && ctaLabel) ||
    (socialLinks && socialLinks.length > 0) ||
    (downloadables && downloadables.length > 0);
  if (!hasContent) return null;

  return (
    <ScrollReveal className="project-final">
      {ctaUrl && ctaLabel && (
        <div className="project-final__cta">
          {note && <p className="project-final__note">{note}</p>}
          <motion.a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-final__button"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {ctaLabel}
            <ArrowRightIcon />
          </motion.a>
        </div>
      )}

      {downloadables && downloadables.length > 0 && (
        <div className="project-final__downloads">
          {downloadables.map((dl, i) => (
            <a
              key={i}
              href={dl.url}
              target="_blank"
              rel="noopener noreferrer"
              className="download-block"
            >
              <div className="download-block__icon">
                <DownloadIcon />
              </div>
              <div className="download-block__info">
                <span className="download-block__label">{dl.label}</span>
                {dl.type && <span className="download-block__type">{dl.type}</span>}
              </div>
            </a>
          ))}
        </div>
      )}

      {socialLinks && socialLinks.length > 0 && (
        <div className="project-final__social">
          <p className="project-section__label">{t("links")}</p>
          <div className="project-final__social-links">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-final__social-link"
              >
                <ExternalLinkIcon />
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      )}
    </ScrollReveal>
  );
}
