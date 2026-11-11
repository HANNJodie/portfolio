"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    instgrm?: { Embeds: { process(): void } };
  }
}

interface ProjectInstagramProps {
  url: string;
  // Link text shown until Instagram's script swaps in the post.
  fallback: string;
}

// Official Instagram embed: embed.js turns the blockquote into an iframe that
// sizes itself to the post (a plain iframe can't know its own height).
export default function ProjectInstagram({ url, fallback }: ProjectInstagramProps) {
  // embed.js only scans the page when it first loads: re-run it when this
  // component mounts again after a client-side navigation.
  useEffect(() => {
    window.instgrm?.Embeds.process();
  }, [url]);

  return (
    <div className="project-instagram">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={url}
        data-instgrm-version="14"
      >
        <a href={url} target="_blank" rel="noopener noreferrer">
          {fallback}
        </a>
      </blockquote>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => window.instgrm?.Embeds.process()}
      />
    </div>
  );
}
