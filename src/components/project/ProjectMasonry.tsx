"use client";

import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface MasonryImage {
  src: string;
  alt?: string;
  width: number;
  height: number;
}

interface ProjectMasonryProps {
  images: MasonryImage[];
}

// A "Pinterest style" masonry: images keep their natural aspect ratio (no
// cropping) and flow into balanced columns, giving a scattered yet tidy layout
// well suited to a mix of landscape / portrait shots. Opens a fullscreen
// lightbox on click. Intrinsic width/height avoid layout shift.
export default function ProjectMasonry({ images }: ProjectMasonryProps) {
  if (images.length === 0) return null;

  return (
    <ScrollReveal className="project-masonry-wrap">
      <PhotoProvider>
        <div className="project-masonry">
          {images.map((img, i) => (
            <PhotoView key={i} src={img.src}>
              <div className="project-masonry__item">
                <Image
                  src={img.src}
                  alt={img.alt ?? ""}
                  width={img.width}
                  height={img.height}
                  sizes="(max-width: 768px) 50vw, 30vw"
                  unoptimized
                />
              </div>
            </PhotoView>
          ))}
        </div>
      </PhotoProvider>
    </ScrollReveal>
  );
}
