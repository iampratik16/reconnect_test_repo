"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { RoadmapPhase } from "@/lib/content/programDetails";

interface RoadmapTimelineProps {
  phases: RoadmapPhase[];
}

export default function RoadmapTimeline({ phases }: RoadmapTimelineProps) {
  const prefersReduced = useReducedMotion();

  /* ─── Reduced motion: simple vertical stack, no pinning ─── */
  if (prefersReduced) {
    return (
      <ol className="flex flex-col gap-10">
        {phases.map((p, i) => (
          <li key={p.label} className="flex flex-col sm:flex-row gap-6">
            <div className="sm:w-40 shrink-0">
              <span className="text-eyebrow text-clay">0{i + 1}</span>
              <p className="text-body-sm font-medium text-ink mt-1">{p.label}</p>
            </div>
            <div className="flex-1 border-l border-line pl-6">
              <h4 className="text-h3 font-display text-ink mb-2">{p.title}</h4>
              {p.body && <p className="text-body text-ink-soft mb-4">{p.body}</p>}
              <div className="flex flex-wrap gap-2">
                {p.focus.map((f) => (
                  <span
                    key={f}
                    className="text-caption bg-sage-tint text-sage rounded-pill px-3 py-1"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return <RoadmapAnimated phases={phases} />;
}

/* ────────────────────────────────────────────────────────────
   Animated sticky timeline:
   - Container is tall (phases.length * 100vh-ish).
   - Sticky inner column on the left = phase indicator + progress rail.
   - Right column = phase cards in normal flow.
   - As we scroll, the active phase index lights up and the rail fills.
   ──────────────────────────────────────────────────────────── */

function RoadmapAnimated({ phases }: { phases: RoadmapPhase[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 30%", "end 70%"],
  });

  const railHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={wrapRef} className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* ── Sticky rail (desktop only) ───────────────────── */}
        <aside className="hidden lg:block lg:col-span-4">
          <div className="sticky top-32">
            <div className="flex">
              {/* Progress rail */}
              <div className="relative w-px bg-line mr-6 self-stretch min-h-[420px]">
                <motion.div
                  className="absolute top-0 left-0 w-px bg-clay"
                  style={{ height: railHeight }}
                />
              </div>

              {/* Phase pills */}
              <ol className="flex flex-col gap-8 py-1">
                {phases.map((p, i) => {
                  const start = i / phases.length;
                  const end = (i + 1) / phases.length;
                  return (
                    <PhaseIndicator
                      key={p.label}
                      index={i}
                      phase={p}
                      progress={scrollYProgress}
                      start={start}
                      end={end}
                    />
                  );
                })}
              </ol>
            </div>
          </div>
        </aside>

        {/* ── Phase cards (the scrolling content) ─────────── */}
        <div className="lg:col-span-8 flex flex-col gap-16 lg:gap-32">
          {phases.map((p, i) => (
            <PhaseCard key={p.label} phase={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ────────────────────────────────────────── */

function PhaseIndicator({
  index,
  phase,
  progress,
  start,
  end,
}: {
  index: number;
  phase: RoadmapPhase;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  // Treat phase as "active" once progress crosses its midpoint
  const opacity = useTransform(progress, [start, (start + end) / 2, end], [0.45, 1, 1]);
  const dotScale = useTransform(progress, [start, (start + end) / 2], [1, 1.4]);

  return (
    <motion.li style={{ opacity }} className="flex items-start gap-3">
      <motion.span
        style={{ scale: dotScale }}
        className="mt-1.5 inline-block w-2.5 h-2.5 rounded-full bg-clay"
        aria-hidden="true"
      />
      <div>
        <p className="text-eyebrow text-ink-soft">0{index + 1} — {phase.label}</p>
        <p className="text-body-sm font-medium text-ink">{phase.title}</p>
      </div>
    </motion.li>
  );
}

function PhaseCard({ phase, index }: { phase: RoadmapPhase; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 50%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.25, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [24, 0]);

  return (
    <motion.article
      ref={ref}
      style={{ opacity, y }}
      className="relative"
    >
      {/* Mobile-only phase header */}
      <div className="lg:hidden flex items-center gap-3 mb-4">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-clay" aria-hidden="true" />
        <p className="text-eyebrow text-ink-soft">0{index + 1} — {phase.label}</p>
      </div>

      <span className="hidden lg:block section-number absolute -top-12 -left-2 select-none pointer-events-none">
        0{index + 1}
      </span>

      <h4 className="relative text-h2 font-display text-ink mb-4">{phase.title}</h4>
      {phase.body && (
        <p className="relative text-body-lg text-ink-soft mb-6 max-w-xl">{phase.body}</p>
      )}

      <div className="relative flex flex-wrap gap-2">
        {phase.focus.map((f) => (
          <span
            key={f}
            className="text-caption bg-bone-deep text-ink-soft rounded-pill px-3 py-1"
          >
            {f}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
