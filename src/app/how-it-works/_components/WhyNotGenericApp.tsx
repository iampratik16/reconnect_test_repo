"use client";

/**
 * WhyNotGenericApp — Creative "fair question" section.
 *
 * Premium touches (subtle, not gimmicky):
 *  - Heading reveals word-by-word with a mask-up motion.
 *  - The accent phrase gets an SVG strike-through line that draws across
 *    after the words land — the visual metaphor for "not just a free app".
 *  - The 3 reason cards stagger in, each with a thin top accent rule that
 *    draws horizontally, and a soft lift + accent shift on hover.
 *  - All motion respects prefers-reduced-motion via framer-motion defaults.
 */

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Eyebrow from "@/components/Eyebrow";
import { SpineSvg } from "@/components/AnatomicalArt";

const REASONS = [
  {
    label: "Endless videos",
    body: "Plenty of exercises. Zero idea which ones apply to your knee, your spine, or your age.",
  },
  {
    label: "No accountability",
    body: "Nobody’s watching. Adherence drops within weeks. Pain doesn’t.",
  },
  {
    label: "No roadmap",
    body: "Random workouts don’t add up to a 12-week plan with milestones and medical oversight.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const headWordVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.05 + i * 0.08, duration: 0.65, ease: EASE },
  }),
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.25 + i * 0.12, duration: 0.6, ease: EASE },
  }),
};

const accentVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    transition: { delay: 0.35 + i * 0.12, duration: 0.7, ease: EASE },
  }),
};

export default function WhyNotGenericApp() {
  const prefersReduced = useReducedMotion();

  // Build the heading as discrete word tokens so each can mask up independently.
  const headWords = [
    { text: "“Why", italic: true, accent: false },
    { text: "not", italic: true, accent: false },
    { text: "just", italic: true, accent: false },
    { text: "a", italic: true, accent: false },
    { text: "free", italic: true, accent: true },
    { text: "app?”", italic: true, accent: true },
  ];

  return (
    <section className="relative bg-bone section-py overflow-hidden">
      <SpineSvg className="watermark text-ink left-[-100px] top-[40px] w-[420px] hidden md:block" />

      <div className="container-site relative">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Eyebrow number="(02)">A fair question</Eyebrow>
          </motion.div>

          {/* Heading */}
          <h2 className="text-h2 font-display text-ink mt-6 leading-tight flex flex-wrap gap-x-3 gap-y-1">
            {headWords.map((w, i) => (
              <span
                key={`${w.text}-${i}`}
                className="relative inline-block align-baseline"
              >
                <motion.span
                  className={`inline-block ${w.italic ? "serif-italic" : ""} ${
                    w.accent ? "text-clay relative" : ""
                  }`}
                  custom={i}
                  variants={headWordVariants}
                  initial={prefersReduced ? "visible" : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, margin: "-15% 0px" }}
                >
                  {w.text}
                  {/* Hand-drawn strike-through on the accent word */}
                  {w.accent && (
                    <motion.svg
                      aria-hidden="true"
                      viewBox="0 0 220 18"
                      preserveAspectRatio="none"
                      className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-[0.18em] pointer-events-none"
                      initial={prefersReduced ? { pathLength: 1 } : { pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, margin: "-15% 0px" }}
                      transition={{ delay: 0.85, duration: 0.9, ease: EASE }}
                    >
                      <motion.path
                        d="M4 11 C 55 4, 110 14, 165 7 S 215 11, 216 9"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </motion.svg>
                  )}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Quote */}
          <motion.blockquote
            className="text-h4 font-display text-ink-soft mt-10 border-l-2 border-clay pl-6 max-w-2xl"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
          >
            All around us there are endless exercises — but no motivation, and no direction for
            where <em className="serif-italic text-ink">your</em> body is at. We give
            you the roadmap.
          </motion.blockquote>
          <motion.p
            className="text-caption text-ink-soft mt-4 pl-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ delay: 0.85, duration: 0.5 }}
          >
            — Dr. Shruthi Desai, Rheumatologist
          </motion.p>

          {/* Reason cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {REASONS.map((item, i) => (
              <motion.div
                key={item.label}
                className="group relative flex flex-col gap-2 pt-5 cursor-default"
                custom={i}
                variants={cardVariants}
                initial={prefersReduced ? "visible" : "hidden"}
                whileInView="visible"
                viewport={{ once: true, margin: "-15% 0px" }}
                whileHover={prefersReduced ? undefined : { y: -3 }}
                transition={{ type: "tween", ease: EASE, duration: 0.35 }}
              >
                {/* Top accent rule — draws in, brightens on hover */}
                <motion.span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-px w-full bg-line origin-left"
                  custom={i}
                  variants={accentVariants}
                  initial={prefersReduced ? "visible" : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, margin: "-15% 0px" }}
                />
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-[2px] w-0 bg-clay origin-left transition-[width] duration-500 ease-out group-hover:w-12"
                />

                <span className="text-eyebrow text-ink-soft transition-colors duration-300 group-hover:text-clay">
                  0{i + 1}
                </span>
                <p className="text-body font-medium text-ink">{item.label}</p>
                <p className="text-body-sm text-ink-soft">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
