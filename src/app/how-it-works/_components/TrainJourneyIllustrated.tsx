"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/* ── Tokens ──────────────────────────────────────────────────── */
const BLUE  = "#0064E0";
const CORAL = "#E76F51";
const DARK  = "#0E384C";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Data ────────────────────────────────────────────────────── */
const PILLARS = [
  {
    num:   "01",
    title: "Doctor-led",
    body:  "Every program is designed and overseen by a rheumatologist. Trainers carry it out — the medicine sits behind every prescription. No program leaves without a clinical sign-off.",
    stats: [
      { value: 12,  suffix: "+",  label: "Years rheumatology practice" },
      { value: 100, suffix: "%",  label: "Medically assessed before start" },
    ],
    Visual: VisualRx,
    dark:  false,
  },
  {
    num:   "02",
    title: "Personalised",
    body:  "Built from your assessment — your diagnosis, imaging, pain map, current medications, and history. Not a template. Not a cohort. One program, one patient.",
    stats: [
      { value: 0, suffix: "",    label: "Generic programs issued" },
      { value: 4, suffix: "+",   label: "Clinical inputs per plan" },
    ],
    Visual: VisualBody,
    dark:  false,
  },
  {
    num:   "03",
    title: "Pain-first",
    body:  "We calm the pain, respect it, then build strength around it. The exercise prescription responds to where your pain is today — not where we hope it will be.",
    stats: [
      { value: 82, suffix: "%",  label: "Report meaningful pain reduction by week 6" },
      { value: 0,  suffix: "",   label: '"Push through it" instructions issued' },
    ],
    Visual: null,  // ECG is the full-bleed visual — handled separately
    dark:  true,
  },
  {
    num:   "04",
    title: "Structured roadmap",
    body:  "A 12-week cycle with defined milestones, weekly check-ins, and a medical reassessment at the end. You always know where you are and what comes next.",
    stats: [
      { value: 12, suffix: "",   label: "Week structured program" },
      { value: 4,  suffix: "",   label: "Clinical checkpoints" },
    ],
    Visual: VisualTimeline,
    dark:  false,
  },
] as const;

/* ──────────────────────────────────────────────────────────────
   COUNT-UP HOOK
   ────────────────────────────────────────────────────────────── */
function useCountUp(target: number, inView: boolean, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView || target === 0) return;
    let raf: number;
    let start: number | null = null;
    const duration = 1600;
    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start - delay;
      if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
      const p = Math.min(elapsed / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(e * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, delay]);
  return count;
}

/* ──────────────────────────────────────────────────────────────
   STAT CHIP
   ────────────────────────────────────────────────────────────── */
function Stat({
  value, suffix, label, inView, dark = false, index = 0,
}: {
  value: number; suffix: string; label: string;
  inView: boolean; dark?: boolean; index?: number;
}) {
  const count = useCountUp(value, inView, 300 + index * 120);
  return (
    <motion.div
      className="flex flex-col gap-1.5"
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease, delay: 0.35 + index * 0.1 }}
    >
      <span
        className="font-display leading-none"
        style={{
          fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
          color: dark ? "rgba(255,255,255,0.92)" : BLUE,
        }}
      >
        {count}{suffix}
      </span>
      <span
        className="text-caption leading-snug"
        style={{
          color: dark ? "rgba(255,255,255,0.45)" : undefined,
          maxWidth: 140,
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   MEDICAL SVG VISUALS  (no card wrapper — art sits on the page)
   ────────────────────────────────────────────────────────────── */

/* 01 — Stethoscope + Rx sign */
function VisualRx({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 360 300" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" aria-hidden>
      {/* Rx letterform — structural, behind everything */}
      <motion.text x={148} y={242}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={200} fontWeight={700} fill={BLUE}
        initial={{ opacity: 0 }} animate={animate ? { opacity: 0.055 } : {}}
        transition={{ duration: 0.7, ease, delay: 0 }}>
        Rx
      </motion.text>

      {/* Earpieces */}
      <motion.line x1={132} y1={52} x2={132} y2={26} stroke={BLUE} strokeWidth={3} strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 0.3, ease, delay: 0.2 }}/>
      <motion.line x1={228} y1={52} x2={228} y2={26} stroke={BLUE} strokeWidth={3} strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 0.3, ease, delay: 0.25 }}/>
      {/* Bridge arc */}
      <motion.path d="M132,52 Q132,84 180,84 Q228,84 228,52"
        stroke={BLUE} strokeWidth={3} strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 0.55, ease, delay: 0.3 }}/>
      {/* Tube */}
      <motion.path d="M180,84 L180,168 Q180,198 156,210"
        stroke={BLUE} strokeWidth={3} strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 0.5, ease, delay: 0.6 }}/>
      {/* Chest piece */}
      <motion.circle cx={144} cy={224} r={26}
        stroke={BLUE} strokeWidth={3}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, ease, delay: 0.9 }}/>
      <motion.circle cx={144} cy={224} r={12}
        stroke={BLUE} strokeWidth={1.5}
        initial={{ opacity: 0 }} animate={animate ? { opacity: 0.35 } : {}}
        transition={{ duration: 0.3, delay: 1.1 }}/>

      {/* Signature line */}
      <motion.line x1={210} y1={240} x2={342} y2={240}
        stroke={BLUE} strokeWidth={1} opacity={0.25}
        initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
        style={{ transformOrigin: "210px 240px" }}
        transition={{ duration: 0.5, ease, delay: 1.2 }}/>
      <motion.text x={210} y={254}
        fontFamily="Geist, Inter, -apple-system, sans-serif" fontSize={9.5}
        fill={BLUE} opacity={0.4}
        initial={{ opacity: 0 }} animate={animate ? { opacity: 0.4 } : {}}
        transition={{ delay: 1.4 }}>
        Dr. Shruthi Desai · DM Rheumatology
      </motion.text>
    </svg>
  );
}

/* 02 — Anterior body diagram with clinical callouts */
function VisualBody({ animate }: { animate: boolean }) {
  const callouts = [
    { bx: 184, by: 82,  ex: 272, ey: 70,  label: "Imaging reviewed",  delay: 0.55 },
    { bx: 180, by: 128, ex: 272, ey: 118, label: "History mapped",    delay: 0.75 },
    { bx: 176, by: 176, ex: 272, ey: 166, label: "Pain located",      delay: 0.95 },
    { bx: 178, by: 212, ex: 272, ey: 204, label: "Load assessed",     delay: 1.15 },
  ];
  return (
    <svg viewBox="0 0 380 300" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" aria-hidden>
      {/* Body silhouette */}
      <motion.path
        d="M180,22 C173,22 166,29 166,38 C166,47 173,54 180,54 C187,54 194,47 194,38 C194,29 187,22 180,22 Z
           M166,54 C152,58 140,70 136,86 L130,126 L116,126 L116,138 L130,138
           L130,218 L120,258 L130,261 L140,222 L180,228 L220,222 L230,261 L240,258 L230,218
           L230,138 L244,138 L244,126 L230,126 L224,86 C220,70 208,58 194,54 Z"
        stroke={BLUE} strokeWidth={1.8} strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 0.45 } : {}}
        transition={{ duration: 1.1, ease, delay: 0.1 }}/>
      {/* Spine */}
      <motion.line x1={180} y1={58} x2={180} y2={218}
        stroke={BLUE} strokeWidth={1} strokeDasharray="5 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 0.2 } : {}}
        transition={{ duration: 0.9, ease, delay: 0.4 }}/>
      {/* Callouts */}
      {callouts.map((c) => (
        <g key={c.label}>
          <motion.line x1={c.bx} y1={c.by} x2={c.ex} y2={c.ey}
            stroke={BLUE} strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animate ? { pathLength: 1, opacity: 0.5 } : {}}
            transition={{ duration: 0.3, ease, delay: c.delay }}/>
          <motion.circle cx={c.bx} cy={c.by} r={3} fill={BLUE}
            initial={{ scale: 0, opacity: 0 }}
            animate={animate ? { scale: 1, opacity: 0.7 } : {}}
            style={{ transformOrigin: `${c.bx}px ${c.by}px` }}
            transition={{ duration: 0.2, ease, delay: c.delay + 0.28 }}/>
          <motion.text x={c.ex + 7} y={c.ey + 4}
            fontFamily="Geist, Inter, -apple-system, sans-serif"
            fontSize={10} fill={BLUE}
            initial={{ opacity: 0 }} animate={animate ? { opacity: 0.65 } : {}}
            transition={{ duration: 0.2, delay: c.delay + 0.32 }}>
            {c.label}
          </motion.text>
        </g>
      ))}
    </svg>
  );
}

/* 03 — Full-bleed ECG strip: chaotic pain → clean relief */
function ECGStrip({ animate }: { animate: boolean }) {
  const pain =
    "M 0,60 L 18,60 L 24,50 L 28,74 L 32,36 L 36,84 L 40,58 " +
    "L 52,58 L 58,46 L 62,76 L 66,32 L 70,88 L 74,56 " +
    "L 88,58 L 92,50 L 96,70 L 100,40 L 104,78 L 108,58 " +
    "L 118,58 L 124,44 L 128,74 L 132,30 L 136,86 L 140,58 " +
    "L 155,60 L 160,50 L 164,72 L 168,38 L 172,80 L 176,60 " +
    "L 190,60 L 196,48 L 200,74 L 204,34 L 208,82 L 212,60 " +
    "L 226,60 L 232,46 L 236,72 L 240,36 L 244,84 L 248,60 " +
    "L 264,60";

  const relief =
    "M 340,60 L 365,60 " +
    "L 370,56 L 374,42 L 377,60 L 382,68 L 388,60 " +
    "L 410,60 " +
    "L 415,56 L 419,42 L 422,60 L 427,68 L 433,60 " +
    "L 455,60 " +
    "L 460,56 L 464,42 L 467,60 L 472,68 L 478,60 " +
    "L 500,60 " +
    "L 505,56 L 509,42 L 512,60 L 517,68 L 523,60 " +
    "L 545,60 " +
    "L 550,56 L 554,42 L 557,60 L 562,68 L 568,60 " +
    "L 590,60 L 640,60";

  return (
    <svg
      viewBox="0 0 640 120"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden
    >
      {/* Grid lines */}
      {[20, 40, 60, 80, 100].map(y => (
        <line key={y} x1={0} y1={y} x2={640} y2={y}
          stroke="white" strokeWidth={0.4} opacity={0.06}/>
      ))}
      {/* Pain waveform */}
      <motion.path d={pain}
        stroke={CORAL} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 0.9 } : {}}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}/>
      {/* Transition bridge */}
      <motion.path d="M 264,60 Q 302,60 340,60"
        stroke="white" strokeWidth={1.5} strokeDasharray="5 5" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 0.3 } : {}}
        transition={{ duration: 0.4, delay: 1.2 }}/>
      {/* Relief waveform */}
      <motion.path d={relief}
        stroke="white" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 0.65 } : {}}
        transition={{ duration: 1.4, ease: "easeInOut", delay: 1.5 }}/>
      {/* Labels */}
      <motion.text x={12} y={14}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} letterSpacing="0.1em" fill="white" opacity={0.3}
        initial={{ opacity: 0 }} animate={animate ? { opacity: 0.3 } : {}} transition={{ delay: 0.3 }}>
        PAIN
      </motion.text>
      <motion.text x={568} y={14}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} letterSpacing="0.1em" fill="white" opacity={0.3}
        initial={{ opacity: 0 }} animate={animate ? { opacity: 0.3 } : {}} transition={{ delay: 1.6 }}>
        RELIEF
      </motion.text>
    </svg>
  );
}

/* 04 — 12-week clinical milestone timeline */
function VisualTimeline({ animate }: { animate: boolean }) {
  const ms = [
    { x: 52,  week: "Wk 1",  label: "Assessment",       filled: false },
    { x: 180, week: "Wk 4",  label: "Pain quietening",  filled: false },
    { x: 308, week: "Wk 8",  label: "Strength loading", filled: false },
    { x: 436, week: "Wk 12", label: "Reassessment",     filled: true  },
  ];
  return (
    <svg viewBox="0 0 490 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" aria-hidden>
      {/* Track */}
      <motion.line x1={52} y1={70} x2={436} y2={70}
        stroke={BLUE} strokeWidth={2}
        initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
        style={{ transformOrigin: "52px 70px" }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}/>
      {/* Dashed extension */}
      <motion.line x1={436} y1={70} x2={470} y2={70}
        stroke={BLUE} strokeWidth={1.5} strokeDasharray="5 5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 0.4 } : {}}
        transition={{ duration: 0.4, delay: 1.9 }}/>
      {ms.map((m, i) => (
        <g key={m.week}>
          <motion.circle cx={m.x} cy={70} r={12}
            stroke={BLUE} strokeWidth={2}
            fill={m.filled ? BLUE : "white"}
            initial={{ scale: 0 }}
            animate={animate ? { scale: 1 } : {}}
            style={{ transformOrigin: `${m.x}px 70px` }}
            transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.9 + i * 0.18 }}/>
          {m.filled && (
            <motion.path d={`M${m.x - 5},70 L${m.x - 1},74 L${m.x + 5},65`}
              stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={animate ? { pathLength: 1 } : {}}
              transition={{ duration: 0.3, delay: 1.65 }}/>
          )}
          <motion.text x={m.x} y={54}
            textAnchor="middle"
            fontFamily="Geist, Inter, -apple-system, sans-serif"
            fontSize={9} fontWeight={600} fill={BLUE} letterSpacing="0.05em"
            initial={{ opacity: 0, y: 58 }} animate={animate ? { opacity: 0.55, y: 54 } : {}}
            transition={{ duration: 0.3, delay: 1.05 + i * 0.18 }}>
            {m.week}
          </motion.text>
          <motion.text x={m.x} y={92}
            textAnchor="middle"
            fontFamily="Geist, Inter, -apple-system, sans-serif"
            fontSize={9.5} fill="#1D1D1F" opacity={0.6}
            initial={{ opacity: 0 }} animate={animate ? { opacity: 0.6 } : {}}
            transition={{ duration: 0.3, delay: 1.2 + i * 0.18 }}>
            {m.label}
          </motion.text>
        </g>
      ))}
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   STANDARD ROW  (01 / 02 / 04)
   Layout: [BIG NUMBER col] [text] [visual] — alternates text/visual
   ────────────────────────────────────────────────────────────── */
function PillarRow({
  pillar,
  flipVisual,
}: {
  pillar: (typeof PILLARS)[0 | 1 | 3];
  flipVisual: boolean;
}) {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { Visual } = pillar;

  const textBlock = (
    <div>
      <motion.h3
        className="text-h2 font-display text-ink mb-6"
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease, delay: 0.08 }}
      >
        {pillar.title}
      </motion.h3>
      <motion.p
        className="text-body-lg text-ink-soft mb-10 max-w-lg"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease, delay: 0.16 }}
      >
        {pillar.body}
      </motion.p>
      <div className="flex gap-10 flex-wrap">
        {pillar.stats.map((s, i) => (
          <Stat key={s.label} value={s.value} suffix={s.suffix}
            label={s.label} inView={inView} index={i} />
        ))}
      </div>
    </div>
  );

  const visualBlock = (
    <motion.div
      className="flex items-center justify-center"
      style={{ minHeight: 260 }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.65, ease, delay: 0.06 }}
    >
      {Visual && <Visual animate={inView} />}
    </motion.div>
  );

  return (
    <div ref={ref} className="border-b border-line last:border-0">
      <div className="container-site py-20 md:py-28">
        {/* Three-column: [NUMBER] [content pair] */}
        <div className="flex gap-8 lg:gap-14 items-start">

          {/* Architectural number column */}
          <motion.div
            className="hidden lg:block shrink-0 select-none pointer-events-none"
            style={{ width: "clamp(64px, 9vw, 140px)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            <span
              className="block font-display leading-[0.88] text-ink"
              style={{ fontSize: "clamp(4.5rem, 9vw, 10rem)", opacity: 0.07 }}
            >
              {pillar.num}
            </span>
          </motion.div>

          {/* Text + visual pair */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {flipVisual ? (
              <>{visualBlock}{textBlock}</>
            ) : (
              <>{textBlock}{visualBlock}</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   PAIN-FIRST ROW  (03) — dark, full-bleed ECG behind content
   ────────────────────────────────────────────────────────────── */
function PainFirstRow({ pillar }: { pillar: (typeof PILLARS)[2] }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ background: DARK }}>

      {/* Full-width ECG — absolute, behind content */}
      <div
        className="absolute inset-0 flex items-center pointer-events-none"
        style={{ opacity: 0.22 }}
      >
        <ECGStrip animate={inView} />
      </div>

      <div className="container-site py-20 md:py-28 relative z-10">
        <div className="flex gap-8 lg:gap-14 items-start">

          {/* Number column */}
          <motion.div
            className="hidden lg:block shrink-0 select-none pointer-events-none"
            style={{ width: "clamp(64px, 9vw, 140px)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            <span
              className="block font-display leading-[0.88]"
              style={{ fontSize: "clamp(4.5rem, 9vw, 10rem)", color: "white", opacity: 0.1 }}
            >
              {pillar.num}
            </span>
          </motion.div>

          {/* Content */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <motion.h3
                className="text-h2 font-display mb-6"
                style={{ color: "rgba(255,255,255,0.95)" }}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease, delay: 0.08 }}
              >
                {pillar.title}
              </motion.h3>
              <motion.p
                className="text-body-lg mb-10 max-w-lg"
                style={{ color: "rgba(255,255,255,0.55)" }}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease, delay: 0.16 }}
              >
                {pillar.body}
              </motion.p>
              <div className="flex gap-10 flex-wrap">
                {pillar.stats.map((s, i) => (
                  <Stat key={s.label} value={s.value} suffix={s.suffix}
                    label={s.label} inView={inView} dark index={i} />
                ))}
              </div>
            </div>

            {/* ECG annotation panel — right column, light info */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.3 }}
            >
              <div className="flex items-center gap-4">
                <span
                  className="inline-block w-8 h-0.5 rounded-full"
                  style={{ background: CORAL }}
                />
                <span className="text-body-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Irregular — chronic pain pattern
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className="inline-block w-8 h-0.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.5)" }}
                />
                <span className="text-body-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Stable — post Reconnect program
                </span>
              </div>
              <p
                className="text-caption leading-relaxed mt-2"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Schematic representation. Individual outcomes vary.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   MAIN EXPORT
   ────────────────────────────────────────────────────────────── */
export default function TrainJourneyIllustrated() {
  return (
    <div>
      <PillarRow pillar={PILLARS[0]} flipVisual={false} />
      <PillarRow pillar={PILLARS[1]} flipVisual={true}  />
      <PainFirstRow pillar={PILLARS[2]} />
      <PillarRow pillar={PILLARS[3]} flipVisual={false} />
    </div>
  );
}
