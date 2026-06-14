"use client";

/**
 * HeroMedia — looping muted background video for the home hero.
 *
 * • Reduced-motion: renders the poster image only (no autoplay).
 * • Full-motion: autoplay / muted / loop / playsInline so it works
 *   on iOS/Android without user interaction.
 * • The poster fills the frame while the video is buffering so there
 *   is never a blank moment.
 */

import { useReducedMotion } from "framer-motion";
import { asset } from "@/lib/asset";

export default function HeroMedia() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={asset("/hero-poster.jpg")}
        alt=""
        aria-hidden="true"
        className="hero-video absolute inset-0 w-full h-full object-cover"
      />
    );
  }

  return (
    <video
      src={asset("/hero-loop.mp4")}
      poster={asset("/hero-poster.jpg")}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      // `.hero-video` (globals.css) handles object-position + the responsive
      // crop scale: hard 1.85x on desktop to hide baked-in pillarbox bars,
      // eased to 1.12x on mobile (object-cover already crops the side bars)
      // so the subjects aren't over-cropped.
      className="hero-video absolute inset-0 w-full h-full object-cover"
    />
  );
}
