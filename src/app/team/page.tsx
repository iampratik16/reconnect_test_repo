import type { Metadata } from "next";
import { asset } from "@/lib/asset";
import SectionHeader from "@/components/SectionHeader";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import Stagger from "@/components/Stagger";
import Button from "@/components/Button";
import Pill from "@/components/Pill";
import CTASection from "@/components/CTASection";
import { SkeletonSvg, SpineSvg } from "@/components/AnatomicalArt";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the rheumatologist-led, multidisciplinary team behind Reconnect — medical, movement, nutrition and psychology specialists who build and run your program together.",
};

/* ── Data ──────────────────────────────────────────────────── */
const team = [
  {
    name: "Priya Nair",
    role: "Lead Physiotherapist",
    pillar: "Movement",
    image: "/trainer-guided-exercise.jpg",
    bio: "Translates each diagnosis into a safe, progressive strength plan — tuning load, range and tempo to the joint, not the calendar.",
  },
  {
    name: "Dr. Arjun Menon",
    role: "Consultant Physician",
    pillar: "Medical",
    image: "/doctor-consultation.jpg",
    bio: "Runs intake reviews and coordinates with your treating doctor so the program always runs alongside your existing care, never instead of it.",
  },
  {
    name: "Meera Iyer",
    role: "Clinical Nutritionist",
    pillar: "Nutrition",
    image: "/virtual-coaching.jpg",
    bio: "Builds bone- and joint-supportive nutrition around your medication and condition — practical, not prescriptive.",
  },
  {
    name: "Kavya Rao",
    role: "Health Psychologist",
    pillar: "Psychology",
    image: "/knee-examination.jpg",
    bio: "Helps members stay with the program through pain, setbacks and slow weeks — because consistency is where the results actually live.",
  },
] as const;

const pillarVariant: Record<string, "sage" | "clay" | "bone"> = {
  Medical: "clay",
  Movement: "sage",
  Nutrition: "sage",
  Psychology: "bone",
};

/* ── Page ──────────────────────────────────────────────────── */

export default function TeamPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1) HERO — founder portrait + framing
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-bone pt-32 md:pt-40 pb-20 md:pb-28">
        <SkeletonSvg className="watermark text-ink right-[-180px] top-[60px] w-[520px] hidden lg:block" />

        <div className="container-site relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: framing copy */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <Reveal>
                <Eyebrow>Our team</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-hero text-ink mt-6 leading-[0.95]">
                  The visionary behind your{" "}
                  <span className="serif-italic text-clay">well-being.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-body-lg text-ink-soft mt-6 max-w-xl">
                  One rheumatologist sets the direction. A small, multidisciplinary
                  team builds and runs your program together — so the medicine,
                  the movement and the mindset all point the same way.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Button variant="clay" size="lg" href="/assessment" arrow>
                    Take the free assessment
                  </Button>
                  <Button variant="ghost" size="lg" href="/contact">
                    Talk to the team
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Right: founder portrait with name plate over the photo */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <Reveal delay={0.15}>
                <figure className="relative rounded-[20px] overflow-hidden shadow-lifted xray-glow aspect-[4/5]">
                  {/* Real portrait, 4× upscaled via Vertex (scripts/upscale-shruthi.mjs). */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset("/dr-shruthi-hires.png")}
                    alt="Dr. Shruthi Desai, Founder of Reconnect"
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  {/* Bottom scrim + name plate. `!absolute`/`!bottom-0` beat the
                      `.xray-glow > *` { position: relative } rule in globals.css. */}
                  <figcaption
                    className="absolute! inset-x-0 bottom-0! top-auto p-6 pt-16 z-10"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,41,92,0) 0%, rgba(0,41,92,0.78) 100%)",
                    }}
                  >
                    <p className="text-h4 font-display text-bone leading-tight">
                      Dr.&nbsp;Shruthi Desai
                    </p>
                    <p className="text-caption text-clay-soft mt-1">
                      Founder, Reconnect
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3) THE WIDER TEAM — grid
          ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-bone section-py overflow-hidden">
        <SpineSvg className="watermark text-ink left-[-100px] top-[40px] w-[440px] hidden md:block" />

        <div className="container-site relative">
          <SectionHeader
            eyebrowNumber="(02)"
            eyebrow="The wider team"
            title="Four disciplines, one program."
            description="Bones and joints don’t heal in a silo. Movement, medicine, nutrition and psychology work as one plan — coordinated, not handed off."
            align="left"
            className="mb-12 max-w-3xl"
          />

          <Stagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            staggerDelay={0.08}
          >
            {team.map((member) => (
              <article
                key={member.name}
                className="group glow-card bg-calcium rounded-[18px] overflow-hidden flex flex-col h-full"
              >
                <div className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(member.image)}
                    alt={`${member.name}, ${member.role} at Reconnect`}
                    loading="lazy"
                    className="w-full h-56 object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-3 left-3">
                    <Pill variant={pillarVariant[member.pillar]}>{member.pillar}</Pill>
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-1.5 flex-1">
                  <h3 className="text-h4 font-display text-ink">{member.name}</h3>
                  <p className="text-body-sm font-medium text-clay">{member.role}</p>
                  <p className="text-body-sm text-ink-soft mt-2">{member.bio}</p>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4) FINAL CTA
          ═══════════════════════════════════════════════════════ */}
      <CTASection
        headline="Meet the team that builds your plan."
        description="Take the assessment, or book a consultation to talk it through with someone from the team."
        primaryHref="/assessment"
        primaryLabel="Take the free assessment"
        secondaryHref="/contact"
        secondaryLabel="Book consultation"
        variant="sage"
      />
    </>
  );
}
