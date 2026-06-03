import type { Metadata } from "next";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import Stagger from "@/components/Stagger";
import Button from "@/components/Button";
import CTASection from "@/components/CTASection";
import { SkeletonSvg, SpineSvg } from "@/components/AnatomicalArt";
import StickyJourneySequence from "./_components/StickyJourneySequence";
import WhyNotGenericApp from "./_components/WhyNotGenericApp";
import ComparisonSection from "./_components/ComparisonSection";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "A doctor-led, personalised process. Assessment first, then a program built around your exact condition — exercise, nutrition, and mind coaching integrated into one journey.",
};

/* ── Data ──────────────────────────────────────────────────── */

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

export default function HowItWorksPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1) HERO
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-bone pt-36 md:pt-44 pb-24 md:pb-32">
        <SkeletonSvg className="watermark text-ink right-[-120px] top-[60px] w-[520px] hidden md:block" />

        <div className="container-site relative">
          <div className="xray-glow max-w-4xl">
            <Reveal>
              <Eyebrow>How it works</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-hero text-ink mt-6">
                A doctor-led process,{" "}
                <span className="serif-italic text-clay">built around you.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg text-ink-soft mt-8 max-w-2xl">
                Assessment first. Then a program shaped around your exact condition,
                history, and life — exercise, nutrition, and mind coaching integrated into
                one connected journey. Care is patient-to-patient. Nothing is generic.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button variant="clay" size="lg" href="/assessment" arrow>
                  Take free assessment
                </Button>
                <Button variant="ghost" size="lg" href="#the-journey">
                  See the four steps
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2) BIG NUMBERED STICKY-SCROLL SEQUENCE
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone-deep" id="the-journey">
        <SectionHeader
          eyebrowNumber="(01)"
          eyebrow="The connected journey"
          title="Four pillars. Doctor-led, personalised, and always in this order."
          description="Each pillar is integrated — not bolted on. Assessment governs all of them. Exercise respects your pain. Nutrition fights it. Mind coaching holds it together."
          align="left"
          className="mb-16 md:mb-20"
        />

        <StickyJourneySequence />
      </Section>

      {/* ═══════════════════════════════════════════════════════
          3) "WHY NOT JUST A FREE APP?" CALLOUT
          ═══════════════════════════════════════════════════════ */}
      <WhyNotGenericApp />

      {/* ═══════════════════════════════════════════════════════
          4) RECONNECT vs GENERIC APPS COMPARISON
          ═══════════════════════════════════════════════════════ */}
      <ComparisonSection />

      {/* ═══════════════════════════════════════════════════════
          4) EXPECTATION TIMELINE — week 1, 4-6, month 2, month 3
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone-deep">
        <SectionHeader
          eyebrowNumber="(03)"
          eyebrow="What to expect"
          title="The 12-week shape."
          description="Measured language — trajectories, not promises. Outcomes always sit alongside, not instead of, your existing medical care."
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

        <p className="text-caption text-ink-soft italic mt-8 max-w-2xl border-l border-line pl-5">
          Reconnect is non-surgical. We coordinate with your treating doctor and never modify
          prescriptions. Stories shared across the site are with explicit consent; outcomes
          vary by individual.
        </p>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          7) FINAL CTA
          ═══════════════════════════════════════════════════════ */}
      <CTASection
        headline="The assessment is where the personalisation begins."
        description="Two minutes. A handful of questions. We confirm the right track and shape the program around your body."
        primaryHref="/assessment"
        primaryLabel="Take free assessment"
        secondaryHref="/contact"
        secondaryLabel="Book consultation"
        variant="sage"
      />
    </>
  );
}
