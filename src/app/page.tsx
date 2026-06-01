import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import Stagger from "@/components/Stagger";
import Button from "@/components/Button";
import Card from "@/components/Card";
import SplitReveal from "@/components/SplitReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import ScrollMarquee from "@/components/ScrollMarquee";
import BentoGrid, { BentoItem } from "@/components/BentoGrid";
import JourneyStepper from "@/components/JourneyStepper";
import CTASection from "@/components/CTASection";
import SpotlightCard from "@/components/SpotlightCard";
import {
  HandSvg,
  HipSvg,
  KneeSvg,
  SkeletonSvg,
  SpineSvg,
} from "@/components/AnatomicalArt";
import { sciencePoints } from "@/lib/content/science";
import { plans } from "@/lib/content/pricing";
import TestimonialsSlider from "./_components/TestimonialsSlider";
import HeroMedia from "./_components/HeroMedia";
import SpineConnects from "./_components/SpineConnects";
import WhyReconnectSection from "./_components/WhyReconnectSection";
import ScienceSection from "./_components/ScienceSection";
import ConditionsGrid from "./_components/ConditionsGrid";
import MethodSection from "./_components/MethodSection";
import ChooseYourPath from "./_components/ChooseYourPath";

export const metadata: Metadata = {
  title: "Reconnect Wellness — Doctor-Led Strength Training for Bones & Joints",
  description:
    "Stronger joints. Denser bones. A life without the pain. A doctor-designed strength and nutrition program for arthritis, joint pain, back issues, and osteoporosis.",
};

/* ── Data ──────────────────────────────────────────────────── */

const stats = [
  { value: 500, suffix: "+", label: "Members helped" },
  { value: 12,  suffix: " wk", label: "Structured programs" },
  { value: 4.9, suffix: "",    label: "Average rating", decimals: 1 },
  { value: 3,   suffix: "",    label: "Specialist tracks" },
];

const proofCards = [
  {
    title: "Doctor-led, not trainer-led",
    body: "Programs designed by a rheumatologist. Trainers carry them out — the medicine sits behind every prescription.",
  },
  {
    title: "Personalised to your condition",
    body: "Not your height and weight. Your diagnosis, imaging, pain map, and history shape the plan.",
  },
  {
    title: "Pain-first, not pain-through",
    body: "We calm the pain, respect it, then build strength on top of a quieter joint.",
  },
  {
    title: "Structured roadmap",
    body: "A 12-week cycle with milestones and reassessment — the direction YouTube can’t give you.",
  },
];

const conditions = [
  { name: "Knee Osteoarthritis",         note: "Stairs, getting up, walking distance",  href: "/programs/manage",  Icon: KneeSvg },
  { name: "Chronic Back Pain",           note: "Posture, stiffness, daily ache",        href: "/programs/manage",  Icon: SpineSvg },
  { name: "Disc Bulge / Sciatica",       note: "Nerve symptoms, radiating pain",        href: "/programs/recover", Icon: SpineSvg },
  { name: "Rheumatoid Arthritis",        note: "Autoimmune joint inflammation",         href: "/programs/manage",  Icon: HandSvg },
  { name: "Osteoporosis",                note: "Bone density, fracture risk",           href: "/programs/recover", Icon: SkeletonSvg },
  { name: "Frozen Shoulder",             note: "Stiffness, range of motion loss",       href: "/programs/manage",  Icon: HandSvg },
  { name: "Cervical (Neck) Pain",        note: "Posture-driven cervical strain",        href: "/programs/manage",  Icon: SpineSvg },
  { name: "Post-menopausal Bone Loss",   note: "Density support after menopause",       href: "/programs/prevent", Icon: SkeletonSvg },
  { name: "Joint Stiffness",             note: "Morning stiffness, reduced mobility",   href: "/programs/manage",  Icon: HipSvg },
  { name: "Hip Pain",                    note: "Hip OA, post-replacement, instability", href: "/programs/recover", Icon: HipSvg },
];

const darkPoints = [
  { title: "Doctor-led, not influencer-led", body: "Designed and overseen by a rheumatologist with over a decade of clinical practice." },
  { title: "Personalised to your diagnosis", body: "Programs shaped by imaging, history, and current medication — not a one-size template." },
  { title: "Pain-first", body: "We work around pain, respect it, reduce it — then build strength on top of it." },
  { title: "Structured 12-week roadmap", body: "Direction and motivation a generic app or YouTube playlist can’t give." },
];

/* ── Page ──────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ── Resource hints for the 3D spine in section (05) ────────
         These get hoisted to <head> by React 19 / Next 15 so the
         browser starts the GLB download in parallel with HTML parse,
         and the DRACO decoder CDN is already warmed up by the time
         three.js asks for it. Eliminates the cold-start wait. */}
      <link
        rel="preload"
        as="fetch"
        href="/models/spine.glb"
        type="model/gltf-binary"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.gstatic.com" />
      {/* ════════════════════════════════════════════════════════
          1) HERO — full-bleed video, bottom-anchored editorial copy,
                    floating glass credibility chip, scroll indicator.
          ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] overflow-hidden bg-sage-deep">
        {/* ── Background video ─────────────────────────────────── */}
        <div className="absolute inset-0">
          <HeroMedia />

          {/* Bottom-up gradient — Apple/Netflix style. Keeps the video
              clean at top, deepens to dark at bottom for content legibility. */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.10) 35%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Subtle brand-navy wash so the video sits in palette */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-multiply"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,41,92,0.12) 0%, rgba(0,41,92,0.25) 100%)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* ═══ Bottom-anchored content ═════════════════════════════ */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="container-site pb-12 md:pb-20 lg:pb-24">
            <div className="max-w-3xl">
              <h1
                className="font-display text-bone leading-[1.02] tracking-[-0.025em] drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]"
                style={{ fontSize: "clamp(2.4rem, 5.8vw, 5.5rem)" }}
              >
                <span className="block">
                  <SplitRevealInline delay={0.08}>
                    <span>Stronger joints. Denser bones.</span>
                  </SplitRevealInline>
                </span>
                <span className="block mt-1">
                  <SplitRevealInline delay={0.28}>
                    <span>
                      A life without the{" "}
                      <em className="serif-italic text-clay-soft not-italic">pain.</em>
                    </span>
                  </SplitRevealInline>
                </span>
              </h1>

              <Reveal delay={0.55}>
                <p className="text-body-lg text-bone/85 mt-6 max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                  A doctor-designed strength and nutrition program for arthritis,
                  joint pain, back issues, and osteoporosis.
                </p>
              </Reveal>

              <Reveal delay={0.7}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button variant="clay" size="lg" href="/assessment" arrow>
                    Take free assessment
                  </Button>

                  {/* Premium glass secondary CTA — visible on any video frame */}
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-7 py-4 rounded-pill bg-bone/10 backdrop-blur-md border border-bone/35 text-bone font-medium text-body hover:bg-bone/20 hover:border-bone/60 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  >
                    Book consultation
                    <svg
                      width="16"
                      height="16"
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
              </Reveal>
            </div>
          </div>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════
          2) STAT STRIP — animated counters, hairline-separated
          ════════════════════════════════════════════════════════ */}
      <section className="border-y border-line bg-bone">
        <div className="container-site grid grid-cols-2 lg:grid-cols-4 divide-x divide-line">
          {stats.map((s, i) => (
            <div key={s.label} className={`py-10 px-4 lg:px-8 ${i === 0 ? "border-l-0" : ""}`}>
              <p className="text-h2 font-display text-ink leading-none">
                {s.decimals ? (
                  <DecimalCounter value={s.value} />
                ) : (
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                )}
              </p>
              <p className="text-caption text-ink-soft uppercase tracking-widest mt-3">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3) THE DIFFERENTIATOR — (01) Why Reconnect
          ════════════════════════════════════════════════════════ */}
      <WhyReconnectSection />

      {/* ════════════════════════════════════════════════════════
          4) THE SCIENCE — (02) Cinematic image bento
          ════════════════════════════════════════════════════════ */}
      <ScienceSection />

      {/* ════════════════════════════════════════════════════════
          5) CONDITIONS — editorial masonry grid
          ════════════════════════════════════════════════════════ */}
      <ConditionsGrid />

      {/* ════════════════════════════════════════════════════════
          5b) CONNECTED BY DESIGN — scroll-rotating spine
          ════════════════════════════════════════════════════════ */}
      <SpineConnects />

      {/* ════════════════════════════════════════════════════════
          6) THE METHOD — morphing body silhouette
          ════════════════════════════════════════════════════════ */}
      <MethodSection />

      {/* ════════════════════════════════════════════════════════
          7) PROGRAMS — (03) the joint-health spectrum
          ════════════════════════════════════════════════════════ */}
      <ChooseYourPath />

      {/* ════════════════════════════════════════════════════════
          8) WHAT MAKES US DIFFERENT — DARK contrast moment
          ════════════════════════════════════════════════════════ */}
      <section className="relative bg-sage-deep text-bone py-24 md:py-32 overflow-hidden">
        <SpineSvg className="absolute right-[-100px] top-[20px] w-[460px] text-bone opacity-[0.05] pointer-events-none hidden md:block" />

        <div className="container-site relative">
          <Reveal>
            <h2 className="text-h2 font-display text-bone max-w-3xl">
              This isn’t a fitness app.{" "}
              <span className="serif-italic text-clay-soft">It’s medicine that moves you.</span>
            </h2>
          </Reveal>

          <Stagger className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10" staggerDelay={0.08}>
            {darkPoints.map((p, i) => (
              <div key={p.title} className="flex gap-5">
                <span className="text-eyebrow text-clay-soft shrink-0 pt-1 w-10">
                  0{i + 1}
                </span>
                <div>
                  <h4 className="text-h4 font-display text-bone mb-2">{p.title}</h4>
                  <p className="text-body text-bone/70">{p.body}</p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          9) MEET DR. SHRUTHI — asymmetric editorial split
          ════════════════════════════════════════════════════════ */}
      <Section bg="bg-bone">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative rounded-[20px] overflow-hidden shadow-lifted xray-glow">
                {/* TODO: replace with Dr. Shruthi's editorial portrait */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/dr-shruthi.jpg"
                  alt="Dr. Shruthi Desai, Rheumatologist"
                  loading="lazy"
                  className="w-full h-[440px] md:h-[560px] object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Your medical lead</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-h2 font-display text-ink mt-6">
                Dr.&nbsp;Shruthi Desai.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg text-ink-soft mt-6 max-w-xl">
                MBBS, MD (Internal Medicine), DM (Rheumatology). Over 12 years in rheumatology.
                Reconnect was born from her belief that strength training, done right, is the
                most powerful medicine for joint and bone health.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-body text-ink-soft mt-4 max-w-xl">
                Non-surgical — surgical cases are referred to orthopaedics. Reconnect works
                alongside your treating doctor, never instead of them.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-8">
                <Button variant="sage-outline" href="/about" arrow>
                  Read full story
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          10) TESTIMONIALS — (06) slider of 3
          ════════════════════════════════════════════════════════ */}
      <Section bg="bg-bone-deep">
        <SectionHeader
          title="Real people, real outcomes."
          description="Three members on three different tracks. Stories shared with consent."
          align="left"
          className="mb-14"
        />

        <TestimonialsSlider />
      </Section>

      {/* ════════════════════════════════════════════════════════
          11) CGM TEASER — slim, clearly secondary
          ════════════════════════════════════════════════════════ */}
      <Section bg="bg-bone">
        <Reveal>
          <div className="bg-sage-tint rounded-[20px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-5 max-w-2xl">
              <span className="hidden sm:inline-flex shrink-0 w-12 h-12 rounded-full bg-sage text-bone items-center justify-center text-body-sm font-medium">
                +
              </span>
              <div>
                <p className="text-eyebrow text-sage mb-2">Add-on · metabolic track</p>
                <h3 className="text-h4 font-display text-ink mb-1">
                  Managing borderline sugar?
                </h3>
                <p className="text-body-sm text-ink-soft">
                  Ask about our Continuous Glucose Monitoring program — sensor-driven,
                  doctor-supervised. ₹15,000 for 6 months.
                </p>
              </div>
            </div>
            <Button variant="sage-outline" href="/cgm" arrow>
              Learn about CGM
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ════════════════════════════════════════════════════════
          12) PRICING TEASER — 3 compact plans
          ════════════════════════════════════════════════════════ */}
      <Section bg="bg-bone-deep">
        <SectionHeader
          title="Plans that fit your needs."
          description="All plans include a medical assessment and a personalised program. No long-term contracts."
          align="left"
          className="mb-12"
        />

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5" staggerDelay={0.08}>
          {plans.map((p) => {
            const isPopular = p.popular;
            return (
              <div
                key={p.name}
                className={`relative rounded-[18px] p-6 md:p-7 flex flex-col gap-4 h-full hairline ${
                  isPopular ? "bg-sage-deep text-bone" : "bg-calcium text-ink"
                }`}
              >
                {isPopular && (
                  <span className="self-start text-caption font-medium bg-clay text-calcium rounded-pill px-3 py-1">
                    Most popular
                  </span>
                )}
                <div>
                  <p className={`text-eyebrow ${isPopular ? "text-clay-soft" : "text-clay"}`}>
                    {p.name}
                  </p>
                  <p className={`text-h3 font-display mt-2 ${isPopular ? "text-bone" : "text-ink"}`}>
                    ₹{p.price.toLocaleString("en-IN")}
                    <span className={`text-caption font-normal ${isPopular ? "text-bone/60" : "text-ink-soft"}`}>
                      {p.period}
                    </span>
                  </p>
                </div>
                <ul className="flex flex-col gap-2.5 text-body-sm flex-1">
                  {p.features.map((f) => (
                    <li key={f.label} className="flex items-start gap-2.5">
                      {f.included ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`shrink-0 mt-0.5 ${isPopular ? "text-clay-soft" : "text-clay"}`}
                          aria-label="Included"
                        >
                          <path d="M4 10l4 4 8-8" />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`shrink-0 mt-0.5 ${isPopular ? "text-bone/30" : "text-ink-soft/40"}`}
                          aria-label="Not included"
                        >
                          <path d="M6 6l8 8M14 6l-8 8" />
                        </svg>
                      )}
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
                <Button
                  variant={isPopular ? "clay" : "sage-outline"}
                  size="md"
                  href="/pricing"
                  arrow
                  className="w-full justify-center"
                >
                  See plan
                </Button>
              </div>
            );
          })}
        </Stagger>

        <p className="text-caption text-ink-soft mt-6 italic">
          TODO: confirm pricing with client — founder also referenced a ₹15,000 / 6-month program option.
        </p>
      </Section>

      {/* ════════════════════════════════════════════════════════
          13) FINAL CTA
          ════════════════════════════════════════════════════════ */}
      <CTASection
        headline="Your joints deserve better than painkillers and rest."
        description="Take a 2-minute assessment and find the right program for your body."
        primaryHref="/assessment"
        primaryLabel="Take free assessment"
        secondaryHref="/contact"
        secondaryLabel="Book consultation"
        variant="sage"
      />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   Small helpers
   ══════════════════════════════════════════════════════════════ */

function ConditionCard({
  name,
  note,
  href,
  Icon,
}: {
  name: string;
  note: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      href={href}
      className="group glow-card shrink-0 w-[280px] md:w-[320px] bg-calcium rounded-[16px] p-5 flex items-start gap-4"
    >
      <Icon className="w-10 text-sage opacity-70 shrink-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div>
        <p className="text-body font-medium text-ink">{name}</p>
        <p className="text-caption text-ink-soft mt-1">{note}</p>
      </div>
    </Link>
  );
}

function DecimalCounter({ value }: { value: number }) {
  // Counter primitive integer-rounds; render 4.9 statically (still in-view triggered via parent reveal feel)
  return <span>{value.toFixed(1)}</span>;
}

function SplitRevealInline({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  // Light inline wrapper so the italic emphasis word can render outside SplitReveal's word-split
  return (
    <span className="inline-block">
      <Reveal delay={delay}>{children}</Reveal>
    </span>
  );
}

