"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { testimonials, type Testimonial } from "@/lib/content/testimonials";
import { asset } from "@/lib/asset";

/* ─── Animated number that counts up on scroll-in ─────────── */
function AnimatingNumber({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView) return;
    if (prefersReduced) { mv.set(value); return; }
    const c = animate(mv, value, { duration: 1.4, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [isInView, value, mv, prefersReduced]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

/* ─── Individual outcome card ──────────────────────────────── */
function OutcomeCard({
  t,
  index,
}: {
  t: Testimonial;
  index: number;
}) {
  const trackColor: Record<string, string> = {
    Manage: "bg-sage/10 text-sage border border-sage/20",
    Strengthen: "bg-clay/10 text-clay border border-clay/20",
    Prevent: "bg-ink/10 text-ink-soft border border-line",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      className="relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-soft border border-line group"
      style={{ boxShadow: "0 2px 16px 0 rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)" }}
    >
      {/* Gradient top band */}
      <div
        className="h-1.5 w-full"
        style={{
          background:
            index === 0
              ? "linear-gradient(90deg, #4a7c59, #7aad8a)"
              : index === 1
              ? "linear-gradient(90deg, #c26b4b, #e8916e)"
              : "linear-gradient(90deg, #2a5298, #4a7cc7)",
        }}
      />

      <div className="flex flex-col flex-1 p-7 gap-6">
        {/* Photo + name + tags */}
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(t.image)}
            alt={t.imageAlt}
            loading="lazy"
            className="w-14 h-14 rounded-full object-cover ring-2 ring-line shrink-0"
          />
          <div className="min-w-0">
            <p className="text-body font-semibold text-ink leading-tight truncate">
              {t.name}, {t.age}
            </p>
            <p className="text-caption text-ink-soft mt-0.5 truncate">{t.location}</p>
          </div>
          <span
            className={`ml-auto shrink-0 text-caption font-medium rounded-pill px-3 py-1 ${
              trackColor[t.track] ?? "bg-line text-ink-soft"
            }`}
          >
            {t.track}
          </span>
        </div>

        {/* Condition tag */}
        <p className="text-caption uppercase tracking-widest text-clay font-medium -mb-2">
          {t.condition}
        </p>

        {/* Quote */}
        <blockquote className="text-body-lg font-display text-ink leading-snug">
          <span className="text-clay">&ldquo;</span>
          {t.quote}
          <span className="text-clay">&rdquo;</span>
        </blockquote>

        {/* ── Metric hero ──────────────────────────── */}
        <div
          className="rounded-2xl px-6 py-5 flex flex-col items-start gap-1"
          style={{
            background:
              index === 0
                ? "linear-gradient(135deg, #f0f7f2 0%, #e8f4ee 100%)"
                : index === 1
                ? "linear-gradient(135deg, #fdf3ef 0%, #fae8e0 100%)"
                : "linear-gradient(135deg, #eff3fb 0%, #e4ecf9 100%)",
          }}
        >
          {t.metricNumeric !== undefined ? (
            <p
              className="font-display leading-none"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3rem)",
                color:
                  index === 0 ? "#4a7c59" : index === 1 ? "#c26b4b" : "#2a5298",
              }}
            >
              <AnimatingNumber value={t.metricNumeric} suffix={t.metricSuffix ?? ""} />
            </p>
          ) : (
            <p
              className="font-display leading-none"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 2.6rem)",
                color: "#2a5298",
              }}
            >
              {t.metric}
            </p>
          )}
          {/* context for the "8 to 2" — show "was 8" ghost */}
          {t.name === "Rajesh Sharma" && (
            <p className="text-caption text-ink-soft/70">
              Down from 8 out of 10
            </p>
          )}
          <p className="text-caption font-medium text-ink-soft uppercase tracking-wider mt-0.5">
            {t.metricLabel}
          </p>
        </div>

        {/* Outcome bullets */}
        <ul className="flex flex-col gap-2.5 flex-1">
          {t.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                className="shrink-0 mt-0.5"
                aria-hidden="true"
              >
                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"
                  className={
                    index === 0
                      ? "text-sage/40"
                      : index === 1
                      ? "text-clay/40"
                      : "text-[#2a5298]/40"
                  }
                />
                <path
                  d="M6.5 10l2.5 2.5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={
                    index === 0
                      ? "text-sage"
                      : index === 1
                      ? "text-clay"
                      : "text-[#2a5298]"
                  }
                />
              </svg>
              <span className="text-body-sm text-ink-soft leading-snug">{b}</span>
            </li>
          ))}
        </ul>

        {/* Consent note */}
        <p className="text-[11px] text-ink-soft/50 italic mt-auto pt-4 border-t border-line">
          Story shared with explicit consent. Outcomes vary by individual.
        </p>
      </div>

      {/* Hover glow ring */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow:
            index === 0
              ? "inset 0 0 0 1.5px rgba(74,124,89,0.3)"
              : index === 1
              ? "inset 0 0 0 1.5px rgba(194,107,75,0.3)"
              : "inset 0 0 0 1.5px rgba(42,82,152,0.3)",
        }}
      />
    </motion.article>
  );
}

/* ─── Public export (replaces old slider) ─────────────────── */
export default function TestimonialsSlider() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((t, i) => (
        <OutcomeCard key={t.name} t={t} index={i} />
      ))}
    </div>
  );
}
