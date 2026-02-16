"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectHeroProps {
  title: string;
  tagline: string;
  date: string;
  heroImage: string;
}

export default function ProjectHero({ title, tagline, date, heroImage }: ProjectHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;

    // Parallax effect on hero image
    gsap.to(".project-page__hero img", {
      y: 80,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Text reveal
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      ".project-page__hero-tagline",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.2 }
    )
      .fromTo(
        ".project-page__hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.3"
      )
      .fromTo(
        ".project-page__hero-date",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      );
  }, { scope: heroRef });

  return (
    <div className="project-page__hero" ref={heroRef}>
      <Image
        src={heroImage}
        alt={title}
        fill
        style={{ objectFit: "cover" }}
        priority
        unoptimized
      />
      <div className="project-page__hero-overlay">
        <p className="project-page__hero-tagline" style={{ opacity: 0 }}>
          {tagline}
        </p>
        <h1 className="project-page__hero-title" style={{ opacity: 0 }}>
          {title}
        </h1>
        <p className="project-page__hero-date" style={{ opacity: 0 }}>
          {date}
        </p>
      </div>
    </div>
  );
}
