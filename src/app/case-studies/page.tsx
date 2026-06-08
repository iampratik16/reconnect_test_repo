import type { Metadata } from "next";
import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import CTASection from "@/components/CTASection";
import { SpineSvg } from "@/components/AnatomicalArt";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real member journeys, soon. We're putting together the case studies behind Reconnect's rheumatologist-led, personalised strength programs.",
};

/* ── Page ──────────────────────────────────────────────────── */

export default function CaseStudiesPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          PLACEHOLDER — case studies coming soon
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-bone pt-32 md:pt-40 pb-24 md:pb-32 min-h-[70vh] flex items-center">
        <SpineSvg className="watermark text-ink right-[-120px] top-[80px] w-[480px] hidden md:block" />

        <div className="container-site relative">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Case studies</Eyebrow>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-hero text-ink mt-6 leading-[0.95]">
                Real journeys, <span className="serif-italic text-clay">coming soon.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-body-lg text-ink-soft mt-6 max-w-xl">
                Some amazing case studies are yet to come. We&rsquo;re putting together the
                real stories behind Reconnect — the members, the diagnoses, and the strength
                they rebuilt — so you can see exactly how the program plays out over time.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 inline-flex items-center gap-3 rounded-pill bg-calcium border border-line px-5 py-3">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-clay opacity-60 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-clay" />
                </span>
                <span className="text-body-sm font-medium text-ink">
                  In the works — check back shortly
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button variant="clay" size="lg" href="/assessment" arrow>
                  Take the free assessment
                </Button>
                <Button variant="ghost" size="lg" href="/reconnect-team">
                  Meet the team
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════════════════════ */}
      <CTASection
        headline="Want to be one of our first stories?"
        description="Book a consultation to start your own program with Dr. Shruthi’s team."
        primaryHref="/contact"
        primaryLabel="Book consultation"
        variant="sage"
      />
    </>
  );
}
