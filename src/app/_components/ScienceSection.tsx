"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";

const ease = [0.16, 1, 0.3, 1] as const;

const cards = [
  {
    img: "/images/science/less-pain.png",
    eyebrow: "Less Pain",
    statFrom: 50,
    stat: 60,
    statSuffix: "%",
    // Stat flows directly into this sentence — read together as one thought
    continuation: "of members report meaningful pain reduction within their first 16-week cycle.",
    insight: "Targeted strength calms the joint — not just masks the pain.",
    wide: true,
    accent: "#C4714A",
  },
  {
    img: "/images/science/denser-bones.png",
    eyebrow: "Denser Bones",
    statFrom: 1,
    stat: 3,
    statSuffix: "%",
    continuation: "annual bone density gain on average — measurable growth, not just preservation.",
    insight: "Especially critical post-menopause, when loss accelerates fastest.",
    wide: false,
    accent: "#6B8F71",
  },
  {
    img: "/images/science/retained-muscle.png",
    eyebrow: "Retained Muscle",
    statFrom: 3,
    stat: 5,
    statSuffix: "%",
    continuation: "of muscle lost every decade after 30 — strength training fully reverses this.",
    insight: "At any age, any diagnosis, any starting point.",
    wide: false,
    accent: "#A07850",
  },
  {
    img: "/images/science/joint-protection.png",
    eyebrow: "Joint Protection",
    statFrom: 8,
    stat: 12,
    statSuffix: "",
    continuation: "times more joint load absorbed by strong muscles — less cartilage wear, slower degeneration.",
    insight: "Built progressively across a structured 16-week cycle with milestones.",
    wide: true,
    accent: "#C4714A",
  },
];

function ScienceCard({
  card,
  index,
  isInView,
  prefersReduced,
}: {
  card: (typeof cards)[number];
  index: number;
  isInView: boolean;
  prefersReduced: boolean | null;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-[20px] ${
        card.wide ? "md:col-span-2" : "md:col-span-1"
      } min-h-105 md:min-h-125 group cursor-default`}
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease, delay: index * 0.1 }}
    >
      {/* Full-bleed AI image */}
      <Image
        src={card.img}
        alt={card.eyebrow}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        priority={index < 2}
      />

      {/* Gradient overlay — dark at bottom so text is legible */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top,
            rgba(13,13,11,0.96) 0%,
            rgba(13,13,11,0.65) 42%,
            rgba(13,13,11,0.15) 68%,
            transparent 100%)`,
        }}
      />

      {/* Hover colour bloom */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 80%, ${card.accent}1e 0%, transparent 60%)` }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-9">

        {/* Eyebrow pill */}
        <motion.span
          className="inline-flex self-start items-center gap-1.5 rounded-full border border-white/30 bg-black/55 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.13em] text-white"
          initial={{ opacity: 0, y: -8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease, delay: index * 0.1 + 0.3 }}
        >
          <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: card.accent }} />
          {card.eyebrow}
        </motion.span>

        {/* Bottom: big number → sentence → insight */}
        <div>
          {/* Stat */}
          <motion.div
            className="flex items-baseline gap-1 mb-2"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: index * 0.1 + 0.4 }}
          >
            <span
              className="font-display leading-none font-bold text-white"
              style={{ fontSize: card.wide ? "clamp(3.5rem, 7vw, 5rem)" : "clamp(3rem, 6vw, 4.25rem)" }}
            >
              {isInView ? (
                <AnimatedCounter value={card.stat} prefix={`${card.statFrom}–`} suffix="" />
              ) : (
                `${card.statFrom}–${card.stat}`
              )}
            </span>
            {card.statSuffix && (
              <span
                className="font-display leading-none font-semibold"
                style={{
                  fontSize: card.wide ? "clamp(1.5rem, 3vw, 2.25rem)" : "clamp(1.25rem, 2.5vw, 1.75rem)",
                  color: card.accent,
                }}
              >
                {card.statSuffix}
              </span>
            )}
          </motion.div>

          {/* Continuation sentence */}
          <motion.p
            className="text-white/85 leading-relaxed mb-4"
            style={{ fontSize: card.wide ? "clamp(0.95rem, 1.6vw, 1.1rem)" : "0.95rem" }}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease, delay: index * 0.1 + 0.52 }}
          >
            {card.continuation}
          </motion.p>

          {/* Thin accent rule */}
          <motion.div
            className="h-px mb-4 rounded-full"
            style={{ backgroundColor: `${card.accent}44`, originX: 0 }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, ease, delay: index * 0.1 + 0.55 }}
          />

          {/* Insight */}
          <motion.p
            style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", fontStyle: "italic" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.65 }}
          >
            {card.insight}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ScienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section className="section-py" style={{ backgroundColor: "#0d0d0b" }}>
      <div className="container-site" ref={ref}>

        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <motion.p
            className="text-[11px] font-medium uppercase tracking-[0.16em] mb-4"
            style={{ color: "#C4714A" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            The science
          </motion.p>

          <div className="overflow-hidden mb-5">
            <motion.h2
              className="font-display text-white"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", lineHeight: 1.1 }}
              initial={prefersReduced ? { opacity: 0 } : { y: "100%", opacity: 0 }}
              animate={isInView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.75, ease, delay: 0.1 }}
            >
              Why strength training<br />
              <span style={{ color: "#C4714A" }}>changes everything.</span>
            </motion.h2>
          </div>

          <motion.p
            className="text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.25 }}
          >
            The evidence behind every program we design — measurable improvements
            across pain, bone, muscle, and joint degeneration.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {cards.map((card, i) => (
            <ScienceCard
              key={card.eyebrow}
              card={card}
              index={i}
              isInView={isInView}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          className="mt-6 text-[11px] text-center"
          style={{ color: "rgba(255,255,255,0.22)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          Based on peer-reviewed literature and outcomes reported across Reconnect 16-week program cycles.
        </motion.p>
      </div>
    </section>
  );
}
