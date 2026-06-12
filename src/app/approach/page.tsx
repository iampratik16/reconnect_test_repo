import type { Metadata } from "next";
import Link from "next/link";
import { asset } from "@/lib/asset";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import Stagger from "@/components/Stagger";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Pill from "@/components/Pill";
import CTASection from "@/components/CTASection";
import {
  KneeSvg,
  SpineSvg,
  SkeletonSvg,
} from "@/components/AnatomicalArt";
import CareModel from "./_components/CareModel";

export const metadata: Metadata = {
  title: "Programs & How It Works",
  description:
    "Three condition-focused tracks — Prevent, Manage, Strengthen — and the doctor-led, four-pillar journey that runs under every one. Assessment first, then a program built around your exact condition.",
};

/* ── Data ──────────────────────────────────────────────────── */

const tracks = [
  {
    slug: "prevent",
    title: "Prevent",
    headline: "Stay ahead of the joints and bones you’ll need at 70.",
    description:
      "For early signs, family history, or age-related risk. Build strength and bone density before problems start.",
    tags: ["Early arthritis", "Bone health", "40+"],
    image: "/kettlebell-squat.jpg",
    imageAlt: "TODO: replace with Dr. Shruthi's consented client image — proactive strength session.",
    icon: SkeletonSvg,
  },
  {
    slug: "manage",
    title: "Manage",
    headline: "Work around the pain. Then work it down.",
    description:
      "For those living with arthritis, joint pain, or disc issues. Reduce flare-ups and build resilience.",
    tags: ["Active arthritis", "Joint pain", "Back pain"],
    image: "/mat-stretching.jpg",
    imageAlt: "TODO: replace with consented in-clinic photo for the Manage track.",
    icon: SpineSvg,
  },
  {
    slug: "strengthen",
    title: "Strengthen",
    headline: "Rebuild real strength in your bones and joints — safely, with oversight.",
    description:
      "For severe degeneration, low bone density, or rebuilding after a setback. Rebuild real strength safely under close medical guidance.",
    tags: ["Bone & joint strength", "Severe OA", "Strength rebuild"],
    image: "/trainer-guided-exercise.jpg",
    imageAlt: "TODO: replace with consented supervised strength-session photo for the Strengthen track.",
    icon: KneeSvg,
  },
] as const;

const conditionGroups = [
  {
    title: "Joints & Arthritis",
    image: "/conditions/joints.png",
    items: [
      { name: "Knee osteoarthritis", track: "/programs/manage" },
      { name: "Rheumatoid arthritis", track: "/programs/manage" },
      { name: "Joint pain & stiffness", track: "/programs/manage" },
      { name: "fibromyalgia", track: "/programs/manage" },
      { name: "spondylitis", track: "/programs/manage" },
    ],
  },
  {
    title: "Spine & Back",
    image: "/conditions/spine.png",
    items: [
      { name: "Chronic back pain", track: "/programs/manage" },
      { name: "Disc bulge / herniation", track: "/programs/strengthen" },
      { name: "Sciatica", track: "/programs/manage" },
      { name: "Cervical (neck) pain", track: "/programs/manage" },
      { name: "Posture-related pain", track: "/programs/prevent" },
    ],
  },
  {
    title: "Bone Health",
    image: "/conditions/bone.png",
    items: [
      { name: "Osteoporosis", track: "/programs/strengthen" },
      { name: "Osteopenia", track: "/programs/manage" },
      { name: "Post-menopausal bone loss", track: "/programs/prevent" },
      { name: "Fracture-risk strength building", track: "/programs/prevent" },
    ],
  },
  {
    title: "Strength & Rebuild",
    image: "/conditions/strength.png",
    items: [
      { name: "helps to treat fibromyalgia", track: "/programs/strengthen" },
      { name: "Deconditioning / sarcopenia", track: "/programs/manage" },
      { name: "loose weight", track: "/programs/strengthen" },
      { name: "prolonged immobility", track: "/programs/strengthen" },
    ],
  },
] as const;

const expectation = [
  {
    when: "Week 1",
    title: "Assessment & baseline",
    body: "Medical intake done. Pain mapped. A program built for your body — not a generic template.",
  },
  {
    when: "Weeks 4–6",
    title: "Pain quietening",
    body: "Supporting muscles starting to switch back on. Most members notice the first meaningful drop in daily pain.",
  },
  {
    when: "Month 2",
    title: "Muscles activating — start loading",
    body: "Now the body can take load. Standing strength, real-life patterns, full-body work that protects the joint.",
  },
  {
    when: "Month 3",
    title: "Resilience & routine",
    body: "Higher capacity, fewer flare-ups, a routine you can carry on your own. Medical reassessment to confirm.",
  },
] as const;

/* ── Page ──────────────────────────────────────────────────── */

export default function ApproachPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1) HERO — program architecture diagram (the new opening)
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-bone pt-28 md:pt-40 pb-20 md:pb-28">
        <SkeletonSvg className="watermark text-ink right-[-120px] top-[60px] w-[520px] hidden md:block" />

        <div className="container-site relative">
          <Reveal>
            <Eyebrow>Programs &amp; how it works</Eyebrow>
          </Reveal>

          <div className="mt-10">
            <CareModel />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3) THE THREE TRACKS — alternating split rows
          ═══════════════════════════════════════════════════════ */}
      <section id="three-tracks" className="section-py bg-bone">
        <div className="container-site mb-16 md:mb-24">
          <SectionHeader
            eyebrowNumber="(01)"
            eyebrow="The Tracks"
            title="Choose your starting point. We’ll do the rest."
            description="Three condition-focused tracks. Each one is personalised after your assessment."
            align="left"
          />
        </div>

        <div className="container-site flex flex-col gap-24 md:gap-32">
          {tracks.map((track, i) => {
            const reverse = i % 2 === 1;
            return (
              <Reveal key={track.slug}>
                <article
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Media */}
                  <div className="lg:col-span-7 relative">
                    <div className="xray-glow">
                      <div className="relative rounded-[20px] overflow-hidden shadow-soft">
                        {/* TODO: swap for Dr. Shruthi's consented patient/clinic photography */}
                        <img
                          src={asset(track.image)}
                          alt={track.imageAlt}
                          loading="lazy"
                          className="w-full h-[360px] md:h-[460px] object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Copy */}
                  <div className="lg:col-span-5 flex flex-col gap-5">
                    <h3 className="text-h2 font-display text-ink">{track.title}</h3>
                    <p className="serif-italic text-h4 text-ink-soft">{track.headline}</p>
                    <p className="text-body text-ink-soft">{track.description}</p>

                    <div className="flex flex-wrap gap-2 mt-1">
                      {track.tags.map((tag) => (
                        <Pill key={tag} variant="sage">
                          {tag}
                        </Pill>
                      ))}
                    </div>

                    <div className="mt-4">
                      <Button
                        variant="sage-outline"
                        size="md"
                        href={`/programs/${track.slug}`}
                        arrow
                      >
                        Explore {track.title}
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4) CONDITIONS WE TREAT — categorized columns
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone-deep" id="conditions">
        <SectionHeader
          eyebrowNumber="(02)"
          eyebrow="Conditions we treat"
          title="Built for the conditions you actually live with."
          description="Find what you’re dealing with — every item links to the track designed for it."
          align="left"
          className="mb-14 md:mb-20"
        />

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {conditionGroups.map((group) => {
            // Dominant track for the category — a quiet orientation tag where the
            // floating anatomical icon used to be. Computed, so it stays correct
            // if the condition lists change.
            const counts = group.items.reduce<Record<string, number>>((acc, it) => {
              const name = it.track.split("/").pop() ?? "";
              acc[name] = (acc[name] ?? 0) + 1;
              return acc;
            }, {});
            const topTrack = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
            const trackLabel = topTrack.charAt(0).toUpperCase() + topTrack.slice(1);

            return (
              <div
                key={group.title}
                className="glow-card hover-lift bg-calcium rounded-card shadow-card hairline overflow-hidden flex flex-col h-full"
              >
                {/* Header band — a crisp, consistent anatomical motif. The four
                    share one blue treatment so they read as a designed set. */}
                <div className="relative aspect-[16/9] bg-bone-deep overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(group.image)}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover select-none"
                    draggable={false}
                  />
                  {/* Soft fade into the card so the band doesn't end with a hard seam */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
                    style={{ background: "linear-gradient(180deg, rgba(252,252,253,0) 0%, var(--color-calcium) 100%)" }}
                  />
                </div>

                <div className="flex flex-col gap-5 p-7 flex-1">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-h4 font-display text-ink">{group.title}</h3>
                    <span className="self-start text-caption font-medium text-sage bg-sage-tint rounded-pill px-3 py-1">
                      Mostly {trackLabel}
                    </span>
                  </div>
                  <div className="hairline-b" />
                  <ul className="flex flex-col gap-3">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.track}
                          className="group flex items-center justify-between gap-3 text-body-sm text-ink-soft hover:text-ink transition-colors duration-200"
                        >
                          <span>{item.name}</span>
                          <span className="text-clay opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </Stagger>
      </Section>


      {/* ═══════════════════════════════════════════════════════
          10) EXPECTATION TIMELINE — week 1, 4-6, month 2, month 3
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone-deep">
        <SectionHeader
          eyebrowNumber="(06)"
          eyebrow="What to expect"
          title="The 16-week shape."
          align="left"
          className="mb-16"
        />

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
          {expectation.map((e, i) => (
            <div
              key={e.when}
              className="relative glow-card bg-calcium rounded-[18px] p-6 md:p-7 flex flex-col gap-3 h-full"
            >
              <div className="flex items-center justify-between">
                <span className="text-eyebrow text-clay">{e.when}</span>
                <span className="text-h4 font-display text-line">0{i + 1}</span>
              </div>
              <div className="hairline-b" />
              <h4 className="text-h4 font-display text-ink">{e.title}</h4>
              <p className="text-body-sm text-ink-soft">{e.body}</p>
            </div>
          ))}
        </Stagger>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          11) FINAL CTA
          ═══════════════════════════════════════════════════════ */}
      <CTASection
        headline="The right track starts with a conversation."
        description="Book a consultation — we’ll confirm the right program for your body and answer your questions."
        primaryHref="/contact"
        primaryLabel="Book consultation"
        variant="sage"
      />
    </>
  );
}
