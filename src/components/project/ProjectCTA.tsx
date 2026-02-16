"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ExternalLinkIcon, DownloadIcon } from "@/components/ui/Icons";
import { useTranslations } from "next-intl";
import { ProjectDownloadable, ProjectSocialLink } from "@/types/project";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ProjectCTAProps {
  ctaLabel?: string;
  ctaUrl?: string;
  socialLinks?: ProjectSocialLink[];
  downloadables?: ProjectDownloadable[];
}

export default function ProjectCTA({
  ctaLabel,
  ctaUrl,
  socialLinks,
  downloadables,
}: ProjectCTAProps) {
  const t = useTranslations("projectPage");

  const hasContent = ctaUrl || (socialLinks && socialLinks.length > 0) || (downloadables && downloadables.length > 0);
  if (!hasContent) return null;

  return (
    <ScrollReveal>
      <div className="project-page__content">
        {ctaUrl && ctaLabel && (
          <div className="project-page__cta">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="primary"
                size="large"
                icon
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ctaLabel}
              </Button>
            </motion.div>
          </div>
        )}

        {downloadables && downloadables.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
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
          <div style={{ marginTop: "2rem" }}>
            <p className="project-page__section-label">{t("links")}</p>
            <div className="project-page__social-links">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-page__social-link"
                >
                  <ExternalLinkIcon />
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}
