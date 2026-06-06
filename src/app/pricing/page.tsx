import type { Metadata } from "next";
import { asset } from "@/lib/asset";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import Stagger from "@/components/Stagger";
import Button from "@/components/Button";
import Accordion from "@/components/Accordion";
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

const pricingFaqs = [
  {
    q: "How does billing work?",
    a: "Both plans are billed monthly, with a minimum program duration of 4 months. You're charged at the start of each cycle.",
  },
  {
    q: "Can I pause or cancel my plan?",
    a: "Yes — both. Pause for travel, surgery, or any other reason; cancel any time before your next billing cycle. We don't believe in trapping members into plans that don't fit their life.",
  },
  {
    q: "What exactly is included in the medical assessment?",
    a: "A rheumatologist-led intake covering your history, current medications, recent imaging, and a pain map by joint and region. This is what every program is built on — without it, nothing else starts.",
  },
  {
    q: "Do I need a referral from my doctor?",
    a: "No referral required. If you're already under specialist care, we ask for context and coordinate with your treating doctor where appropriate.",
  },
  {
    q: "Is Reconnect a replacement for my current medical treatment?",
    a: "No. Reconnect works alongside your existing medical care. We don't modify prescriptions. As pain and function improve, your treating physician may choose to taper medication — that decision is theirs.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes. Many members start on Basic and move up to Premium as they progress, or step down to maintenance after their 16-week cycle. Switch any time with your coach.",
  },
];

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
            <Reveal delay={0.2}>
              <p className="text-body-lg text-ink-soft mt-8 max-w-2xl">
                Both plans include a medical assessment and a personalised program, billed
                monthly with a minimum 4-month program.
              </p>
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

        <p className="text-caption text-ink-soft mt-8 text-center max-w-[64rem] mx-auto">
          Minimum program duration: 4 months. Prices in INR; GST extra where applicable. The
          assessment is free and runs before you commit to any plan.
        </p>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          4) VALUE JUSTIFICATION
          ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-bone section-py overflow-hidden">
        <div className="container-site relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrowNumber="(01)"
                eyebrow="What you’re paying for"
                title="Why this isn’t the price of a fitness app."
                align="left"
              />
              <p className="text-body text-ink-soft mt-6 max-w-md">
                Generic apps cost less because they give everyone the same thing. Reconnect costs
                more because the program is built for the body in front of us — by a rheumatologist,
                with medical oversight running underneath.
              </p>
            </div>

            <div className="lg:col-span-7">
              <Stagger className="flex flex-col gap-5" staggerDelay={0.08}>
                {/* Featured: the medical backbone — the reason the price is what it is. */}
                <div className="relative bg-clay-soft rounded-[16px] p-7 border border-clay/25 flex flex-col gap-3">
                  <span className="inline-flex items-center gap-2 text-eyebrow text-clay">
                    <Check on />
                    Medically backed
                  </span>
                  <h4 className="text-h3 font-display text-ink">
                    Doctor-designed, with medical oversight underneath.
                  </h4>
                  <p className="text-body-sm text-ink-soft max-w-xl">
                    Every plan starts with a rheumatologist-led assessment — not a chatbot
                    intake — and a clinician stays accountable for it the whole way through.
                    This is the difference a generic app structurally cannot offer.
                  </p>
                </div>

                {/* The three supporting pillars — each ticked, equal weight. */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {[
                    {
                      label: "Personalised to your body",
                      body: "Region-split, age-scaled, severity-aware. Nothing is templated.",
                    },
                    {
                      label: "Relief before strength",
                      body: "We bring relief first, then build the strength that keeps it away. Adjusted week-to-week.",
                    },
                    {
                      label: "Structured 16-week roadmap",
                      body: "Direction, milestones, reassessment. The roadmap a generic app can’t give.",
                    },
                  ].map((v) => (
                    <div
                      key={v.label}
                      className="bg-calcium rounded-[16px] p-6 hairline flex flex-col gap-2 h-full"
                    >
                      <span className="text-clay">
                        <Check on />
                      </span>
                      <h4 className="text-h4 font-display text-ink mt-1">{v.label}</h4>
                      <p className="text-body-sm text-ink-soft">{v.body}</p>
                    </div>
                  ))}
                </div>
              </Stagger>

              {/* Outcome quote */}
              <Reveal delay={0.2}>
                <blockquote className="mt-8 border-l-2 border-clay pl-6">
                  <p className="serif-italic text-h4 text-ink">
                    “I was told I needed a knee replacement. After 16 weeks with Reconnect, my pain
                    dropped from 8 to 2.”
                  </p>
                  <footer className="text-caption text-ink-soft mt-3">
                    — Rajesh Sharma, 58 · Knee osteoarthritis · Mumbai
                  </footer>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

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
                            isHighlighted ? "font-semibold text-ink" : "text-ink"
                          }`}
                        >
                          <span className="flex items-center justify-between">
                            <span>{row.label}</span>
                            {isHighlighted && <span className="text-clay ml-2 text-lg">★</span>}
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
                            isHighlighted ? "font-semibold text-ink" : "text-ink"
                          }`}
                        >
                          <Check on={true} />
                          <span className="flex-1 flex items-center justify-between">
                            <span>{f}</span>
                            {isHighlighted && <span className="text-clay ml-2 text-lg">★</span>}
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
          6) PRICING FAQ
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrowNumber="(03)"
              eyebrow="Pricing questions"
              title="The ones we hear most."
              align="left"
            />
            <p className="text-body-sm text-ink-soft mt-6">
              Not finding yours?{" "}
              <a href={asset("/contact")} className="text-clay font-medium underline-offset-4 hover:underline">
                Ask the team directly.
              </a>
            </p>
          </div>
          <div className="lg:col-span-8">
            <Accordion
              items={pricingFaqs.map((f) => ({ trigger: f.q, content: <p>{f.a}</p> }))}
            />
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          7) FINAL CTA
          ═══════════════════════════════════════════════════════ */}
      <CTASection
        headline="Start with the assessment — pick the plan after."
        description="The assessment is free. It confirms the right program and the right plan for your body."
        primaryHref="/assessment"
        primaryLabel="Take the free assessment"
        secondaryHref="/contact"
        secondaryLabel="Book consultation"
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
