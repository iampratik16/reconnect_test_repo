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
import { asset } from "@/lib/asset";
import TestimonialsSlider from "./_components/TestimonialsSlider";
import HeroMedia from "./_components/HeroMedia";
import WhyReconnectSection from "./_components/WhyReconnectSection";
import ScienceSection from "./_components/ScienceSection";
import PreventionTimeline from "./_components/PreventionTimeline";
import ConditionsGrid from "./_components/ConditionsGrid";
import MethodSection from "./_components/MethodSection";
import ChooseYourPath from "./_components/ChooseYourPath";
import FourPillarsShowcase from "@/components/FourPillarsShowcase";

export const metadata: Metadata = {
  title: "Reconnect Wellness | Joint Pain & Arthritis Exercise Program",
  description:
    "Doctor-designed strength & nutrition program for joint pain, arthritis, and bone health. Personalized, evidence-backed exercises.",
};

/* ── Data ──────────────────────────────────────────────────── */


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
    body: "A 16-week cycle with milestones and reassessment — the direction a generic app can’t give you.",
  },
];

const conditions = [
  { name: "Knee Osteoarthritis",         note: "Stairs, getting up, walking distance",  href: "/programs/manage",  Icon: KneeSvg },
  { name: "Chronic Back Pain",           note: "Posture, stiffness, daily ache",        href: "/programs/manage",  Icon: SpineSvg },
  { name: "Disc Bulge / Sciatica",       note: "Nerve symptoms, radiating pain",        href: "/programs/strengthen", Icon: SpineSvg },
  { name: "Rheumatoid Arthritis",        note: "Autoimmune joint inflammation",         href: "/programs/manage",  Icon: HandSvg },
  { name: "Osteoporosis",                note: "Bone density, fracture risk",           href: "/programs/strengthen", Icon: SkeletonSvg },
  { name: "Frozen Shoulder",             note: "Stiffness, range of motion loss",       href: "/programs/manage",  Icon: HandSvg },
  { name: "Cervical (Neck) Pain",        note: "Posture-driven cervical strain",        href: "/programs/manage",  Icon: SpineSvg },
  { name: "Post-menopausal Bone Loss",   note: "Density support after menopause",       href: "/programs/prevent", Icon: SkeletonSvg },
  { name: "Joint Stiffness",             note: "Morning stiffness, reduced mobility",   href: "/programs/manage",  Icon: HipSvg },
  { name: "Hip Pain",                    note: "Hip OA, post-replacement, instability", href: "/programs/strengthen", Icon: HipSvg },
];

const darkPoints = [
  { title: "Reconnect Strength", body: "Rebuild lost muscle and load-bearing strength — the base everything else is built on." },
  { title: "Reconnect Joints", body: "Calm arthritis and joint pain, then build the strength that protects them." },
  { title: "Reconnect Spine", body: "Neck, back, and disc issues met at the source — posture, core, and control." },
  { title: "Reconnect Pain", body: "We work around pain, respect it, and reduce it — never push through it." },
  { title: "Reconnect Metabolism", body: "Tackle the blood sugar and inflammation that quietly drive joint and bone loss." },
];

/* ── Page ──────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* Spine GLB preload removed with the "Built like a spine" section. */}
      <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.gstatic.com" />
      {/* ════════════════════════════════════════════════════════
          1) HERO — full-bleed video, bottom-anchored editorial copy,
                    floating glass credibility chip, scroll indicator.
          ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[86svh] md:min-h-[100svh] overflow-hidden bg-sage-deep">
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
                  A doctor-designed strength and nutrition program for joint pain,
                  neck or back issues, chronic body pains, and for stronger bones and muscles.
                </p>
              </Reveal>

              <Reveal delay={0.7}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
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

      {/* STAT STRIP removed per client request. */}

      {/* ════════════════════════════════════════════════════════
          3) THE DIFFERENTIATOR — (01) Why Reconnect
          ════════════════════════════════════════════════════════ */}
      <WhyReconnectSection />

      {/* ════════════════════════════════════════════════════════
          4) THE SCIENCE — (02) Cinematic image bento
          ════════════════════════════════════════════════════════ */}
      <ScienceSection />

      {/* ════════════════════════════════════════════════════════
          4b) BUILT FOR PREVENTION — primary highlight, before Conditions
          ════════════════════════════════════════════════════════ */}
      <Section bg="bg-bone">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Prevention divergence: two scroll-drawn paths from age 40 — the
              widening gap between "do nothing" and "with Reconnect" is the pitch. */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <Reveal>
              {/* Divergence chart, pre-composed to a 4:5 frame (dark padding baked
                  into the PNG) so it fills the card edge-to-edge with no letterbox. */}
              <figure className="relative rounded-[20px] overflow-hidden shadow-card aspect-[4/5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset("/prevention-divergence.png")}
                  alt="From age 40, two paths diverge: with Reconnect, joint mobility and comfort hold and rise; on the standard path they decline into stiffness and pain."
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </figure>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Built for prevention</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-h2 font-display text-ink mt-6">
                Built for the prevention of joint pain and arthritis.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg text-ink-soft mt-6 max-w-xl">
                The damage almost never starts with a diagnosis. It starts with the way we live.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-body text-ink-soft mt-4 max-w-xl">
                If you’re somewhere between 30 and 50 — building a career at a desk for ten or
                twelve hours a day, raising kids, eating on the run, with no real time for the
                gym — your body is quietly keeping score. The stiff neck. The lower back that
                aches by evening. The shoulder that never fully loosens. None of it is bad
                enough to see a doctor for. <em className="serif-italic">Yet.</em> That “yet” is
                exactly where Reconnect works.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="serif-italic text-h4 text-clay mt-6 max-w-xl">
                Movement is natural. Sitting still for twelve hours isn’t.
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <p className="text-body text-ink-soft mt-4 max-w-xl">
                Prevention here isn’t a workout plan you’ll quit in three weeks. It’s a safety
                net — small, doctor-guided changes now (a movement snack every hour, thirty
                focused minutes you can do at home) so the next decade asks far less of you.
                Look after it at 40, and your 50s feel better.
              </p>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button variant="clay" href="/programs/prevent" arrow>
                  Start with prevention
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* The story, made human: what tends to happen — and where it can turn */}
        <PreventionTimeline />
      </Section>

      {/* ════════════════════════════════════════════════════════
          5) CONDITIONS — editorial masonry grid
          ════════════════════════════════════════════════════════ */}
      <ConditionsGrid />

      {/* "Built like a spine" (Connected by design) section removed per client request. */}

      {/* ════════════════════════════════════════════════════════
          6) THE METHOD — morphing body silhouette
          ════════════════════════════════════════════════════════ */}
      <MethodSection />

      {/* ════════════════════════════════════════════════════════
          7) PROGRAMS — (03) the joint-health spectrum
          ════════════════════════════════════════════════════════ */}
      <ChooseYourPath />

      {/* ═══════════════════════════════════════════════════════
          TEASER: FOUR PILLARS
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <SectionHeader
              eyebrow="Your daily toolkit"
              title="What you'll actually use every day."
              align="left"
            />
            <p className="text-body text-ink-soft mt-6 max-w-md">
              It's not just a program. It's a complete experience designed to keep
              you engaged, informed, and supported.
            </p>
          </div>

          <div>
            <FourPillarsShowcase variant="teaser" />
            <Button
              variant="clay"
              href={asset("/pricing")}
              arrow
              className="mt-8"
            >
              Explore pricing
            </Button>
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          8) WHAT MAKES US DIFFERENT — DARK contrast moment
          ════════════════════════════════════════════════════════ */}
      <section className="relative bg-sage-deep text-bone py-24 md:py-32 overflow-hidden">
        <SpineSvg className="absolute right-[-100px] top-[20px] w-[460px] text-bone opacity-[0.05] pointer-events-none hidden md:block" />

        <div className="container-site relative">
          <Reveal>
            <p className="text-eyebrow text-clay-soft">Our programs</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-h2 font-display text-bone max-w-3xl mt-4">
              This isn’t a fitness app.{" "}
              <span className="serif-italic text-clay-soft">It’s science that moves you.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg text-bone/65 mt-5 max-w-2xl">
              Five focused programs, one connected method — each designed and overseen by a
              rheumatologist.
            </p>
          </Reveal>

          <Stagger
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
            staggerDelay={0.08}
          >
            {darkPoints.map((p, i) => (
              <article
                key={p.title}
                className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-7 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-clay-soft/30 bg-clay-soft/10 text-eyebrow text-clay-soft">
                  0{i + 1}
                </span>
                <h4 className="text-h4 font-display text-bone mt-5 mb-2">{p.title}</h4>
                <p className="text-body-sm text-bone/70">{p.body}</p>
              </article>
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
                  src={asset("/dr-shruthi2.jpeg")}
                  alt="Dr. Shruthi Desai, Rheumatologist"
                  loading="lazy"
                  // Portrait image: natural aspect (h-auto) at every breakpoint so
                  // the whole image shows uncropped on phones, all tablets and desktop.
                  className="w-full h-auto"
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
                MBBS, MRCP (Internal Medicine), MRCP (SCE) Rheumatology, Fellowship in
                Rheumatology &amp; Immunology. A physician and rheumatologist trained across the UK
                and India, she brings together a passion for fitness and the science of medicine
                to build holistic, personalised care.
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
                <Button variant="sage-outline" href="/reconnect-team" arrow>
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

      {/* Pricing teaser removed from home per client request. */}

      {/* ════════════════════════════════════════════════════════
          13) FINAL CTA
          ════════════════════════════════════════════════════════ */}
      <CTASection
        headline="Your joints deserve better than painkillers and rest."
        description="Book a consultation and find the right program for your body."
        primaryHref="/contact"
        primaryLabel="Book consultation"
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

function SplitRevealInline({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  // Light inline wrapper so the italic emphasis word can render outside SplitReveal's word-split
  return (
    <span className="inline-block">
      <Reveal delay={delay}>{children}</Reveal>
    </span>
  );
}

