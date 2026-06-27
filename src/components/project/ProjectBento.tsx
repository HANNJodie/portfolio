"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ActivityIcon, UsersIcon, StarIcon, CogIcon } from "@/components/ui/Icons";
import { ProjectStatus } from "@/types/project";

interface ProjectBentoProps {
  status: ProjectStatus;
  teamLabel?: string;
  roleLabel?: string;
  engine?: string;
  genres?: string[];
}

const STATUS_DOT: Record<ProjectStatus, string> = {
  released: "#22C55E",
  "in-development": "#F59E0B",
  hiatus: "#9CA3AF",
  upcoming: "#06B6D4",
};

export default function ProjectBento({
  status,
  teamLabel,
  roleLabel,
  engine,
  genres,
}: ProjectBentoProps) {
  const t = useTranslations("projectPage");
  const ts = useTranslations("projects.status");

  const hasTech = Boolean(engine || (genres && genres.length > 0));

  return (
    <ScrollReveal className="project-bento">
      <div className={`project-bento__grid ${hasTech ? "" : "project-bento__grid--single"}`}>
        {/* Aperçu */}
        <div className="project-bento__card">
          <p className="project-bento__card-label">{t("overview")}</p>
          <div className="project-bento__rows">
            <div className="project-bento__row">
              <span className="project-bento__icon project-bento__icon--violet">
                <ActivityIcon />
              </span>
              <div className="project-bento__row-body">
                <p className="project-bento__row-label">{t("statusLabel")}</p>
                <p className="project-bento__row-value">
                  <span
                    className="project-bento__dot"
                    style={{ backgroundColor: STATUS_DOT[status] }}
                  />
                  {ts(status)}
                </p>
              </div>
            </div>

            {teamLabel && (
              <div className="project-bento__row">
                <span className="project-bento__icon project-bento__icon--pink">
                  <UsersIcon />
                </span>
                <div className="project-bento__row-body">
                  <p className="project-bento__row-label">{t("teamShort")}</p>
                  <p className="project-bento__row-value">{teamLabel}</p>
                </div>
              </div>
            )}

            {roleLabel && (
              <div className="project-bento__row">
                <span className="project-bento__icon project-bento__icon--cyan">
                  <StarIcon />
                </span>
                <div className="project-bento__row-body">
                  <p className="project-bento__row-label">{t("mainRole")}</p>
                  <p className="project-bento__row-value">{roleLabel}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Technique */}
        {hasTech && (
          <div className="project-bento__card project-bento__card--tech">
            <p className="project-bento__card-label">{t("technical")}</p>

            {engine && (
              <div className="project-bento__row">
                <span className="project-bento__icon project-bento__icon--amber">
                  <CogIcon />
                </span>
                <div className="project-bento__row-body">
                  <p className="project-bento__row-label">{t("engine")}</p>
                  <p className="project-bento__row-value">{engine}</p>
                </div>
              </div>
            )}

            {genres && genres.length > 0 && (
              <div className="project-bento__block">
                <p className="project-bento__block-label">{t("genres")}</p>
                <div className="project-bento__chips">
                  {genres.map((g) => (
                    <span key={g} className="project-bento__chip">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}
