"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import Card from "@/components/Card";
import Section from "@/components/Section";

const proofCards = [
  {
    title: "Doctor-led",
    body: "Program designed by a doctor.",
  },
  {
    title: "Personalised to your condition",
    body: "Built around your diagnosis, imaging, pain map, and history — not a generic template.",
  },
  {
    title: "An integrated approach",
    body: "Blending nutrition and psychology for better health.",
  },
  {
    title: "Structured roadmap",
    body: "A 16-week cycle with milestones and reassessment.",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;
const spring = [0.34, 1.56, 0.64, 1] as const;

// Individual word for the animated headline
function AnimWord({
  children,
  delay,
  isInView,
  prefersReduced,
}: {
  children: string;
  delay: number;
  isInView: boolean;
  prefersReduced: boolean | null;
}) {
  return (
    <span className="inline-block overflow-hidden mr-[0.28em]">
      <motion.span
        className="inline-block"
        initial={prefersReduced ? { opacity: 0 } : { y: "110%", opacity: 0 }}
        animate={
          isInView
            ? prefersReduced
              ? { opacity: 1 }
              : { y: "0%", opacity: 1 }
            : {}
        }
        transition={{ duration: 0.65, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function WhyReconnectSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();

  // Headline words split around the highlighted "your body" span
  const line2a = ["A", "program", "designed", "for"];
  const line2b = ["."];

  const cardContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } },
  };

  const cardVariants = prefersReduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } },
      }
    : {
        hidden: { opacity: 0, x: -28 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.6, ease },
        },
      };

  const badgeVariants = {
    hidden: { scale: 0.4, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: spring },
    },
  };

  return (
    <Section bg="bg-bone">
      <div ref={ref}>
        {/* ── Headline ─────────────────────────────────────────── */}
        <div className="mb-14 max-w-4xl">

          {/* Headline: "A program designed for your body." — "your body" in clay */}
          <p className="text-h2 font-display text-ink flex flex-wrap items-baseline">
            {line2a.map((word, i) => (
              <AnimWord
                key={word + i}
                delay={0.15 + i * 0.06}
                isInView={isInView}
                prefersReduced={prefersReduced}
              >
                {word}
              </AnimWord>
            ))}

            {/* "your body" — clay with animated underline */}
            <span className="relative inline-block overflow-visible mr-[0.28em]">
              <motion.span
                className="inline-block text-clay"
                initial={prefersReduced ? { opacity: 0 } : { y: "110%", opacity: 0 }}
                animate={isInView ? (prefersReduced ? { opacity: 1 } : { y: "0%", opacity: 1 }) : {}}
                transition={{ duration: 0.65, ease, delay: 0.42 }}
              >
                your body
              </motion.span>
              {/* Underline draws in */}
              <motion.span
                aria-hidden
                className="absolute bottom-[2px] left-0 h-[2px] bg-clay rounded-full"
                style={{ originX: 0, width: "100%" }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 1.1 }}
              />
            </span>

            {line2b.map((word, i) => (
              <AnimWord
                key={word + i}
                delay={0.48}
                isInView={isInView}
                prefersReduced={prefersReduced}
              >
                {word}
              </AnimWord>
            ))}
          </p>

        </div>

        {/* ── Grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Proof cards — slide from left + TiltCard 3D hover */}
          <motion.div
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5"
            variants={cardContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {proofCards.map((c, i) => (
              <motion.div key={c.title} variants={cardVariants} className="h-full">
                <TiltCard maxTilt={5} scale={1.03} className="h-full">
                  <Card padding="md" className="glow-card bg-calcium flex flex-col gap-3 h-full">
                    <motion.span
                      className="text-eyebrow text-clay"
                      variants={badgeVariants}
                    >
                      0{i + 1}
                    </motion.span>
                    <h3 className="text-h4 font-display text-ink">{c.title}</h3>
                    <p className="text-body-sm text-ink-soft">{c.body}</p>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Blockquote — border draws down, text reveals word-by-word */}
          <div className="lg:col-span-5">
            <blockquote className="flex gap-6">

              {/* Animated left border: track → fill */}
              <div className="relative w-[2px] flex-shrink-0 self-stretch bg-clay/15 rounded-full">
                <motion.span
                  aria-hidden
                  className="absolute inset-x-0 top-0 bg-clay rounded-full"
                  style={{ originY: 0 }}
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 0.7, ease, delay: 0.55 }}
                />
              </div>

              <div>
                {/* Quote text — word-by-word split reveal */}
                <p className="serif-italic text-h3 text-ink leading-snug">
                  {[
                    "All around us there", "are", "endless", "exercise", "programs", "—", "but", "no",
                    "motivation,", "and", "no", "direction", "for", "where",
                  ].map((word, i) => (
                    <AnimWord
                      key={word + i}
                      delay={0.65 + i * 0.045}
                      isInView={isInView}
                      prefersReduced={prefersReduced}
                    >
                      {word}
                    </AnimWord>
                  ))}
                  {/* "your" in clay */}
                  <span className="inline-block overflow-hidden mr-[0.28em]">
                    <motion.em
                      className="not-italic font-display text-clay inline-block"
                      initial={prefersReduced ? { opacity: 0 } : { y: "110%", opacity: 0 }}
                      animate={isInView ? (prefersReduced ? { opacity: 1 } : { y: "0%", opacity: 1 }) : {}}
                      transition={{ duration: 0.65, ease, delay: 0.65 + 13 * 0.045 }}
                    >
                      your
                    </motion.em>
                  </span>
                  {[
                    "body", "is", "at.", "We", "give", "you", "the", "roadmap.",
                  ].map((word, i) => (
                    <AnimWord
                      key={word + i}
                      delay={0.65 + (14 + i) * 0.045}
                      isInView={isInView}
                      prefersReduced={prefersReduced}
                    >
                      {word}
                    </AnimWord>
                  ))}
                </p>

                <motion.footer
                  className="text-caption text-ink-soft mt-4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 1.5 }}
                >
                  — Dr.&nbsp;Shruthi Desai
                </motion.footer>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </Section>
  );
}
