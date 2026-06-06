"use client";

/**
 * PreventionTimeline — the centerpiece carousel of the "what tends to happen if
 * you ignore it" story, beneath the Built-for-Prevention human visual.
 *
 * Four diplomatic stages, shown as the section's main event rather than an
 * afterthought: one large active card with the NEXT card peeking in from the
 * right edge (so the "there's more" affordance is unmissable), an oversized
 * editorial stage number, and a single progress bar that FILLS as you advance
 * — replacing the old easy-to-miss dots. The accent shifts grey → blue on the
 * final "turn" card, echoing the strain→ease glow on the figure above.
 *
 * Tone: gentle, quality-of-life, nothing declared (no ages, no "will happen",
 * no "surgery"). Verbs stay soft: can, tend to, over time, doesn't have to.
 * Keyboard-accessible: ←/→ move stages; the live region announces each. The
 * track also responds to drag/swipe on touch.
 */

import { useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Stage = {
  marker: string;
  title: string;
  body: string;
  turn?: boolean;
};

const STAGES: Stage[] = [
  {
    marker: "It can start quietly",
    title: "A stiffness you’d never see a doctor for",
    body: "A neck that’s tight by lunch. A back that’s tired by evening. Easy to wave off — and most of us do.",
  },
  {
    marker: "Left alone",
    title: "It tends to settle in",
    body: "The stretch that used to loosen things stops being enough. The ache starts keeping its own schedule.",
  },
  {
    marker: "Over time",
    title: "It can start asking more of you",
    body: "Stairs feel like a decision. The long walk, the hike with friends — sometimes you quietly sit it out.",
  },
  {
    marker: "The turn",
    title: "It doesn’t have to go that way",
    body: "Small, doctor-guided changes now — a little movement, a little strength — and the next decade can feel very different.",
    turn: true,
  },
];

export default function PreventionTimeline() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const prefersReduced = useReducedMotion();

  const go = useCallback(
    (next: number) => {
      const clamped = (next + STAGES.length) % STAGES.length;
      setDir(next > index || (index === STAGES.length - 1 && clamped === 0) ? 1 : -1);
      setIndex(clamped);
    },
    [index],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  const stage = STAGES[index];
  const nextStage = STAGES[(index + 1) % STAGES.length];
  const atEnd = index === STAGES.length - 1;
  const progress = ((index + 1) / STAGES.length) * 100;

  const enter = prefersReduced ? { opacity: 0 } : { opacity: 0, x: dir * 48 };
  const exit = prefersReduced ? { opacity: 0 } : { opacity: 0, x: dir * -48 };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="What tends to happen if joint strain is ignored"
      className="mt-20 lg:mt-28"
      onKeyDown={onKeyDown}
      tabIndex={-1}
    >
      {/* Sticky-feel header: the question that frames the whole arc */}
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 mb-10">
        <h3 className="font-display text-h3 text-ink max-w-xl leading-tight">
          What tends to happen — and where it can turn.
        </h3>
        <span className="text-eyebrow text-ink-soft/70 tabular-nums shrink-0">
          {String(index + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
        </span>
      </div>

      {/* Stage track: active card + a peek of the next one on the right edge */}
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.16fr)] gap-6 items-stretch">
          {/* ── Active card ───────────────────────────────────────── */}
          <div className="relative overflow-hidden rounded-[24px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.article
                key={index}
                initial={enter}
                animate={{ opacity: 1, x: 0 }}
                exit={exit}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                drag={prefersReduced ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(index + 1);
                  else if (info.offset.x > 60) go(index - 1);
                }}
                className={`relative rounded-[24px] border p-8 sm:p-12 lg:p-14 min-h-[300px] flex flex-col justify-between cursor-grab active:cursor-grabbing ${
                  stage.turn
                    ? "border-clay/30 bg-clay-soft shadow-lifted"
                    : "border-ink/10 bg-bone-deep"
                }`}
              >
                {/* Oversized editorial stage number */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none select-none absolute top-4 right-6 font-display leading-none tabular-nums ${
                    stage.turn ? "text-clay/15" : "text-ink/[0.06]"
                  }`}
                  style={{ fontSize: "clamp(5rem, 12vw, 11rem)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative">
                  <p
                    className={`text-eyebrow ${stage.turn ? "text-clay" : "text-ink-soft"}`}
                  >
                    {stage.marker}
                  </p>
                  <h4
                    className={`font-display text-h3 mt-3 max-w-2xl ${
                      stage.turn ? "text-clay" : "text-ink"
                    }`}
                  >
                    {stage.title}
                  </h4>
                  <p className="text-body-lg text-ink-soft mt-4 max-w-2xl">
                    {stage.body}
                  </p>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* ── Peek of the next card (desktop only) ──────────────── */}
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label={`Next: ${nextStage.marker}`}
            className={`hidden lg:flex relative overflow-hidden rounded-[24px] border text-left p-6 flex-col justify-end transition-colors group ${
              nextStage.turn
                ? "border-clay/20 bg-clay-soft/40 hover:bg-clay-soft/70"
                : "border-ink/10 bg-bone-deep/50 hover:bg-bone-deep"
            }`}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none select-none absolute top-2 right-3 font-display leading-none text-ink/[0.05]"
              style={{ fontSize: "5rem" }}
            >
              {String(((index + 1) % STAGES.length) + 1).padStart(2, "0")}
            </span>
            <span className="text-eyebrow text-ink-soft/70 group-hover:text-ink-soft transition-colors">
              Next
            </span>
            <span className="text-body-sm text-ink mt-1 leading-snug">
              {nextStage.marker}
            </span>
          </button>
        </div>
      </div>

      {/* ── Progress bar + arrows ──────────────────────────────── */}
      <div className="flex items-center gap-6 mt-8">
        {/* Filling progress bar (replaces dots) */}
        <div className="relative flex-1 h-[3px] rounded-full bg-ink/10 overflow-hidden">
          <motion.div
            className={`absolute inset-y-0 left-0 rounded-full ${
              atEnd ? "bg-clay" : "bg-ink"
            }`}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous stage"
            className="w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center text-ink hover:border-ink/40 hover:bg-ink/[0.03] transition-colors"
          >
            <Arrow dir="left" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next stage"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors ${
              atEnd
                ? "border-clay/30 text-clay hover:bg-clay-soft"
                : "border-ink/15 text-ink hover:border-ink/40 hover:bg-ink/[0.03]"
            }`}
          >
            <Arrow dir="right" />
          </button>
        </div>
      </div>

      {/* Screen-reader live announcement */}
      <p className="sr-only" aria-live="polite">
        Stage {index + 1} of {STAGES.length}: {stage.title}
      </p>
    </section>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={dir === "left" ? "rotate-180" : ""}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
