import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import Stagger from "@/components/Stagger";
import Button from "@/components/Button";
import Pill from "@/components/Pill";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "CGM Program",
  description:
    "Continuous glucose monitoring for borderline-diabetic and medication-avoidant adults. 6 months of monitoring, personalised nutrition and exercise guidance, doctor oversight. ₹15,000.",
};

/* ── Data ──────────────────────────────────────────────────── */

const steps = [
  {
    title: "A small sensor is placed on your arm",
    body: "A medical-grade CGM sensor is applied painlessly to the back of your upper arm. Discreet, water-resistant, worn under clothes.",
  },
  {
    title: "It logs glucose continuously for ~15 days",
    body: "The sensor records your interstitial glucose around the clock — sleep, meals, walks, stress. Real life, not a single fasting snapshot.",
  },
  {
    title: "Readings stream to our remote monitoring centre",
    body: "Your data is reviewed by the Reconnect medical team. Patterns are flagged; nothing is left for you to interpret alone.",
  },
  {
    title: "You see exactly what spikes your sugar",
    body: "Specific foods, meal timing, post-meal walks, sleep loss — laid out as patterns you can actually act on.",
  },
  {
    title: "We adjust nutrition and exercise accordingly",
    body: "Your plan is tuned to your numbers — what to eat, when to walk, where to swap. Iterative, not theoretical.",
  },
] as const;

const whoFor = [
  {
    label: "Borderline diabetic",
    body: "HbA1c creeping into the pre-diabetic range and you want to act before it progresses.",
  },
  {
    label: "Pre-diabetic",
    body: "Diagnosed pre-diabetes and looking for lifestyle levers before medication becomes necessary.",
  },
  {
    label: "Medication-avoidant",
    body: "On the edge of being prescribed metformin and want to try a data-driven nutrition approach first.",
  },
  {
    label: "Metabolically curious",
    body: "Generally healthy but want to understand how your body actually responds to the food you eat.",
  },
] as const;

const whatYouGet = [
  "Continuous monitoring period using a medical-grade CGM sensor",
  "Personalised nutrition adjustments tuned to your readings",
  "Exercise recommendations that account for your glucose response",
  "Remote review and doctor oversight throughout the 6-month engagement",
  "Periodic written reports summarising trends and next steps",
  "Coordination with your treating physician where relevant",
] as const;

/* ── Page ──────────────────────────────────────────────────── */

export default function CGMPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1) HERO — quieter, sage-led (signals secondary track)
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-sage-tint pt-36 md:pt-44 pb-24 md:pb-32">
        {/* Subtle "glucose curve" line motif */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 320"
          className="absolute inset-x-0 bottom-0 w-full opacity-[0.18] text-sage pointer-events-none hidden md:block"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <path d="M0 220 Q 120 170 200 200 T 380 160 T 520 230 T 700 130 T 880 200 T 1040 180 T 1200 210" />
        </svg>

        <div className="container-site relative">
          <div className="max-w-4xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-eyebrow text-sage bg-bone/50 rounded-pill px-3 py-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-sage" />
                Metabolic add-on · separate from the bones &amp; joints program
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-hero text-ink mt-6">
                Continuous Glucose Monitoring —{" "}
                <span className="serif-italic text-sage">see exactly what spikes your sugar.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg text-ink-soft mt-8 max-w-2xl">
                A 6-month, doctor-supervised program for borderline-diabetic and
                medication-avoidant adults who want data-driven control of their metabolic
                health — not guesswork.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button variant="clay" size="lg" href="/contact" arrow>
                  Enquire / Book
                </Button>
                <Button variant="ghost" size="lg" href="#how-it-works">
                  How it works
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="text-caption text-ink-soft mt-6 max-w-xl">
                Reconnect&rsquo;s CGM program <strong className="text-ink">supports</strong> existing
                diabetes care — it does not replace the care of your treating physician or
                endocrinologist.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2) HOW IT WORKS — 5 numbered steps
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone" id="how-it-works">
        <SectionHeader
          eyebrowNumber="(01)"
          eyebrow="How it works"
          title="From sensor to insight to action — in five steps."
          description="No fasting blood draws. No guessing which meal moved the needle. Continuous data, reviewed by clinicians, translated into changes you can actually make."
          align="left"
          className="mb-14"
        />

        <Stagger className="flex flex-col" staggerDelay={0.08}>
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] md:grid-cols-[180px_1fr] gap-6 md:gap-10 py-10 md:py-14 items-start ${
                i !== steps.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <span
                className="font-display font-light text-sage-tint leading-none tabular-nums select-none"
                style={{ fontSize: "clamp(2.75rem, 5vw, 4.5rem)" }}
                aria-hidden="true"
              >
                0{i + 1}
              </span>
              <div>
                <h3 className="text-h3 font-display text-ink mb-3">{step.title}</h3>
                <p className="text-body text-ink-soft max-w-2xl">{step.body}</p>
              </div>
            </div>
          ))}
        </Stagger>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          3) WHO IT'S FOR
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone-deep">
        <SectionHeader
          eyebrowNumber="(02)"
          eyebrow="Who it's for"
          title="Built for four kinds of metabolic moment."
          description="The CGM program is most useful when there's a real decision to make — a borderline number, an impending prescription, or genuine curiosity about how your body responds."
          align="left"
          className="mb-12"
        />

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whoFor.map((item) => (
            <div
              key={item.label}
              className="glow-card bg-calcium rounded-[18px] p-6 flex flex-col gap-3 h-full"
            >
              <Pill variant="sage">{item.label}</Pill>
              <p className="text-body-sm text-ink-soft mt-1">{item.body}</p>
            </div>
          ))}
        </Stagger>

        <p className="text-caption text-ink-soft italic mt-8 max-w-2xl border-l border-line pl-5">
          Already on diabetes medication? CGM can still add value alongside your existing care
          — speak to our team and your treating doctor before enrolling.
        </p>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          4) WHAT YOU GET + 5) PRICE — paired
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* What you get — left */}
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrowNumber="(03)"
              eyebrow="What you get"
              title="Over six months."
              align="left"
              className="mb-10"
            />

            <Stagger className="flex flex-col gap-3" staggerDelay={0.06}>
              {whatYouGet.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 bg-calcium rounded-[14px] p-5 hairline"
                >
                  <CheckMark />
                  <p className="text-body text-ink">{item}</p>
                </div>
              ))}
            </Stagger>
          </div>

          {/* Price card — right, sticky-feeling */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Reveal>
              <div className="bg-sage-deep text-bone rounded-[20px] p-8 md:p-10 shadow-lifted relative overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background:
                      "radial-gradient(60% 50% at 50% 0%, rgba(14,56,76,0.5), transparent 70%)",
                  }}
                />
                <div className="relative flex flex-col gap-5">
                  <p className="text-eyebrow text-sage-tint">CGM Program</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-hero font-display text-bone leading-none">
                      ₹15,000
                    </span>
                  </div>
                  <p className="text-body text-bone/70">
                    Flat fee for the full 6-month program. Sensor cost, remote monitoring,
                    nutrition &amp; exercise adjustments, and doctor oversight all included.
                  </p>

                  <div className="border-t border-bone/15 my-2" />

                  <ul className="flex flex-col gap-2 text-body-sm text-bone/80">
                    <li>· 6-month engagement</li>
                    <li>· Medical-grade CGM sensor</li>
                    <li>· Remote monitoring &amp; doctor oversight</li>
                    <li>· Personalised nutrition &amp; exercise plan</li>
                  </ul>

                  <Button
                    variant="clay"
                    size="lg"
                    href="/contact"
                    arrow
                    className="w-full justify-center mt-3"
                  >
                    Enquire / Book
                  </Button>

                  <p className="text-caption text-bone/50">
                    Prices in INR. GST extra where applicable.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          6) CROSS-LINK BACK TO CORE PROGRAMS
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone-deep">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Eyebrow number="(04)">Reconnect&rsquo;s main work</Eyebrow>
            <h2 className="text-h2 font-display text-ink mt-6">
              The CGM program sits beside our core work —{" "}
              <span className="serif-italic text-clay">bones and joints.</span>
            </h2>
            <p className="text-body text-ink-soft mt-6 max-w-md">
              Reconnect is, at its core, a rheumatologist-led strength program for arthritis,
              joint pain, back issues, and bone health. CGM is a secondary offering for
              members who want metabolic data alongside their physical work.
            </p>
            <div className="mt-8">
              <Button variant="sage-outline" href="/approach" arrow>
                Explore the main programs
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Prevent", note: "Stay ahead of joint &amp; bone problems.", href: "/programs/prevent" },
                { name: "Manage",  note: "Reduce arthritis &amp; joint pain.",       href: "/programs/manage"  },
                { name: "Strengthen", note: "Rebuild post-surgery, severe OA.",    href: "/programs/strengthen" },
              ].map((t) => (
                <Link
                  key={t.name}
                  href={t.href}
                  className="group glow-card bg-calcium rounded-[16px] p-5 flex flex-col gap-2 h-full"
                >
                  <h3 className="text-h4 font-display text-ink">{t.name}</h3>
                  <p
                    className="text-body-sm text-ink-soft"
                    dangerouslySetInnerHTML={{ __html: t.note }}
                  />
                  <span className="text-clay opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-auto">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          7) FINAL CTA
          ═══════════════════════════════════════════════════════ */}
      <CTASection
        headline="Want a clearer picture of your metabolic health?"
        description="The CGM program takes a few questions to scope. Reach out and we'll confirm whether it's a good fit for you."
        primaryHref="/contact"
        primaryLabel="Enquire / Book"
        secondaryHref="/assessment"
        secondaryLabel="Take main assessment"
        variant="sage"
      />
    </>
  );
}

/* ── tiny check icon ───────────────────────────────────────── */
function CheckMark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-sage mt-0.5"
      aria-hidden="true"
    >
      <path d="M4 10l4 4 8-8" />
    </svg>
  );
}
