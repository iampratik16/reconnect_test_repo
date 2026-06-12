import type { Metadata } from "next";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import Stagger from "@/components/Stagger";
import Button from "@/components/Button";
import CTASection from "@/components/CTASection";
import { SkeletonSvg } from "@/components/AnatomicalArt";
import PricingTiers from "@/components/PricingTiers";
import FourPillarsShowcase from "@/components/FourPillarsShowcase";
import { plans, featureMatrix, cumulativeFeatures } from "@/lib/content/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Two monthly plans, both including a medical assessment and a personalised program. Basic (most popular) and Premium, with a minimum 4-month program.",
};

/* ── Data ──────────────────────────────────────────────────── */

/**
 * Comparison table rows — derived from the canonical feature matrix so the
 * yes/no grid stays in sync with the additive card lists.
 */
const allFeatures = featureMatrix();

/* ── Page ──────────────────────────────────────────────────── */

export default function PricingPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1) HERO
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-bone pt-36 md:pt-44 pb-20 md:pb-24">
        <SkeletonSvg className="watermark text-ink right-[-140px] top-[60px] w-[520px] hidden md:block" />

        <div className="container-site relative">
          <div className="xray-glow max-w-4xl">
            <Reveal>
              <Eyebrow>Pricing</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-hero text-ink mt-6">
                Plans that fit{" "}
                <span className="serif-italic text-clay">your needs.</span>
              </h1>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2) FOUR PILLARS SHOWCASE
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-h2 font-display text-ink mb-4">
              What you'll use every day.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg text-ink-soft mb-12 max-w-2xl">
              Before you choose a plan, here's what's actually inside your program.
            </p>
          </Reveal>

          <FourPillarsShowcase variant="full" />

          <Reveal delay={0.3}>
            <p className="text-center text-caption text-ink-soft mt-12">
              Learn what's in each plan ↓
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          3) PRICING TIERS
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone">
        <PricingTiers ctaLabel="Take the free assessment" ctaHref="/assessment" />
      </Section>

      {/* ═══════════════════════════════════════════════════════
          5) FEATURE COMPARISON TABLE
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone-deep">
        <SectionHeader
          eyebrowNumber="(02)"
          eyebrow="Compare plans"
          title="What’s in each plan."
          align="left"
          className="mb-12"
        />

        <Reveal>
          <div className="bg-calcium rounded-[20px] overflow-hidden shadow-card hairline">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-line">
                    <th className="p-5 lg:p-7 text-eyebrow text-ink-soft w-[34%]">Feature</th>
                    {plans.map((p) => (
                      <th key={p.name} className="p-5 lg:p-7">
                        <div className="flex flex-col gap-1">
                          <span className="text-eyebrow text-ink-soft">{p.name}</span>
                          <span className="text-h4 font-display text-ink">
                            ₹{p.priceTotal.toLocaleString("en-IN")}
                            <span className="text-caption text-ink-soft font-normal"> / {p.months} mo</span>
                          </span>
                          {p.popular && (
                            <span className="text-caption text-clay-dark font-medium">Most chosen</span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allFeatures.map((row, ri) => {
                    const isHighlighted = plans.some((p) =>
                      p.highlightedFeatures?.includes(row.label)
                    );
                    return (
                      <tr
                        key={row.label}
                        className={ri !== allFeatures.length - 1 ? "border-b border-line" : ""}
                      >
                        <td
                          className={`p-5 lg:p-7 text-body-sm ${
                            isHighlighted ? "font-bold text-ink" : "text-ink"
                          }`}
                        >
                          <span className="flex items-center justify-between">
                            <span>{row.label}</span>
                            {isHighlighted && <span className="ml-2 text-lg" style={{ color: "#D4A574" }}>★</span>}
                          </span>
                        </td>
                        {row.byPlan.map((on, ci) => (
                          <td key={ci} className="p-5 lg:p-7">
                            <Check on={on} />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                  <tr className="border-t border-line bg-bone/40">
                    <td className="p-5 lg:p-7"></td>
                    {plans.map((p) => (
                      <td key={p.name} className="p-5 lg:p-7">
                        <Button
                          variant={p.popular ? "clay" : "sage-outline"}
                          size="md"
                          href="/assessment"
                          arrow
                        >
                          Choose {p.name}
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile stack */}
            <div className="md:hidden flex flex-col divide-y divide-line">
              {plans.map((p) => (
                <div key={p.name} className="p-6 flex flex-col gap-4">
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-h4 font-display text-ink">{p.name}</h4>
                    <p className="text-h4 font-display text-ink">
                      ₹{p.priceTotal.toLocaleString("en-IN")}
                      <span className="text-caption text-ink-soft font-normal"> / {p.months} mo</span>
                    </p>
                  </div>
                  {p.popular && (
                    <span className="self-start text-caption text-clay-dark bg-clay-soft rounded-pill px-3 py-1">
                      Most chosen
                    </span>
                  )}
                  <ul className="flex flex-col gap-2 pt-2">
                    {cumulativeFeatures(p).map((f) => {
                      const isHighlighted = p.highlightedFeatures?.includes(f);
                      return (
                        <li
                          key={f}
                          className={`flex items-start gap-3 text-body-sm ${
                            isHighlighted ? "font-bold text-ink" : "text-ink"
                          }`}
                        >
                          <Check on={true} />
                          <span className="flex-1 flex items-center justify-between">
                            <span>{f}</span>
                            {isHighlighted && <span className="ml-2 text-lg" style={{ color: "#D4A574" }}>★</span>}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="pt-2">
                    <Button
                      variant={p.popular ? "clay" : "sage-outline"}
                      size="md"
                      href="/assessment"
                      arrow
                      className="w-full justify-center"
                    >
                      Choose {p.name}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          7) FINAL CTA
          ═══════════════════════════════════════════════════════ */}
      <CTASection
        headline="Start with a consultation — pick the plan after."
        description="Book a consultation. We’ll confirm the right program and the right plan for your body."
        primaryHref="/contact"
        primaryLabel="Book consultation"
        variant="sage"
      />
    </>
  );
}

/* ── Sub-components ────────────────────────────────────────── */

function Check({ on, variant = "light" }: { on: boolean; variant?: "light" | "dark" }) {
  if (on) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`shrink-0 mt-0.5 ${variant === "dark" ? "text-clay-soft" : "text-clay"}`}
        aria-label="Included"
      >
        <path d="M4 10l4 4 8-8" />
      </svg>
    );
  }
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 mt-0.5 ${
        variant === "dark" ? "text-bone/30" : "text-ink-soft/40"
      }`}
      aria-label="Not included"
    >
      <path d="M6 6l8 8M14 6l-8 8" />
    </svg>
  );
}
