"use client";

import { Fragment, useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ArrowRightIcon, ArrowLeftIcon } from "@/components/ui/Icons";
import { ProjectStatus } from "@/types/project";

interface ProjectBentoProps {
  status: ProjectStatus;
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

export default function ProjectBento({
  status,
  teamLabel,
  roleLabel,
  engine,
  genres,
}: ProjectBentoProps) {
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
    <ScrollReveal className="project-bento">
      <div
        className="project-bento__strip"
        ref={stripRef}
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      >
        <div className="project-bento__col">
          <span className="project-bento__col-label">{t("statusLabel")}</span>
          <div className="project-bento__col-value">
            <span
              className="project-bento__dot"
              style={{ backgroundColor: STATUS_DOT[status] }}
            />
            {ts(status)}
          </div>
        </div>

        {teamLabel && (
          <div className="project-bento__col">
            <span className="project-bento__col-label">{t("teamShort")}</span>
            <div className="project-bento__col-value">{teamLabel}</div>
          </div>
        )}

        {roleLabel && (
          <div className="project-bento__col">
            <span className="project-bento__col-label">{t("mainRole")}</span>
            <div className="project-bento__col-value">{roleLabel}</div>
          </div>
        )}

        {engine && (
          <div className="project-bento__col">
            <span className="project-bento__col-label">{t("engine")}</span>
            <div className="project-bento__col-value">{engine}</div>
          </div>
        )}

        {genres && genres.length > 0 && (
          <div className="project-bento__col project-bento__col--genres">
            <span className="project-bento__col-label">{t("genres")}</span>
            <div className="project-bento__col-value project-bento__col-value--wrap">
              {genres.map((g, i) => (
                <Fragment key={g}>
                  {i > 0 && <span className="project-bento__sep">/</span>}
                  {g}
                </Fragment>
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        className="project-bento__scroll-hint project-bento__scroll-hint--left"
        aria-hidden="true"
        style={{ opacity: showLeft ? 1 : 0, pointerEvents: "none" }}
      >
        <ArrowLeftIcon />
      </div>

      <div
        className="project-bento__scroll-hint project-bento__scroll-hint--right"
        aria-hidden="true"
        style={{ opacity: showRight ? 1 : 0, pointerEvents: "none" }}
      >
        <ArrowRightIcon />
      </div>
    </ScrollReveal>
  );
}
