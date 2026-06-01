/**
 * ChooseYourPath — the "joint-health spectrum" section.
 *
 * Design intent: CONVEY, don't make people explore. A visitor should be able to
 * (a) recognise which track is theirs and (b) see what's inside it, at a glance —
 * no clicking, no hover-to-reveal. Everything is legible up front.
 *
 * Two reading axes:
 *   • across  → compare all three tracks at the same decision (subgrid keeps rows aligned)
 *   • down    → everything about one track, top to bottom
 *
 * The three tracks are a *severity continuum*, not parallel products. The spine
 * above the cards + the ascending accent ramp (light→deep blue) + the stage meter
 * communicate "where you are on the journey" before a single word is read.
 */

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { asset } from "@/lib/asset";

type Pillar = { name: string; lead: boolean };

type Emphasis = { color: string; badge: string; star?: boolean };

type Track = {
  slug: "prevent" | "manage" | "recover";
  name: string;
  tagline: string;
  image: string;
  accent: string; // severity colour — ramps light→deep across the three
  emphasis?: Emphasis; // pulls a card out: gold = where we'd start you, blue = where most do
  signals: string[]; // "right for you if" — recognition, in the visitor's own words
  pillars: Pillar[]; // what you'll work on — lead vs supporting focus
  outcome: string; // where you'll be in 12 weeks
};

/** Recommended-entry gold — warm, deliberately apart from the cool severity ramp. */
const GOLD = "#B0822A";

const TRACKS: Track[] = [
  {
    slug: "prevent",
    name: "Prevent",
    tagline: "Stay ahead of joint and bone problems.",
    image: "/kettlebell-squat.jpg",
    accent: "#4C8DF6", // lightest — proactive, low intensity
    emphasis: { color: GOLD, badge: "Ideal place to start", star: true },
    signals: [
      "You're 30+ and want to protect what you've got",
      "Arthritis or osteoporosis runs in your family",
      "Occasional stiffness — nothing a doctor has flagged yet",
    ],
    pillars: [
      { name: "Medical", lead: false },
      { name: "Exercise", lead: true },
      { name: "Nutrition", lead: true },
      { name: "Mind", lead: false },
    ],
    outcome: "A stronger, denser frame — and the habits to keep it.",
  },
  {
    slug: "manage",
    name: "Manage",
    tagline: "Reduce flare-ups and rebuild resilience.",
    image: "/mat-stretching.jpg",
    accent: "#0064E0", // brand primary — the middle of the spectrum
    emphasis: { color: "#0064E0", badge: "Most people start here" },
    signals: [
      "You're living with arthritis, back, or joint pain",
      "Good days and bad days — pain decides your plans",
      "You've started avoiding things you used to do",
    ],
    pillars: [
      { name: "Medical", lead: true },
      { name: "Exercise", lead: true },
      { name: "Nutrition", lead: false },
      { name: "Mind", lead: false },
    ],
    outcome: "Less daily pain, more range — activities back on the table.",
  },
  {
    slug: "recover",
    name: "Recover",
    tagline: "Rebuild safely under close medical guidance.",
    image: "/trainer-guided-exercise.jpg",
    accent: "#00295C", // deepest — most clinical, most supervised
    signals: [
      "You're post-surgery or recently diagnosed with severe OA",
      "Movement feels risky — you don't want to set yourself back",
      "You need a clear, supervised path forward",
    ],
    pillars: [
      { name: "Medical", lead: true },
      { name: "Exercise", lead: true },
      { name: "Nutrition", lead: false },
      { name: "Mind", lead: true },
    ],
    outcome: "From protected movement to confident, loaded strength.",
  },
];

/* ── Small parts ─────────────────────────────────────────────── */

function Check({ accent }: { accent: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 shrink-0"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="8" fill={accent} opacity="0.12" />
      <path
        d="M4.5 8.2l2.3 2.3L11.5 6"
        stroke={accent}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Section ─────────────────────────────────────────────────── */

export default function ChooseYourPath() {
  return (
    <section className="section-py bg-bone">
      <div className="container-site">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col gap-5 text-left items-start mb-12 md:mb-16 max-w-2xl">
            <span className="text-eyebrow text-clay">
              <span className="text-ink-soft">03 —</span> Find your starting point
            </span>
            <h2 className="text-h2 text-ink">
              Choose your path.{" "}
              <span className="serif-italic text-ink-soft">
                We&apos;ll meet you where you are.
              </span>
            </h2>
            <p className="text-body-lg text-ink-soft">
              Prevent, Manage, and Recover aren&apos;t three separate programs — they&apos;re
              points on one spectrum of joint health. Find where you are today; each track is
              personalised after your medical assessment.
            </p>
          </div>
        </Reveal>

        {/* ── The continuum spine ─────────────────────────────────
            Same 3-col grid + gap as the cards below, so each node sits
            dead-centre over its card. The line spans dot-to-dot (inset by
            half a column: 100%/6 − half-gap), not edge-to-edge, so it reads
            as one connected journey rather than a bar with loose ends. */}
        <Reveal delay={0.1}>
          <div className="mb-8 md:mb-10" aria-hidden="true">
            {/* directional captions — centred over the two end columns */}
            <div className="mb-3 grid grid-cols-3 gap-x-6 text-caption font-medium uppercase tracking-[0.12em] text-ink-soft">
              <span className="text-center">Staying ahead</span>
              <span />
              <span className="text-center">Rebuilding after injury</span>
            </div>
            <div className="relative grid grid-cols-3 gap-x-6">
              {/* gradient line — runs from the first dot to the last */}
              <div
                className="absolute top-[7px] h-[2px] -translate-y-1/2 rounded-full left-[calc(100%/6-8px)] right-[calc(100%/6-8px)]"
                style={{
                  background:
                    "linear-gradient(90deg, #4C8DF6 0%, #0064E0 50%, #00295C 100%)",
                }}
              />
              {TRACKS.map((t) => (
                <div key={t.slug} className="relative flex flex-col items-center">
                  <span
                    className="h-3.5 w-3.5 rounded-full ring-4 ring-bone"
                    style={{ backgroundColor: t.accent }}
                  />
                  <span
                    className="mt-2 text-caption font-semibold tracking-wide"
                    style={{ color: t.accent }}
                  >
                    {t.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Comparison grid ─────────────────────────────────────
            6 shared rows; each card spans them via subgrid so
            "right for you if", "what you'll do", etc. line up across
            all three — readable across (compare) or down (one track). */}
        <Reveal delay={0.15}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-x-6 md:gap-y-0 md:[grid-template-rows:repeat(6,auto)]">
            {TRACKS.map((t) => (
              <article
                key={t.slug}
                className={`flex h-full flex-col overflow-hidden rounded-lg bg-calcium md:grid md:row-span-6 md:grid-rows-subgrid ${
                  t.emphasis
                    ? "border-[1.5px] shadow-lifted"
                    : "border border-line shadow-card"
                }`}
                style={t.emphasis ? { borderColor: t.emphasis.color } : undefined}
              >
                {/* 1 — media + accent severity bar */}
                <div className="relative">
                  <div className="h-1 w-full" style={{ backgroundColor: t.accent }} />
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(t.image)}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    {/* accent duotone wash — ties photo to the severity colour */}
                    <div
                      className="absolute inset-0 mix-blend-multiply"
                      style={{ backgroundColor: t.accent, opacity: 0.1 }}
                    />
                    {t.emphasis && (
                      <span
                        className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-caption font-semibold text-calcium shadow-soft"
                        style={{ backgroundColor: t.emphasis.color }}
                      >
                        {t.emphasis.star ? (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M12 2l2.9 6.3 6.9.6-5.2 4.5 1.6 6.7L12 17l-6.2 3.6 1.6-6.7L2.2 8.9l6.9-.6z" />
                          </svg>
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-calcium" />
                        )}
                        {t.emphasis.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2 — title block */}
                <div className="flex flex-col gap-3 px-6 pt-6 md:px-7">
                  <h3 className="text-h3 text-ink">{t.name}</h3>
                  <p className="text-body text-ink-soft">{t.tagline}</p>
                </div>

                {/* 3 — right for you if */}
                <div className="mt-5 border-t border-line px-6 pt-5 md:px-7">
                  <p className="text-eyebrow text-ink-soft mb-3">Right for you if</p>
                  <ul className="flex flex-col gap-2.5">
                    {t.signals.map((s) => (
                      <li key={s} className="flex gap-2.5 text-body-sm text-ink">
                        <Check accent={t.accent} />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4 — what you'll work on */}
                <div className="mt-5 border-t border-line px-6 pt-5 md:px-7">
                  <p className="text-eyebrow text-ink-soft mb-3">What you&apos;ll work on</p>
                  <div className="flex flex-wrap gap-2">
                    {t.pillars.map((p) => (
                      <span
                        key={p.name}
                        className="inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-caption font-medium"
                        style={
                          p.lead
                            ? { backgroundColor: `${t.accent}14`, color: t.accent }
                            : { backgroundColor: "var(--color-bone-deep)", color: "var(--color-ink-soft)" }
                        }
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            backgroundColor: p.lead ? t.accent : "transparent",
                            border: p.lead ? "none" : "1.5px solid var(--color-ink-soft)",
                            opacity: p.lead ? 1 : 0.5,
                          }}
                        />
                        {p.name}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2.5 text-caption text-ink-soft">
                    Filled = lead focus · the mix shifts with where you are.
                  </p>
                </div>

                {/* 5 — in 12 weeks */}
                <div className="mt-5 border-t border-line px-6 pt-5 md:px-7">
                  <p className="text-eyebrow text-ink-soft mb-2">In 12 weeks</p>
                  <p className="flex gap-2 text-body text-ink">
                    <span style={{ color: t.accent }} aria-hidden="true">
                      →
                    </span>
                    {t.outcome}
                  </p>
                </div>

                {/* 6 — CTA */}
                <div className="px-6 pb-6 pt-6 md:px-7 md:pb-7">
                  <Link
                    href={`/programs/${t.slug}`}
                    className="group inline-flex items-center gap-2 text-body-sm font-semibold transition-colors"
                    style={{ color: t.accent }}
                  >
                    See the {t.name} program
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M3 8h10m0 0L9 4m4 4L9 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        {/* Not sure? — the safety net, so no one bounces undecided */}
        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-body text-ink-soft">
            Not sure which is you?{" "}
            <Link
              href="/assessment"
              className="font-semibold text-clay underline-offset-4 hover:underline"
            >
              Take the 2-minute assessment
            </Link>{" "}
            and we&apos;ll place you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
