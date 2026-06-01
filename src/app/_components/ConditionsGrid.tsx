"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useCallback, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const conditions = [
  { name: "Knee Osteoarthritis",       note: "Stairs, getting up, walking distance",  href: "/programs/manage",  img: "/images/conditions/knee-oa.png",              video: "",                                            col: 2, row: 2 },
  { name: "Chronic Back Pain",         note: "Posture, stiffness, daily ache",         href: "/programs/manage",  img: "/images/conditions/back-pain.png",             video: "/videos/conditions/back-pain.mp4",            col: 1, row: 1 },
  { name: "Disc Bulge / Sciatica",     note: "Nerve symptoms, radiating pain",         href: "/programs/recover", img: "/images/conditions/sciatica.png",              video: "/videos/conditions/sciatica.mp4",             col: 1, row: 1 },
  { name: "Rheumatoid Arthritis",      note: "Autoimmune joint inflammation",          href: "/programs/manage",  img: "/images/conditions/rheumatoid-arthritis.png",  video: "/videos/conditions/rheumatoid-arthritis.mp4", col: 1, row: 1 },
  { name: "Osteoporosis",              note: "Bone density, fracture risk",            href: "/programs/recover", img: "/images/conditions/osteoporosis.png",          video: "/videos/conditions/osteoporosis.mp4",         col: 1, row: 1 },
  { name: "Frozen Shoulder",           note: "Stiffness, range of motion loss",        href: "/programs/manage",  img: "/images/conditions/frozen-shoulder.png",       video: "/videos/conditions/frozen-shoulder.mp4",      col: 2, row: 1 },
  { name: "Cervical (Neck) Pain",      note: "Posture-driven cervical strain",         href: "/programs/manage",  img: "/images/conditions/cervical-pain.png",         video: "/videos/conditions/cervical-pain.mp4",        col: 1, row: 1 },
  { name: "Post-menopausal Bone Loss", note: "Density support after menopause",        href: "/programs/prevent", img: "/images/conditions/post-meno.png",             video: "/videos/conditions/post-meno.mp4",            col: 1, row: 1 },
  { name: "Joint Stiffness",           note: "Morning stiffness, reduced mobility",    href: "/programs/manage",  img: "/images/conditions/joint-stiffness.png",       video: "/videos/conditions/joint-stiffness.mp4",      col: 1, row: 1 },
  { name: "Hip Pain",                  note: "Hip OA, post-replacement, instability",  href: "/programs/recover", img: "/images/conditions/hip-pain.png",              video: "/videos/conditions/hip-pain.mp4",             col: 1, row: 1 },
];

function ConditionTile({
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
  const isHero = condition.col === 2 && condition.row === 2;
  const isWide = condition.col === 2 && condition.row === 1;
  const colClass = condition.col === 2 ? "md:col-span-2" : "";
  const rowClass = condition.row === 2 ? "md:row-span-2" : "";
  const minH = isHero ? "min-h-[480px]" : isWide ? "min-h-[240px]" : "min-h-[260px]";

  const hasVideo = Boolean(condition.video);

  // Load + play video on hover, pause+reset on leave
  const onEnter = useCallback(() => {
    const v = videoRef.current;
    if (!v || prefersReduced || !condition.video) return;
    if (!v.src) v.src = condition.video; // lazy-load src only on first hover
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
      className={`${colClass} ${rowClass} ${minH} relative overflow-hidden rounded-2xl group`}
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay: index * 0.07 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Link href={condition.href} className="block w-full h-full absolute inset-0">

        {/* ── Poster image. Cards with a video: grayscale, fades out when video plays.
               Cards without a video (e.g. Knee OA): grayscale that reveals full colour on hover. ── */}
        <Image
          src={condition.img}
          alt={condition.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          className={
            hasVideo
              ? `object-cover grayscale absolute inset-0 transition-opacity duration-700 ${videoReady ? "opacity-0" : "opacity-100"}`
              : "object-cover grayscale group-hover:grayscale-0 absolute inset-0 transition-[filter] duration-700"
          }
          priority={index < 3}
        />

        {/* ── Veo video — src set lazily on first hover, visible only once playing ── */}
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="none"
          onPlaying={() => setVideoReady(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
        />

        {/* Dark gradient overlay — same for both states */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to top,
              rgba(10,10,8,0.9) 0%,
              rgba(10,10,8,0.3) 50%,
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
        <span className="absolute top-5 right-5 z-20 font-display text-[11px] font-medium text-white/30 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* "See anatomy" hint — on hover */}
        <div className="absolute top-5 left-5 z-20 flex items-center gap-1.5
          opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0
          transition-all duration-500">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C4714A] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.12em] font-medium text-white/70">
            Anatomy view
          </span>
        </div>

        {/* Text content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-20">
          <p
            className="font-display font-semibold text-white leading-tight mb-1 transition-transform duration-500 group-hover:-translate-y-1"
            style={{ fontSize: isHero ? "clamp(1.2rem, 2.5vw, 1.6rem)" : "1rem" }}
          >
            {condition.name}
          </p>
          <p className="text-white/55 leading-snug text-[0.8rem] mt-0.5">
            {condition.note}
          </p>

          {/* Animated underline */}
          <div className="mt-3 h-px bg-white/15 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white/50 rounded-full"
              style={{ originX: 0 }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.5, ease, delay: index * 0.07 + 0.4 }}
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

  return (
    <section className="section-py bg-white">
      <div className="container-site" ref={ref}>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
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
            Hover any card to see the anatomy in motion. Find your condition — each links to the right specialist track.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[minmax(200px,auto)]">
          {conditions.map((c, i) => (
            <ConditionTile
              key={c.name}
              condition={c}
              index={i}
              isInView={isInView}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-ink-soft text-sm">
            Not sure which track?{" "}
            <Link href="/assessment" className="text-ink font-medium underline underline-offset-4 hover:text-[#C4714A] transition-colors">
              Take the free assessment →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
