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
import { SkeletonSvg, KneeSvg, SpineSvg } from "@/components/AnatomicalArt";

export const metadata: Metadata = {
  title: "Reconnect Team",
  description:
    "Dr. Shruthi Desai — rheumatologist, founder and medical lead — and the small, multidisciplinary team that builds and runs your program. MBBS, MRCP (Internal Medicine), MRCP (SCE) Rheumatology, Fellowship in Rheumatology & Immunology.",
};

/* ── Data ──────────────────────────────────────────────────── */

const doctorLed = [
  {
    title: "Medical assessment first",
    body: "Every program begins with a rheumatologist-led intake. Nothing is prescribed without understanding the body it’s for.",
  },
  {
    title: "Program tuned to diagnosis",
    body: "The exercise, the load, the progression — all shaped by your condition, your imaging, your pain map. Not your height and weight.",
  },
  {
    title: "Works alongside your medication",
    body: "We don’t modify your prescriptions. The program runs alongside the care your physician is already providing — never instead of it.",
  },
  {
    title: "Coordinates with your treating doctor",
    body: "Where appropriate, we share progress notes and respect any restrictions your surgeon or physician has set.",
  },
] as const;

const tracks = [
  { name: "Prevent", note: "For 40+, family history, post-menopausal bone health.", href: "/programs/prevent" },
  { name: "Manage",  note: "For active arthritis, joint pain, back & neck pain, disc bulge.", href: "/programs/manage" },
  { name: "Strengthen", note: "For post-surgery, severe OA, post-fracture rebuild.", href: "/programs/strengthen" },
] as const;

const team = [
  {
    name: "Dr. Ajeya B N",
    role: "Family Physician · MBBS, DNB Family Medicine",
    pillar: "Medical",
    image: "/dr-ajeya.jpeg",
    objectPosition: "center 20%",
    bio: "A family physician with 10+ years at a leading Bengaluru corporate hospital, managing chronic conditions like diabetes, hypertension and obesity alongside acute in-hospital care. At Reconnect he brings depth in preventive health, vaccinations and long-term screening — keeping every member’s strength program safe within their broader medical picture.",
  },
  {
    name: "Dr. Madhavi Sawaitul",
    role: "Consultant Physiotherapist · BPTh, MIAP, AIFT, PGDHM",
    pillar: "Physiotherapy",
    image: "/dr-madhavi.jpeg",
    objectPosition: "center 25%",
    bio: "A consultant physiotherapist with 14+ years in musculoskeletal rehab, spine care, sports injuries and women’s health, with experience at Medanta Mediclinic and CIIMS Hospital. Certified in dry needling, Mulligan manual therapy, kinesiology taping and cupping, she designs structured rehabilitation that reduces pain, restores mobility and builds lasting functional strength.",
  },
  {
    name: "Aishwarya Chavan",
    role: "Physiotherapist · BPT",
    pillar: "Physiotherapy",
    image: "/aishwarya.jpeg",
    objectPosition: "center 25%",
    bio: "A physiotherapist across rheumatology, orthopaedics and musculoskeletal rehab — four years at ChanRe Rheumatology & Immunology Hospital and now at Jindal Charitable Hospital. Certified in dry needling and IASTM, she brings hands-on clinical skill to Reconnect’s exercise and recovery programs.",
  },
  {
    name: "Hemanth Naik M",
    role: "Fitness Trainer · ACE CPT, EREPS Certified",
    pillar: "Strength training",
    image: "/hemanth.jpeg",
    objectPosition: "center 20%",
    bio: "A government-certified fitness trainer (ACE, EREPS) with experience at Gold’s Gym, Cult Fitness and Yodha Martial Arts. A national-level wrestler, kickboxer and bodybuilding winner, he specialises in strength training, functional fitness and senior-citizen training — translating doctor-designed programs into safe, effective sessions for beginners, athletes and older adults alike.",
  },
  {
    name: "Renuka Prasad",
    role: "Strength Trainer",
    pillar: "Strength training",
    image: "/renuka.jpeg",
    objectPosition: "center 20%",
    bio: "Guides members through their progressions week to week, adjusting weight and range so strength builds without flaring the joint.",
  },
  {
    name: "Gracy Sridaran",
    role: "Nutritionist · Dip. Nutrition & Health",
    pillar: "Nutrition",
    image: "/gracy.jpeg",
    objectPosition: "center 38%",
    bio: "A nutritionist who pivoted from business to follow her passion for health. She builds personalised, evidence-based nutrition for weight management, diabetes, hypertension and pregnancy — powering Reconnect’s nutrition pillar so every member’s diet supports their joints, bones and recovery from within.",
  },
  {
    name: "Bhavana Kumarswamy",
    role: "Lead Clinical Psychologist",
    pillar: "Psychology",
    image: "/dr-bhavana.jpeg",
    objectPosition: "center 25%",
    bio: "Founder of Saha Wellness Center, with 10+ years across hospital and private practice. She partners with rheumatologists on the link between stress, chronic pain and immune health — helping members build resilience through pain, setbacks and slow weeks.",
  },
] as const;

const pillarVariant: Record<string, "sage" | "clay" | "bone"> = {
  Medical: "clay",
  Physiotherapy: "sage",
  "Strength training": "sage",
  Nutrition: "sage",
  Psychology: "bone",
};

/* ── Page ──────────────────────────────────────────────────── */

export default function ReconnectTeamPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1) HERO — your medical lead: Dr. Shruthi
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-bone pt-32 md:pt-40 pb-20 md:pb-28">
        <SkeletonSvg className="watermark text-ink right-[-140px] top-[60px] w-[560px] hidden md:block" />

        <div className="container-site relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <Reveal>
                <Eyebrow>Your medical lead</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-hero text-ink mt-6 leading-[0.95]">
                  Dr.&nbsp;Shruthi <span className="serif-italic text-clay">Desai.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-body-lg text-ink-soft mt-6 max-w-xl">
                  MBBS, MRCP (Internal Medicine), MRCP (SCE) Rheumatology, Fellowship in Rheumatology &amp; Immunology.{" "}
                  <br className="hidden sm:block" />
                  Rheumatologist. Non-surgical. The doctor who designed Reconnect.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="flex flex-wrap gap-2 mt-8">
                  <Pill variant="sage">Rheumatology</Pill>
                  <Pill variant="sage">Non-surgical</Pill>
                  <Pill variant="sage">Bones &amp; joints</Pill>
                  <Pill variant="sage">Personalised strength</Pill>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Button variant="clay" size="lg" href="/assessment" arrow>
                    Take the free assessment
                  </Button>
                  <Button variant="ghost" size="lg" href="/contact">
                    Book consultation
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <Reveal delay={0.15}>
                <figure className="relative">
                  <div className="relative rounded-[20px] overflow-hidden shadow-lifted xray-glow">
                    <img
                      src={asset("/dr-shruthi2.jpeg")}
                      alt="Dr. Shruthi Desai, Rheumatologist and founder of Reconnect Wellness"
                      loading="eager"
                      className="w-full h-[420px] md:h-[520px] object-cover object-top"
                    />
                  </div>
                  <figcaption className="text-caption text-ink-soft mt-4 max-w-xs">
                    Dr.&nbsp;Shruthi Desai, founder &amp; medical lead — Reconnect Wellness.
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2) THE WIDER TEAM — grid (immediately after Dr. Shruthi)
          ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-bone-deep section-py overflow-hidden">
        <SpineSvg className="watermark text-ink left-[-100px] top-[40px] w-[440px] hidden md:block" />

        <div className="container-site relative">
          <SectionHeader
            eyebrowNumber="(01)"
            eyebrow="The wider team"
            title="Five disciplines, one program."
            description="Dr. Shruthi sets the medical direction. Family medicine, physiotherapy, strength training, nutrition and psychology then work as one plan — coordinated, not handed off — so the bones and joints never heal in a silo."
            align="left"
            className="mb-12 max-w-3xl"
          />

          <Stagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
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
                    style={{ objectPosition: member.objectPosition }}
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
          3) ORIGIN STORY — long-form editorial
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrowNumber="(02)"
              eyebrow="Origin"
              title="How Reconnect came to be."
              align="left"
            />
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <div className="prose-editorial flex flex-col gap-6 text-body-lg text-ink-soft max-w-2xl">
                <p>
                  Dr&nbsp;Shruthi Desai is a qualified physician and rheumatologist. Her journey
                  has taken her across continents and through several medical subspecialities —
                  learning from the best in medical sciences in both the UK and India — while
                  coming to understand how central mental and emotional well-being are to the
                  journey of healing.
                </p>

                <p>
                  She strongly believes that health isn&rsquo;t something we chase, but something
                  we live. Bringing together her passion for fitness and the science of medicine,
                  she created Reconnect with a mission to prevent disease and effectively manage
                  chronic conditions — built on a firm belief in the power of reconnection, to
                  self and to nature.
                </p>

                <ul className="not-prose flex flex-col gap-4 mt-1">
                  <li className="flex gap-4">
                    <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-clay shrink-0" aria-hidden="true" />
                    <p className="text-body text-ink-soft">
                      <span className="font-medium text-ink">Scientific &amp; holistic care</span> —
                      combining evidence-based medical knowledge with practical lifestyle interventions.
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-clay shrink-0" aria-hidden="true" />
                    <p className="text-body text-ink-soft">
                      <span className="font-medium text-ink">A personalised approach</span> —
                      wellness programs tailored to your individual goals and health needs.
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-clay shrink-0" aria-hidden="true" />
                    <p className="text-body text-ink-soft">
                      <span className="font-medium text-ink">Empowerment through knowledge</span> —
                      helping you take charge of your health with the right tools and expert guidance.
                    </p>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          4) PHILOSOPHY PULL-QUOTE
          ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-ink section-py overflow-hidden">
        {/* Oversized opening quotation mark — intentional typographic motif */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-10 left-4 md:left-12 text-clay/15 font-display leading-none"
          style={{ fontSize: "clamp(16rem, 30vw, 34rem)" }}
        >
          &ldquo;
        </span>

        <div className="container-site relative">
          <Reveal>
            <div className="max-w-4xl">
              <Eyebrow number="(03)">Philosophy</Eyebrow>

              <blockquote className="mt-10 relative pl-6 md:pl-10 border-l-2 border-clay">
                <p className="text-hero text-calcium leading-[1.05]">
                  Exercise is not artificial. But{" "}
                  <span className="serif-italic text-clay">inactivity</span> is.
                </p>
                <p className="text-h3 font-display text-calcium/70 mt-8 max-w-3xl">
                  It&rsquo;s the medicine that needs you.
                </p>
                <footer className="text-caption text-calcium/50 mt-10 flex items-center gap-4">
                  <span className="h-px w-8 bg-clay/60" aria-hidden="true" />
                  Dr.&nbsp;Shruthi Desai, on the principles behind Reconnect
                </footer>
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5) WHAT "DOCTOR-LED" MEANS — practice list
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone-deep">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrowNumber="(04)"
              eyebrow="In practice"
              title={`What “doctor-led” actually means.`}
              description="It’s not a label — it’s a way of working that shows up at every step."
              align="left"
            />
          </div>

          <div className="lg:col-span-7">
            <Stagger className="flex flex-col" staggerDelay={0.08}>
              {doctorLed.map((item, i) => (
                <div
                  key={item.title}
                  className={`flex gap-6 py-7 ${
                    i !== doctorLed.length - 1 ? "border-b border-line" : ""
                  }`}
                >
                  <span className="text-eyebrow text-clay shrink-0 pt-1 w-10">
                    0{i + 1}
                  </span>
                  <div>
                    <h4 className="text-h4 font-display text-ink mb-2">{item.title}</h4>
                    <p className="text-body text-ink-soft">{item.body}</p>
                  </div>
                </div>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          6) WHY BONES & JOINTS — tracks + all-ages framing
          ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-bone section-py overflow-hidden">
        <KneeSvg className="watermark text-ink right-[-80px] bottom-[60px] w-[420px] hidden md:block" />

        <div className="container-site relative">
          <SectionHeader
            eyebrowNumber="(05)"
            eyebrow="Why bones & joints"
            title="The one thing we do, for every age."
            description="Bone and joint health is not just a problem for the elderly. It is a 40-year arc — and the early years are when you have the most leverage."
            align="left"
            className="mb-12 max-w-3xl"
          />

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
              {tracks.map((t) => (
                <a
                  key={t.name}
                  href={asset(t.href)}
                  className="group glow-card bg-calcium rounded-[18px] p-6 md:p-7 flex flex-col gap-3 h-full"
                >
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-h3 font-display text-ink">{t.name}</h4>
                    <span className="text-clay opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                  </div>
                  <p className="text-body-sm text-ink-soft">{t.note}</p>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-body-lg text-ink-soft max-w-3xl border-l border-clay pl-6 serif-italic">
              The same method runs under all three. The assessment decides which one is yours —
              and exactly how it’s built.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7) FINAL CTA
          ═══════════════════════════════════════════════════════ */}
      <CTASection
        headline="Meet the team that builds your plan."
        description="Book a consultation directly with Dr. Shruthi’s team."
        primaryHref="/contact"
        primaryLabel="Book consultation"
        variant="sage"
      />
    </>
  );
}
