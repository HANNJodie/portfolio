"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export default function SectionTitle({
  label,
  title,
  subtitle,
  center = true,
  className = "",
}: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const elements = ref.current.querySelectorAll(".section-title__el");
    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      }
    );
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className={className}
      style={{ textAlign: center ? "center" : "left" }}
    >
      {label && (
        <motion.p
          className="section-title__el"
          style={{
            fontFamily: "var(--font-clash)",
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#7C3AED",
            marginBottom: "1rem",
            opacity: 0,
          }}
        >
          {label}
        </motion.p>
      )}
      <h2
        className="section-title__el"
        style={{ opacity: 0 }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="section-title__el"
          style={{
            color: "#6B7280",
            marginTop: "0.75rem",
            fontSize: "1.125rem",
            opacity: 0,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
