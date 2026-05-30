"use client";

/**
 * CTASection — Reusable call-to-action band with headline, description, and buttons.
 * Supports sage (dark green) and clay (warm accent) variants.
 */

import Section from "./Section";
import Reveal from "./Reveal";
import Button from "./Button";

interface CTASectionProps {
  headline: string;
  description?: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  variant?: "clay" | "sage";
}

export default function CTASection({
  headline,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  variant = "sage",
}: CTASectionProps) {
  const isSage = variant === "sage";

  const bgClass = isSage ? "bg-sage-deep" : "bg-clay";
  const textClass = isSage ? "text-bone" : "text-calcium";
  const descClass = isSage ? "text-sage-tint" : "text-clay-soft";

  const primaryVariant = isSage ? "clay" : "sage-outline";
  // bone-outline reads well on both sage-deep and clay backgrounds.
  const secondaryVariant = "bone-outline" as const;

  return (
    <Section bg={bgClass}>
      <Reveal>
        <div className={`flex flex-col items-center text-center gap-6 ${textClass}`}>
          <h2 className="text-h2 font-display max-w-3xl">{headline}</h2>

          {description && (
            <p className={`text-body-lg max-w-xl ${descClass}`}>{description}</p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Button variant={primaryVariant} size="lg" href={primaryHref} arrow>
              {primaryLabel}
            </Button>

            {secondaryHref && secondaryLabel && (
              <Button variant={secondaryVariant} size="lg" href={secondaryHref}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="-ml-0.5"
                >
                  <rect x="3" y="5" width="14" height="12" rx="2" />
                  <path d="M3 9h14M7 3v4M13 3v4" />
                </svg>
                {secondaryLabel}
              </Button>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
