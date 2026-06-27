"use client";

import { ReactNode, CSSProperties } from "react";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ProjectImage {
  src: string;
  alt?: string;
}

interface ProjectImagesProps {
  images: ProjectImage[];
  credit?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

// A flexible image block: a single image spans full width, two or more lay out
// in a responsive grid. Images open in a fullscreen lightbox (react-photo-view),
// with navigation between the images of the block. An optional credit caption
// sits below. Pass `style` (e.g. { paddingTop }) to fine-tune spacing per block.
export default function ProjectImages({ images, credit, className = "", style }: ProjectImagesProps) {
  if (images.length === 0) return null;

  return (
    <ScrollReveal className={`project-images ${className}`.trim()} style={style}>
      <PhotoProvider>
        <div className="project-images__grid">
          {images.map((img, i) => (
            <PhotoView key={i} src={img.src}>
              <div className="project-images__item">
                <Image
                  src={img.src}
                  alt={img.alt ?? ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </div>
            </PhotoView>
          ))}
        </div>
      </PhotoProvider>
      {credit && <p className="project-images__credit">{credit}</p>}
    </ScrollReveal>
  );
}
