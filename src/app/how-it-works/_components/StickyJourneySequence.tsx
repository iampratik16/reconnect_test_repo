"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";

/* ── Tokens ──────────────────────────────────────────────────── */
const EASE  = [0.16, 1, 0.3, 1] as const;
const BLUE  = "#0064E0";
const CLAY  = "#C26B54";
const SAGE  = "#4D7B68";
const GREEN  = "#2E7D52";   // Exercise — positive, solution
const VEGGIE = "#4E7A3A";   // Nutrition — earthy, olive, vegetables
const DARK   = "#0B2D3D";

/* ── Count-up hook ───────────────────────────────────────────── */
function useCountUp(target: number, inView: boolean, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView || target === 0) { setCount(0); return; }
    let raf: number;
    let start: number | null = null;
    const duration = 1500;
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

/* ═══════════════════════════════════════════════════════════
   STEP DATA
   ═══════════════════════════════════════════════════════════ */

type StepAccent = typeof BLUE | typeof CLAY | typeof SAGE | typeof GREEN | typeof VEGGIE | typeof DARK;

type StatItem = { value: number; suffix: string; label: string };

type TextScheme = { body: string; muted: string; ghostNum: string; border: string };

type Step = {
  number: string;
  badge: string;
  principle: string;
  title: string;
  body: string;
  bullets: string[];
  stats: [StatItem, StatItem];
  accent: StepAccent;
  driver: string;
  panelBg: string;
  sectionBg: string;
  scheme: TextScheme;
  Art: React.FC<{ animate: boolean }>;
};

const STEPS: Step[] = [
  {
    number: "01",
    badge: "Always first",
    principle: "Doctor-led",
    title: "Medical Assessment",
    body: "Every program is designed and overseen by a rheumatologist. The clinical intake — your history, imaging, medications, pain map — decides everything that follows. Nothing is templated.",
    bullets: [
      "Rheumatologist-led intake",
      "Imaging & medication review",
      "Pain mapping by joint and region",
    ],
    stats: [
      { value: 12,  suffix: "+", label: "Years rheumatology practice" },
      { value: 100, suffix: "%", label: "Medically assessed before start" },
    ],
    accent: BLUE,
    driver: "The gateway — governs every pillar that follows.",
    panelBg: "linear-gradient(145deg, #0E2235 0%, #09162A 100%)",
    sectionBg: "linear-gradient(145deg, #0E2235 0%, #09162A 100%)",
    scheme: { body: "rgba(255,255,255,0.88)", muted: "rgba(255,255,255,0.55)", ghostNum: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.1)" },
    Art: AssessmentArt,
  },
  {
    number: "02",
    badge: "Built around you",
    principle: "Personalised",
    title: "Exercise Program",
    body: "Built from your assessment — diagnosis, imaging, pain map, medications, history. Not a template. Not a cohort. Region-by-region: upper body, lower body, back, and the joint we're protecting.",
    bullets: [
      "Region-by-region prescription",
      "Age- and severity-scaled loads",
      "Pain-respecting progression",
    ],
    stats: [
      { value: 0,  suffix: "",  label: "Generic programs issued" },
      { value: 82, suffix: "%", label: "Report pain reduction by week 6" },
    ],
    accent: GREEN,
    driver: "Driven by: pain map, imaging, joint assessment.",
    panelBg: "linear-gradient(145deg, #14472E 0%, #0C3320 100%)",
    sectionBg: "linear-gradient(145deg, #14472E 0%, #0C3320 100%)",
    scheme: { body: "rgba(255,255,255,0.88)", muted: "rgba(255,255,255,0.55)", ghostNum: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.1)" },
    Art: ExerciseArt,
  },
  {
    number: "03",
    badge: "Tied to the plate",
    principle: "Pain-first",
    title: "Nutrition Plan",
    body: "We calm the pain, respect it, then build strength around it. Anti-inflammatory and bone-supportive — tied directly to your exercise program and adapted to your food preferences.",
    bullets: [
      "Veg / non-veg adapted",
      "Anti-inflammatory pattern",
      "Calcium, Vit D, protein audit",
    ],
    stats: [
      { value: 4,   suffix: "+", label: "Clinical inputs per nutrition plan" },
      { value: 100, suffix: "%", label: "Plans adapted to food preference" },
    ],
    accent: VEGGIE,
    driver: "Driven by: medications, bone density, dietary history.",
    panelBg: "linear-gradient(145deg, #3D1A08 0%, #260F04 100%)",
    sectionBg: "linear-gradient(145deg, #3D1A08 0%, #260F04 100%)",
    scheme: { body: "rgba(255,255,255,0.88)", muted: "rgba(255,255,255,0.55)", ghostNum: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.1)" },
    Art: NutritionArt,
  },
  {
    number: "04",
    badge: "Only if needed",
    principle: "Structured roadmap",
    title: "Mind Coaching",
    body: "A 12-week cycle with defined milestones, weekly check-ins, and a medical reassessment at the end. If we detect fear or low adherence, a clinical psychologist steps in. You always know where you are.",
    bullets: [
      "Referral only when indicated",
      "Clinical psychologist on hand",
      "Mindset treated as load-bearing",
    ],
    stats: [
      { value: 12, suffix: "",  label: "Week structured program" },
      { value: 4,  suffix: "",  label: "Clinical checkpoints" },
    ],
    accent: DARK,
    driver: "Triggered by: adherence signals, fear-avoidance patterns.",
    panelBg: "linear-gradient(145deg, #0C1E2D 0%, #07131D 100%)",
    sectionBg: "linear-gradient(145deg, #0C1E2D 0%, #07131D 100%)",
    scheme: { body: "rgba(255,255,255,0.88)", muted: "rgba(255,255,255,0.55)", ghostNum: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.08)" },
    Art: PsychologyArt,
  },
];

/* ═══════════════════════════════════════════════════════════
   PROGRAM ARCHITECTURE DIAGRAM
   Dark glass card — Assessment at top governs three pillars.
   Pulse beams + glowing dots + pulsing root ring.
   ═══════════════════════════════════════════════════════════ */

// viewBox 760 × 382
const _AX = 380, _AY = 95,  _AR = 50;  // Assessment (root)
const _EX = 96,  _EY = 295, _PR = 42;  // Exercise
const _NX = 380, _NY = 295;             // Nutrition
const _PX = 664, _PY = 295;            // Psychology

const BEAM_PATHS = [
  { d: `M ${_AX},${_AY+_AR} C ${_AX},200 ${_EX},232 ${_EX},${_EY-_PR}`, light: "#5BA4F5", color: BLUE, dur: "2.8s", delay: 0.3  },
  { d: `M ${_AX},${_AY+_AR} L ${_NX},${_NY-_PR}`,                         light: "#5BA4F5", color: BLUE, dur: "2.1s", delay: 0.55 },
  { d: `M ${_AX},${_AY+_AR} C ${_AX},200 ${_PX},232 ${_PX},${_PY-_PR}`, light: "#5BA4F5", color: BLUE, dur: "2.8s", delay: 0.8  },
  { d: `M ${_EX+_PR},${_EY} L ${_NX-_PR},${_NY}`,                         light: "#E8967E", color: CLAY, dur: "1.7s", delay: 1.2  },
] as const;

const ARCH_NODES = [
  { cx: _AX, cy: _AY, R: _AR, label: ["Medical", "Assessment"],   abbr: "01", light: "#5BA4F5", tag: "governs all", isRoot: true  },
  { cx: _EX, cy: _EY, R: _PR, label: ["Personalised", "Exercise"], abbr: "02", light: "#E8967E", tag: "pillar",      isRoot: false },
  { cx: _NX, cy: _NY, R: _PR, label: ["Nutrition", "Plan"],        abbr: "03", light: "#7DC8A6", tag: "pillar",      isRoot: false },
  { cx: _PX, cy: _PY, R: _PR, label: ["Mind", "Coaching"],          abbr: "04", light: "#88ABBF", tag: "if needed",   isRoot: false },
] as const;

function ProgramArchitecture() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="mb-16 md:mb-20">

      {/* ── Dark glass card ── */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(150deg, #0D2437 0%, #081620 100%)",
          boxShadow:
            "0 40px 96px rgba(0,0,0,0.38), 0 6px 20px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Blue radial bloom at Assessment position */}
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: 560,
            height: 280,
            background: `radial-gradient(ellipse at 50% 0%, ${BLUE}32 0%, transparent 65%)`,
          }}
        />

        {/* Card header */}
        <div className="relative flex items-center justify-between px-8 md:px-10 pt-8 pb-0">
          <p className="text-caption uppercase tracking-[0.2em]"
            style={{ color: "rgba(255,255,255,0.3)" }}>
            Program architecture
          </p>
          <p className="text-caption" style={{ color: "rgba(255,255,255,0.18)" }}>
            One integrated system
          </p>
        </div>

        {/* SVG diagram */}
        <svg
          viewBox="0 0 760 406"
          className="w-full"
          style={{ display: "block" }}
          aria-label="Assessment governs Exercise, Nutrition, and Mind Coaching pillars"
          role="img"
        >
          <defs>
            {/* Glow bloom for dots */}
            <filter id="arch-bloom" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            {/* Subtle glow for beams */}
            <filter id="beam-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.8" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* ── Beam tracks ── */}
          {BEAM_PATHS.map((b, i) => (
            <motion.path
              key={`track-${i}`}
              d={b.d}
              stroke="rgba(255,255,255,0.06)" strokeWidth={1.5}
              strokeLinecap="round" fill="none"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.08 + i * 0.18 }}
            />
          ))}

          {/* ── Lit beam overlays ── */}
          {BEAM_PATHS.map((b, i) => (
            <motion.path
              key={`beam-${i}`}
              d={b.d}
              stroke={b.light} strokeWidth={2}
              strokeLinecap="round" fill="none"
              filter="url(#beam-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.55 } : {}}
              transition={{ duration: 0.75, ease: EASE, delay: b.delay }}
            />
          ))}

          {/* ── Glowing pulse dots ── */}
          {inView && BEAM_PATHS.map((b, i) => (
            <g key={`dot-${i}`} filter="url(#arch-bloom)">
              <circle r={5.5} fill={b.light} opacity={0.95}>
                <animateMotion dur={b.dur} repeatCount="indefinite" path={b.d} />
              </circle>
            </g>
          ))}

          {/* ── Assessment pulsing ring — animate r directly so it expands from cx/cy ── */}
          {inView && (
            <motion.circle
              cx={_AX} cy={_AY}
              fill="none" stroke="#5BA4F5" strokeWidth={1.5}
              animate={{ r: [_AR + 18, _AR + 58], opacity: [0.55, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
            />
          )}

          {/* ── Nodes ── */}
          {ARCH_NODES.map((node, i) => (
            <motion.g
              key={node.abbr}
              initial={{ opacity: 0, scale: 0.55 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.08 + i * 0.3 }}
            >
              {/* Ambient glow behind node */}
              <circle cx={node.cx} cy={node.cy} r={node.R + 16}
                fill={node.light} fillOpacity={0.06} />
              {/* Glass circle */}
              <circle cx={node.cx} cy={node.cy} r={node.R}
                fill="rgba(255,255,255,0.04)"
                stroke={node.light}
                strokeWidth={node.isRoot ? 2.2 : 1.6}
                strokeOpacity={node.isRoot ? 0.85 : 0.65} />
              {/* Number */}
              <text x={node.cx} y={node.cy - (node.isRoot ? 5 : 4)}
                textAnchor="middle"
                fontFamily="Geist, Inter, -apple-system, sans-serif"
                fontSize={node.isRoot ? 17 : 14} fontWeight={700} fill={node.light}>
                {node.abbr}
              </text>
              {/* Tag */}
              <text x={node.cx} y={node.cy + (node.isRoot ? 13 : 11)}
                textAnchor="middle"
                fontFamily="Geist, Inter, -apple-system, sans-serif"
                fontSize={node.isRoot ? 8 : 7.5}
                fill={node.light} opacity={0.55} letterSpacing="0.08em">
                {node.tag.toUpperCase()}
              </text>
              {/* Label below — white on dark, with breathing room below glow ring */}
              <text x={node.cx} y={node.cy + node.R + 30}
                textAnchor="middle"
                fontFamily="Geist, Inter, -apple-system, sans-serif"
                fontSize={11} fill="white" opacity={0.5}>
                {node.label[0]}
              </text>
              <text x={node.cx} y={node.cy + node.R + 44}
                textAnchor="middle"
                fontFamily="Geist, Inter, -apple-system, sans-serif"
                fontSize={11} fill="white" opacity={0.5}>
                {node.label[1]}
              </text>
            </motion.g>
          ))}

          {/* "INFORMS NEXT" label between Exercise and Nutrition */}
          <motion.text
            x={(_EX + _NX) / 2} y={_EY + 26}
            textAnchor="middle"
            fontFamily="Geist, Inter, -apple-system, sans-serif"
            fontSize={8.5} fill="#E8967E" letterSpacing="0.12em"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.55 } : {}}
            transition={{ delay: 2.0 }}
          >
            INFORMS NEXT
          </motion.text>
        </svg>

        {/* Card footer */}
        <div className="relative px-8 md:px-10 pb-7 pt-1">
          <p className="text-caption" style={{ color: "rgba(255,255,255,0.22)" }}>
            Assessment is the source. Each pillar builds on the one before it.
            Mind coaching is conditional — only when the data shows it's needed.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ART — ASSESSMENT (01)  dark panel
   Clinical intake card — data gathered → program configured
   Story: without this step, any program is a guess.
   ═══════════════════════════════════════════════════════════ */

function AssessmentArt({ animate }: { animate: boolean }) {
  // Card geometry
  const CX = 24, CY = 18, CW = 332, CH = 276;
  const PX = 40;   // inner left padding
  const RX = 340;  // inner right edge

  const items = [
    { label: "Medical history",  status: "COMPLETE",  color: "#72C4FF", delay: 0.58 },
    { label: "Imaging reports",  status: "REVIEWED",  color: "#4AAEF5", delay: 0.84 },
    { label: "Medications",      status: "3 ACTIVE",  color: "#2F96E8", delay: 1.10 },
    { label: "Pain regions",     status: "4 MAPPED",  color: "#1C7ED8", delay: 1.36 },
  ] as const;

  const pillars = [
    { label: "Exercise",   color: CLAY,      tagX: PX,        tagW: 62 },
    { label: "Nutrition",  color: SAGE,      tagX: PX + 70,   tagW: 68 },
    { label: "Mind",       color: "#88ABBF", tagX: PX + 146,  tagW: 44 },
  ] as const;

  const ITEM_Y0 = 120, ITEM_DY = 26;
  const BAR_X = PX, BAR_W = CW - 32, BAR_Y = 212, BAR_H = 5;

  return (
    <svg viewBox="0 0 380 310" fill="none" className="w-full h-full" aria-hidden>
      <defs>
        <filter id="a-bar-glow" x="-5%" y="-400%" width="110%" height="900%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── Card outline ── */}
      <motion.rect x={CX} y={CY} width={CW} height={CH} rx={13}
        fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.1)" strokeWidth={1}
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.06 }}
      />

      {/* ── HEADER: CLINICAL INTAKE + live status dot ── */}
      <motion.text x={PX} y={44}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} letterSpacing="0.2em" fill="rgba(255,255,255,0.3)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 0.10 }}>
        CLINICAL INTAKE
      </motion.text>

      {animate && (
        <motion.circle cx={RX - 68} cy={40} r={3.5} fill="#72C4FF"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      )}
      <motion.text x={RX - 60} y={44}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} letterSpacing="0.1em" fill="#72C4FF"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 0.55 } : {}}
        transition={{ delay: 0.10 }}>
        IN PROGRESS
      </motion.text>

      <motion.line x1={PX} y1={54} x2={RX} y2={54}
        stroke="rgba(255,255,255,0.07)" strokeWidth={1}
        initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
        style={{ transformOrigin: `${PX}px 54px` }}
        transition={{ duration: 0.35, delay: 0.16 }}
      />

      {/* ── CONDITION ROW ── */}
      <motion.text x={PX} y={74}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={8.5} letterSpacing="0.14em" fill="rgba(255,255,255,0.26)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 0.26 }}>
        CONDITION
      </motion.text>
      <motion.text x={108} y={74}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={11.5} fontWeight={600} fill="rgba(255,255,255,0.88)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: EASE, delay: 0.40 }}>
        Ankylosing Spondylitis
      </motion.text>

      <motion.line x1={PX} y1={85} x2={RX} y2={85}
        stroke="rgba(255,255,255,0.05)" strokeWidth={1}
        initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
        style={{ transformOrigin: `${PX}px 85px` }}
        transition={{ duration: 0.3, delay: 0.36 }}
      />

      {/* ── INTAKE SUB-HEADER ── */}
      <motion.text x={PX} y={103}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={8} letterSpacing="0.16em" fill="rgba(255,255,255,0.2)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 0.46 }}>
        INTAKE DATA  —  EACH INPUT SHAPES WHAT COMES NEXT
      </motion.text>

      {/* ── INTAKE ROWS ── */}
      {items.map((item, i) => {
        const ry = ITEM_Y0 + i * ITEM_DY;
        return (
          <g key={item.label}>
            {/* Colour dot */}
            <motion.circle cx={PX + 5} cy={ry - 5} r={3.5} fill={item.color}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={animate ? { scale: 1, opacity: 0.85 } : {}}
              transition={{ type: "spring", stiffness: 280, damping: 20, delay: item.delay }}
            />
            {/* Label */}
            <motion.text x={PX + 18} y={ry}
              fontFamily="Geist, Inter, -apple-system, sans-serif"
              fontSize={11} fill="rgba(255,255,255,0.62)"
              initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
              transition={{ duration: 0.28, delay: item.delay + 0.06 }}>
              {item.label}
            </motion.text>
            {/* Status badge */}
            <motion.rect x={RX - 68} y={ry - 13} width={68} height={17} rx={8.5}
              fill={item.color} fillOpacity={0} stroke={item.color} strokeWidth={0.8} strokeOpacity={0}
              animate={animate ? { fillOpacity: 0.1, strokeOpacity: 0.4 } : {}}
              transition={{ duration: 0.3, delay: item.delay + 0.10 }}
            />
            <motion.text x={RX - 34} y={ry} textAnchor="middle"
              fontFamily="Geist, Inter, -apple-system, sans-serif"
              fontSize={8.5} fontWeight={600} fill={item.color} letterSpacing="0.06em"
              initial={{ opacity: 0 }} animate={animate ? { opacity: 0.88 } : {}}
              transition={{ duration: 0.28, delay: item.delay + 0.12 }}>
              {item.status}
            </motion.text>
            {/* Row separator (not after last item) */}
            {i < items.length - 1 && (
              <motion.line x1={PX} y1={ry + 9} x2={RX} y2={ry + 9}
                stroke="rgba(255,255,255,0.04)" strokeWidth={1}
                initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
                style={{ transformOrigin: `${PX}px ${ry + 9}px` }}
                transition={{ duration: 0.22, delay: item.delay + 0.16 }}
              />
            )}
          </g>
        );
      })}

      {/* ── PROGRESS BAR ── */}
      {/* Track */}
      <motion.rect x={BAR_X} y={BAR_Y} width={BAR_W} height={BAR_H} rx={2.5}
        fill="rgba(255,255,255,0.06)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 1.52 }}
      />
      {/* Fill — scaleX from left so rounded corners don't distort */}
      <motion.rect x={BAR_X} y={BAR_Y} width={BAR_W} height={BAR_H} rx={2.5}
        fill="#4AAEF5" filter="url(#a-bar-glow)"
        style={{ transformBox: "fill-box", transformOrigin: "left center" }}
        initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: EASE, delay: 1.60 }}
      />
      {/* 100% label */}
      <motion.text x={RX} y={BAR_Y - 5} textAnchor="end"
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={8.5} fontWeight={600} fill="#4AAEF5"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 0.65 } : {}}
        transition={{ delay: 2.72 }}>
        100%
      </motion.text>

      {/* ── OUTPUT: PROGRAM CONFIGURED ── */}
      <motion.line x1={PX} y1={228} x2={RX} y2={228}
        stroke="rgba(255,255,255,0.07)" strokeWidth={1}
        initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
        style={{ transformOrigin: `${PX}px 228px` }}
        transition={{ duration: 0.35, delay: 2.78 }}
      />
      <motion.text x={PX} y={245}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} letterSpacing="0.16em" fontWeight={600} fill="#72C4FF"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 0.9 } : {}}
        transition={{ delay: 2.84 }}>
        PROGRAM CONFIGURED
      </motion.text>

      {/* Pillar tags */}
      {pillars.map((p, i) => (
        <g key={p.label}>
          <motion.rect x={p.tagX} y={252} width={p.tagW} height={16} rx={8}
            fill={p.color} fillOpacity={0} stroke={p.color} strokeWidth={0.8} strokeOpacity={0}
            animate={animate ? { fillOpacity: 0.13, strokeOpacity: 0.45 } : {}}
            transition={{ duration: 0.28, delay: 2.94 + i * 0.1 }}
          />
          <motion.text x={p.tagX + p.tagW / 2} y={263} textAnchor="middle"
            fontFamily="Geist, Inter, -apple-system, sans-serif"
            fontSize={9} fill={p.color}
            initial={{ opacity: 0 }} animate={animate ? { opacity: 0.88 } : {}}
            transition={{ delay: 2.96 + i * 0.1 }}>
            {p.label}
          </motion.text>
        </g>
      ))}

      {/* ── SIGN-OFF ── */}
      <motion.line x1={PX} y1={280} x2={RX} y2={280}
        stroke="rgba(255,255,255,0.06)" strokeWidth={1}
        initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
        style={{ transformOrigin: `${PX}px 280px` }}
        transition={{ duration: 0.4, delay: 3.08 }}
      />
      <motion.text x={PX} y={291}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={8.5} fill="rgba(255,255,255,0.24)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 3.14 }}>
        Dr. Shruthi Desai · DM Rheumatology
      </motion.text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   ART — EXERCISE (02)  warm clay panel
   Prescription cards — three zones, animated stagger
   ═══════════════════════════════════════════════════════════ */

function ExerciseArt({ animate }: { animate: boolean }) {
  // Bright greens for visibility on dark forest green bg
  const zones = [
    {
      zone:  "Upper body",
      rx:    "3 × 12",
      note:  "Shoulder band · Wall push",
      freq:  "3×/week",
      color: "#4DD68C",
      delay: 0.3,
    },
    {
      zone:  "Lower back",
      rx:    "Daily",
      note:  "Bird dog · Cat-cow",
      freq:  "Every day",
      color: "#3DC47C",
      delay: 0.6,
    },
    {
      zone:  "Lower body",
      rx:    "3 × 10",
      note:  "Wall sit · Step-up",
      freq:  "3×/week",
      color: "#2EB06C",
      delay: 0.9,
    },
  ] as const;

  const CARD_W = 304, CARD_H = 60, CARD_X = 38, GAP = 74;

  return (
    <svg viewBox="0 0 380 310" fill="none" className="w-full h-full" aria-hidden>
      {/* Header */}
      <motion.text x={38} y={28}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} letterSpacing="0.2em" fill="rgba(255,255,255,0.35)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 0.08 }}>
        EXERCISE PRESCRIPTION
      </motion.text>

      {/* Week badge */}
      <motion.rect x={CARD_X} y={38} width={72} height={20} rx={10}
        fill="#4DD68C" fillOpacity={0.15} stroke="#4DD68C" strokeWidth={0.8} strokeOpacity={0.4}
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 0.18 }}
      />
      <motion.text x={CARD_X + 36} y={52} textAnchor="middle"
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} fontWeight={600} fill="#4DD68C" opacity={0.85}
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 0.22 }}>
        WEEK 1 – 2
      </motion.text>

      {/* Zone prescription cards */}
      {zones.map((z, i) => {
        const cardY = 72 + i * GAP;
        return (
          <g key={z.zone}>
            {/* Card background */}
            <motion.rect
              x={CARD_X} y={cardY} width={CARD_W} height={CARD_H} rx={10}
              fill={z.color} fillOpacity={0}
              stroke={z.color} strokeWidth={1.2} strokeOpacity={0}
              animate={animate ? { fillOpacity: 0.07, strokeOpacity: 0.35 } : {}}
              transition={{ duration: 0.45, delay: z.delay }}
            />
            {/* Accent left bar */}
            <motion.rect
              x={CARD_X} y={cardY} width={4} height={CARD_H} rx={2}
              fill={z.color} fillOpacity={0}
              animate={animate ? { fillOpacity: 0.8 } : {}}
              transition={{ duration: 0.35, delay: z.delay + 0.08 }}
            />
            {/* Zone label — white on dark bg */}
            <motion.text x={CARD_X + 18} y={cardY + 22}
              fontFamily="Geist, Inter, -apple-system, sans-serif"
              fontSize={11} fontWeight={600} fill="rgba(255,255,255,0.88)"
              initial={{ opacity: 0, x: CARD_X + 12 }}
              animate={animate ? { opacity: 1, x: CARD_X + 18 } : {}}
              transition={{ duration: 0.35, ease: EASE, delay: z.delay + 0.12 }}>
              {z.zone}
            </motion.text>
            {/* Exercises note */}
            <motion.text x={CARD_X + 18} y={cardY + 38}
              fontFamily="Geist, Inter, -apple-system, sans-serif"
              fontSize={9.5} fill="rgba(255,255,255,0.45)"
              initial={{ opacity: 0 }}
              animate={animate ? { opacity: 1 } : {}}
              transition={{ delay: z.delay + 0.22 }}>
              {z.note}
            </motion.text>
            {/* Rx badge — bright green number pops on dark bg */}
            <motion.rect
              x={CARD_X + CARD_W - 88} y={cardY + 14} width={76} height={30} rx={8}
              fill={z.color} fillOpacity={0}
              animate={animate ? { fillOpacity: 0.14 } : {}}
              transition={{ delay: z.delay + 0.18 }}
            />
            <motion.text
              x={CARD_X + CARD_W - 50} y={cardY + 24} textAnchor="middle"
              fontFamily="Geist, Inter, -apple-system, sans-serif"
              fontSize={13} fontWeight={700} fill={z.color}
              initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
              transition={{ delay: z.delay + 0.22 }}>
              {z.rx}
            </motion.text>
            <motion.text
              x={CARD_X + CARD_W - 50} y={cardY + 37} textAnchor="middle"
              fontFamily="Geist, Inter, -apple-system, sans-serif"
              fontSize={8.5} fill="rgba(255,255,255,0.45)"
              initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
              transition={{ delay: z.delay + 0.3 }}>
              {z.freq}
            </motion.text>
          </g>
        );
      })}

      {/* Footer */}
      <motion.line x1={38} y1={284} x2={342} y2={284}
        stroke="rgba(255,255,255,0.12)" strokeWidth={0.8}
        initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
        style={{ transformOrigin: "38px 284px" }}
        transition={{ duration: 0.45, delay: 1.5 }}
      />
      <motion.text x={38} y={298}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} fill="rgba(255,255,255,0.38)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}>
        Pain-respecting · Scaled to your age + severity · Never generic
      </motion.text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   ART — NUTRITION (03)  dark warm · divided plate
   4 quadrants, food in each, callout arrows to nutrient labels
   VEG ↔ NON-VEG auto-slider every 2.4s
   ═══════════════════════════════════════════════════════════ */

function NutritionArt({ animate }: { animate: boolean }) {
  const [isVeg, setIsVeg] = useState(true);

  useEffect(() => {
    if (!animate) return;
    const id = setInterval(() => setIsVeg(v => !v), 2400);
    return () => clearInterval(id);
  }, [animate]);

  // Plate geometry
  const CX = 190, CY = 158, R = 74;
  const L = CX - R, RX = CX + R, T = CY - R, B = CY + R;

  // 4 quadrant paths (pizza-slice shapes)
  const qPaths = {
    tl: `M ${CX} ${CY} L ${L} ${CY} A ${R} ${R} 0 0 0 ${CX} ${T} Z`,
    tr: `M ${CX} ${CY} L ${CX} ${T} A ${R} ${R} 0 0 1 ${RX} ${CY} Z`,
    br: `M ${CX} ${CY} L ${RX} ${CY} A ${R} ${R} 0 0 1 ${CX} ${B} Z`,
    bl: `M ${CX} ${CY} L ${CX} ${B} A ${R} ${R} 0 0 1 ${L} ${CY} Z`,
  };

  const qFills = { tl: "rgba(255,200,70,0.13)", tr: "rgba(255,240,190,0.12)", br: "rgba(255,220,90,0.11)", bl: "rgba(90,200,120,0.12)" };

  // Food in each quadrant — emoji + 2 food lines
  type Q = { e: string; f1: string; f2: string };
  type Foods = { tl: Q; tr: Q; br: Q; bl: Q };

  const veg: Foods = {
    tl: { e: "🫘", f1: "Kabul channa", f2: "Masoor dal"  },
    tr: { e: "🥛", f1: "Paneer",       f2: "Dahi"        },
    br: { e: "🍄", f1: "Mushrooms",    f2: "Fortified"   },
    bl: { e: "🥦", f1: "Palak",        f2: "Brinjal"     },
  };

  const nonVeg: Foods = {
    tl: { e: "🐟", f1: "Salmon",       f2: "Chicken"     },
    tr: { e: "🧀", f1: "Yogurt",       f2: "Cheese"      },
    br: { e: "🥚", f1: "Egg yolk",     f2: "Fatty fish"  },
    bl: { e: "🍗", f1: "Chicken",      f2: "Fish oil"    },
  };

  const food = isVeg ? veg : nonVeg;
  const acc = isVeg ? "#4DD68C" : "#F0A84C";

  // Quadrant emoji centres (visual centroid of each slice)
  const D = 34;
  const qC = { tl: [CX - D, CY - D], tr: [CX + D, CY - D], br: [CX + D, CY + D], bl: [CX - D, CY + D] };

  // Callout label positions and arrow end-point on plate edge (at 45° of each quadrant)
  const S = R * 0.707; // R * cos(45°)
  const labels = [
    { q: "tl" as const, name: "PROTEIN",     lx: 8,   ly: 50,  ax: CX - S, ay: CY - S, anchor: "start" as const },
    { q: "tr" as const, name: "CALCIUM",     lx: 372, ly: 50,  ax: CX + S, ay: CY - S, anchor: "end"   as const },
    { q: "br" as const, name: "VIT D",       lx: 372, ly: 268, ax: CX + S, ay: CY + S, anchor: "end"   as const },
    { q: "bl" as const, name: "ANTI-INFLAM", lx: 8,   ly: 268, ax: CX - S, ay: CY + S, anchor: "start" as const },
  ];

  return (
    <svg viewBox="0 0 380 310" fill="none" className="w-full h-full" aria-hidden>

      {/* ── Header ── */}
      <motion.text x={20} y={24}
        fontFamily="Geist, Inter, sans-serif" fontSize={9} letterSpacing="0.2em"
        fill="rgba(255,255,255,0.3)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}} transition={{ delay: 0.08 }}>
        NUTRITION PLAN
      </motion.text>

      {/* VEG / NON-VEG badge */}
      <AnimatePresence mode="wait">
        <motion.g key={isVeg ? "vbadge" : "nvbadge"}
          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.25 }}>
          <rect x={272} y={12} width={88} height={18} rx={9}
            fill={acc} fillOpacity={0.16} stroke={acc} strokeWidth={0.8} strokeOpacity={0.5} />
          <text x={316} y={24.5} textAnchor="middle"
            fontFamily="Geist, Inter, sans-serif" fontSize={8.5} fontWeight={700}
            fill={acc} letterSpacing="0.08em">
            {isVeg ? "VEGETARIAN" : "NON-VEG"}
          </text>
        </motion.g>
      </AnimatePresence>

      {/* ── Plate base ── */}
      {/* Outer rim ring */}
      <motion.circle cx={CX} cy={CY} r={R + 6}
        stroke="rgba(255,255,255,0.1)" strokeWidth={1.2} fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={animate ? { scale: 1, opacity: 1 } : {}}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        transition={{ duration: 0.5, delay: 0.12 }}
      />
      {/* White plate */}
      <motion.circle cx={CX} cy={CY} r={R}
        fill="rgba(255,255,255,0.92)"
        style={{ transformBox: "fill-box", transformOrigin: "center", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.45))" }}
        initial={{ scale: 0 }} animate={animate ? { scale: 1 } : {}}
        transition={{ duration: 0.45, delay: 0.14 }}
      />

      {/* ── Quadrant colour fills ── */}
      {(Object.keys(qPaths) as (keyof typeof qPaths)[]).map((k) => (
        <motion.path key={k} d={qPaths[k]} fill={qFills[k]}
          initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
          transition={{ delay: 0.28 }}
        />
      ))}

      {/* ── Divider lines ── */}
      <motion.line x1={CX} y1={T} x2={CX} y2={B}
        stroke="rgba(255,255,255,0.55)" strokeWidth={1}
        initial={{ scaleY: 0 }} animate={animate ? { scaleY: 1 } : {}}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        transition={{ delay: 0.3 }}
      />
      <motion.line x1={L} y1={CY} x2={RX} y2={CY}
        stroke="rgba(255,255,255,0.55)" strokeWidth={1}
        initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        transition={{ delay: 0.32 }}
      />
      {/* Centre dot */}
      <circle cx={CX} cy={CY} r={3.5} fill="rgba(255,255,255,0.7)" />

      {/* ── Food items in quadrants — crossfade on switch ── */}
      <AnimatePresence mode="wait">
        <motion.g key={isVeg ? "veg" : "nv"}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.38 }}>
          {(Object.keys(qC) as (keyof typeof qC)[]).map((k) => {
            const [ex, ey] = qC[k];
            const f = food[k];
            const isRight = ex > CX;
            const anchor = "middle" as const;
            return (
              <g key={k}>
                {/* Emoji */}
                <text x={ex} y={ey - 4} textAnchor={anchor} fontSize={18} fontFamily="Geist, Inter, sans-serif">
                  {f.e}
                </text>
                {/* Food line 1 */}
                <text x={ex} y={ey + 14} textAnchor={anchor}
                  fontFamily="Geist, Inter, sans-serif" fontSize={7.5} fontWeight={600}
                  fill="rgba(50,20,5,0.85)">
                  {f.f1}
                </text>
                {/* Food line 2 */}
                <text x={ex} y={ey + 23} textAnchor={anchor}
                  fontFamily="Geist, Inter, sans-serif" fontSize={7}
                  fill="rgba(50,20,5,0.6)">
                  {f.f2}
                </text>
              </g>
            );
          })}
        </motion.g>
      </AnimatePresence>

      {/* ── Callout labels with dashed arrows ── */}
      {labels.map((lb) => (
        <g key={lb.q}>
          {/* Dashed callout line */}
          <motion.line
            x1={lb.lx + (lb.anchor === "start" ? 56 : -56)}
            y1={lb.ly - 4}
            x2={lb.ax} y2={lb.ay}
            stroke={acc} strokeWidth={0.75} strokeDasharray="3 2.5" opacity={0.55}
            initial={{ pathLength: 0 }} animate={animate ? { pathLength: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
          />
          {/* Arrow dot at plate edge */}
          <motion.circle cx={lb.ax} cy={lb.ay} r={2.5} fill={acc}
            initial={{ scale: 0 }} animate={animate ? { scale: 1 } : {}}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            transition={{ type: "spring", delay: 0.75 }}
          />
          {/* Nutrient label */}
          <motion.text x={lb.lx} y={lb.ly} textAnchor={lb.anchor}
            fontFamily="Geist, Inter, sans-serif"
            fontSize={9} fontWeight={700} fill={acc} letterSpacing="0.08em"
            initial={{ opacity: 0 }} animate={animate ? { opacity: 0.95 } : {}}
            transition={{ delay: 0.48 }}>
            {lb.name}
          </motion.text>
          {/* Food subtitle changes with VEG/NON-VEG */}
          <AnimatePresence mode="wait">
            <motion.text key={`${isVeg}-${lb.q}`}
              x={lb.lx} y={lb.ly + 12} textAnchor={lb.anchor}
              fontFamily="Geist, Inter, sans-serif"
              fontSize={7.5} fill="rgba(255,255,255,0.45)"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}>
              {food[lb.q].f1}
            </motion.text>
          </AnimatePresence>
        </g>
      ))}

      {/* ── Slide mode dots ── */}
      <motion.rect x={175} y={248} width={14} height={4} rx={2}
        fill={acc} opacity={isVeg ? 1 : 0.3}
        animate={{ opacity: isVeg ? 1 : 0.3 }} transition={{ duration: 0.3 }} />
      <motion.rect x={193} y={248} width={6} height={4} rx={2}
        fill={acc} opacity={isVeg ? 0.3 : 1}
        animate={{ opacity: isVeg ? 0.3 : 1 }} transition={{ duration: 0.3 }} />

      {/* ── Footer ── */}
      <motion.line x1={20} y1={270} x2={360} y2={270}
        stroke="rgba(255,255,255,0.08)" strokeWidth={1}
        initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
        style={{ transformOrigin: "20px 270px" }}
        transition={{ delay: 1.2 }}
      />
      <motion.text x={20} y={282}
        fontFamily="Geist, Inter, sans-serif" fontSize={8.5}
        fill="rgba(255,255,255,0.28)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 1.3 }}>
        Anti-inflam · Calcium · Vit D · Protein — adapted to your food preference
      </motion.text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   ART — MIND COACHING (04)  dark panel · ECG waveform
   Two states: barrier active → coaching engaged
   ═══════════════════════════════════════════════════════════ */

function PsychologyArt({ animate }: { animate: boolean }) {
  // Chaotic pain waveform (left half, x=20→190)
  const chaotic =
    "M 20,120 L 34,120 L 40,108 L 44,134 L 48,96 L 52,142 L 56,118 " +
    "L 66,120 L 72,106 L 76,138 L 80,90 L 84,148 L 88,116 " +
    "L 100,120 L 106,108 L 110,134 L 114,94 L 118,146 L 122,118 " +
    "L 138,120";

  // Calm QRS waveform (right half, x=210→360)
  const calm =
    "M 212,120 L 234,120 " +
    "L 238,116 L 241,100 L 244,120 L 248,130 L 252,120 " +
    "L 274,120 " +
    "L 278,116 L 281,100 L 284,120 L 288,130 L 292,120 " +
    "L 314,120 " +
    "L 318,116 L 321,100 L 324,120 L 328,130 L 332,120 " +
    "L 360,120";

  return (
    <svg viewBox="0 0 380 310" fill="none" className="w-full h-full" aria-hidden>
      {/* Ghost number */}
      <text x={14} y={248} fontFamily="Geist, sans-serif" fontSize={220}
        fontWeight={700} fill="white" opacity={0.025}>04</text>

      {/* Subtle grid */}
      {[80, 100, 120, 140, 160].map(y => (
        <line key={y} x1={20} y1={y} x2={360} y2={y}
          stroke="white" strokeWidth={0.4} opacity={0.04} />
      ))}

      {/* State labels */}
      <motion.text x={26} y={55}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} letterSpacing="0.18em" fill="#E8967E"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 0.65 } : {}}
        transition={{ delay: 0.2 }}>
        BARRIER ACTIVE
      </motion.text>
      <motion.text x={212} y={55}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} letterSpacing="0.18em" fill="rgba(255,255,255,0.5)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}>
        COACHING ENGAGED
      </motion.text>

      {/* Sub-labels */}
      <motion.text x={79} y={75}
        textAnchor="middle"
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={10} fill="#E8967E" opacity={0.5}
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}>
        Fear · Catastrophising
      </motion.text>
      <motion.text x={285} y={75}
        textAnchor="middle"
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={10} fill="rgba(255,255,255,0.38)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 1.7 }}>
        Calm · Engaged
      </motion.text>

      {/* Chaotic waveform */}
      <motion.path d={chaotic}
        stroke="#E8967E" strokeWidth={2} strokeLinecap="round"
        strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 0.88 } : {}}
        transition={{ duration: 1.0, ease: "easeInOut", delay: 0.35 }}
      />

      {/* Threshold divider */}
      <motion.line x1={175} y1={50} x2={175} y2={200}
        stroke="rgba(255,255,255,0.22)" strokeWidth={1.5} strokeDasharray="5 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.3 }}
      />
      <motion.text x={175} y={218}
        textAnchor="middle"
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={8.5} fill="rgba(255,255,255,0.28)" letterSpacing="0.08em"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 1.45 }}>
        THRESHOLD
      </motion.text>

      {/* Arrow through threshold */}
      <motion.path d="M 148,120 L 164,120 L 160,115 M 164,120 L 160,125"
        stroke="rgba(255,255,255,0.35)" strokeWidth={1.2} strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 1.52 }}
      />

      {/* Calm waveform */}
      <motion.path d={calm}
        stroke="rgba(255,255,255,0.75)" strokeWidth={2} strokeLinecap="round"
        strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 1.6 }}
      />

      {/* Footer */}
      <motion.line x1={26} y1={252} x2={354} y2={252}
        stroke="rgba(255,255,255,0.08)" strokeWidth={1}
        initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
        style={{ transformOrigin: "26px 252px" }}
        transition={{ duration: 0.5, delay: 2.0 }}
      />
      <motion.text x={26} y={268}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={10} fontWeight={600} fill="#E8967E"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 0.85 } : {}}
        transition={{ delay: 2.1 }}>
        → Mind coaching initiated
      </motion.text>
      <motion.text x={26} y={284}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} fill="rgba(255,255,255,0.28)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 2.22 }}>
        Only when data shows it's holding you back · Clinical psychologist
      </motion.text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════ */

export type { Step };
export { STEPS };

export default function StickyJourneySequence() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <>
        <ProgramArchitecture />
        <ol className="flex flex-col gap-16 md:gap-24">
          {STEPS.map((s) => (
            <li key={s.number}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <div className="lg:col-span-5">
                <StaticArtPanel step={s} />
              </div>
              <div className="lg:col-span-7">
                <StepCopy step={s} />
              </div>
            </li>
          ))}
        </ol>
      </>
    );
  }

  return (
    <>
      <ProgramArchitecture />
      <SequenceAnimated />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   ANIMATED STICKY SEQUENCE
   ═══════════════════════════════════════════════════════════ */

function SequenceAnimated() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const activeStep = STEPS[active];
  // Lazy-load bg: only show atmospheric color when section enters viewport
  const inSection = useInView(sequenceRef, { once: false, amount: 0 });

  useEffect(() => {
    const els = stepRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (!els.length) return;

    // Scroll-based sync: art changes when a step's top crosses the viewport's
    // reading line (50% from top). This is precise regardless of section height,
    // unlike IntersectionObserver which fires as soon as any pixel enters a zone.
    const update = () => {
      const readLine = window.scrollY + window.innerHeight * 0.5;
      let next = 0;
      for (let i = 0; i < els.length; i++) {
        const elTop = els[i].getBoundingClientRect().top + window.scrollY;
        if (elTop <= readLine) next = i;
      }
      setActive(next);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="relative" ref={sequenceRef}>

      {/* ── Full-bleed atmospheric bg — fades in on scroll entry, transitions per step ── */}
      <motion.div
        aria-hidden
        animate={{ opacity: inSection ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "absolute",
          top: 0, bottom: 0,
          left: "50%", width: "100vw",
          transform: "translateX(-50%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={`sbg-${active}`}
            className="absolute inset-0"
            style={{ background: activeStep.sectionBg }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
          />
        </AnimatePresence>
      </motion.div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16" style={{ zIndex: 1 }}>

        {/* ── Sticky art panel — centered in viewport ── */}
        <aside className="lg:col-span-5">
          <div className="sticky top-0 h-screen flex items-center justify-center py-10">
            {/* Art frame — transparent bg, section bg shows through */}
            <div
              className="relative w-full aspect-square rounded-3xl overflow-hidden"
              style={{
                boxShadow: "0 32px 80px rgba(0,0,0,0.28), 0 6px 20px rgba(0,0,0,0.14)",
                border: `1px solid ${activeStep.scheme.border || "rgba(255,255,255,0.06)"}`,
                maxHeight: "calc(100vh - 5rem)",
                maxWidth: "calc(100vh - 5rem)",
              }}
            >
              {/* Panel atmospheric background — crossfades between step colours */}
              <AnimatePresence initial={false}>
                <motion.div
                  key={`pbg-${activeStep.number}`}
                  className="absolute inset-0"
                  style={{ background: activeStep.panelBg }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              </AnimatePresence>

              {/* Art SVG */}
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeStep.number}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.6 } }}
                  transition={{ duration: 0.45 }}
                >
                  <activeStep.Art animate />
                </motion.div>
              </AnimatePresence>

              {/* Accent top border */}
              <motion.div
                className="absolute top-0 inset-x-0 h-0.75 rounded-t-3xl"
                animate={{ background: activeStep.accent }}
                transition={{ duration: 0.5 }}
              />

              {/* Progress dots */}
              <div className="absolute top-5 right-5 flex flex-col gap-2 z-10">
                {STEPS.map((s, i) => (
                  <motion.span
                    key={s.number}
                    aria-hidden
                    className="block rounded-full"
                    animate={{
                      width: i === active ? 8 : 6,
                      height: i === active ? 8 : 6,
                      opacity: i < active ? 0.7 : i === active ? 1 : 0.3,
                      backgroundColor: i <= active ? activeStep.accent : "#CBD5E1",
                    }}
                    transition={{ duration: 0.4 }}
                  />
                ))}
              </div>

              {/* Step badge */}
              <div className="absolute bottom-0 inset-x-0 p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep.number}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <span
                      className="inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-eyebrow font-medium"
                      style={{
                        background: `${activeStep.accent}18`,
                        color: activeStep.accent,
                        border: `1px solid ${activeStep.accent}30`,
                      }}
                    >
                      <span className="opacity-60">{activeStep.number}</span>
                      {activeStep.title}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Step copy column ── */}
        <div className="lg:col-span-7 flex flex-col">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepRefs.current[i] = el; }}
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

/* ═══════════════════════════════════════════════════════════
   STEP COPY BLOCK
   ═══════════════════════════════════════════════════════════ */

function StatDisplay({
  stat, inView, index, accent, scheme,
}: {
  stat: StatItem; inView: boolean; index: number; accent: string; scheme: TextScheme;
}) {
  const count = useCountUp(stat.value, inView, 200 + index * 140);
  return (
    <div className="flex flex-col gap-1">
      <span
        className="font-display leading-none"
        style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: accent }}
      >
        {count}{stat.suffix}
      </span>
      <span
        className="text-caption leading-snug"
        style={{ maxWidth: 140, color: scheme.muted || undefined }}
      >
        {stat.label}
      </span>
    </div>
  );
}

function StepCopy({ step }: { step: Step }) {
  const statsRef = useRef<HTMLDivElement>(null);
  const inView   = useInView(statsRef, { once: true, margin: "-60px" });
  const { scheme } = step;

  return (
    <div className="relative">
      {/* Ghost number — top equals negative of font-size so it never overlaps content */}
      <span
        className="absolute -left-2 select-none pointer-events-none font-display text-line leading-none"
        style={{
          fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
          top: "calc(-1 * clamp(3.5rem, 6vw, 5.5rem))",
          color: scheme.ghostNum || undefined,
        }}
        aria-hidden
      >
        {step.number}
      </span>

      {/* Badge row */}
      <div className="relative flex items-center gap-3 mb-3">
        <p
          className="inline-block text-eyebrow font-medium rounded-pill px-3 py-1"
          style={{
            background: `${step.accent}14`,
            color: step.accent,
            border: `1px solid ${step.accent}28`,
          }}
        >
          {step.badge}
        </p>
        <p className="text-caption font-medium" style={{ color: step.accent, opacity: 0.55 }}>
          {step.principle}
        </p>
      </div>

      {/* Driver callout */}
      <p
        className="relative text-caption mb-5 flex items-center gap-1.5"
        style={{ color: step.accent, opacity: 0.55 }}
      >
        <span aria-hidden style={{ opacity: 0.5 }}>↳</span>
        {step.driver}
      </p>

      <h3
        className="relative text-h2 font-display mb-5"
        style={{ color: scheme.body || undefined }}
      >
        {step.title}
      </h3>
      <p
        className="relative text-body-lg mb-6 max-w-xl"
        style={{ color: scheme.muted || undefined }}
      >
        {step.body}
      </p>

      <ul className="relative flex flex-col gap-2.5 max-w-md mb-8">
        {step.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-3 text-body"
            style={{ color: scheme.body || undefined }}
          >
            <span
              className="mt-1.75 inline-block w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: step.accent }}
            />
            {b}
          </li>
        ))}
      </ul>

      {/* Stats */}
      <div
        ref={statsRef}
        className="relative flex gap-10 flex-wrap pt-7"
        style={{ borderTop: `1px solid ${step.accent}20` }}
      >
        {step.stats.map((s, i) => (
          <StatDisplay key={s.label} stat={s} inView={inView} index={i} accent={step.accent} scheme={scheme} />
        ))}
      </div>
    </div>
  );
}

/* ── Static fallback art panel (reduced motion) ────────────── */

function StaticArtPanel({ step }: { step: Step }) {
  return (
    <div
      className="relative aspect-square rounded-3xl overflow-hidden shadow-md"
      style={{
        background: "#F7F5F2",
        border: "1px solid rgba(0,0,0,0.07)",
        borderTop: `3px solid ${step.accent}`,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <step.Art animate />
      </div>
      <div className="absolute bottom-0 inset-x-0 p-5">
        <span
          className="inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-eyebrow font-medium"
          style={{
            background: `${step.accent}18`,
            color: step.accent,
            border: `1px solid ${step.accent}30`,
          }}
        >
          {step.number} · {step.title}
        </span>
      </div>
    </div>
  );
}
