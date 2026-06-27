"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const t = useTranslations("projectPage");

  if (images.length === 0) return null;

  return (
    <ScrollReveal className="project-section">
      <p className="project-section__label">{t("gallery")}</p>
      <div className="project-gallery">
        {images.map((img, i) => (
          <div key={i} className="project-gallery__item">
            <Image
              src={img}
              alt={`${title} screenshot ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              style={{ objectFit: "cover" }}
              unoptimized
            />
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}
