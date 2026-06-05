"use client";

/**
 * CTASection — Reusable call-to-action moment.
 *
 * Rather than a flat full-bleed band, the CTA lives inside a contained,
 * softly-glowing panel that floats on the section background. This gives the
 * moment a deliberate shape, a visual "floor," and a clear seam against the
 * footer (which shares the same sage-deep navy) — instead of two identical
 * navy slabs blurring into one another with a dead gap between them.
 *
 * Token-driven and variant-safe: sage (dark navy) and clay (warm accent).
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

  // Section background sits one shade off the panel so the panel reads as a
  // distinct, lifted surface rather than melting into the band.
  const sectionBg = isSage ? "bg-sage-deep" : "bg-clay";
  const textClass = isSage ? "text-bone" : "text-calcium";
  const descClass = isSage ? "text-sage-tint" : "text-clay-soft";

  // Panel surface — a subtle vertical gradient + hairline border. Built from
  // bone/white alpha so it works on both the navy and the clay variants.
  const panelStyle: React.CSSProperties = isSage
    ? {
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        borderColor: "rgba(255,255,255,0.10)",
        boxShadow:
          "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 24px 70px -30px rgba(0,0,0,0.55)",
      }
    : {
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
        borderColor: "rgba(255,255,255,0.18)",
        boxShadow:
          "0 1px 0 0 rgba(255,255,255,0.12) inset, 0 24px 70px -30px rgba(0,0,0,0.35)",
      };

  const primaryVariant = isSage ? "clay" : "sage-outline";
  // bone-outline reads well on both sage-deep and clay backgrounds.
  const secondaryVariant = "bone-outline" as const;

  return (
    <Section bg={sectionBg} className="cta-section">
      {/* Glow + panel wrapper — xray-glow-sage paints the brand radial behind. */}
      <div className="xray-glow xray-glow-sage flex justify-center">
        <Reveal>
          <div
            className={`relative w-full max-w-3xl rounded-[28px] border px-7 py-12 sm:px-12 sm:py-16 ${textClass}`}
            style={panelStyle}
          >
            <div className="flex flex-col items-center text-center gap-5 sm:gap-6">
              <h2 className="text-h2 font-display max-w-2xl text-balance">
                {headline}
              </h2>

              {description && (
                <p className={`text-body-lg max-w-md sm:max-w-lg text-pretty ${descClass}`}>
                  {description}
                </p>
              )}

              <div className="mt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                <Button
                  variant={primaryVariant}
                  size="lg"
                  href={primaryHref}
                  arrow
                  className="w-full sm:w-auto justify-center"
                >
                  {primaryLabel}
                </Button>

                {secondaryHref && secondaryLabel && (
                  <Button
                    variant={secondaryVariant}
                    size="lg"
                    href={secondaryHref}
                    className="w-full sm:w-auto justify-center"
                  >
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
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
