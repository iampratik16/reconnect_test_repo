"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import { asset } from "@/lib/asset";

const ease = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    num: "01",
    title: "Assessment",
    subtitle: "Where everything starts",
    body: "Comprehensive medical and lifestyle evaluation — your diagnosis, imaging, pain map, and history all shape the prescription.",
    region: "scan" as const,
    image: "/images/method-assessment.png",
    color: "#64B5F6",
    glow: "rgba(100,181,246,0.35)",
    tag: "Always first",
  },
  {
    num: "02",
    title: "Exercise",
    subtitle: "Targeted movement protocols",
    body: "Structured and progressive. Movement calibrated to your specific joints, muscle groups, and functional goals.",
    region: "muscles" as const,
    image: "/images/method-exercise.png",
    color: "#81C784",
    glow: "rgba(129,199,132,0.35)",
    tag: "Doctor-prescribed",
  },
  {
    num: "03",
    title: "Nutrition",
    subtitle: "Anti-inflammatory fuel",
    body: "Well balanced meal plans integrated with your exercise protocol. Food as medicine, supporting joint recovery from within.",
    region: "gut" as const,
    image: "/images/method-nutrition-v2.png",
    video: "/videos/method-nutrition-v2.mp4",
    color: "#FFB74D",
    glow: "rgba(255,183,77,0.35)",
    tag: "Integrated, not add-on",
  },
  {
    num: "04",
    title: "Mind Coaching",
    subtitle: "The pillar most leave out",
    body: "Mind coaching to break fear patterns and build movement habits that actually stick. Without this, most people revert within 3 months.",
    region: "brain" as const,
    image: "/images/method-mind.png",
    color: "#CE93D8",
    glow: "rgba(206,147,216,0.35)",
    tag: "Long-term success",
  },
];

/* ─── SVG overlays calibrated to the 9:16 body image ─────────
   viewBox="0 0 90 160"  (9:16 scaled × 10)
   Head:     ~cx=45, cy=12   (top 15% of frame)
   Chest:    ~cy=42–58
   Abs/gut:  ~cy=62–84
   Arms:     ~cx=12 (L) cx=78 (R), cy=50–80
   Quads:    ~cy=94–120
   Calves:   ~cy=130–148
──────────────────────────────────────────────────────────────── */
function ScanOverlay({
  region,
  color,
  prefersReduced,
}: {
  region: (typeof STEPS)[number]["region"];
  color: string;
  prefersReduced: boolean | null;
}) {
  return (
    <svg
      viewBox="0 0 90 160"
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      aria-hidden
    >
      <defs>
        <filter id="ov-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="ov-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="scan-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.7" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── SCAN (Assessment) — sweeping scanner bar only ── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: region === "scan" ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {!prefersReduced && (
          <>
            {/* Scanner bar */}
            <motion.rect
              x="0" width="90" height="1.5" rx="1"
              fill={color} opacity="0.9"
              filter="url(#ov-glow)"
              animate={{ y: [-5, 160, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            {/* Trailing glow band */}
            <motion.rect
              x="0" width="90" height="16" rx="4"
              fill={color} opacity="0.07"
              animate={{ y: [-16, 144, -16] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </>
        )}
      </motion.g>

      {/* ── BRAIN (Psychology) ── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: region === "brain" ? 1 : 0 }}
        transition={{ duration: 0.7 }}
        filter="url(#ov-glow)"
      >
        <ellipse cx="45" cy="12" rx="20" ry="16" fill={color} opacity="0.45" />
        <ellipse cx="45" cy="11" rx="13" ry="10" fill={color} opacity="0.35" />
        {/* Neural lines */}
        {!prefersReduced && [
          "M33,9 Q45,4 57,9",
          "M30,14 Q45,8 60,14",
          "M32,19 Q45,14 58,19",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="white"
            strokeWidth="0.7"
            fill="none"
            opacity="0.4"
            initial={{ pathLength: 0 }}
            animate={region === "brain" ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.6, delay: i * 0.18 }}
          />
        ))}
        {/* Pulse ring */}
        {!prefersReduced && (
          <motion.ellipse
            cx="45" cy="12" rx="24" ry="20"
            fill="none" stroke={color} strokeWidth="0.8"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            style={{ transformOrigin: "45px 12px" }}
          />
        )}
      </motion.g>

      {/* ── EXERCISE — photo carries the story, no overlay needed ── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
      />

      {/* ── GUT (Nutrition) ── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: region === "gut" ? 1 : 0 }}
        transition={{ duration: 0.7 }}
        filter="url(#ov-glow)"
      >
        <ellipse cx="45" cy="72" rx="20" ry="26" fill={color} opacity="0.5" />
        <ellipse cx="45" cy="72" rx="13" ry="18" fill={color} opacity="0.3" />
        {!prefersReduced && (
          <>
            <motion.path
              d="M36,60 Q58,62 54,74 Q50,86 34,86 Q22,86 25,74"
              stroke="white" strokeWidth="0.9" fill="none" opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={region === "gut" ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
            />
            <motion.ellipse
              cx="45" cy="72" rx="24" ry="30"
              fill="none" stroke={color} strokeWidth="0.8"
              animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0, 0.45] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              style={{ transformOrigin: "45px 72px" }}
            />
          </>
        )}
      </motion.g>
    </svg>
  );
}

/* ─── Step list (left, dark) ────────────────────────────────── */
function StepList({
  activeStep,
  onSelect,
}: {
  activeStep: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex flex-col">
      {STEPS.map((s, i) => {
        const isActive = i === activeStep;
        const isPast = i < activeStep;
        return (
          <button
            key={s.num}
            onClick={() => onSelect(i)}
            className="flex items-start gap-4 text-left cursor-pointer py-3 group"
          >
            <div className="flex flex-col items-center shrink-0 pt-0.5">
              <motion.div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold border"
                animate={{
                  borderColor: isActive || isPast ? s.color : "rgba(255,255,255,0.2)",
                  backgroundColor: isActive ? s.color : "rgba(255,255,255,0)",
                  color: isActive ? "#0d0d0b" : isPast ? s.color : "rgba(255,255,255,0.45)",
                }}
                transition={{ duration: 0.35 }}
              >
                {s.num}
              </motion.div>
              {i < STEPS.length - 1 && (
                <div className="w-px h-10 mt-1 bg-white/10 relative overflow-hidden rounded-full">
                  <motion.div
                    className="absolute top-0 left-0 w-full rounded-full"
                    animate={{ height: isPast ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease }}
                    style={{ backgroundColor: s.color }}
                  />
                </div>
              )}
            </div>
            <div className="pb-10">
              <motion.p
                className="font-display font-semibold leading-none"
                animate={{
                  color: isActive ? s.color : isPast ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.5)",
                  fontSize: isActive ? "1.05rem" : "0.9rem",
                }}
                transition={{ duration: 0.3 }}
              >
                {s.title}
              </motion.p>
              <motion.p
                className="mt-1 text-[0.72rem]"
                animate={{ color: isActive ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.38)" }}
                transition={{ duration: 0.3 }}
              >
                {s.subtitle}
              </motion.p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Step content (right, dark) ───────────────────────────── */
function StepContent({ step, active }: { step: (typeof STEPS)[number]; active: boolean }) {
  return (
    <div
      className="flex flex-col gap-5 w-full transition-all duration-500 ease-out-expo"
      style={{
        opacity: active ? 1 : 0,
        transform: `translateY(${active ? 0 : 14}px)`,
      }}
    >
      {/* Tag */}
      <span
        className="inline-flex self-start items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.13em] border"
        style={{
          backgroundColor: `${step.color}12`,
          color: step.color,
          borderColor: `${step.color}35`,
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.color }} />
        {step.tag}
      </span>

      {/* Number + title */}
      <div className="flex items-baseline gap-3 flex-wrap">
        <span
          className="font-display font-black leading-none"
          style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", color: `${step.color}18` }}
        >
          {step.num}
        </span>
        <span
          className="font-display font-bold leading-tight"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: step.color }}
        >
          {step.title}
        </span>
      </div>

      {/* Body */}
      <p className="leading-relaxed text-[0.97rem]" style={{ color: "rgba(255,255,255,0.6)" }}>
        {step.body}
      </p>

      {/* Accent bar */}
      <div
        className="h-0.5 w-12 rounded-full origin-left transition-transform duration-500 ease-out-expo"
        style={{ backgroundColor: step.color, transform: `scaleX(${active ? 1 : 0})` }}
      />

      <Link
        href="/approach"
        className="inline-flex w-fit items-center gap-1 text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-60"
        style={{ color: step.color }}
      >
        See the full method →
      </Link>
    </div>
  );
}

/* ─── Main ──────────────────────────────────────────────────── */
export default function MethodSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const lastStepRef = useRef(-1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Only fires state update when crossing a step boundary — zero jank
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(3, Math.floor(v * 4));
    if (next !== lastStepRef.current) {
      lastStepRef.current = next;
      setActiveStep(next);
    }
  });

  const step = STEPS[activeStep];

  return (
    <div ref={sectionRef} style={{ height: "400vh" }} className="relative">
      <div
        className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden"
        style={{ backgroundColor: "#080c14" }}
      >
        {/* Background ambient glow that shifts colour with each step */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${step.glow} 0%, transparent 70%)` }}
          transition={{ duration: 0.8 }}
        />

        <div className="container-site w-full relative z-10">

          {/* Header */}
          <div className="text-center mb-8 md:mb-10">
            <motion.p
              className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-2"
              animate={{ color: step.color }}
              transition={{ duration: 0.5 }}
            >
              The method
            </motion.p>
            <h2
              className="font-display text-white leading-tight"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
            >
              One connected method —{" "}
              <span style={{ color: "rgba(255,255,255,0.4)" }}>always in this order.</span>
            </h2>
          </div>

          {/* Three-column layout */}
          <div className="grid grid-cols-12 gap-6 md:gap-8 items-center">

            {/* Left: step list */}
            <div className="hidden md:block col-span-3">
              <StepList activeStep={activeStep} onSelect={setActiveStep} />
            </div>

            {/* Centre: glassmorphism card + anatomy */}
            <div className="col-span-12 md:col-span-5 flex justify-center">
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  width: "min(260px, 100%)",
                  aspectRatio: "9/16",
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: `0 0 60px ${step.glow}, 0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)`,
                }}
              >
                {/* Per-step media — crossfade on step change */}
                {STEPS.map((s, i) => (
                  <motion.div
                    key={s.num}
                    className="absolute inset-0"
                    animate={{ opacity: i === activeStep ? 1 : 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {"video" in s && s.video ? (
                      <video
                        src={asset(s.video)}
                        poster={asset(s.image)}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload={i === activeStep ? "metadata" : "none"}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                    ) : (
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        sizes="260px"
                        className="object-cover object-top"
                        loading="lazy"
                      />
                    )}
                  </motion.div>
                ))}

                {/* Edge vignette */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: `linear-gradient(to bottom,
                      rgba(8,12,20,0.45) 0%,
                      transparent 18%,
                      transparent 78%,
                      rgba(8,12,20,0.65) 100%)`,
                  }}
                />

                {/* Assessment scan overlay only */}
                <ScanOverlay
                  region={step.region}
                  color={step.color}
                  prefersReduced={prefersReduced}
                />

                {/* Glass edge highlight (top rim light) */}
                <div
                  className="absolute inset-x-0 top-0 h-px pointer-events-none z-30"
                  style={{ background: `linear-gradient(to right, transparent, ${step.color}60, transparent)` }}
                />

                {/* Current step label — bottom of card */}
                <div className="absolute bottom-0 inset-x-0 p-4 z-30 flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    animate={{ backgroundColor: step.color }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.span
                    className="text-[11px] font-semibold uppercase tracking-[0.13em]"
                    animate={{ color: step.color }}
                    transition={{ duration: 0.5 }}
                  >
                    {step.title}
                  </motion.span>
                </div>
              </div>
            </div>

            {/* Right: step content — all stacked, crossfade by opacity (smooth on mobile) */}
            <div className="col-span-12 md:col-span-4 relative min-h-85 md:min-h-75 flex items-center">
              {STEPS.map((s, i) => (
                <div
                  key={s.num}
                  className="absolute inset-0 flex items-center"
                  style={{ pointerEvents: i === activeStep ? "auto" : "none" }}
                  aria-hidden={i !== activeStep}
                >
                  <StepContent step={s} active={i === activeStep} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile dots */}
          <div className="flex md:hidden justify-center gap-3 mt-8">
            {STEPS.map((s, i) => (
              <button
                key={s.num}
                onClick={() => setActiveStep(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: activeStep === i ? 24 : 8,
                  height: 8,
                  backgroundColor: activeStep === i ? s.color : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>

          {/* Scroll hint / final CTA — aligned under the centre card column */}
          <div className="mt-8 grid grid-cols-12">
            <div className="col-span-12 md:col-start-4 md:col-span-5 flex justify-center">
            <AnimatePresence mode="wait">
              {activeStep < 3 ? (
                <motion.p
                  key="hint"
                  className="text-[11px] uppercase tracking-widest flex items-center gap-2"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="inline-block w-px h-4 bg-white/20 animate-bounce" />
                  Scroll to explore
                  <span className="inline-block w-px h-4 bg-white/20 animate-bounce" />
                </motion.p>
              ) : (
                <motion.div
                  key="cta"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <Link
                    href="/approach"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
                    style={{
                      backgroundColor: step.color,
                      color: "#080c14",
                      boxShadow: `0 0 24px ${step.glow}`,
                    }}
                  >
                    See the full method →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
