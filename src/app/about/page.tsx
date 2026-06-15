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
import { SkeletonSvg, KneeSvg } from "@/components/AnatomicalArt";

export const metadata: Metadata = {
  title: "About Dr. Shruthi",
  description:
    "Dr. Shruthi Desai, rheumatologist. MBBS, MRCP (Internal Medicine), MRCP (SCE) Rheumatology, Fellowship in Rheumatology & Immunology. Reconnect exists because she saw patients harmed by generic exercise advice.",
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

/* ── Page ──────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1) HERO — editorial portrait + credentials
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
                    {/* TODO: replace with Dr. Shruthi's preferred high-resolution editorial portrait */}
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
          2) ORIGIN STORY — long-form editorial
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone-deep">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrowNumber="(01)"
              eyebrow="Origin"
              title="How Reconnect came to be."
              align="left"
            />
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <div className="prose-editorial flex flex-col gap-6 text-body-lg text-ink-soft max-w-2xl">
                <p>
                  Shruthi trained in internal medicine before specialising in rheumatology. Her
                  clinical days are spent with people living with chronic conditions and chronic
                  pain — arthritis, joint pain, bone loss, autoimmune disease. She does not
                  operate. Surgical cases are referred to orthopaedics; she stays with the
                  longer arc of care that sits before and after the OR.
                </p>

                <p>
                  Reconnect began broader than it is today. The early idea was to support
                  patients across the spectrum of lifestyle conditions —
                  metabolic, cardiovascular, musculoskeletal. But six months in, the pattern in
                  patient response was unmistakable. The members who improved fastest, who
                  stuck with the program, who came back with measurably better outcomes — they
                  were the ones with bone and joint conditions, on personalised strength training.
                </p>

                <p>
                  So she narrowed. Reconnect now does one thing, and tries to do it as well as
                  any clinic in the country: rheumatologist-led, personalised strength training
                  for the bones and joints.
                </p>

                <p>
                  The reason it exists is plainer than the methodology. Too many of her patients
                  arrived at the clinic having been harmed by generic exercise advice — an
                  online routine that flared a knee, a gym programme that worsened a disc, a
                  generic fitness app prescribing impact loading to someone with osteoporosis. The cost
                  of getting it wrong, at this end of medicine, is high. Reconnect is the
                  alternative she wanted to be able to offer them.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          3) PHILOSOPHY PULL-QUOTE
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
              <Eyebrow number="(02)">Philosophy</Eyebrow>

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
          4) WHAT "DOCTOR-LED" MEANS — practice list
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone-deep">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrowNumber="(03)"
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
          5) WHY BONES & JOINTS — tracks + all-ages framing
          ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-bone section-py overflow-hidden">
        <KneeSvg className="watermark text-ink right-[-80px] bottom-[60px] w-[420px] hidden md:block" />

        <div className="container-site relative">
          <SectionHeader
            eyebrowNumber="(04)"
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
                  href={t.href}
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
          6) FINAL CTA
          ═══════════════════════════════════════════════════════ */}
      <CTASection
        headline="Want to talk it through?"
        description="Book a consultation directly with Reconnect team."
        primaryHref="/contact"
        primaryLabel="Book consultation"
        variant="sage"
      />
    </>
  );
}
