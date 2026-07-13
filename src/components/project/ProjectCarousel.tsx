"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icons";

interface CarouselImage {
  src: string;
  alt?: string;
}

interface ProjectCarouselProps {
  images: CarouselImage[];
}

// A one-slide-at-a-time, scroll-snapping carousel (16:9-ish wide slides) with
// prev/next arrows and dot indicators. Slides open in a fullscreen lightbox.
export default function ProjectCarousel({ images }: ProjectCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const slideWidth = track.clientWidth;
      if (slideWidth === 0) return;
      setActive(Math.round(track.scrollLeft / slideWidth));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, images.length - 1));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <ScrollReveal className="project-carousel">
      <PhotoProvider>
        <div className="project-carousel__viewport">
          <div className="project-carousel__track" ref={trackRef}>
            {images.map((img, i) => (
              <PhotoView key={i} src={img.src}>
                <div className="project-carousel__slide">
                  <Image
                    src={img.src}
                    alt={img.alt ?? ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 900px"
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </div>
              </PhotoView>
            ))}
          </div>

          <button
            type="button"
            className="project-carousel__arrow project-carousel__arrow--prev"
            onClick={() => scrollToIndex(active - 1)}
            disabled={active === 0}
            aria-label="Précédent"
          >
            <ArrowLeftIcon />
          </button>
          <button
            type="button"
            className="project-carousel__arrow project-carousel__arrow--next"
            onClick={() => scrollToIndex(active + 1)}
            disabled={active === images.length - 1}
            aria-label="Suivant"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </PhotoProvider>

      <div className="project-carousel__dots">
        {images.map((_, i) => (
          <button
            type="button"
            key={i}
            className={`project-carousel__dot${i === active ? " is-active" : ""}`}
            onClick={() => scrollToIndex(i)}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>
    </ScrollReveal>
  );
}
