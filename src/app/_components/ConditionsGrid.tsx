"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useCallback, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { asset } from "@/lib/asset";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Conditions — horizontal swipe carousel (compact, scannable, mobile-first).
 * TODO: client to supply the final expanded condition list.
 * The track reflows automatically as entries are added or removed.
 */
const conditions = [
  { name: "Knee Osteoarthritis",       note: "Stairs, getting up, walking distance",  href: "/programs/manage",  img: "/images/conditions/knee-oa.png",              video: "" },
  { name: "Chronic Back Pain",         note: "Posture, stiffness, daily ache",         href: "/programs/manage",  img: "/images/conditions/back-pain.png",             video: "/videos/conditions/back-pain.mp4" },
  { name: "Disc Bulge / Sciatica",     note: "Nerve symptoms, radiating pain",         href: "/programs/strengthen", img: "/images/conditions/sciatica.png",              video: "/videos/conditions/sciatica.mp4" },
  { name: "Rheumatoid Arthritis",      note: "Autoimmune joint inflammation",          href: "/programs/manage",  img: "/images/conditions/rheumatoid-arthritis.png",  video: "/videos/conditions/rheumatoid-arthritis.mp4" },
  { name: "Osteoporosis",              note: "Bone density, fracture risk",            href: "/programs/strengthen", img: "/images/conditions/osteoporosis.png",          video: "/videos/conditions/osteoporosis.mp4" },
  { name: "Frozen Shoulder",           note: "Stiffness, range of motion loss",        href: "/programs/manage",  img: "/images/conditions/frozen-shoulder.png",       video: "/videos/conditions/frozen-shoulder.mp4" },
  { name: "Cervical (Neck) Pain",      note: "Posture-driven cervical strain",         href: "/programs/manage",  img: "/images/conditions/cervical-pain.png",         video: "/videos/conditions/cervical-pain.mp4" },
  { name: "Post-menopausal Bone Loss", note: "Density support after menopause",        href: "/programs/prevent", img: "/images/conditions/post-meno.png",             video: "/videos/conditions/post-meno.mp4" },
  { name: "Joint Stiffness",           note: "Morning stiffness, reduced mobility",    href: "/programs/manage",  img: "/images/conditions/joint-stiffness.png",       video: "/videos/conditions/joint-stiffness.mp4" },
  { name: "Hip Pain",                  note: "Hip OA, post-replacement, instability",  href: "/programs/strengthen", img: "/images/conditions/hip-pain.png",              video: "/videos/conditions/hip-pain.mp4" },
];

function ConditionCard({
  condition,
  index,
  isInView,
  prefersReduced,
}: {
  condition: (typeof conditions)[number];
  index: number;
  isInView: boolean;
  prefersReduced: boolean | null;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const hasVideo = Boolean(condition.video);

  // Anatomy video plays on hover (pointer devices). On touch there's no hover,
  // so a tap simply opens the linked track — no video, no extra load.
  const onEnter = useCallback(() => {
    const v = videoRef.current;
    if (!v || prefersReduced || !condition.video) return;
    if (!v.src) v.src = asset(condition.video);
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [condition.video, prefersReduced]);

  const onLeave = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setVideoReady(false);
  }, []);

  return (
    <motion.div
      className="snap-start shrink-0 w-[80vw] min-[480px]:w-[300px] sm:w-[290px] lg:w-[320px] h-[200px] sm:h-[230px] lg:h-[260px] relative overflow-hidden rounded-2xl group"
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease, delay: Math.min(index, 6) * 0.05 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Link href={condition.href} className="block w-full h-full absolute inset-0">

        {/* Poster image — grayscale; reveals colour (no-video cards) or fades to video on hover. */}
        <Image
          src={condition.img}
          alt={condition.name}
          fill
          sizes="(max-width: 640px) 78vw, 320px"
          className={
            hasVideo
              ? `object-cover grayscale absolute inset-0 transition-opacity duration-700 ${videoReady ? "opacity-0" : "opacity-100"}`
              : "object-cover grayscale group-hover:grayscale-0 absolute inset-0 transition-[filter] duration-700"
          }
          priority={index < 4}
        />

        {/* Anatomy video — src set lazily on first hover, visible only once playing. */}
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="none"
          onPlaying={() => setVideoReady(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
        />

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to top,
              rgba(10,10,8,0.9) 0%,
              rgba(10,10,8,0.3) 55%,
              transparent 100%)`,
          }}
        />

        {/* Clay accent glow — appears with video */}
        <div
          aria-hidden
          className={`absolute inset-0 z-10 transition-opacity duration-700 pointer-events-none ${videoReady ? "opacity-100" : "opacity-0"}`}
          style={{ background: "radial-gradient(ellipse at 50% 110%, rgba(196,113,74,0.2) 0%, transparent 55%)" }}
        />

        {/* Index */}
        <span className="absolute top-3 right-3 md:top-4 md:right-4 z-20 font-display text-[10px] md:text-[11px] font-medium text-white/30 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* "Anatomy view" hint — desktop hover only (no hover affordance on touch) */}
        <div className="hidden md:flex absolute top-4 left-4 z-20 items-center gap-1.5
          opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0
          transition-all duration-500">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C4714A] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.12em] font-medium text-white/70">
            Anatomy view
          </span>
        </div>

        {/* Text content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-20">
          <p className="font-display font-semibold text-white leading-tight text-[0.95rem] md:text-base transition-transform duration-500 group-hover:-translate-y-1">
            {condition.name}
          </p>
          <p className="text-white/55 leading-snug text-[0.8rem] mt-1">
            {condition.note}
          </p>
          <div className="mt-3 h-px bg-white/15 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white/50 rounded-full"
              style={{ originX: 0 }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.5, ease, delay: Math.min(index, 6) * 0.05 + 0.35 }}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ConditionsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();

  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 340), behavior: "smooth" });
  };

  return (
    <section className="section-py bg-white overflow-hidden">
      <div className="container-site" ref={ref}>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-12">
          <div className="max-w-2xl">
            <motion.p
              className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C4714A] mb-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
            >
              Conditions we treat
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-ink leading-tight"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
                initial={prefersReduced ? { opacity: 0 } : { y: "100%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.7, ease, delay: 0.1 }}
              >
                Built for the conditions<br />
                you actually live with.
              </motion.h2>
            </div>
          </div>

          <motion.p
            className="text-ink-soft text-sm max-w-xs leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.25 }}
          >
            A bird&rsquo;s-eye view of what we work with. Swipe through &mdash; each links to the
            right specialist track.
          </motion.p>
        </div>

        {/* ── Swipe carousel ──────────────────────────────────── */}
        <div className="relative">
          <div
            ref={trackRef}
            onScroll={updateArrows}
            className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {conditions.map((c, i) => (
              <ConditionCard
                key={c.name}
                condition={c}
                index={i}
                isInView={isInView}
                prefersReduced={prefersReduced}
              />
            ))}
            {/* trailing spacer so the last card can snap fully into view */}
            <span aria-hidden className="shrink-0 w-px" />
          </div>

          {/* Left edge fade + arrow (appears once scrolled) */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent transition-opacity duration-300 ${atStart ? "opacity-0" : "opacity-100"}`}
          />
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            aria-label="Previous conditions"
            className={`hidden sm:flex absolute left-1 top-1/2 -translate-y-1/2 z-30 w-10 h-10 items-center justify-center rounded-full bg-white text-ink shadow-lifted ring-1 ring-black/5 transition-all duration-300 hover:bg-bone-deep ${atStart ? "opacity-0 pointer-events-none -translate-x-2" : "opacity-100"}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Right edge fade + arrow (the "there's more" hint) */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent transition-opacity duration-300 ${atEnd ? "opacity-0" : "opacity-100"}`}
          />
          <motion.button
            type="button"
            onClick={() => scrollByAmount(1)}
            aria-label="See more conditions"
            className={`absolute right-1 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white text-ink shadow-lifted ring-1 ring-black/5 transition-opacity duration-300 hover:bg-bone-deep ${atEnd ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            animate={prefersReduced || atEnd ? {} : { x: [0, 4, 0] }}
            transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
