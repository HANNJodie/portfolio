"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ProjectImageProps {
  src: string;
  alt: string;
  variant?: "full" | "contained";
}

export default function ProjectImage({ src, alt, variant = "contained" }: ProjectImageProps) {
  return (
    <ScrollReveal>
      <div
        className={
          variant === "full"
            ? "project-page__image--full"
            : "project-page__image--contained"
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={variant === "full" ? "100vw" : "(max-width: 900px) 100vw, 900px"}
          style={{ objectFit: "cover" }}
          unoptimized
        />
      </div>
    </ScrollReveal>
  );
}
