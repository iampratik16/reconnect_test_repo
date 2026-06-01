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
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ transform: "scale(1.85)", transformOrigin: "center center" }}
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
      preload="auto"
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover object-center"
      // Source video has baked-in black pillarbox bars around a
      // portrait-oriented subject — we crop them out with a hard
      // scale-up. Adjust the multiplier if the bars return after
      // swapping the source file.
      style={{ transform: "scale(1.85)", transformOrigin: "center center" }}
    />
  );
}
