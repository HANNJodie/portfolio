"use client";

import { ReactNode } from "react";
import { ArrowRightIcon } from "./Icons";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "large";
  icon?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "default",
  icon = false,
  href,
  onClick,
  className = "",
  target,
  rel,
}: ButtonProps) {
  const classes = `btn btn--${variant} ${size === "large" ? "btn--large" : ""} ${
    icon ? "btn--icon" : ""
  } ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel} onClick={onClick}>
        {children}
        {icon && <ArrowRightIcon />}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
      {icon && <ArrowRightIcon />}
    </button>
  );
}
