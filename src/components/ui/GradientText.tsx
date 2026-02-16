"use client";

import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  className?: string;
}

export default function GradientText({
  children,
  as: Tag = "span",
  className = "",
}: GradientTextProps) {
  return <Tag className={`text-gradient ${className}`}>{children}</Tag>;
}
