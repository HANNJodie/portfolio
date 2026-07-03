"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
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

  return (
    <ScrollReveal className="project-bento">
      <div className="project-bento__strip">
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
    </ScrollReveal>
  );
}
