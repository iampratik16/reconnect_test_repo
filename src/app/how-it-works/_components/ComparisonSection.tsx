"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Eyebrow from "@/components/Eyebrow";

/* ── icons ──────────────────────────────────────────────────── */
function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="8.5" stroke="currentColor" strokeOpacity="0.5" />
      <path
        d="M5.5 5.5L12.5 12.5M12.5 5.5L5.5 12.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="9" fill="#0064E0" fillOpacity="0.15" />
      <path
        d="M5 9.5L7.5 12L13 6"
        stroke="#0064E0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── data ───────────────────────────────────────────────────── */
const ROWS = [
  {
    dimension: "Inputs",
    generic: "Height + weight + a few preferences",
    reconnect: "Medical history, imaging, medications, pain map",
  },
  {
    dimension: "Output",
    generic: "One generic template per goal",
    reconnect: "A program built for your exact condition",
  },
  {
    dimension: "Scope",
    generic: "Same workout served to thousands of bodies",
    reconnect: "Region-split: upper / lower / back / target joint",
  },
  {
    dimension: "Medical",
    generic: "No medical intake; no condition awareness",
    reconnect: "Age- and severity-scaled prescriptions",
  },
  {
    dimension: "Pain",
    generic: "Pain? You're on your own to modify",
    reconnect: "Pain-first: we calm, respect, and build around it",
  },
] as const;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── component ──────────────────────────────────────────────── */
export default function ComparisonSection() {
  const tableRef = useRef<HTMLDivElement>(null);
  const inView = useInView(tableRef, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section className="section-py bg-bone-deep">
      <div className="container-site">

        {/* Section header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={prefersReduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Eyebrow number="(03)">A different starting point</Eyebrow>
          <h2 className="text-h2 font-display text-ink mt-5">
            Reconnect vs generic fitness apps.
          </h2>
          <p className="text-body-lg text-ink-soft mt-4 max-w-xl">
            The difference isn&apos;t in the workouts. It&apos;s in what comes before them.
          </p>
        </motion.div>

        {/* ════════════════════════════════════════════
            DESKTOP — split-background comparison table
            ════════════════════════════════════════════ */}
        <div
          ref={tableRef}
          className="hidden md:block relative rounded-[28px] overflow-hidden"
          style={{ boxShadow: "0 20px 72px rgba(0,41,92,0.13), 0 2px 8px rgba(0,41,92,0.06)" }}
        >
          {/* Split background: light left, navy right */}
          <div className="absolute inset-0 flex pointer-events-none" aria-hidden>
            <div className="w-1/2 bg-white" />
            <div className="w-1/2 bg-[#00295C]" />
          </div>

          {/* Blue radial glow on Reconnect side */}
          <div
            className="absolute top-0 right-0 w-1/2 h-72 pointer-events-none"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse at 75% 0%, rgba(0,100,224,0.22) 0%, transparent 65%)",
            }}
          />

          {/* Hairline center divider */}
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-px w-px pointer-events-none"
            aria-hidden
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.18) 15%, rgba(255,255,255,0.18) 85%, transparent 100%)",
            }}
          />

          {/* ── Column headers ── */}
          <div className="relative grid grid-cols-2">
            {/* Generic header */}
            <div className="px-10 pt-10 pb-7 border-b border-[#DEE3E9]/70">
              <p className="text-eyebrow text-[#6E6E73]/50 uppercase tracking-widest mb-2.5">
                Generic fitness apps
              </p>
              <h3 className="text-h3 font-display text-[#6E6E73]">Generic fitness apps</h3>
            </div>
            {/* Reconnect header */}
            <div className="px-10 pt-10 pb-7 border-b border-white/10">
              <p className="text-eyebrow text-[#0064E0] uppercase tracking-widest mb-2.5">
                Rheumatologist-led
              </p>
              <h3 className="text-h3 font-display text-white">Reconnect</h3>
            </div>
          </div>

          {/* ── Comparison rows ── */}
          {ROWS.map((row, i) => (
            <motion.div
              key={row.dimension}
              className="relative grid grid-cols-2 group"
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.09 }}
            >
              {/* Generic cell */}
              <div className="relative px-10 py-[22px] flex items-start gap-4 border-b border-[#DEE3E9]/40 transition-colors duration-300 group-hover:bg-[#EEF4FC]/60">
                <span className="shrink-0 mt-[3px]" style={{ color: "#f87171" }}>
                  <XIcon />
                </span>
                <div>
                  <p className="text-eyebrow text-[#6E6E73]/40 uppercase tracking-widest mb-1.5">
                    {row.dimension}
                  </p>
                  <p className="text-body text-[#6E6E73]/60">{row.generic}</p>
                </div>
              </div>

              {/* Reconnect cell */}
              <div className="relative px-10 py-[22px] flex items-start gap-4 border-b border-white/[0.08] transition-colors duration-300 group-hover:bg-white/[0.04]">
                <span className="shrink-0 mt-[3px]">
                  <CheckIcon />
                </span>
                <div>
                  <p className="text-eyebrow text-[#0064E0] uppercase tracking-widest mb-1.5">
                    {row.dimension}
                  </p>
                  <p className="text-body text-white/82">{row.reconnect}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* ── Verdict strip ── */}
          <motion.div
            className="relative grid grid-cols-2"
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.08 + ROWS.length * 0.09 }}
          >
            <div className="px-10 py-6">
              <p className="text-body-sm text-[#6E6E73]/38 italic">
                Thousands of bodies. One template.
              </p>
            </div>
            <div className="px-10 py-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0064E0]" aria-hidden />
              <p className="text-body-sm text-[#0064E0] font-medium">
                One patient. One program. Always.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════
            MOBILE — two stacked cards
            ════════════════════════════════════════════ */}
        <div className="md:hidden flex flex-col gap-4">

          {/* Generic card */}
          <motion.div
            className="rounded-[20px] overflow-hidden"
            style={{ background: "#fff", border: "1px solid #DEE3E9" }}
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="px-6 pt-7 pb-5 border-b border-[#DEE3E9]/60">
              <p className="text-eyebrow text-[#6E6E73]/50 mb-1.5">Generic fitness apps</p>
              <h3 className="text-h3 font-display text-[#6E6E73]">Generic fitness apps</h3>
            </div>
            {ROWS.map((row, i) => (
              <div
                key={row.dimension}
                className={`px-6 py-4 flex items-start gap-3${
                  i < ROWS.length - 1 ? " border-b border-[#DEE3E9]/30" : ""
                }`}
              >
                <span className="shrink-0 mt-[2px]" style={{ color: "#f87171" }}>
                  <XIcon />
                </span>
                <p className="text-body-sm text-[#6E6E73]/65">{row.generic}</p>
              </div>
            ))}
          </motion.div>

          {/* Reconnect card */}
          <motion.div
            className="relative rounded-[20px] overflow-hidden"
            style={{ background: "#00295C" }}
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            {/* Glow */}
            <div
              className="absolute top-0 right-0 w-3/4 h-32 pointer-events-none"
              aria-hidden
              style={{
                background:
                  "radial-gradient(ellipse at 80% 0%, rgba(0,100,224,0.28) 0%, transparent 65%)",
              }}
            />
            <div className="relative px-6 pt-7 pb-5 border-b border-white/10">
              <p className="text-eyebrow text-[#0064E0] mb-1.5">Rheumatologist-led</p>
              <h3 className="text-h3 font-display text-white">Reconnect</h3>
            </div>
            {ROWS.map((row, i) => (
              <div
                key={row.dimension}
                className={`relative px-6 py-4 flex items-start gap-3${
                  i < ROWS.length - 1 ? " border-b border-white/[0.08]" : ""
                }`}
              >
                <span className="shrink-0 mt-[2px]">
                  <CheckIcon />
                </span>
                <p className="text-body-sm text-white/80">{row.reconnect}</p>
              </div>
            ))}
            <div className="relative px-6 py-5 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0064E0]" aria-hidden />
              <p className="text-body-sm text-[#0064E0] font-medium">
                One patient. One program. Always.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
