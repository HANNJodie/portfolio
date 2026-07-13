"use client";

import { Fragment, useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ArrowRightIcon, ArrowLeftIcon } from "@/components/ui/Icons";
import { ProjectStatus } from "@/types/project";

interface ProjectInfoStripProps {
  status: ProjectStatus;
  // Overrides the translated status text (the `status` prop still drives the dot color).
  statusLabel?: string;
  devPeriod?: string;
  teamLabel?: string;
  roleLabel?: string;
  engine?: string;
  genres?: string[];
}

const STATUS_DOT: Record<ProjectStatus, string> = {
  released: "#06B6D4",
  "in-development": "#7C3AED",
  hiatus: "#F59E0B",
  upcoming: "#EC4899",
};

function getMask(showLeft: boolean, showRight: boolean): string {
  if (showLeft && showRight)
    return "linear-gradient(to right, transparent 0%, black 15%, black 75%, transparent 100%)";
  if (showLeft)
    return "linear-gradient(to right, transparent 0%, black 15%)";
  if (showRight)
    return "linear-gradient(to right, black 75%, transparent 100%)";
  return "none";
}

export default function ProjectInfoStrip({
  status,
  statusLabel,
  devPeriod,
  teamLabel,
  roleLabel,
  engine,
  genres,
}: ProjectInfoStripProps) {
  const t = useTranslations("projectPage");
  const ts = useTranslations("projects.status");
  const stripRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const check = () => {
      const { scrollLeft, clientWidth, scrollWidth } = strip;
      setShowLeft(scrollLeft > 4);
      setShowRight(scrollLeft + clientWidth < scrollWidth - 4);
    };

    check();
    strip.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      strip.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const mask = getMask(showLeft, showRight);

  return (
    <ScrollReveal className="project-info-strip">
      <div
        className="project-info-strip__strip"
        ref={stripRef}
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      >
        <div className="project-info-strip__col">
          <span className="project-info-strip__col-label">{t("statusLabel")}</span>
          <div className="project-info-strip__col-value">
            <span
              className="project-info-strip__dot"
              style={{ backgroundColor: STATUS_DOT[status] }}
            />
            {statusLabel ?? ts(status)}
          </div>
        </div>

        {devPeriod && (
            <div className="project-info-strip__col">
              <span className="project-info-strip__col-label">{t("devPeriod")}</span>
              <div className="project-info-strip__col-value">{devPeriod}</div>
            </div>
        )}

        {teamLabel && (
          <div className="project-info-strip__col">
            <span className="project-info-strip__col-label">{t("teamShort")}</span>
            <div className="project-info-strip__col-value">{teamLabel}</div>
          </div>
        )}

        {roleLabel && (
          <div className="project-info-strip__col">
            <span className="project-info-strip__col-label">{t("mainRole")}</span>
            <div className="project-info-strip__col-value">{roleLabel}</div>
          </div>
        )}

        {engine && (
          <div className="project-info-strip__col">
            <span className="project-info-strip__col-label">{t("engine")}</span>
            <div className="project-info-strip__col-value">{engine}</div>
          </div>
        )}

        {genres && genres.length > 0 && (
          <div className="project-info-strip__col project-info-strip__col--genres">
            <span className="project-info-strip__col-label">{t("genres")}</span>
            <div className="project-info-strip__col-value project-info-strip__col-value--wrap">
              {genres.map((g, i) => (
                <Fragment key={g}>
                  {i > 0 && <span className="project-info-strip__sep">/</span>}
                  {g}
                </Fragment>
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        className="project-info-strip__scroll-hint project-info-strip__scroll-hint--left"
        aria-hidden="true"
        style={{ opacity: showLeft ? 1 : 0, pointerEvents: "none" }}
      >
        <ArrowLeftIcon />
      </div>

      <div
        className="project-info-strip__scroll-hint project-info-strip__scroll-hint--right"
        aria-hidden="true"
        style={{ opacity: showRight ? 1 : 0, pointerEvents: "none" }}
      >
        <ArrowRightIcon />
      </div>
    </ScrollReveal>
  );
}
