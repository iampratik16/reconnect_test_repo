"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { asset } from "@/lib/asset";

/* ── Tokens ──────────────────────────────────────────────────── */
/* MONOCHROME — Apple-style, on a warm IVORY / elephant-tusk ground with
   near-black INK text and art. NO accent colour. Every step's "accent"
   is ink; the art uses tints of ink only. The names below are kept
   (BLUE, CORAL, AMBER…) so the large art SVGs don't need renaming —
   they're all re-pointed to the ink monochrome ramp. */
const EASE  = [0.16, 1, 0.3, 1] as const;

// Ink monochrome ramp — near-black at varying opacity, for art on ivory.
const MONO_HI  = "rgba(29,29,31,0.88)";   // strongest — primary accent / headline art
const MONO_MID = "rgba(29,29,31,0.58)";   // secondary
const MONO_LO  = "rgba(29,29,31,0.38)";   // tertiary / muted

const BLUE  = MONO_HI;   // step 1 accent → ink
const CLAY  = MONO_MID;
const SAGE  = MONO_MID;
const GREEN  = MONO_MID;
const TERRA  = MONO_MID;
const CORAL  = MONO_HI;   // Exercise art → ink
const SALMON = MONO_MID;  // Exercise secondary → grey
const PEACHTX = "rgba(29,29,31,0.88)";
const PEACHMU = "rgba(29,29,31,0.55)";
const VEGGIE = MONO_MID;
const AMBER  = MONO_HI;   // Nutrition art → ink
const DARK   = MONO_HI;   // Mind Coaching accent → ink

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

type StepAccent = typeof BLUE | typeof CLAY | typeof SAGE | typeof GREEN | typeof TERRA | typeof CORAL | typeof VEGGIE | typeof AMBER | typeof DARK;

type StatItem = { value: number; suffix: string; label: string };

type TextScheme = { body: string; muted: string; ghostNum: string; border: string };

/* ── Unified monochrome ground ───────────────────────────────────
   One near-black charcoal for ALL four steps, so scrolling no longer
   strobes through navy → green → brown → blue. Apple-style: not pure
   #000 (flat/cheap) but a subtle dark gradient with depth. Each step
   keeps its own ART accent colour; only the ground is unified.
   The architecture diagram above stays light by design. */
/* White ground — clean, matches the page canvas (--color-bone #FFFFFF). */
const MONO_GROUND = "#FFFFFF";
/* Shared ink text scheme for every step on the white ground. */
const MONO_SCHEME: TextScheme = {
  body: "rgba(29,29,31,0.92)",
  muted: "rgba(29,29,31,0.58)",
  ghostNum: "rgba(29,29,31,0.07)",
  border: "rgba(29,29,31,0.12)",
};

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
    panelBg: MONO_GROUND,
    sectionBg: MONO_GROUND,
    scheme: MONO_SCHEME,
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
    accent: CORAL,
    driver: "Driven by: pain map, imaging, joint assessment.",
    panelBg: MONO_GROUND,
    sectionBg: MONO_GROUND,
    scheme: MONO_SCHEME,
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
    accent: AMBER,
    driver: "Driven by: medications, bone density, dietary history.",
    panelBg: MONO_GROUND,
    sectionBg: MONO_GROUND,
    scheme: MONO_SCHEME,
    Art: NutritionArt,
  },
  {
    number: "04",
    badge: "Only if needed",
    principle: "Structured roadmap",
    title: "Mind Coaching",
    body: "A 16-week cycle with defined milestones, weekly check-ins, and a medical reassessment at the end. If we detect fear or low adherence, a clinical psychologist steps in. You always know where you are.",
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
    panelBg: MONO_GROUND,
    sectionBg: MONO_GROUND,
    scheme: MONO_SCHEME,
    Art: PsychologyArt,
  },
];

/* ═══════════════════════════════════════════════════════════
   PROGRAM ARCHITECTURE DIAGRAM  —  light / clinical + one warm accent
   Bright bone canvas, near-black ink nodes. Amber-honey is the ONLY
   colour, used sparingly to mark meaning: the source (root ring),
   the flow (travelling pulse dots), and the dependency (informs-next).
   The motion carries the drama, not the colour.
   ═══════════════════════════════════════════════════════════ */

// ── Light / clinical palette ──
const AMBER_ACCENT = "rgba(29,29,31,0.62)";          // deepened amber — reads with weight on white
const MONO_NODE    = "rgba(29,29,31,0.78)";    // near-black ink — uniform pillar ring/ink
const MONO_TRACK   = "rgba(29,29,31,0.12)";    // soft ink hairline connector
const INK_LABEL    = "rgba(29,29,31,0.55)";    // node label text on light

// viewBox 760 × 382
const _AX = 380, _AY = 95,  _AR = 50;  // Assessment (root)
const _EX = 96,  _EY = 295, _PR = 42;  // Exercise
const _NX = 380, _NY = 295;             // Nutrition
const _PX = 664, _PY = 295;            // Psychology

const BEAM_PATHS = [
  // Root → pillars: amber pulse travels grey tracks. Informs-next: amber too.
  { d: `M ${_AX},${_AY+_AR} C ${_AX},200 ${_EX},232 ${_EX},${_EY-_PR}`, light: AMBER_ACCENT, dur: "2.8s", delay: 0.3  },
  { d: `M ${_AX},${_AY+_AR} L ${_NX},${_NY-_PR}`,                         light: AMBER_ACCENT, dur: "2.1s", delay: 0.55 },
  { d: `M ${_AX},${_AY+_AR} C ${_AX},200 ${_PX},232 ${_PX},${_PY-_PR}`, light: AMBER_ACCENT, dur: "2.8s", delay: 0.8  },
  { d: `M ${_EX+_PR},${_EY} L ${_NX-_PR},${_NY}`,                         light: AMBER_ACCENT, dur: "1.7s", delay: 1.2  },
] as const;

const ARCH_NODES = [
  // Root carries the amber accent ("governs all"). Pillars are uniform white.
  { cx: _AX, cy: _AY, R: _AR, label: ["Medical", "Assessment"],   abbr: "01", light: AMBER_ACCENT, tag: "governs all", isRoot: true  },
  { cx: _EX, cy: _EY, R: _PR, label: ["Personalised", "Exercise"], abbr: "02", light: MONO_NODE, tag: "pillar",      isRoot: false },
  { cx: _NX, cy: _NY, R: _PR, label: ["Nutrition", "Plan"],        abbr: "03", light: MONO_NODE, tag: "pillar",      isRoot: false },
  { cx: _PX, cy: _PY, R: _PR, label: ["Mind", "Coaching"],          abbr: "04", light: MONO_NODE, tag: "if needed",   isRoot: false },
] as const;

function ProgramArchitecture() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();

  return (
    <div ref={ref} className="mb-16 md:mb-20">

      {/* ── Light clinical card ── */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(155deg, #FFFFFF 0%, #EEF4FC 100%)",
          boxShadow:
            "0 30px 80px rgba(0,41,92,0.10), 0 4px 16px rgba(0,41,92,0.06), inset 0 1px 0 rgba(29,29,31,0.8)",
          border: "1px solid rgba(0,41,92,0.06)",
        }}
      >
        {/* Amber radial bloom behind the root — the single warm glow */}
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: 560,
            height: 280,
            background: `radial-gradient(ellipse at 50% 0%, rgba(29,29,31,0.06) 0%, transparent 62%)`,
          }}
        />

        {/* Card header */}
        <div className="relative flex items-center justify-between px-8 md:px-10 pt-8 pb-0">
          <p className="text-caption uppercase tracking-[0.2em]"
            style={{ color: "rgba(29,29,31,0.4)" }}>
            Program architecture
          </p>
          <p className="text-caption" style={{ color: "rgba(29,29,31,0.28)" }}>
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

          {/* ── Beam tracks — grey hairlines, the skeleton ── */}
          {BEAM_PATHS.map((b, i) => (
            <motion.path
              key={`track-${i}`}
              d={b.d}
              stroke={MONO_TRACK} strokeWidth={1.5}
              strokeLinecap="round" fill="none"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.08 + i * 0.18 }}
            />
          ))}

          {/* ── Lit beam overlays — faint amber warmth; the travelling dot
                carries the real colour, so these stay restrained ── */}
          {BEAM_PATHS.map((b, i) => (
            <motion.path
              key={`beam-${i}`}
              d={b.d}
              stroke={b.light} strokeWidth={1.5}
              strokeLinecap="round" fill="none"
              filter="url(#beam-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.32 } : {}}
              transition={{ duration: 0.75, ease: EASE, delay: b.delay }}
            />
          ))}

          {/* ── Travelling pulse dots — the one moving colour, amber.
                Skipped under reduced-motion (infinite animateMotion). ── */}
          {inView && !prefersReduced && BEAM_PATHS.map((b, i) => (
            <g key={`dot-${i}`} filter="url(#arch-bloom)">
              <circle r={5} fill={b.light} opacity={0.95}>
                <animateMotion dur={b.dur} repeatCount="indefinite" path={b.d} />
              </circle>
            </g>
          ))}

          {/* ── Assessment pulsing ring — amber, marks "the source" ── */}
          {inView && !prefersReduced && (
            <motion.circle
              cx={_AX} cy={_AY}
              fill="none" stroke={AMBER_ACCENT} strokeWidth={1.5}
              animate={{ r: [_AR + 18, _AR + 58], opacity: [0.5, 0] }}
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
              {/* Ambient glow behind node — root glows amber (the source),
                  pillars carry a barely-there ink halo. */}
              <circle cx={node.cx} cy={node.cy} r={node.R + 16}
                fill={node.light} fillOpacity={node.isRoot ? 0.10 : 0.03} />
              {/* Circle — faint tinted fill so it reads on the light canvas */}
              <circle cx={node.cx} cy={node.cy} r={node.R}
                fill={node.isRoot ? "rgba(29,29,31,0.04)" : "rgba(0,41,92,0.02)"}
                stroke={node.light}
                strokeWidth={node.isRoot ? 2.2 : 1.4}
                strokeOpacity={node.isRoot ? 0.95 : 0.6} />
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
              {/* Label below — ink on light, with breathing room below glow ring */}
              <text x={node.cx} y={node.cy + node.R + 30}
                textAnchor="middle"
                fontFamily="Geist, Inter, -apple-system, sans-serif"
                fontSize={11} fill={INK_LABEL}>
                {node.label[0]}
              </text>
              <text x={node.cx} y={node.cy + node.R + 44}
                textAnchor="middle"
                fontFamily="Geist, Inter, -apple-system, sans-serif"
                fontSize={11} fill={INK_LABEL}>
                {node.label[1]}
              </text>
            </motion.g>
          ))}

          {/* "INFORMS NEXT" label — the amber dependency marker between pillars */}
          <motion.text
            x={(_EX + _NX) / 2} y={_EY + 26}
            textAnchor="middle"
            fontFamily="Geist, Inter, -apple-system, sans-serif"
            fontSize={8.5} fill={AMBER_ACCENT} letterSpacing="0.12em"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.6 } : {}}
            transition={{ delay: 2.0 }}
          >
            INFORMS NEXT
          </motion.text>
        </svg>

        {/* Card footer */}
        <div className="relative px-8 md:px-10 pb-7 pt-1">
          <p className="text-caption" style={{ color: "rgba(29,29,31,0.4)" }}>
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
    { label: "Medical history",  status: "COMPLETE",  color: "rgba(29,29,31,0.92)", delay: 0.58 },
    { label: "Imaging reports",  status: "REVIEWED",  color: "rgba(29,29,31,0.92)", delay: 0.84 },
    { label: "Medications",      status: "3 ACTIVE",  color: "rgba(29,29,31,0.62)", delay: 1.10 },
    { label: "Pain regions",     status: "4 MAPPED",  color: "rgba(29,29,31,0.62)", delay: 1.36 },
  ] as const;

  const pillars = [
    { label: "Exercise",   color: "rgba(29,29,31,0.62)", tagX: PX,        tagW: 62 },
    { label: "Nutrition",  color: SAGE,      tagX: PX + 70,   tagW: 68 },
    { label: "Mind",       color: "rgba(29,29,31,0.62)", tagX: PX + 146,  tagW: 44 },
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
        fill="rgba(29,29,31,0.025)" stroke="rgba(29,29,31,0.1)" strokeWidth={1}
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.06 }}
      />

      {/* ── HEADER: CLINICAL INTAKE + live status dot ── */}
      <motion.text x={PX} y={44}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} letterSpacing="0.2em" fill="rgba(29,29,31,0.3)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 0.10 }}>
        CLINICAL INTAKE
      </motion.text>

      {animate && (
        <motion.circle cx={RX - 68} cy={40} r={3.5} fill="rgba(29,29,31,0.92)"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      )}
      <motion.text x={RX - 60} y={44}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} letterSpacing="0.1em" fill="rgba(29,29,31,0.92)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 0.55 } : {}}
        transition={{ delay: 0.10 }}>
        IN PROGRESS
      </motion.text>

      <motion.line x1={PX} y1={54} x2={RX} y2={54}
        stroke="rgba(29,29,31,0.07)" strokeWidth={1}
        initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
        style={{ transformOrigin: `${PX}px 54px` }}
        transition={{ duration: 0.35, delay: 0.16 }}
      />

      {/* ── CONDITION ROW ── */}
      <motion.text x={PX} y={74}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={8.5} letterSpacing="0.14em" fill="rgba(29,29,31,0.26)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 0.26 }}>
        CONDITION
      </motion.text>
      <motion.text x={108} y={74}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={11.5} fontWeight={600} fill="rgba(29,29,31,0.88)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: EASE, delay: 0.40 }}>
        Ankylosing Spondylitis
      </motion.text>

      <motion.line x1={PX} y1={85} x2={RX} y2={85}
        stroke="rgba(29,29,31,0.05)" strokeWidth={1}
        initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
        style={{ transformOrigin: `${PX}px 85px` }}
        transition={{ duration: 0.3, delay: 0.36 }}
      />

      {/* ── INTAKE SUB-HEADER ── */}
      <motion.text x={PX} y={103}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={8} letterSpacing="0.16em" fill="rgba(29,29,31,0.2)"
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
              fontSize={11} fill="rgba(29,29,31,0.62)"
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
                stroke="rgba(29,29,31,0.04)" strokeWidth={1}
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
        fill="rgba(29,29,31,0.06)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 1.52 }}
      />
      {/* Fill — scaleX from left so rounded corners don't distort */}
      <motion.rect x={BAR_X} y={BAR_Y} width={BAR_W} height={BAR_H} rx={2.5}
        fill="rgba(29,29,31,0.92)" filter="url(#a-bar-glow)"
        style={{ transformBox: "fill-box", transformOrigin: "left center" }}
        initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: EASE, delay: 1.60 }}
      />
      {/* 100% label */}
      <motion.text x={RX} y={BAR_Y - 5} textAnchor="end"
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={8.5} fontWeight={600} fill="rgba(29,29,31,0.92)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 0.65 } : {}}
        transition={{ delay: 2.72 }}>
        100%
      </motion.text>

      {/* ── OUTPUT: PROGRAM CONFIGURED ── */}
      <motion.line x1={PX} y1={228} x2={RX} y2={228}
        stroke="rgba(29,29,31,0.07)" strokeWidth={1}
        initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
        style={{ transformOrigin: `${PX}px 228px` }}
        transition={{ duration: 0.35, delay: 2.78 }}
      />
      <motion.text x={PX} y={245}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} letterSpacing="0.16em" fontWeight={600} fill="rgba(29,29,31,0.92)"
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
        stroke="rgba(29,29,31,0.06)" strokeWidth={1}
        initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
        style={{ transformOrigin: `${PX}px 280px` }}
        transition={{ duration: 0.4, delay: 3.08 }}
      />
      <motion.text x={PX} y={291}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={8.5} fill="rgba(29,29,31,0.24)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 3.14 }}>
        Dr. Shruthi Desai · DM Rheumatology
      </motion.text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   ART — EXERCISE (02)  deep forest-green panel
   Prescription cards — three zones, animated stagger.
   Fresh / energetic: mint-green accents, glass cards, light text.
   ═══════════════════════════════════════════════════════════ */

function ExerciseArt({ animate }: { animate: boolean }) {
  // Light ink for text on the dark forest panel
  const INK    = "rgba(29,29,31,0.92)";   // primary label
  const INK_MU = "rgba(200,230,214,0.5)";    // muted note / frequency
  const HEAD   = "rgba(200,230,214,0.42)";   // header / caption
  const HAIR   = "rgba(110,231,183,0.16)";   // separators

  // Mint accents — fresh on the dark green panel
  const zones = [
    { zone: "Upper body", rx: "3 × 12", note: "Shoulder band · Wall push", freq: "3×/week",  color: CORAL,  delay: 0.30 },
    { zone: "Lower back", rx: "Daily",  note: "Bird dog · Cat-cow",         freq: "Every day", color: SALMON, delay: 0.60 },
    { zone: "Lower body", rx: "3 × 10", note: "Wall sit · Step-up",         freq: "3×/week",   color: CORAL,  delay: 0.90 },
  ] as const;

  // Card geometry — taller cards, generous gap, consistent rhythm
  const CARD_X = 34, CARD_W = 312, CARD_H = 62, GAP = 72;
  const ROW_Y0 = 84;
  // Right-side Rx pill
  const PILL_W = 78, PILL_X = CARD_X + CARD_W - PILL_W - 12;

  return (
    <svg viewBox="0 0 380 310" fill="none" className="w-full h-full" aria-hidden>
      <defs>
        {/* Soft shadow so glass cards lift off the dark panel */}
        <filter id="ex-card-shadow" x="-15%" y="-40%" width="130%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="6"
            floodColor="#000000" floodOpacity="0.28" />
        </filter>
      </defs>

      {/* ── Header row ── */}
      <motion.text x={CARD_X} y={30}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} letterSpacing="0.22em" fill={HEAD}
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 0.08 }}>
        EXERCISE PRESCRIPTION
      </motion.text>

      {/* Week badge (right-aligned with cards) */}
      <motion.rect x={CARD_X + CARD_W - 76} y={18} width={76} height={20} rx={10}
        fill={CORAL} fillOpacity={0.16} stroke={CORAL} strokeWidth={0.8} strokeOpacity={0.5}
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 0.18 }}
      />
      <motion.text x={CARD_X + CARD_W - 38} y={31.5} textAnchor="middle"
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} fontWeight={700} letterSpacing="0.06em" fill={CORAL}
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 0.22 }}>
        WEEK 1–2
      </motion.text>

      {/* Header divider */}
      <motion.line x1={CARD_X} y1={48} x2={CARD_X + CARD_W} y2={48}
        stroke={HAIR} strokeWidth={1}
        initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
        style={{ transformOrigin: `${CARD_X}px 48px` }}
        transition={{ duration: 0.5, delay: 0.24 }}
      />

      {/* ── Zone prescription cards ── */}
      {zones.map((z, i) => {
        const y  = ROW_Y0 + i * GAP;        // card top
        const cy = y + CARD_H / 2;          // card vertical centre
        return (
          <g key={z.zone}>
            {/* Card — translucent mint glass on dark */}
            <motion.rect
              x={CARD_X} y={y} width={CARD_W} height={CARD_H} rx={12}
              fill={z.color} fillOpacity={0}
              stroke={z.color} strokeWidth={1} strokeOpacity={0}
              filter="url(#ex-card-shadow)"
              animate={animate ? { fillOpacity: 0.08, strokeOpacity: 0.34 } : {}}
              transition={{ duration: 0.45, delay: z.delay }}
            />
            {/* Rounded accent left bar */}
            <motion.rect
              x={CARD_X + 9} y={y + 12} width={4} height={CARD_H - 24} rx={2}
              fill={z.color}
              initial={{ opacity: 0, scaleY: 0.4 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              animate={animate ? { opacity: 1, scaleY: 1 } : {}}
              transition={{ duration: 0.4, ease: EASE, delay: z.delay + 0.08 }}
            />

            {/* Zone label — bright, baseline above centre */}
            <motion.text x={CARD_X + 26} y={cy - 4}
              fontFamily="Geist, Inter, -apple-system, sans-serif"
              fontSize={12.5} fontWeight={700} fill={INK}
              initial={{ opacity: 0, x: CARD_X + 20 }}
              animate={animate ? { opacity: 1, x: CARD_X + 26 } : {}}
              transition={{ duration: 0.35, ease: EASE, delay: z.delay + 0.14 }}>
              {z.zone}
            </motion.text>
            {/* Exercises note — muted, baseline below centre */}
            <motion.text x={CARD_X + 26} y={cy + 12}
              fontFamily="Geist, Inter, -apple-system, sans-serif"
              fontSize={9.5} fill={INK_MU}
              initial={{ opacity: 0 }}
              animate={animate ? { opacity: 1 } : {}}
              transition={{ delay: z.delay + 0.24 }}>
              {z.note}
            </motion.text>

            {/* Rx pill — self-contained on the right */}
            <motion.rect
              x={PILL_X} y={cy - 18} width={PILL_W} height={36} rx={9}
              fill={z.color} fillOpacity={0}
              stroke={z.color} strokeWidth={0.8} strokeOpacity={0}
              animate={animate ? { fillOpacity: 0.14, strokeOpacity: 0.3 } : {}}
              transition={{ delay: z.delay + 0.2 }}
            />
            <motion.text
              x={PILL_X + PILL_W / 2} y={cy - 2} textAnchor="middle"
              fontFamily="Geist, Inter, -apple-system, sans-serif"
              fontSize={13} fontWeight={700} fill={z.color}
              initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
              transition={{ delay: z.delay + 0.24 }}>
              {z.rx}
            </motion.text>
            <motion.text
              x={PILL_X + PILL_W / 2} y={cy + 11} textAnchor="middle"
              fontFamily="Geist, Inter, -apple-system, sans-serif"
              fontSize={8} fill={INK_MU} letterSpacing="0.03em"
              initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
              transition={{ delay: z.delay + 0.3 }}>
              {z.freq}
            </motion.text>
          </g>
        );
      })}

      {/* ── Footer ── */}
      <motion.line x1={CARD_X} y1={290} x2={CARD_X + CARD_W} y2={290}
        stroke={HAIR} strokeWidth={1}
        initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
        style={{ transformOrigin: `${CARD_X}px 290px` }}
        transition={{ duration: 0.45, delay: 1.5 }}
      />
      <motion.text x={CARD_X} y={304}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} fill={HEAD}
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
    const id = setInterval(() => setIsVeg(v => !v), 2800);
    return () => clearInterval(id);
  }, [animate]);

  const acc = AMBER;

  // One full Imagen plate per diet (4 quadrants of real food baked into the photo)
  const plateImg = isVeg
    ? asset("/images/nutrition/plate-veg.png")
    : asset("/images/nutrition/plate-nonveg.png");

  // Nutrient callouts — each points to one quadrant of the plate
  type Callout = { nutrient: string; veg: string; nonveg: string; pos: React.CSSProperties };
  const callouts: Callout[] = [
    { nutrient: "PROTEIN",     veg: "Kabuli chana",   nonveg: "Grilled salmon", pos: { top: "20%",    left: "3%",  textAlign: "left"  } },
    { nutrient: "CALCIUM",     veg: "Paneer · Dahi",  nonveg: "Yogurt · Cheese", pos: { top: "20%",    right: "3%", textAlign: "right" } },
    { nutrient: "ANTI-INFLAM", veg: "Palak · Walnut", nonveg: "Grilled chicken", pos: { bottom: "28%", left: "3%",  textAlign: "left"  } },
    { nutrient: "VITAMIN D",   veg: "Mushrooms",      nonveg: "Egg yolk · Fish", pos: { bottom: "28%", right: "3%", textAlign: "right" } },
  ];

  return (
    <div className="w-full h-full relative" style={{ fontFamily: "Geist, Inter, sans-serif" }}>

      {/* Header */}
      <div style={{ position: "absolute", top: 16, left: 20, right: 20, display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 5 }}>
        <span style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(29,29,31,0.32)" }}>NUTRITION PLAN</span>
        <AnimatePresence mode="wait">
          <motion.span key={isVeg ? "vb" : "nvb"}
            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.25 }}
            style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.1em", color: acc,
              padding: "3px 11px", borderRadius: 11, border: "1px solid rgba(29,29,31,0.34)", background: "rgba(29,29,31,0.10)" }}>
            {isVeg ? "VEGETARIAN" : "NON-VEG"}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* The plate — full Imagen photo, crossfades veg ↔ non-veg.
          Static wrapper holds the centering translate; the motion.div only
          animates scale/opacity (Framer's transform would otherwise drop the translate). */}
      <div style={{
        position: "absolute", top: "48%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%", aspectRatio: "1",
      }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={animate ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          style={{ width: "100%", height: "100%" }}
        >
          <AnimatePresence mode="wait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {/* Plate shot on pure white = card white, so no clip/mask needed —
                `contain` shows the whole round plate floating on the card.
                Grayscale keeps it consistent with the monochrome section. */}
            <motion.img key={plateImg} src={plateImg} alt="Your plate"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", filter: "grayscale(1) contrast(1.03)" }} />
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Nutrient callouts pointing at quadrants */}
      {callouts.map((c, i) => {
        const right = c.pos.textAlign === "right";
        return (
          <motion.div key={c.nutrient}
            initial={{ opacity: 0, x: right ? 10 : -10 }}
            animate={animate ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, ease: EASE, delay: 0.55 + i * 0.12 }}
            style={{ position: "absolute", ...c.pos, zIndex: 5, maxWidth: 112 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: right ? "flex-end" : "flex-start" }}>
              {!right && <span style={{ width: 5, height: 5, borderRadius: "50%", background: acc }} />}
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", color: acc }}>{c.nutrient}</span>
              {right && <span style={{ width: 5, height: 5, borderRadius: "50%", background: acc }} />}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={isVeg ? `${i}v` : `${i}n`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ fontSize: 8, color: "rgba(29,29,31,0.5)", marginTop: 1, lineHeight: 1.3 }}>
                {isVeg ? c.veg : c.nonveg}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Veg ↔ non-veg slide dots — sit above the panel's own step badge,
          which carries the "03 Nutrition Plan" label, so nothing overlaps. */}
      <div style={{ position: "absolute", bottom: 64, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5, zIndex: 5 }}>
        {[true, false].map((v) => (
          <motion.div key={String(v)}
            animate={{ width: isVeg === v ? 16 : 6, opacity: isVeg === v ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
            style={{ height: 4, borderRadius: 2, background: acc }} />
        ))}
      </div>
    </div>
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
        fontWeight={700} fill="rgba(29,29,31,1)" opacity={0.05}>04</text>

      {/* Subtle grid */}
      {[80, 100, 120, 140, 160].map(y => (
        <line key={y} x1={20} y1={y} x2={360} y2={y}
          stroke="rgba(29,29,31,1)" strokeWidth={0.4} opacity={0.06} />
      ))}

      {/* State labels */}
      <motion.text x={26} y={55}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} letterSpacing="0.18em" fill="rgba(29,29,31,0.92)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 0.65 } : {}}
        transition={{ delay: 0.2 }}>
        BARRIER ACTIVE
      </motion.text>
      <motion.text x={212} y={55}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} letterSpacing="0.18em" fill="rgba(29,29,31,0.5)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}>
        COACHING ENGAGED
      </motion.text>

      {/* Sub-labels */}
      <motion.text x={79} y={75}
        textAnchor="middle"
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={10} fill="rgba(29,29,31,0.92)" opacity={0.5}
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}>
        Fear · Catastrophising
      </motion.text>
      <motion.text x={285} y={75}
        textAnchor="middle"
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={10} fill="rgba(29,29,31,0.38)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 1.7 }}>
        Calm · Engaged
      </motion.text>

      {/* Chaotic waveform */}
      <motion.path d={chaotic}
        stroke="rgba(29,29,31,0.92)" strokeWidth={2} strokeLinecap="round"
        strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 0.88 } : {}}
        transition={{ duration: 1.0, ease: "easeInOut", delay: 0.35 }}
      />

      {/* Brainwave readout — LEFT (stressed) */}
      <motion.text x={79} y={162}
        textAnchor="middle"
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={11} fontWeight={700} fill="rgba(29,29,31,0.92)" letterSpacing="0.04em"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 0.9 } : {}}
        transition={{ delay: 1.0 }}>
        High Beta · 24 Hz
      </motion.text>
      <motion.text x={79} y={177}
        textAnchor="middle"
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9.5} fontWeight={600} fill="rgba(29,29,31,0.72)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 1.1 }}>
        Overthinking · Tense · On guard
      </motion.text>

      {/* Threshold divider */}
      <motion.line x1={175} y1={50} x2={175} y2={200}
        stroke="rgba(29,29,31,0.22)" strokeWidth={1.5} strokeDasharray="5 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.3 }}
      />
      <motion.text x={175} y={214}
        textAnchor="middle"
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={8.5} fill="rgba(29,29,31,0.3)" letterSpacing="0.08em"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 1.45 }}>
        FLAG THRESHOLD
      </motion.text>
      <motion.text x={175} y={226}
        textAnchor="middle"
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={7.5} fill="rgba(29,29,31,0.22)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}>
        weekly check-ins + adherence
      </motion.text>

      {/* Arrow through threshold */}
      <motion.path d="M 148,120 L 164,120 L 160,115 M 164,120 L 160,125"
        stroke="rgba(29,29,31,0.35)" strokeWidth={1.2} strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 1.52 }}
      />

      {/* Calm waveform */}
      <motion.path d={calm}
        stroke="rgba(29,29,31,0.75)" strokeWidth={2} strokeLinecap="round"
        strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 1.6 }}
      />

      {/* Brainwave readout — RIGHT (calm) */}
      <motion.text x={285} y={162}
        textAnchor="middle"
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={11} fontWeight={700} fill="rgba(29,29,31,0.62)" letterSpacing="0.04em"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 0.95 } : {}}
        transition={{ delay: 2.3 }}>
        Alpha · 10 Hz
      </motion.text>
      <motion.text x={285} y={177}
        textAnchor="middle"
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9.5} fontWeight={600} fill="rgba(29,29,31,0.72)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 2.4 }}>
        Settled · Confident · In control
      </motion.text>

      {/* Footer */}
      <motion.line x1={26} y1={252} x2={354} y2={252}
        stroke="rgba(29,29,31,0.08)" strokeWidth={1}
        initial={{ scaleX: 0 }} animate={animate ? { scaleX: 1 } : {}}
        style={{ transformOrigin: "26px 252px" }}
        transition={{ duration: 0.5, delay: 2.0 }}
      />
      <motion.text x={26} y={268}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={10} fontWeight={600} fill="rgba(29,29,31,0.92)"
        initial={{ opacity: 0 }} animate={animate ? { opacity: 0.85 } : {}}
        transition={{ delay: 2.1 }}>
        → Mind coaching initiated
      </motion.text>
      <motion.text x={26} y={284}
        fontFamily="Geist, Inter, -apple-system, sans-serif"
        fontSize={9} fill="rgba(29,29,31,0.28)"
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

  return (
    <>
      <ProgramArchitecture />

      {/* Stacked layout — clean, fully-visible flow. Shown on mobile/tablet,
          and at all sizes when reduced motion is preferred. */}
      <div className={prefersReduced ? "" : "lg:hidden"}>
        <StackedSequence />
      </div>

      {/* Animated sticky choreography — desktop only, skipped for reduced motion. */}
      {!prefersReduced && (
        <div className="hidden lg:block">
          <SequenceAnimated />
        </div>
      )}
    </>
  );
}

/* ── Stacked layout (mobile + reduced-motion) ───────────────────
   Each step is a self-contained dark card: art on top, copy below.
   No sticky scroll-jacking, no forced viewport heights — everything
   is fully visible and reads as a normal vertical flow. */
function StackedSequence() {
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      {STEPS.map((step) => {
        const Art = step.Art;
        return (
          <div
            key={step.number}
            className="relative rounded-3xl overflow-hidden p-6 sm:p-8"
            style={{ background: step.sectionBg, border: `1px solid ${step.scheme.border}` }}
          >
            {/* Art — the SVG already carries its own header, footer and step
                number, so no extra badge is layered on top of it. */}
            <div
              className="relative w-full aspect-square rounded-2xl overflow-hidden mb-8"
              style={{ background: step.panelBg, border: `1px solid ${step.scheme.border}` }}
            >
              <div
                className="absolute top-0 inset-x-0 h-0.75 rounded-t-2xl"
                style={{ background: step.accent }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Art animate />
              </div>
            </div>

            {/* Copy */}
            <StepCopy step={step} />
          </div>
        );
      })}
    </div>
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
                border: `1px solid ${activeStep.scheme.border || "rgba(29,29,31,0.06)"}`,
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

              {/* Progress dots — hidden below lg, where the smaller card frame
                  makes them overlap the card's own "IN PROGRESS" header. */}
              <div className="absolute top-5 right-5 hidden lg:flex flex-col gap-2 z-10">
                {STEPS.map((s, i) => (
                  <motion.span
                    key={s.number}
                    aria-hidden
                    className="block rounded-full"
                    animate={{
                      width: i === active ? 8 : 6,
                      height: i === active ? 8 : 6,
                      opacity: i < active ? 0.7 : i === active ? 1 : 0.3,
                      backgroundColor: i <= active ? activeStep.accent : "rgba(29,29,31,0.20)",
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
                        background: "rgba(29,29,31,0.09)",
                        color: activeStep.accent,
                        border: "1px solid rgba(29,29,31,0.18)",
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
      {/* Ghost number — top equals negative of font-size so it never overlaps content.
          Hidden below lg, where the stacked card would clip its negative offset. */}
      <span
        className="absolute -left-2 select-none pointer-events-none font-display text-line leading-none hidden lg:block"
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
            background: "rgba(29,29,31,0.07)",
            color: step.accent,
            border: "1px solid rgba(29,29,31,0.16)",
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
        style={{ borderTop: "1px solid rgba(29,29,31,0.14)" }}
      >
        {step.stats.map((s, i) => (
          <StatDisplay key={s.label} stat={s} inView={inView} index={i} accent={step.accent} scheme={scheme} />
        ))}
      </div>
    </div>
  );
}

