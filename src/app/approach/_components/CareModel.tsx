"use client";

/**
 * CareModel — the four-pillar care model on the /approach page, replacing the
 * old program-architecture diagram. Accordion on the left (one open at a time);
 * the active pillar's image shows on the right. Icons are Google Material
 * Symbols (loaded in the root layout).
 */

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { asset } from "@/lib/asset";

// House easing used across the site (see components/Accordion.tsx).
const EASE = [0.16, 1, 0.3, 1] as const;

type Pillar = {
  icon: string; // Material Symbols name
  title: string;
  image: string;
  items: string[];
};

const PILLARS: Pillar[] = [
  {
    icon: "clinical_notes",
    title: "Medical Assessment",
    image: "/doctor-led-xx.jpeg",
    items: [
      "One-to-one online Consultation with doctor",
      "Physical consultation only if we think its required",
      "Diagnostic work up",
      "Prescribing medicines as required",
      "Personalised treatment plan",
      "Appropriate referral to specialist when necessary",
    ],
  },
  {
    icon: "exercise",
    title: "Physical Fitness",
    image: "/patientXX.jpeg",
    items: [
      "Assessing prior fitness level",
      "Designing and formulating exercise plan",
      "Access to pre-recorded exercise videos",
      "Focus on appropriate posture and technique",
      "Guidance on right nutrition",
      "One-to-one personalized coach if required",
      "Physiotherapist advise when required",
    ],
  },
  {
    icon: "psychology",
    title: "Mental and subconscious fitness",
    image: "/lady_meditating.png",
    items: [
      "Online Consultation with psychologist",
      "Formulating and designing appropriate plan",
      "Stress management",
      "Positive thought reinforcement",
      "Logotherapy",
      "Referral to specialist when necessary",
      "Support group",
    ],
  },
  {
    icon: "monitoring",
    title: "Tracking plans",
    image: "/patient_YYY.jpeg",
    items: [
      "Online follow up by doctors, trainers and other specialists",
      "Tracking weight, BMI and other health related parameters",
      "Regular monitoring of Blood pressure, HbA1C, thyroid hormones, uric acid levels etc",
      "Monitoring of pains and joint health",
      "Access to Online tracking diary",
    ],
  },
];

export default function CareModel() {
  const [active, setActive] = useState(0);
  const prefersReduced = useReducedMotion();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
      {/* Accordion */}
      <div className="flex flex-col">
        {PILLARS.map((p, i) => {
          const open = i === active;
          return (
            <div
              key={p.title}
              className={`border-t border-line ${i === PILLARS.length - 1 ? "border-b" : ""}`}
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-expanded={open}
                className="w-full flex items-center gap-4 py-5 text-left"
              >
                <span
                  className="material-symbols-outlined text-[26px] text-clay shrink-0"
                  aria-hidden="true"
                >
                  {p.icon}
                </span>
                <span className="flex-1 text-h4 font-display text-ink">{p.title}</span>
                {/* Smooth +/− morph: the vertical bar collapses when open. */}
                <span
                  className="relative shrink-0 w-[18px] h-[18px] text-ink-soft"
                  aria-hidden="true"
                >
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-full rounded-full bg-current" />
                  <motion.span
                    className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full rounded-full bg-current origin-center"
                    animate={{ scaleY: open ? 0 : 1, opacity: open ? 0 : 1 }}
                    transition={prefersReduced ? { duration: 0 } : { duration: 0.4, ease: EASE }}
                  />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    animate={prefersReduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                    exit={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.5, ease: EASE },
                      opacity: { duration: 0.3, ease: "easeOut" },
                    }}
                    className="overflow-hidden"
                  >
                    <ol className="list-decimal pl-[3.6rem] pr-2 pb-6 flex flex-col gap-2.5 text-body text-ink-soft marker:text-clay">
                      {p.items.map((it) => (
                        <li key={it} className="pl-1">
                          {it}
                        </li>
                      ))}
                    </ol>
                    {/* Inline image for mobile/tablet — each pillar shows its own
                        image right after its text. Desktop uses the sticky
                        crossfade column on the right instead. */}
                    <div className="lg:hidden pb-6">
                      <div className="relative rounded-[20px] overflow-hidden shadow-lifted aspect-square bg-bone-deep">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={asset(p.image)}
                          alt={p.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Active pillar image — all four preloaded & stacked so switching is a
          flash-free crossfade (no lazy load, no remount). */}
      <div className="hidden lg:block lg:sticky lg:top-28">
        <div className="relative rounded-[20px] overflow-hidden shadow-lifted aspect-square bg-bone-deep">
          {PILLARS.map((p, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <motion.img
              key={p.image}
              src={asset(p.image)}
              alt={p.title}
              className="absolute inset-0 h-full w-full object-cover"
              initial={false}
              animate={{
                opacity: i === active ? 1 : 0,
                scale: i === active ? 1 : 1.03,
              }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : {
                      opacity: { duration: 0.55, ease: EASE },
                      scale: { duration: 0.7, ease: EASE },
                    }
              }
              aria-hidden={i !== active}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
