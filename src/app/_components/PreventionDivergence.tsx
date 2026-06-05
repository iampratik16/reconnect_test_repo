"use client";

/**
 * PreventionDivergence — the visual centrepiece of the Built-for-Prevention
 * section. Replaces the old single-photo "NOW → 10 YEARS" card, whose colour-
 * wash transformation was imperceptible and whose before/after labels implied a
 * change one static image couldn't deliver.
 *
 * Instead it draws the section's actual argument: from age 40, two paths diverge.
 * Do nothing and mobility drifts down (stiffness, pain). With Reconnect it holds
 * and rises. The widening, softly-filled GAP between them is the whole pitch for
 * prevention — honest, editorial, no faked transformation.
 *
 * Motion: both lines draw left→right on scroll-in (one orchestrated reveal), then
 * the gap fill dawns, then the endpoint dots. Reduced-motion → fully drawn static.
 * Illustrative, not clinical data — captioned as such for a medical brand.
 *
 * Tokens only: --clay (#0064E0) for the Reconnect path, ink/line greys for the
 * decline path and axes. Geist for numerals. No new colours or fonts.
 */

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// ── Chart geometry (viewBox 400 × 500, 4:5 to match the old card) ──
const VW = 400, VH = 500;
const PAD_L = 16, PAD_R = 16, PAD_T = 64, PAD_B = 56;
const X0 = PAD_L, X1 = VW - PAD_R;
const Y0 = PAD_T, Y1 = VH - PAD_B;

// Start point (age 40) — both paths leave here.
const START_X = X0;
const START_Y = Y0 + (Y1 - Y0) * 0.42;

// "With Reconnect" — dips a touch, then rises and holds high.
const UP_PATH = `M ${START_X},${START_Y} C ${X0 + 90},${START_Y + 26} ${X0 + 150},${Y0 + 36} ${X0 + 250},${Y0 + 30} S ${X1 - 40},${Y0 + 22} ${X1},${Y0 + 18}`;

// "Do nothing" — declines steadily, accelerating late.
const DOWN_PATH = `M ${START_X},${START_Y} C ${X0 + 110},${START_Y + 60} ${X0 + 200},${Y1 - 90} ${X0 + 280},${Y1 - 48} S ${X1 - 30},${Y1 - 6} ${X1},${Y1}`;

// Gap fill polygon: trace the up-path, drop to the down-path endpoint, then
// straight back to the shared start — fills the wedge between the two curves.
const GAP_AREA = `${UP_PATH} L ${X1},${Y1} L ${START_X},${START_Y} Z`;

const AGES = [40, 45, 50, 55, 60];

export default function PreventionDivergence() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();
  const animate = inView && !prefersReduced;
  const shown = prefersReduced ? true : inView;

  return (
    <figure className="relative rounded-[20px] overflow-hidden bg-calcium shadow-card hairline aspect-[4/5]">
      <svg
        ref={ref}
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full h-full"
        role="img"
        aria-label="From age 40, two paths diverge: without action mobility declines; with Reconnect it holds and rises. The gap widens over the next two decades."
      >
        <defs>
          <linearGradient id="gap-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0064E0" stopOpacity="0" />
            <stop offset="100%" stopColor="#0064E0" stopOpacity="0.12" />
          </linearGradient>
          <filter id="line-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Header ── */}
        <text x={X0} y={30} fontFamily="Geist, Inter, sans-serif" fontSize={13}
          fontWeight={500} fill="#1D1D1F" letterSpacing="-0.01em">
          Where the next decade goes
        </text>
        <text x={X0} y={48} fontFamily="Inter, sans-serif" fontSize={10.5} fill="#6E6E73">
          Joint mobility &amp; comfort, from age 40
        </text>

        {/* ── Y-axis qualitative labels ── */}
        <text x={X0} y={Y0 - 4} fontFamily="Inter, sans-serif" fontSize={9}
          fill="#6E6E73" opacity={0.7}>More mobile</text>
        <text x={X0} y={Y1 + 16} fontFamily="Inter, sans-serif" fontSize={9}
          fill="#6E6E73" opacity={0.7}>Less mobile</text>

        {/* ── X-axis age ticks ── */}
        {AGES.map((age, i) => {
          const x = X0 + ((X1 - X0) * i) / (AGES.length - 1);
          return (
            <g key={age}>
              <line x1={x} y1={Y0} x2={x} y2={Y1}
                stroke="#DEE3E9" strokeWidth={1} opacity={0.5} />
              <text x={x} y={Y1 + 34} textAnchor={i === 0 ? "start" : i === AGES.length - 1 ? "end" : "middle"}
                fontFamily="Geist, Inter, sans-serif" fontSize={10} fill="#6E6E73">
                {age}
              </text>
            </g>
          );
        })}

        {/* ── Gap fill — dawns after the lines ── */}
        <motion.path
          d={GAP_AREA}
          fill="url(#gap-grad)"
          initial={{ opacity: 0 }}
          animate={shown ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: prefersReduced ? 0 : 1.1 }}
        />

        {/* ── "Do nothing" decline path ── */}
        <motion.path
          d={DOWN_PATH}
          fill="none" stroke="#9AA0A6" strokeWidth={2}
          strokeLinecap="round" strokeDasharray="1 0"
          initial={{ pathLength: prefersReduced ? 1 : 0 }}
          animate={shown ? { pathLength: 1 } : {}}
          transition={{ duration: animate ? 1.2 : 0, ease: EASE, delay: 0.1 }}
        />

        {/* ── "With Reconnect" path — brand blue, glow ── */}
        <motion.path
          d={UP_PATH}
          fill="none" stroke="#0064E0" strokeWidth={2.75}
          strokeLinecap="round" filter="url(#line-glow)"
          initial={{ pathLength: prefersReduced ? 1 : 0 }}
          animate={shown ? { pathLength: 1 } : {}}
          transition={{ duration: animate ? 1.2 : 0, ease: EASE, delay: 0.1 }}
        />

        {/* ── Endpoint dots + labels ── */}
        <motion.g
          initial={{ opacity: prefersReduced ? 1 : 0 }}
          animate={shown ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: prefersReduced ? 0 : 1.4 }}
        >
          {/* Up endpoint */}
          <circle cx={X1} cy={Y0 + 18} r={4} fill="#0064E0" />
          <circle cx={X1} cy={Y0 + 18} r={8} fill="#0064E0" fillOpacity={0.14} />
          <text x={X1} y={Y0 + 4} textAnchor="end" fontFamily="Inter, sans-serif"
            fontSize={10.5} fontWeight={600} fill="#0064E0">With Reconnect</text>
          <text x={X1} y={Y0 + 38} textAnchor="end" fontFamily="Inter, sans-serif"
            fontSize={9} fill="#6E6E73">Strong &amp; capable</text>

          {/* Down endpoint */}
          <circle cx={X1} cy={Y1} r={3.5} fill="#9AA0A6" />
          <text x={X1 - 10} y={Y1 - 12} textAnchor="end" fontFamily="Inter, sans-serif"
            fontSize={9} fill="#9AA0A6">Stiffer, in more pain</text>
        </motion.g>

        {/* ── Start marker ── */}
        <circle cx={START_X} cy={START_Y} r={3} fill="#1D1D1F" />
        <text x={START_X + 8} y={START_Y - 8} fontFamily="Inter, sans-serif"
          fontSize={9} fill="#6E6E73">Today</text>
      </svg>

      {/* Honesty caption — illustrative, not clinical data */}
      <figcaption className="absolute bottom-3 left-5 right-5 text-caption text-ink-soft/55 text-[10px]">
        Illustrative — individual results vary.
      </figcaption>
    </figure>
  );
}
