"use client";

/**
 * SpineTransform — the human visual centerpiece of the Built-for-Prevention
 * section. (Name kept for import stability; the visual is a person mid-movement,
 * not a clinical spine — the spine read too medical.)
 *
 * A sticky figure of a real person mid controlled squat — prevention as
 * something you DO, not pain you wait out. As the reader scrolls the (taller)
 * copy column past it, the light on the body shifts EFFORT → EARNED STRENGTH:
 * a warm red wash of strain/load ("NOW") resolves into a calm blue wash down an
 * aligned, capable spine ("10 YEARS"). A subtle brightness ramp + scale make the
 * "strong" state cinematically arrive.
 *
 * One clean Vertex still (mid-squat, M2) carries it; the red→blue story is a
 * scroll-driven mix-blend colour overlay in code, because Imagen reliably drops
 * "soft coloured glow on the body" on a detailed front action shot. Doing it in
 * CSS = perfectly matched (one base image, zero crossfade flicker) and tunable
 * to brand tokens.
 *
 * Still: scripts/gen-prevent-movement.mjs → /public/prevent/movement/.
 *
 * Reduced-motion: renders the resolved "strength" (blue) state statically.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { asset } from "@/lib/asset";

const STILL = asset("/prevent/movement/M2-strength.png");

// Brand-token washes for the two ends of the morph. soft-light over the photo
// tints light/shadow without flattening the subject — reads as coloured light.
const STRAIN_WASH = "rgba(199, 91, 57, 0.55)"; // warm effort/load — "NOW"
const STRENGTH_WASH = "rgba(0, 100, 224, 0.45)"; // calm clay-blue strength — "10 YEARS"

export default function SpineTransform() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Track the figure from when its top hits ~80% down the viewport until it has
  // scrolled to ~20% — that window is the full strain→ease arc.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  // Scroll-driven colour story: warm RED effort/load → calm BLUE strength. The
  // two washes crossfade (strain fades out, strength fades in) over the same
  // scroll window. The strength wash is the resolved base so the section always
  // lands on "strong" even if scroll math is slightly off.
  const strainOpacity = useTransform(scrollYProgress, [0.1, 0.7], [1, 0]);
  const strengthOpacity = useTransform(scrollYProgress, [0.3, 0.9], [0, 1]);

  // Gentle brightness/scale ramp so the strong state quietly arrives.
  const filter = useTransform(scrollYProgress, [0, 1], ["brightness(0.92)", "brightness(1.06)"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1]);

  if (prefersReduced) {
    return (
      <figure className="relative rounded-[20px] overflow-hidden shadow-lifted bg-sage-deep aspect-[4/5]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={STILL}
          alt="A man mid controlled squat, posture tall and aligned — building the strength prevention is made of."
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 mix-blend-soft-light"
          style={{ backgroundColor: STRENGTH_WASH }}
        />
      </figure>
    );
  }

  return (
    <div ref={ref} className="lg:sticky lg:top-24">
      <motion.figure
        style={{ filter, scale }}
        className="relative rounded-[20px] overflow-hidden shadow-lifted bg-sage-deep aspect-[4/5]"
      >
        {/* Base layer: one clean mid-movement still. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={STILL}
          alt="A person mid controlled squat, working and then owning the movement — building the strength that prevention protects."
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Strength wash (blue) — fades IN, the resolved cared-for state. */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: strengthOpacity, backgroundColor: STRENGTH_WASH }}
          className="absolute inset-0 mix-blend-soft-light"
        />
        {/* Strain wash (warm) — fades OUT, the effort/load of "NOW". */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: strainOpacity, backgroundColor: STRAIN_WASH }}
          className="absolute inset-0 mix-blend-soft-light"
        />

        {/* NOW → 10 YEARS rail, bottom-anchored gradient for legibility. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/4"
          style={{ background: "linear-gradient(180deg, rgba(0,41,92,0) 0%, rgba(0,41,92,0.55) 100%)" }}
        />
        <div className="absolute left-6 top-6 bottom-6 flex flex-col items-center justify-between pointer-events-none">
          <span className="text-eyebrow text-bone/70 [writing-mode:vertical-rl] rotate-180">
            NOW
          </span>
          <div className="w-px flex-1 my-3 bg-gradient-to-b from-bone/10 via-bone/30 to-clay/60" />
          <span className="text-eyebrow text-clay-soft [writing-mode:vertical-rl] rotate-180">
            10 YEARS
          </span>
        </div>
      </motion.figure>
    </div>
  );
}
