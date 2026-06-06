"use client";

/**
 * PricingTiers — editorial pricing cards shared by the home teaser and /pricing.
 *
 * Additive features only (no strikethroughs): each card lists what you GET, and
 * an inheriting tier shows "Everything in {parent}, plus —" above its additions.
 * The popular tier is elevated (lift + shadow + accent gradient ring + x-ray
 * glow + "Most chosen" badge) so it reads premium, not like a cold navy slab.
 *
 * Tokens only — Geist display, Inter body, #0064E0 accent. No new colours/fonts.
 */

import Stagger from "./Stagger";
import Button from "./Button";
import { plans, type Plan } from "@/lib/content/pricing";

interface PricingTiersProps {
  ctaLabel: string;
  ctaHref: string;
}

function inr(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function CheckIcon({ popular }: { popular: boolean }) {
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
      className={`shrink-0 mt-0.5 ${popular ? "text-clay" : "text-clay"}`}
      aria-hidden="true"
    >
      <path d="M4 10l4 4 8-8" />
    </svg>
  );
}

function TierCard({
  plan,
  index,
  ctaLabel,
  ctaHref,
}: {
  plan: Plan;
  index: number;
  ctaLabel: string;
  ctaHref: string;
}) {
  const popular = plan.popular;
  const numeral = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`relative flex flex-col h-full rounded-[22px] p-8 md:p-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        popular
          ? "bg-calcium text-ink shadow-lifted lg:-mt-4 lg:mb-4"
          : "bg-calcium text-ink shadow-card hairline"
      }`}
    >
      {/* Popular: accent gradient ring */}
      {popular && (
        <div
          aria-hidden
          className="absolute inset-0 rounded-[22px] pointer-events-none"
          style={{
            padding: 1.5,
            background:
              "linear-gradient(160deg, var(--color-clay), rgba(0,100,224,0.15) 55%, transparent)",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}
      {/* Popular: soft x-ray glow at the top */}
      {popular && (
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-40 rounded-t-[22px] pointer-events-none"
          style={{
            background:
              "radial-gradient(70% 90% at 50% 0%, rgba(0,100,224,0.10), transparent 70%)",
          }}
        />
      )}

      {/* Popular: "Most chosen" badge straddling the top edge */}
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 text-caption font-medium uppercase tracking-[0.12em] bg-clay text-calcium rounded-pill px-4 py-1 shadow-soft whitespace-nowrap">
          Most chosen
        </span>
      )}

      {/* Oversized light tier numeral */}
      <span
        aria-hidden
        className="relative font-display text-line leading-none select-none"
        style={{ fontSize: "clamp(3rem, 5vw, 4.25rem)", fontWeight: 200 }}
      >
        {numeral}
      </span>

      {/* Tier name + best-for */}
      <div className="relative mt-5">
        <p className="text-eyebrow text-clay">{plan.name}</p>
        <p className="text-body-sm text-ink-soft mt-2 max-w-[26ch]">{plan.bestFor}</p>
      </div>

      {/* Price block — program total leads */}
      <div className="relative mt-6">
        <span
          className="font-display text-ink leading-none block"
          style={{ fontSize: "clamp(2.25rem, 3.5vw, 3rem)", fontWeight: 300, letterSpacing: "-0.02em" }}
        >
          {inr(plan.priceTotal)}
        </span>
        <p className="text-caption text-ink-soft mt-2">
          {plan.months}-month program · {inr(plan.priceMonthly)} / month
        </p>
      </div>

      <div className="relative border-t border-line mt-7 mb-6" />

      {/* Additive features — only what you GET */}
      {plan.inheritsFrom && (
        <p className="relative text-caption font-semibold uppercase tracking-[0.1em] text-ink mb-4">
          Everything in {plan.inheritsFrom}, plus —
        </p>
      )}
      <ul className="relative flex flex-col gap-3 flex-1">
        {plan.features.map((f) => {
          const isHighlighted = plan.highlightedFeatures?.includes(f);
          return (
            <li
              key={f}
              className={`flex items-start gap-3 text-body-sm ${
                isHighlighted ? "font-bold text-ink" : "text-ink"
              }`}
            >
              <CheckIcon popular={popular} />
              <span className="flex-1 flex items-center justify-between">
                <span>{f}</span>
                {isHighlighted && <span className="ml-2 text-lg" style={{ color: "#D4A574" }}>★</span>}
              </span>
            </li>
          );
        })}
      </ul>

      {/* CTA — solid accent on popular, outline otherwise */}
      <div className="relative pt-8">
        <Button
          variant={popular ? "clay" : "sage-outline"}
          size="lg"
          href={ctaHref}
          arrow
          className="w-full justify-center"
        >
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}

export default function PricingTiers({ ctaLabel, ctaHref }: PricingTiersProps) {
  return (
    <Stagger
      className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-[64rem] mx-auto items-start"
      staggerDelay={0.1}
    >
      {plans.map((plan, i) => (
        <TierCard
          key={plan.name}
          plan={plan}
          index={i}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
        />
      ))}
    </Stagger>
  );
}
