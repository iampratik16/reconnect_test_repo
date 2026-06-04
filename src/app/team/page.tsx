import type { Metadata } from "next";
import { asset } from "@/lib/asset";
import Section from "@/components/Section";
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
// NOTE: Names, photos and credentials below are placeholders for the
// demo build. Replace with the real team's details and portraits.

const lead = {
  name: "Dr. Shruthi Desai",
  role: "Founder & Medical Lead",
  credentials: "MBBS, MD (Internal Medicine), DM (Rheumatology)",
  image: "/dr-shruthi.jpg",
  bio: "The rheumatologist who designed Reconnect. Every program begins with her medical assessment — nothing is prescribed without understanding the body it’s for.",
};

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
          1) HERO
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-bone pt-32 md:pt-40 pb-20 md:pb-28">
        <SkeletonSvg className="watermark text-ink right-[-140px] top-[60px] w-[560px] hidden md:block" />

        <div className="container-site relative">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Our team</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-hero text-ink mt-6 leading-[0.95]">
                The people behind your{" "}
                <span className="serif-italic text-clay">recovery.</span>
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
                  Take free assessment
                </Button>
                <Button variant="ghost" size="lg" href="/contact">
                  Talk to the team
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2) MEDICAL LEAD — featured
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone-deep">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <figure className="relative">
                <div className="relative rounded-[20px] overflow-hidden shadow-lifted xray-glow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(lead.image)}
                    alt={`${lead.name}, ${lead.role} at Reconnect`}
                    loading="lazy"
                    className="w-full h-[420px] md:h-[480px] object-cover"
                  />
                </div>
              </figure>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <SectionHeader
              eyebrowNumber="(01)"
              eyebrow="The medical lead"
              title="It starts with the doctor."
              align="left"
            />
            <Reveal delay={0.1}>
              <div className="mt-8">
                <h3 className="text-h3 font-display text-ink">{lead.name}</h3>
                <p className="text-body font-medium text-clay mt-1">{lead.role}</p>
                <p className="text-caption text-ink-soft mt-2">{lead.credentials}</p>
                <p className="text-body-lg text-ink-soft mt-6 max-w-xl">{lead.bio}</p>
                <div className="mt-8">
                  <Button variant="ghost" size="md" href="/about" arrow>
                    More about Dr.&nbsp;Shruthi
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

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
        primaryLabel="Take free assessment"
        secondaryHref="/contact"
        secondaryLabel="Book consultation"
        variant="sage"
      />
    </>
  );
}
