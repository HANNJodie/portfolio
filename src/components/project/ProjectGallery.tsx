"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
    <ScrollReveal>
      <div className="project-page__content" style={{ paddingBottom: 0, paddingTop: 0 }}>
        <p className="project-page__section-label">{t("gallery")}</p>
        <div className="project-page__gallery">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="project-page__gallery-item"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ position: "relative" }}
            >
              <Image
                src={img}
                alt={`${title} screenshot ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                unoptimized
              />
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
