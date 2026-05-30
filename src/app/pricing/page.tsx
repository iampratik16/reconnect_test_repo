/*
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║  ⚠️  PRICING TODO — RECONCILE BEFORE LAUNCH                             ║
 * ║                                                                          ║
 * ║  Dr. Shruthi referenced a ₹15,000 / 6-month figure on the founder call. ║
 * ║  The monthly tiers below (Essential ₹2,499, Care ₹4,999, Elite ₹8,999) ║
 * ║  do NOT cleanly map to that.                                             ║
 * ║                                                                          ║
 * ║  Likely resolution: either                                               ║
 * ║    (a) keep monthly tiers AND add a "6-month program" anchored at        ║
 * ║        ₹15,000 (≈ Essential x 6 with a discount), shown as the headline ║
 * ║        commitment plan, or                                               ║
 * ║    (b) restructure the tiers as 6-month bundles (₹15K / ₹30K / ₹54K)    ║
 * ║        and drop monthly altogether.                                      ║
 * ║                                                                          ║
 * ║  Until resolved: monthly tiers shown as primary, CGM 6-month add-on as  ║
 * ║  the only 6-month price visible. FLAG THIS TO THE CLIENT.               ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 */

import type { Metadata } from "next";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import Stagger from "@/components/Stagger";
import Button from "@/components/Button";
import Accordion from "@/components/Accordion";
import CTASection from "@/components/CTASection";
import { SkeletonSvg } from "@/components/AnatomicalArt";
import { plans, PLAN_FEATURES } from "@/lib/content/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Three plans, all including a medical assessment and a personalised program. Essential, Care (most popular), and Elite — plus a CGM add-on.",
};

/* ── Data ──────────────────────────────────────────────────── */

/**
 * Comparison table rows — derived from the canonical PLAN_FEATURES list +
 * each plan's `included` flags so the matrix stays in sync with the cards.
 */
const allFeatures = PLAN_FEATURES.map((label) => ({
  label,
  byPlan: plans.map((p) => p.features.find((f) => f.label === label)?.included ?? false),
}));

const pricingFaqs = [
  {
    q: "How does billing work?",
    a: "All plans are billed monthly. You're charged at the start of each cycle. No long-term contracts, no lock-ins.",
  },
  {
    q: "Can I pause or cancel my plan?",
    a: "Yes — both. Pause for travel, surgery recovery, or any other reason; cancel any time before your next billing cycle. We don't believe in trapping members into plans that don't fit their life.",
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
    a: "Yes. Many members start on Essential and move up as they progress, or step down to maintenance after a 12-week cycle. Switch any time with your coach.",
  },
  {
    q: "Is there a one-time program option?",
    a: "There's a 6-month CGM add-on at ₹15,000 for those layering metabolic monitoring on top of a strength track. We're finalising a 6-month program bundle — ask the team during your assessment.",
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
                All plans include a medical assessment and a personalised program.
                No long-term contracts. Pause or cancel any time.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2) THREE TIERS
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone">
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch" staggerDelay={0.1}>
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </Stagger>

        <p className="text-caption text-ink-soft mt-8 max-w-3xl">
          Prices in INR. GST extra where applicable. The assessment is free and runs before
          you commit to any plan.
        </p>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          3) CGM ADD-ON
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone-deep">
        <Reveal>
          <div className="bg-sage-tint rounded-[20px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-5 max-w-2xl">
              <span className="hidden sm:inline-flex shrink-0 w-12 h-12 rounded-full bg-sage text-bone items-center justify-center text-body-sm font-medium">
                +
              </span>
              <div>
                <p className="text-eyebrow text-sage mb-2">Add-on · 6 months</p>
                <h3 className="text-h4 font-display text-ink mb-1">
                  Continuous Glucose Monitoring
                </h3>
                <p className="text-body-sm text-ink-soft">
                  Pair any plan with CGM to manage borderline sugar — blood-sugar patterns drive
                  systemic inflammation that affects joints and bone. <strong className="text-ink">₹15,000 for 6 months.</strong>
                </p>
              </div>
            </div>
            <Button variant="sage-outline" href="/cgm" arrow>
              Learn about CGM
            </Button>
          </div>
        </Reveal>
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
              <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-5" staggerDelay={0.08}>
                {[
                  {
                    label: "Doctor-designed",
                    body: "Every plan starts with a rheumatologist-led assessment — not a chatbot intake.",
                  },
                  {
                    label: "Personalised to your body",
                    body: "Region-split, age-scaled, severity-aware. Nothing is templated.",
                  },
                  {
                    label: "Pain-first",
                    body: "We calm pain before we build strength on top of it. Adjusted week-to-week.",
                  },
                  {
                    label: "Structured 12-week roadmap",
                    body: "Direction, milestones, reassessment. The roadmap a generic app can’t give.",
                  },
                ].map((v) => (
                  <div key={v.label} className="bg-calcium rounded-[16px] p-6 hairline flex flex-col gap-2 h-full">
                    <h4 className="text-h4 font-display text-ink">{v.label}</h4>
                    <p className="text-body-sm text-ink-soft">{v.body}</p>
                  </div>
                ))}
              </Stagger>

              {/* Outcome quote */}
              <Reveal delay={0.2}>
                <blockquote className="mt-8 border-l-2 border-clay pl-6">
                  <p className="serif-italic text-h4 text-ink">
                    “I was told I needed a knee replacement. After 12 weeks with Reconnect, my pain
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
                            ₹{p.price.toLocaleString("en-IN")}
                            <span className="text-caption text-ink-soft font-normal">{p.period}</span>
                          </span>
                          {p.popular && (
                            <span className="text-caption text-clay-dark font-medium">Most popular</span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allFeatures.map((row, ri) => (
                    <tr
                      key={row.label}
                      className={ri !== allFeatures.length - 1 ? "border-b border-line" : ""}
                    >
                      <td className="p-5 lg:p-7 text-body-sm text-ink">{row.label}</td>
                      {row.byPlan.map((on, ci) => (
                        <td key={ci} className="p-5 lg:p-7">
                          <Check on={on} />
                        </td>
                      ))}
                    </tr>
                  ))}
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
                      ₹{p.price.toLocaleString("en-IN")}
                      <span className="text-caption text-ink-soft font-normal">{p.period}</span>
                    </p>
                  </div>
                  {p.popular && (
                    <span className="self-start text-caption text-clay-dark bg-clay-soft rounded-pill px-3 py-1">
                      Most popular
                    </span>
                  )}
                  <ul className="flex flex-col gap-2 pt-2">
                    {p.features.map((f) => (
                      <li key={f.label} className="flex items-start gap-3 text-body-sm">
                        <Check on={f.included} />
                        <span className={f.included ? "text-ink" : "text-ink-soft/50 line-through"}>
                          {f.label}
                        </span>
                      </li>
                    ))}
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
              <a href="/contact" className="text-clay font-medium underline-offset-4 hover:underline">
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
        primaryLabel="Take free assessment"
        secondaryHref="/contact"
        secondaryLabel="Book consultation"
        variant="sage"
      />
    </>
  );
}

/* ── Sub-components ────────────────────────────────────────── */

import type { Plan } from "@/lib/content/pricing";

function PlanCard({ plan }: { plan: Plan }) {
  const isPopular = plan.popular;

  return (
    <div
      className={`relative rounded-[20px] p-8 md:p-9 flex flex-col gap-6 h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isPopular
          ? "glow-card glow-card-static bg-sage-deep text-bone shadow-lifted md:-mt-4 md:mb-4"
          : "glow-card bg-calcium text-ink shadow-card"
      }`}
    >
      {/* Subtle clay glow on the popular card */}
      {isPopular && (
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(0,100,224,0.20), transparent 70%)",
          }}
        />
      )}

      {isPopular && (
        <span className="relative self-start text-caption font-medium uppercase tracking-widest bg-clay text-calcium rounded-pill px-3 py-1">
          Most popular
        </span>
      )}

      <div className="relative">
        <p className={`text-eyebrow ${isPopular ? "text-clay-soft" : "text-clay"}`}>
          {plan.name}
        </p>
        <div className="flex items-baseline gap-1 mt-3">
          <span className={`text-h2 font-display ${isPopular ? "text-bone" : "text-ink"}`}>
            ₹{plan.price.toLocaleString("en-IN")}
          </span>
          <span className={`text-body-sm ${isPopular ? "text-bone/60" : "text-ink-soft"}`}>
            {plan.period}
          </span>
        </div>
      </div>

      <p className={`relative text-body-sm ${isPopular ? "text-bone/75" : "text-ink-soft"}`}>
        {plan.description}
      </p>

      <div className={`relative border-t ${isPopular ? "border-bone/15" : "border-line"}`} />

      <ul className="relative flex flex-col gap-3 flex-1">
        {plan.features.map((f) => (
          <li key={f.label} className="flex items-start gap-3 text-body-sm">
            <Check on={f.included} variant={isPopular ? "dark" : "light"} />
            <span
              className={
                f.included
                  ? isPopular
                    ? "text-bone"
                    : "text-ink"
                  : isPopular
                    ? "text-bone/40 line-through"
                    : "text-ink-soft/50 line-through"
              }
            >
              {f.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="relative pt-2">
        <Button
          variant={isPopular ? "clay" : "sage-outline"}
          size="lg"
          href="/assessment"
          arrow
          className="w-full justify-center"
        >
          Take free assessment
        </Button>
      </div>
    </div>
  );
}

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
