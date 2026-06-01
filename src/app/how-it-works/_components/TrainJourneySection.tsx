"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

/* ──────────────────────────────────────────────────────────────
   GEOMETRY
   ────────────────────────────────────────────────────────────── */
const SW  = 2900;   // scene total width
const SH  = 340;    // scene height
const AMP = 46;     // sine amplitude
const PER = 880;    // sine period
const YB  = 212;    // track baseline y
const ω   = (2 * Math.PI) / PER;

const sy   = (x: number) => YB + AMP * Math.sin(ω * x);
const sdeg = (x: number) =>
  Math.atan(AMP * ω * Math.cos(ω * x)) * (180 / Math.PI);

const TRACK_D = (() => {
  const pts: string[] = [];
  for (let x = 0; x <= SW; x += 5) pts.push(`${x},${sy(x).toFixed(1)}`);
  return `M ${pts.join(" L ")}`;
})();

const RAIL_D_UP = (() => {
  const pts: string[] = [];
  for (let x = 0; x <= SW; x += 5) pts.push(`${x},${(sy(x) - 7).toFixed(1)}`);
  return `M ${pts.join(" L ")}`;
})();

const RAIL_D_DN = (() => {
  const pts: string[] = [];
  for (let x = 0; x <= SW; x += 5) pts.push(`${x},${(sy(x) + 7).toFixed(1)}`);
  return `M ${pts.join(" L ")}`;
})();

const SLEEPERS: Array<{ x: number; y: number; a: number }> = [];
for (let x = 35; x < SW; x += 50) SLEEPERS.push({ x, y: sy(x), a: sdeg(x) });

/* ──────────────────────────────────────────────────────────────
   TRAIN LAYOUT
   ────────────────────────────────────────────────────────────── */
const EX  = 530;   // engine centre-x
const GAP = 300;   // spacing between car centres
const EW  = 224;   // engine width
const EH  = 112;   // engine height above track
const CW  = 192;   // bogie car width
const CH  = 100;   // bogie car height
const WR  = 14;    // wheel radius

const CARS = [
  {
    id: "doctor-led",
    cx: EX,
    label: "01",
    title: "Doctor-led",
    desc: "Dr. Shruthi and our medical team design every program. The medicine sits behind every prescription — nothing is guesswork.",
  },
  {
    id: "personalised",
    cx: EX + GAP,
    label: "02",
    title: "Personalised",
    desc: "Your nutritionist and trainer board — shaped around your diagnosis, pain map, and history. Every plan is one of a kind.",
  },
  {
    id: "pain-first",
    cx: EX + GAP * 2,
    label: "03",
    title: "Pain-first",
    desc: "Calm the pain, respect it, then build strength around it. We never push through — we build around.",
  },
  {
    id: "roadmap",
    cx: EX + GAP * 3,
    label: "04",
    title: "Structured roadmap",
    desc: "A full team, a clear map — more veg on the plate, 10 000 steps on the watch, measurable milestones every week.",
  },
] as const;

const BREAKS = [0, 0.26, 0.52, 0.78, 1] as const;

/* ──────────────────────────────────────────────────────────────
   TINY SVG PRIMITIVES
   ────────────────────────────────────────────────────────────── */
function Smoke({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g opacity={0.6}>
      <circle cx={cx - 5} cy={cy - 8}  r={7}  fill="#C8D9EE" />
      <circle cx={cx + 4} cy={cy - 18} r={10} fill="#D4E3F2" />
      <circle cx={cx - 3} cy={cy - 28} r={8}  fill="#DDE9F5" />
    </g>
  );
}

function Wheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={WR}      fill="#0A2D42" stroke="#0064E0" strokeWidth={2.5} />
      <circle cx={cx} cy={cy} r={WR - 6}  fill="#0A2D42" />
      <circle cx={cx} cy={cy} r={3.5}     fill="#0064E0" />
      {[0, 72, 144, 216, 288].map((a) => {
        const r = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={cx + 3.5 * Math.cos(r)} y1={cy + 3.5 * Math.sin(r)}
            x2={cx + (WR - 4) * Math.cos(r)} y2={cy + (WR - 4) * Math.sin(r)}
            stroke="#0064E0" strokeWidth={1.5}
          />
        );
      })}
    </g>
  );
}

/* ──────────────────────────────────────────────────────────────
   CHARACTER SPRITES  (origin = shoulder-centre, y+ down)
   ────────────────────────────────────────────────────────────── */

/* Dr. Shruthi — dark hair bun, white coat, stethoscope */
function DrShruthi({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      <rect x={-8}  y={2}  width={16} height={22} rx={4} fill="#EFF4FF" stroke="#BDC8DC" strokeWidth={1} />
      <circle       cy={-7} r={10} fill="#F5C9A0" />
      <path d="M -10,-13 Q 0,-24 10,-13" fill="#1A0D00" />
      <circle cy={-17} r={5} fill="#1A0D00" />
      <circle cx={-3} cy={-8} r={1.5} fill="#1A0D00" />
      <circle cx={ 3} cy={-8} r={1.5} fill="#1A0D00" />
      <path d="M -4,-2 Q 0,2 4,-2" fill="none" stroke="#C97060" strokeWidth={1.3} strokeLinecap="round" />
      <path d="M 5,8 Q 13,14 9,24" fill="none" stroke="#0064E0" strokeWidth={1.8} />
      <circle cx={9} cy={25} r={3.5} fill="none" stroke="#0064E0" strokeWidth={1.8} />
    </g>
  );
}

/* Generic doctor — glasses, clipboard */
function Doctor({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      <rect x={-8}  y={2}  width={16} height={22} rx={4} fill="#EFF4FF" stroke="#BDC8DC" strokeWidth={1} />
      <circle       cy={-7} r={10} fill="#F5C9A0" />
      <path d="M -10,-11 Q 0,-20 10,-11" fill="#5C3A1E" />
      <rect x={-8} cy={-10} width={6} height={4} rx={2} fill="none" stroke="#33415C" strokeWidth={1} />
      <rect x={ 2} y={-10}  width={6} height={4} rx={2} fill="none" stroke="#33415C" strokeWidth={1} />
      <line x1={-2} y1={-8} x2={2} y2={-8} stroke="#33415C" strokeWidth={1} />
      <circle cx={-3} cy={-8} r={1.3} fill="#33415C" />
      <circle cx={ 3} cy={-8} r={1.3} fill="#33415C" />
      <path d="M -3,-2 Q 0,2 3,-2" fill="none" stroke="#C97060" strokeWidth={1.2} strokeLinecap="round" />
      <rect x={-16} y={5} width={11} height={16} rx={2} fill="#EEF4FC" stroke="#0064E0" strokeWidth={1} />
      <line x1={-14} y1={10} x2={-7} y2={10} stroke="#0064E0" strokeWidth={1} />
      <line x1={-14} y1={13} x2={-7} y2={13} stroke="#0064E0" strokeWidth={1} />
    </g>
  );
}

/* Nutritionist — green, salad bowl in hand */
function Nutritionist({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      <rect x={-8}  y={2}  width={16} height={22} rx={4} fill="#2D6A4F" />
      <rect x={-5}  y={8}  width={10} height={14} rx={2} fill="#52B788" />
      <circle       cy={-7} r={10} fill="#F5C9A0" />
      <path d="M -10,-11 Q 0,-22 10,-11" fill="#8B5E3C" />
      <line x1={9}  y1={-13} x2={16} y2={-2} stroke="#8B5E3C" strokeWidth={3} strokeLinecap="round" />
      <circle cx={-3} cy={-8} r={1.5} fill="#1A0D00" />
      <circle cx={ 3} cy={-8} r={1.5} fill="#1A0D00" />
      <path d="M -5,-2 Q 0,4 5,-2" fill="none" stroke="#C97060" strokeWidth={1.5} strokeLinecap="round" />
      {/* salad bowl */}
      <path d="M -18,18 Q -13,28 -8,18" fill="none" stroke="#52B788" strokeWidth={2} />
      <line x1={-19} y1={18} x2={-7} y2={18} stroke="#52B788" strokeWidth={2} />
      <circle cx={-16} cy={15} r={2.5} fill="#52B788" />
      <circle cx={-12} cy={13} r={2}   fill="#40916C" />
      <circle cx={-8}  cy={14} r={2.5} fill="#74C69D" />
    </g>
  );
}

/* Trainer — blue top, big thumbs-up */
function Trainer({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      <rect x={-8}  y={2}  width={16} height={22} rx={4} fill="#0064E0" />
      <circle       cy={-7} r={10} fill="#F5C9A0" />
      <path d="M -10,-11 Q 0,-20 10,-11 L 10,-4 Q 0,-8 -10,-4 Z" fill="#1A1A2E" />
      <circle cx={-3} cy={-8} r={1.5} fill="#1A1A2E" />
      <circle cx={ 3} cy={-8} r={1.5} fill="#1A1A2E" />
      <path d="M -5,-2 Q 0,4 5,-2" fill="none" stroke="#C97060" strokeWidth={1.5} strokeLinecap="round" />
      {/* thumb-up arm */}
      <line x1={-8} y1={8} x2={-20} y2={2} stroke="#0064E0" strokeWidth={4} strokeLinecap="round" />
      <rect x={-26} y={-3} width={9} height={7} rx={3.5} fill="#F5C9A0" />
      <line x1={-21} y1={-3} x2={-23} y2={-10} stroke="#F5C9A0" strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

/* Patient — warm blue, smiling */
function Patient({ cx, cy, celebrate = false }: { cx: number; cy: number; celebrate?: boolean }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      <rect x={-8}  y={2}  width={16} height={22} rx={4} fill="#D6E8FF" stroke="#BDD4F0" strokeWidth={1} />
      <circle       cy={-7} r={10} fill="#F5C9A0" />
      <path d="M -10,-11 Q 0,-22 10,-11" fill="#7B4F2E" />
      <path d="M -10,-11 Q -15,-4 -12,6"  fill="#7B4F2E" />
      <circle cx={-3} cy={-8} r={1.5} fill="#1A0D00" />
      <circle cx={ 3} cy={-8} r={1.5} fill="#1A0D00" />
      <path d="M -5,-2 Q 0,4 5,-2" fill="none" stroke="#C97060" strokeWidth={1.5} strokeLinecap="round" />
      {celebrate ? (
        <>
          <line x1={-8} y1={8} x2={-20} y2={-4} stroke="#D6E8FF" strokeWidth={4} strokeLinecap="round" />
          <line x1={ 8} y1={8} x2={ 20} y2={-4} stroke="#D6E8FF" strokeWidth={4} strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1={-8} y1={8} x2={-18} y2={18} stroke="#D6E8FF" strokeWidth={4} strokeLinecap="round" />
          <line x1={ 8} y1={8} x2={ 18} y2={18} stroke="#D6E8FF" strokeWidth={4} strokeLinecap="round" />
        </>
      )}
    </g>
  );
}

/* Physio — navy, extending guiding hand */
function Physio({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      <rect x={-8}  y={2}  width={16} height={22} rx={4} fill="#0E384C" />
      <circle       cy={-7} r={10} fill="#F5C9A0" />
      <path d="M -10,-11 Q 0,-20 10,-11" fill="#3D2B1E" />
      <circle cx={-3} cy={-8} r={1.5} fill="#1A0D00" />
      <circle cx={ 3} cy={-8} r={1.5} fill="#1A0D00" />
      <path d="M -3,-2 Q 0,2 3,-2" fill="none" stroke="#C97060" strokeWidth={1.3} strokeLinecap="round" />
      <line x1={8} y1={8} x2={22} y2={3} stroke="#0E384C" strokeWidth={4} strokeLinecap="round" />
      <circle cx={22} cy={3} r={4.5} fill="#F5C9A0" />
    </g>
  );
}

/* ──────────────────────────────────────────────────────────────
   CAR BODIES
   ────────────────────────────────────────────────────────────── */

function EngineGroup({ cx, cy, angle }: { cx: number; cy: number; angle: number }) {
  const bx = cx - EW / 2;
  const by = cy - EH;
  return (
    <g transform={`rotate(${angle},${cx},${cy})`}>
      <Smoke cx={bx + 55} cy={by - 4} />
      {/* chimney */}
      <rect x={bx + 44} y={by - 32} width={20} height={34} rx={4} fill="#081E2C" />
      <rect x={bx + 38} y={by - 36} width={32} height={10} rx={4} fill="#081E2C" />
      {/* main hull */}
      <rect x={bx} y={by} width={EW} height={EH} rx={11} fill="#0E384C" />
      {/* cab */}
      <rect x={bx + EW - 88} y={by} width={88} height={EH} rx={11} fill="#0A4880" />
      {/* cab window */}
      <rect x={bx + EW - 80} y={by + 14} width={62} height={50} rx={8} fill="#EEF4FC" stroke="#fff" strokeWidth={2} />
      {/* characters */}
      <DrShruthi cx={bx + EW - 62} cy={by + 18} />
      <Doctor    cx={bx + EW - 30} cy={by + 18} />
      {/* nose bumper */}
      <rect x={bx + EW - 10} y={cy - 22} width={28} height={22} rx={5} fill="#0064E0" />
      {/* headlight */}
      <circle cx={bx + EW + 20} cy={cy - 30} r={9} fill="#FFE566" stroke="#FFC107" strokeWidth={2} />
      {/* stripe */}
      <rect x={bx} y={by + EH - 20} width={EW} height={8} fill="#0064E0" />
      {/* wheels */}
      <Wheel cx={cx - EW / 2 + 36} cy={cy} />
      <Wheel cx={cx - EW / 2 + 94} cy={cy} />
      <Wheel cx={cx + EW / 2 - 38} cy={cy} />
    </g>
  );
}

function BogieWindow({
  bx, by, children,
}: {
  bx: number;
  by: number;
  children: React.ReactNode;
}) {
  return (
    <>
      <rect x={bx + 18} y={by + 20} width={CW - 36} height={52} rx={7} fill="#EEF4FC" stroke="#BDD4F0" strokeWidth={1.5} />
      {children}
    </>
  );
}

function BogieSkeleton({
  cx, cy, angle, accent, children,
}: {
  cx: number;
  cy: number;
  angle: number;
  accent: string;
  children: React.ReactNode;
}) {
  const bx = cx - CW / 2;
  const by = cy - CH;
  return (
    <g transform={`rotate(${angle},${cx},${cy})`}>
      <rect x={bx} y={by} width={CW} height={CH} rx={9} fill="#FFFFFF" stroke={accent} strokeWidth={2} />
      <rect x={bx} y={by} width={CW} height={22} rx={9} fill={accent} />
      <rect x={bx} y={by + 8} width={CW} height={14} fill={accent} />
      <BogieWindow bx={bx} by={by}>{children}</BogieWindow>
      <rect x={bx} y={by + CH - 16} width={CW} height={8} fill={accent} />
      <Wheel cx={cx - CW / 2 + 28} cy={cy} />
      <Wheel cx={cx + CW / 2 - 28} cy={cy} />
    </g>
  );
}

function PersonalisedCar({ cx, cy, angle }: { cx: number; cy: number; angle: number }) {
  return (
    <BogieSkeleton cx={cx} cy={cy} angle={angle} accent="#0064E0">
      <Nutritionist cx={cx - CW / 2 + 38} cy={cy - CH + 20} />
      <Patient      cx={cx}               cy={cy - CH + 20} />
      <Trainer      cx={cx + CW / 2 - 38} cy={cy - CH + 20} />
    </BogieSkeleton>
  );
}

function PainFirstCar({ cx, cy, angle }: { cx: number; cy: number; angle: number }) {
  return (
    <BogieSkeleton cx={cx} cy={cy} angle={angle} accent="#0E384C">
      <Physio  cx={cx - 30} cy={cy - CH + 20} />
      <Patient cx={cx + 28} cy={cy - CH + 20} />
    </BogieSkeleton>
  );
}

function RoadmapCar({ cx, cy, angle }: { cx: number; cy: number; angle: number }) {
  const bx = cx - CW / 2;
  const by = cy - CH;
  return (
    <BogieSkeleton cx={cx} cy={cy} angle={angle} accent="#0064E0">
      <Patient      cx={bx + 34}  cy={by + 20} celebrate />
      <Physio       cx={cx - 8}   cy={by + 20} />
      <Nutritionist cx={cx + 36}  cy={by + 20} />
      {/* watch icon */}
      <g transform={`translate(${bx + 26},${by + 21})`}>
        <rect x={-8} y={-8} width={16} height={20} rx={3} fill="#EEF4FC" stroke="#0064E0" strokeWidth={1.5} />
        <line x1={-4} y1={-9} x2={4} y2={-9} stroke="#0064E0" strokeWidth={1.5} />
        <line x1={-4} y1={13} x2={4} y2={13} stroke="#0064E0" strokeWidth={1.5} />
        <text x={-6} y={5} fontSize={5} fill="#0064E0" fontFamily="monospace" fontWeight="bold">10K</text>
      </g>
    </BogieSkeleton>
  );
}

function Coupling({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g>
      <line x1={x1} y1={y1} x2={mx} y2={my} stroke="#0E384C" strokeWidth={7} strokeLinecap="round" />
      <line x1={mx} y1={my} x2={x2} y2={y2} stroke="#0E384C" strokeWidth={7} strokeLinecap="round" />
      <circle cx={mx} cy={my} r={5} fill="#0064E0" />
    </g>
  );
}

/* ──────────────────────────────────────────────────────────────
   FALLBACK (mobile / reduced-motion)
   ────────────────────────────────────────────────────────────── */
function FallbackList() {
  return (
    <ol className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {CARS.map((c) => (
        <li
          key={c.id}
          className="bg-calcium rounded-[18px] p-6 flex flex-col gap-3 hairline"
        >
          <span className="text-eyebrow text-clay">{c.label}</span>
          <h3 className="text-h4 font-display text-ink">{c.title}</h3>
          <p className="text-body-sm text-ink-soft">{c.desc}</p>
        </li>
      ))}
    </ol>
  );
}

/* ──────────────────────────────────────────────────────────────
   MAIN EXPORT
   ────────────────────────────────────────────────────────────── */
export default function TrainJourneySection() {
  const prefersReduced = useReducedMotion();
  const outerRef       = useRef<HTMLDivElement>(null);
  const [vw, setVw]    = useState(1200);

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // Pan the scene so each car crosses the viewport centre in turn
  const focusStart = EX;
  const focusEnd   = EX + GAP * 3;
  const txStart    = -(focusStart - vw / 2) + 100;
  const txEnd      = -(focusEnd   - vw / 2) - 100;
  const translateX = useTransform(scrollYProgress, [0, 1], [txStart, txEnd]);

  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = BREAKS.findIndex((bp, i) =>
        i < BREAKS.length - 1 && v >= bp && v < BREAKS[i + 1]
      );
      if (idx >= 0 && idx !== activeIdx) setActiveIdx(idx);
    });
  }, [scrollYProgress, activeIdx]);

  if (prefersReduced || vw < 768) return <FallbackList />;

  // Coupling endpoints
  const coup1x1 = EX + EW / 2,         coup1y1 = sy(EX + EW / 2);
  const coup1x2 = EX + GAP - CW / 2,   coup1y2 = sy(EX + GAP - CW / 2);
  const coup2x1 = EX + GAP + CW / 2,   coup2y1 = sy(EX + GAP + CW / 2);
  const coup2x2 = EX + GAP * 2 - CW / 2, coup2y2 = sy(EX + GAP * 2 - CW / 2);
  const coup3x1 = EX + GAP * 2 + CW / 2, coup3y1 = sy(EX + GAP * 2 + CW / 2);
  const coup3x2 = EX + GAP * 3 - CW / 2, coup3y2 = sy(EX + GAP * 3 - CW / 2);

  return (
    <div ref={outerRef} style={{ height: "430vh" }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-bone flex flex-col">

        {/* ── Info panel ──────────────────────────────────────── */}
        <div className="flex-1 flex flex-col items-center justify-end pb-4 pt-10 px-4 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <span className="inline-block text-eyebrow text-clay mb-2">
                {CARS[activeIdx].label} — {CARS[activeIdx].title}
              </span>
              <p className="text-body text-ink-soft max-w-md mx-auto leading-relaxed">
                {CARS[activeIdx].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Scene ───────────────────────────────────────────── */}
        <div
          className="relative shrink-0 overflow-hidden"
          style={{ height: SH + 20 }}
        >
          <motion.div
            style={{ translateX, width: SW, height: SH }}
            className="absolute bottom-0"
          >
            <svg
              width={SW}
              height={SH}
              viewBox={`0 0 ${SW} ${SH}`}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="tjs-sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#EEF4FC" />
                  <stop offset="65%"  stopColor="#D8E8F8" />
                  <stop offset="100%" stopColor="#C8D8EE" />
                </linearGradient>
              </defs>

              {/* Sky */}
              <rect width={SW} height={SH} fill="url(#tjs-sky)" />

              {/* Ground */}
              <rect y={YB + 52} width={SW} height={SH} fill="#C8D8E8" />
              <rect y={YB + 52} width={SW} height={5}  fill="#B8C8D8" />

              {/* Decorative distant hills */}
              <ellipse cx={400}  cy={YB + 52} rx={320} ry={28} fill="#BECFDF" opacity={0.4} />
              <ellipse cx={1100} cy={YB + 52} rx={400} ry={22} fill="#BECFDF" opacity={0.3} />
              <ellipse cx={1800} cy={YB + 52} rx={360} ry={25} fill="#BECFDF" opacity={0.35} />
              <ellipse cx={2500} cy={YB + 52} rx={340} ry={20} fill="#BECFDF" opacity={0.3} />

              {/* Sleepers */}
              {SLEEPERS.map(({ x, y, a }, i) => (
                <rect
                  key={i}
                  x={x - 26} y={y - 5}
                  width={52} height={10}
                  rx={2}
                  fill="#8B6A24"
                  opacity={0.55}
                  transform={`rotate(${a},${x},${y})`}
                />
              ))}

              {/* Two rails */}
              <path d={RAIL_D_UP} fill="none" stroke="#0E384C" strokeWidth={3.5} strokeLinecap="round" />
              <path d={RAIL_D_DN} fill="none" stroke="#0E384C" strokeWidth={3.5} strokeLinecap="round" />

              {/* Couplings (behind cars) */}
              <Coupling x1={coup1x1} y1={coup1y1} x2={coup1x2} y2={coup1y2} />
              <Coupling x1={coup2x1} y1={coup2y1} x2={coup2x2} y2={coup2y2} />
              <Coupling x1={coup3x1} y1={coup3y1} x2={coup3x2} y2={coup3y2} />

              {/* Cars */}
              <EngineGroup      cx={EX}          cy={sy(EX)}          angle={sdeg(EX)} />
              <PersonalisedCar  cx={EX + GAP}    cy={sy(EX + GAP)}    angle={sdeg(EX + GAP)} />
              <PainFirstCar     cx={EX + GAP * 2} cy={sy(EX + GAP * 2)} angle={sdeg(EX + GAP * 2)} />
              <RoadmapCar       cx={EX + GAP * 3} cy={sy(EX + GAP * 3)} angle={sdeg(EX + GAP * 3)} />
            </svg>
          </motion.div>
        </div>

        {/* ── Progress dots ────────────────────────────────────── */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {CARS.map((c, i) => (
            <div key={c.id} className="flex items-center gap-2 justify-end">
              <span
                className="text-caption text-ink-soft transition-opacity duration-300"
                style={{ opacity: i === activeIdx ? 1 : 0 }}
              >
                {c.label}
              </span>
              <span
                className="rounded-full transition-all duration-300"
                style={{
                  width:  i === activeIdx ? 12 : 8,
                  height: i === activeIdx ? 12 : 8,
                  background:
                    i === activeIdx ? "#0064E0"
                    : i < activeIdx ? "rgba(0,100,224,0.4)"
                    : "rgba(29,29,31,0.15)",
                }}
              />
            </div>
          ))}
        </div>

        {/* ── Scroll hint ──────────────────────────────────────── */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-ink-soft z-20 pointer-events-none"
          animate={{ opacity: activeIdx > 0 ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-caption">Scroll to board the train</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            className="text-clay text-sm"
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
