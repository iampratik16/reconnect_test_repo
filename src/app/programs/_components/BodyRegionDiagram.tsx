"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { asset } from "@/lib/asset";

type RegionId = "neck" | "shoulder" | "back" | "hip" | "knee";

type Region = {
  id: RegionId;
  label: string;
  short: string;
  blurb: string;
  conditions: string[];
  track: string;
  trackName: string;
  cx: number;
  cy: number;
};

const REGIONS: Region[] = [
  // Coordinates tuned to bodyregion/human-back-c.png (1:1) inside a 200×200
  // viewBox. Posterior (back) view: centered full body, head≈y=17 to feet≈y=198,
  // with the spine running down the midline (cx≈100) — so neck, back and hip all
  // sit on the real vertebral column. Shoulder & knee offset to viewer-left.
  {
    id: "neck",
    label: "Neck & Cervical",
    short: "Neck",
    blurb: "Cervical pain, posture loss, nerve symptoms.",
    conditions: ["Cervical spondylosis", "Posture-related pain", "Nerve compression"],
    track: "/programs/manage",
    trackName: "Manage",
    cx: 100,
    cy: 36, // cervical spine, base of skull
  },
  {
    id: "shoulder",
    label: "Shoulder",
    short: "Shoulder",
    blurb: "Frozen shoulder, impingement, rotator cuff.",
    conditions: ["Frozen shoulder", "Rotator cuff", "Impingement"],
    track: "/programs/manage",
    trackName: "Manage",
    cx: 80,
    cy: 48, // shoulder joint (viewer-left)
  },
  {
    id: "back",
    label: "Spine & Back",
    short: "Back",
    blurb: "Disc bulge, sciatica, chronic back pain.",
    conditions: ["Disc bulge", "Sciatica", "Chronic back pain"],
    track: "/programs/manage",
    trackName: "Manage",
    cx: 100,
    cy: 70, // thoracic / lumbar spine — now on the actual vertebral column
  },
  {
    id: "hip",
    label: "Hip & Pelvis",
    short: "Hip",
    blurb: "Hip OA, post-replacement, instability.",
    conditions: ["Hip osteoarthritis", "Post-replacement", "Instability"],
    track: "/programs/strengthen",
    trackName: "Strengthen",
    cx: 100,
    cy: 98, // sacrum / pelvis centre
  },
  {
    id: "knee",
    label: "Knee",
    short: "Knee",
    blurb: "Knee OA, ligament rebuild, post-surgical.",
    conditions: ["Knee osteoarthritis", "Ligament rebuild", "Post-surgical"],
    track: "/programs/strengthen",
    trackName: "Strengthen",
    cx: 92,
    cy: 140, // knee joint (viewer-left)
  },
];

export default function BodyRegionDiagram() {
  const [active, setActive] = useState<RegionId>("knee");
  const [hovered, setHovered] = useState<RegionId | null>(null);
  const prefersReduced = useReducedMotion();
  const region = REGIONS.find((r) => r.id === active)!;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,420px)_1fr] gap-8 lg:gap-10 items-start min-w-0">
      {/* ═══ LEFT column: Skeleton + region pills ═══════════════════ */}
      <div className="flex flex-col gap-6 min-w-0">
      {/* ═══ Skeleton silhouette ════════════════════════════════════ */}
      <div className="relative mx-auto w-full max-w-[360px] aspect-square">
        {/* Soft brand-blue radial backdrop */}
        <div
          className="absolute inset-0 rounded-[24px] pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(0,100,224,0.12), transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Translucent anatomical human figure — posterior (back) view, so the
            spine is real and the back/neck/hip markers land on the actual
            vertebral column. Sits behind the SVG dots. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/bodyregion/human-back-c.png")}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
          draggable={false}
        />

        <svg
          viewBox="0 0 200 200"
          className="relative w-full h-full"
          aria-label="Body region selector"
        >
          {/* Hot dots overlay — positioned over the skeleton joints */}
          {REGIONS.map((r) => {
            const isActive = r.id === active;
            const isHovered = r.id === hovered;
            const isHighlighted = isActive || isHovered;
            return (
              <g
                key={r.id}
                style={{ cursor: "pointer", outline: "none" }}
                onClick={() => setActive(r.id)}
                onMouseEnter={() => setHovered(r.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(r.id)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={`Select ${r.label}`}
                className="focus:outline-none focus-visible:outline-none"
              >
                {/* Invisible larger hit area (24px) */}
                <circle cx={r.cx} cy={r.cy} r="18" fill="transparent" />

                {/* Outer pulsing ring (active only) */}
                {!prefersReduced && isActive && (
                  <motion.circle
                    cx={r.cx}
                    cy={r.cy}
                    r="14"
                    fill="none"
                    stroke="var(--color-clay)"
                    strokeWidth="1.5"
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: [0.8, 1.6, 0.8], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}

                {/* Mid halo (active OR hover) */}
                <motion.circle
                  cx={r.cx}
                  cy={r.cy}
                  r="11"
                  fill="rgba(0,100,224,0.18)"
                  initial={false}
                  animate={{
                    opacity: isHighlighted ? 1 : 0,
                    scale: isHighlighted ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: `${r.cx}px ${r.cy}px` }}
                />

                {/* The dot itself */}
                <motion.circle
                  cx={r.cx}
                  cy={r.cy}
                  r={isActive ? 6 : 5}
                  fill={isActive ? "var(--color-clay)" : "var(--color-calcium)"}
                  stroke={isHighlighted ? "var(--color-clay)" : "var(--color-ink-soft)"}
                  strokeWidth={isHighlighted ? 2 : 1.25}
                  initial={false}
                  animate={{ scale: isHovered && !isActive ? 1.2 : 1 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: `${r.cx}px ${r.cy}px` }}
                />

                <title>{r.label}</title>
              </g>
            );
          })}
        </svg>

        {/* Click hint */}
        <p className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-caption text-ink-soft/70 italic whitespace-nowrap">
          Tap a dot to explore
        </p>
      </div>

        {/* Region pills — stay under the skeleton in the left column */}
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
          {REGIONS.map((r) => {
            const isActive = r.id === active;
            return (
              <button
                key={r.id}
                onClick={() => setActive(r.id)}
                onMouseEnter={() => setHovered(r.id)}
                onMouseLeave={() => setHovered(null)}
                aria-pressed={isActive}
                className={`group relative overflow-hidden rounded-pill px-4 py-2 text-body-sm font-medium whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border ${
                  isActive
                    ? "bg-clay text-calcium border-clay shadow-soft"
                    : "bg-calcium text-ink-soft border-line hover:text-ink hover:border-clay/50 hover:bg-clay-soft/40"
                }`}
              >
                <span className="relative z-10">{r.label}</span>
                {!isActive && (
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,100,224,0.10), transparent 60%)",
                    }}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ RIGHT column: Active focus card ═══════════════════════ */}
      <div className="relative glow-card glow-card-static bg-calcium rounded-[20px] p-7 md:p-9 overflow-hidden lg:sticky lg:top-28 self-start w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={region.id}
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-eyebrow text-clay">Focus area</p>
              <span className="text-caption font-medium text-sage bg-sage-tint rounded-pill px-3 py-1 whitespace-nowrap">
                Track · {region.trackName}
              </span>
            </div>

            <div>
              <h4 className="text-h2 font-display text-ink leading-tight">
                {region.label}
              </h4>
              <p className="text-body-lg text-ink-soft mt-3">{region.blurb}</p>
            </div>

            <ul className="flex flex-wrap gap-2">
              {region.conditions.map((c) => (
                <li
                  key={c}
                  className="text-body-sm font-medium text-ink bg-bone-deep rounded-pill px-4 py-1.5"
                >
                  {c}
                </li>
              ))}
            </ul>

            <a
              href={region.track}
              className="group inline-flex items-center gap-2 text-body font-medium text-clay hover:text-clay-dark transition-colors duration-200 mt-1"
            >
              Explore the {region.trackName} track
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M3 8h10m0 0L9 4m4 4L9 12"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
