"use client";

/**
 * SpineConnects — sticky, scroll-driven, real-3D rotating spine PLUS a
 * helical CSS-3D ring of pillar pills that orbits around the model.
 *
 *  - The WebGL canvas renders the 1.3 MB DRACO GLB spine with proper
 *    studio lighting + contact shadow. The model's Y rotation tracks
 *    scroll progress (lerped per-frame for buttery smoothness).
 *  - A second, transparent CSS-3D layer overlays the canvas: four
 *    pillar pills sit at four different vertical heights AND four
 *    different angular offsets around the vertical axis, forming a
 *    helix that wraps the bone. The entire CSS-3D ring rotates with
 *    the same scroll progress as the WebGL model — so spine and pills
 *    appear to orbit together.
 *  - Active pillar (the one currently facing the camera) is
 *    highlighted; its body copy fades in on the left.
 *  - Three.js + r3f + drei are dynamic-imported (ssr:false) and lazy
 *    mounted via IntersectionObserver — zero 3D cost above the fold.
 */

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

const SpineScene = dynamic(() => import("./SpineScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

type Vertebra = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
};

const VERTEBRAE: Vertebra[] = [
  {
    id: "assess",
    eyebrow: "01 — Foundation",
    title: "Assess",
    body:
      "Imaging, history, current medication, pain map. The medicine comes first — nothing else starts until your assessment is in.",
  },
  {
    id: "strengthen",
    eyebrow: "02 — Movement",
    title: "Strengthen",
    body:
      "Resistance training tuned to your joints, your age, your severity. Region-by-region. Pain-respecting, never templated.",
  },
  {
    id: "nourish",
    eyebrow: "03 — Fuel",
    title: "Nourish",
    body:
      "Anti-inflammatory plate. Calcium, Vitamin D, protein — adapted to veg or non-veg, built around how you actually eat.",
  },
  {
    id: "sustain",
    eyebrow: "04 — Mind",
    title: "Sustain",
    body:
      "Mental load is load. When fear of movement, low adherence, or burnout shows up, we treat it like any other load.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/** Vertical heights of the four orbiting pills (helix). */
const LABEL_TOPS = ["22%", "42%", "62%", "82%"] as const;
/** 3D distance of each pill from the spine's vertical axis. */
const ORBIT_RADIUS = 260;

export default function SpineConnects() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(0);

  // Live target rotation (radians) for the WebGL model.
  const rotationRef = useRef(0);

  // Lazy-mount the WebGL scene when near viewport.
  const [sceneVisible, setSceneVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setSceneVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // CSS-3D rotation for the orbiting pills layer (degrees).
  // Travels exactly 270° so the ring starts at Assess (0°) and lands on
  // Sustain (-270°, base 270°) at the end of the section — no full loop.
  const ringRotateY = useTransform(scrollYProgress, [0, 1], [0, -270]);

  // Drive WebGL rotation target + active pillar in one place.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    rotationRef.current = prefersReduced ? 0 : -v * Math.PI * 1.5; // -270° in rad
    // 4 stops evenly across [0, 1]: 0 → 0, 1/3 → 1, 2/3 → 2, 1 → 3
    const idx = Math.min(3, Math.max(0, Math.round(v * 3)));
    if (idx !== active) setActive(idx);
  });

  return (
    <section
      ref={ref}
      className="relative bg-bone-deep"
      style={{ height: prefersReduced ? "auto" : "360vh" }}
      aria-label="Connected by design"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container-site relative w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* ── LEFT: copy panel ──────────────────────────────── */}
            <div className="lg:col-span-4">
              <p className="text-eyebrow text-clay mb-4">
                (05) — Connected by design
              </p>
              <h2 className="text-h2 font-display text-ink mb-8 leading-tight">
                Built like a spine.{" "}
                <span className="text-ink-soft">
                  Every part connected to every other part.
                </span>
              </h2>

              <div className="relative min-h-[200px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={VERTEBRAE[active].id}
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -14 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <p className="text-eyebrow text-ink-soft mb-3">
                      {VERTEBRAE[active].eyebrow}
                    </p>
                    <h3 className="text-h3 font-display text-ink mb-3">
                      {VERTEBRAE[active].title}
                    </h3>
                    <p className="text-body-lg text-ink-soft max-w-md">
                      {VERTEBRAE[active].body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-10 flex gap-2">
                {VERTEBRAE.map((v, i) => (
                  <span
                    key={v.id}
                    aria-hidden="true"
                    className={`h-[3px] rounded-full transition-all duration-500 ${
                      i === active
                        ? "w-12 bg-clay"
                        : i < active
                        ? "w-6 bg-clay/40"
                        : "w-6 bg-line"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ── RIGHT: 3D stage — canvas + helical CSS-3D ring ── */}
            <div className="lg:col-span-8 flex items-center justify-center">
              <div
                className="relative w-full max-w-[820px] aspect-[3/4] sm:aspect-[4/5] lg:aspect-square"
                style={{
                  perspective: "2400px",
                  perspectiveOrigin: "50% 50%",
                }}
              >
                {/* Soft radial backdrop */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(40% 55% at 50% 50%, rgba(0,100,224,0.12), transparent 70%)",
                  }}
                />

                {/* WebGL canvas — stays flat in DOM, the model inside it
                    rotates in 3D. Fills the stage. */}
                <div className="absolute inset-0">
                  {sceneVisible ? (
                    <SpineScene rotationRef={rotationRef} />
                  ) : (
                    <SceneFallback />
                  )}
                </div>

                {/* Helical CSS-3D ring of pillar pills, overlaid on the canvas */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    transformStyle: "preserve-3d",
                    rotateY: prefersReduced ? 0 : ringRotateY,
                  }}
                  aria-hidden="true"
                >
                  {VERTEBRAE.map((v, i) => {
                    const baseAngle = i * 90; // 0, 90, 180, 270
                    const isActive = i === active;
                    return (
                      <div
                        key={v.id}
                        className="absolute left-1/2"
                        style={{
                          top: LABEL_TOPS[i],
                          transform: `translate(-50%, -50%) rotateY(${baseAngle}deg) translateZ(${ORBIT_RADIUS}px)`,
                          transformStyle: "preserve-3d",
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                        }}
                      >
                        <motion.div
                          animate={{
                            opacity: isActive ? 1 : 0.35,
                            scale: isActive ? 1.12 : 0.95,
                          }}
                          transition={{ duration: 0.5, ease: EASE }}
                          style={{
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                            backdropFilter: "blur(10px) saturate(140%)",
                            WebkitBackdropFilter: "blur(10px) saturate(140%)",
                          }}
                          className={`relative px-5 py-2.5 rounded-pill border whitespace-nowrap shadow-soft transition-colors duration-500 ${
                            isActive
                              ? "bg-clay/70 text-calcium border-clay/70"
                              : "bg-calcium/55 text-ink-soft border-line/70"
                          }`}
                        >
                          <span className="text-eyebrow tracking-widest drop-shadow-sm">
                            {v.title}
                          </span>
                        </motion.div>
                      </div>
                    );
                  })}
                </motion.div>

                {/* Hint: which slot is "the front" */}
                <p
                  aria-hidden="true"
                  className="absolute left-1/2 -translate-x-1/2 bottom-2 text-caption text-ink-soft/60 uppercase tracking-widest"
                >
                  Front of stage
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-ink-soft/60">
        <div className="w-1 h-40 rounded-full bg-line animate-pulse" />
        <p className="text-caption uppercase tracking-widest">Loading model…</p>
      </div>
    </div>
  );
}
