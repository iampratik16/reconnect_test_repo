"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export type JourneyStep = {
  number: string;
  badge: string;
  title: string;
  body: string;
  bullets: string[];
  artLabel: string;
  image: string;
  imageAlt: string;
};

const STEPS: JourneyStep[] = [
  {
    number: "01",
    badge: "Always first",
    title: "Medical Assessment",
    body:
      "A detailed review of your condition, history, current medications, and imaging — by our medical team. This decides everything that follows. Care is patient-to-patient, never templated.",
    bullets: [
      "Rheumatologist-led intake",
      "Imaging & medication review",
      "Pain mapping by joint and region",
    ],
    artLabel: "Step 01 — Assessment",
    image: "/journey-assessment.jpg",
    imageAlt: "Clinical evaluation with stethoscope and notes",
  },
  {
    number: "02",
    badge: "Built around you",
    title: "Personalised Exercise Program",
    body:
      "Not random workouts. Split across upper body, lower body, back, and the specific joints we’re protecting — we start where your problem is. If you’ve never lifted a dumbbell, we won’t throw numbers at you. A 30-year-old and a busy 40-year-old get different prescriptions.",
    bullets: [
      "Region-by-region split",
      "Age- and severity-scaled",
      "Pain-respecting progression",
    ],
    artLabel: "Step 02 — Exercise",
    image: "/journey-exercise.jpg",
    imageAlt: "Women practicing guided mat-based mobility work",
  },
  {
    number: "03",
    badge: "Tied to the plate",
    title: "Nutrition Plan",
    body:
      "A nutrition chart built from a short pre-questionnaire that captures your food preferences (veg / non-veg) and history. Anti-inflammatory and bone-supportive, tied directly to your exercise program.",
    bullets: [
      "Veg / non-veg adapted",
      "Anti-inflammatory pattern",
      "Calcium, Vit D, protein audit",
    ],
    artLabel: "Step 03 — Nutrition",
    image: "/journey-nutrition.jpg",
    imageAlt: "Nourishing bowl of greens, avocado and fresh produce",
  },
  {
    number: "04",
    badge: "Only if needed",
    title: "Psychology Support",
    body:
      "If we detect a mental block to movement — fear, catastrophising, low adherence — we refer you to a clinical psychologist. Never reflexive, always considered. Mindset matters as much as the muscle.",
    bullets: [
      "Referral only when indicated",
      "Clinical psychologist on hand",
      "Treated as load-bearing",
    ],
    artLabel: "Step 04 — Psychology",
    image: "/journey-psychology.jpg",
    imageAlt: "Person meditating in lotus pose at sunrise",
  },
];

export default function StickyJourneySequence() {
  const prefersReduced = useReducedMotion();

  /* Reduced motion: stacked vertical sequence, no pinning */
  if (prefersReduced) {
    return (
      <ol className="flex flex-col gap-16 md:gap-24">
        {STEPS.map((s) => (
          <li
            key={s.number}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
          >
            <div className="lg:col-span-5">
              <StaticArtPanel step={s} />
            </div>
            <div className="lg:col-span-7">
              <StepCopy step={s} />
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return <SequenceAnimated />;
}

/* ────────────────────────────────────────────────────────────
   Animated pinned sequence
   ──────────────────────────────────────────────────────────── */

function SequenceAnimated() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = stepRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => ({
            idx: Number((e.target as HTMLElement).dataset.idx),
            top: e.boundingClientRect.top,
          }));
        if (!visible.length) return;
        visible.sort((a, b) => Math.abs(a.top - window.innerHeight * 0.4) - Math.abs(b.top - window.innerHeight * 0.4));
        if (visible[0]) setActive(visible[0].idx);
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const activeStep = STEPS[active];

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* ── Sticky visual panel ─────────────────────────────── */}
        <aside className="lg:col-span-5">
          <div className="sticky top-32">
            <div className="relative aspect-square rounded-[20px] overflow-hidden bg-bone-deep hairline shadow-lg">
              {/* No `mode` on AnimatePresence so the outgoing and incoming
                  panels overlap and crossfade — otherwise the empty card
                  background flashes between steps. */}
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeStep.number}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={activeStep.image}
                    alt={activeStep.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Bottom-up gradient for label legibility */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)",
                    }}
                    aria-hidden="true"
                  />
                  {/* Label */}
                  <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white">
                    <p className="text-eyebrow text-white/80 mb-1">{activeStep.number}</p>
                    <p className="text-h4 font-display">{activeStep.artLabel}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* progress dots */}
              <div className="absolute top-5 right-5 flex flex-col gap-2 z-10">
                {STEPS.map((s, i) => (
                  <span
                    key={s.number}
                    aria-hidden="true"
                    className={`block w-2 h-2 rounded-full transition-all duration-500 ${
                      i === active
                        ? "bg-white scale-150 shadow"
                        : i < active
                        ? "bg-white/60"
                        : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Step copy column ───────────────────────────────── */}
        <div className="lg:col-span-7 flex flex-col">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-idx={i}
              className="min-h-[80vh] flex items-center py-12"
            >
              <StepCopy step={step} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Step copy block ────────────────────────────────────────── */

function StepCopy({ step }: { step: JourneyStep }) {
  return (
    <div className="relative">
      <span
        className="absolute -top-12 lg:-top-16 -left-2 select-none pointer-events-none font-display text-line leading-none"
        style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}
        aria-hidden="true"
      >
        {step.number}
      </span>

      <p className="relative inline-block text-eyebrow text-clay-dark bg-clay-soft rounded-pill px-3 py-1 mb-5">
        {step.badge}
      </p>

      <h3 className="relative text-h2 font-display text-ink mb-5">{step.title}</h3>
      <p className="relative text-body-lg text-ink-soft mb-6 max-w-xl">{step.body}</p>

      <ul className="relative flex flex-col gap-2 max-w-md">
        {step.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-body text-ink">
            <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-clay shrink-0" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Static art panel for the reduced-motion fallback ─────── */

function StaticArtPanel({ step }: { step: JourneyStep }) {
  return (
    <div className="relative aspect-square rounded-[20px] overflow-hidden bg-bone-deep hairline shadow-lg">
      <img
        src={step.image}
        alt={step.imageAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white">
        <p className="text-eyebrow text-white/80 mb-1">{step.number}</p>
        <p className="text-h4 font-display">{step.artLabel}</p>
      </div>
    </div>
  );
}
