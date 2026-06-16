import Link from "next/link";
import { asset } from "@/lib/asset";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import Stagger from "@/components/Stagger";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Pill from "@/components/Pill";
import CTASection from "@/components/CTASection";
import Accordion from "@/components/Accordion";
import { SkeletonSvg } from "@/components/AnatomicalArt";
import RoadmapTimeline from "./RoadmapTimeline";
import { programDetails, type ProgramDetail } from "@/lib/content/programDetails";
import { testimonials } from "@/lib/content/testimonials";

interface ProgramDetailTemplateProps {
  slug: ProgramDetail["slug"];
}

export default function ProgramDetailTemplate({ slug }: ProgramDetailTemplateProps) {
  const data = programDetails[slug];
  const testimonial = testimonials.find((t) => t.name === data.testimonialName);
  const Icon = data.heroIcon;

  /* italic-clay highlight inside the headline */
  const renderPromise = (line: string, word: string) => {
    if (!word) return line;
    const parts = line.split(new RegExp(`(${word})`, "i"));
    return parts.map((part, i) =>
      part.toLowerCase() === word.toLowerCase() ? (
        <span key={i} className="serif-italic text-clay">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1) HERO
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-bone pt-32 md:pt-40 pb-16 md:pb-24">
        <SkeletonSvg className="watermark text-ink right-[-140px] top-[80px] w-[520px] hidden md:block" />

        <div className="container-site relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 xray-glow">
              <Reveal delay={0.1}>
                <h1 className="text-hero text-ink">
                  {renderPromise(data.promise, data.italicWord)}
                </h1>
              </Reveal>
              {data.subhead && (
                <Reveal delay={0.2}>
                  <p className="text-body-lg text-ink-soft mt-8 max-w-2xl">{data.subhead}</p>
                </Reveal>
              )}

              {data.whoFor.length > 0 && (
                <Reveal delay={0.3}>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {data.whoFor.map((chip) => (
                      <Pill key={chip} variant="sage">
                        {chip}
                      </Pill>
                    ))}
                  </div>
                </Reveal>
              )}

              <Reveal delay={0.4}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Button variant="clay" size="lg" href="/assessment" arrow>
                    Take the free assessment
                  </Button>
                  <Button variant="ghost" size="lg" href="/programs">
                    Back to all tracks
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.2}>
                <div className="relative rounded-[20px] overflow-hidden shadow-soft">
                  {/* TODO: replace with Dr. Shruthi's consented patient/clinic photography */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(data.heroImage)}
                    alt={data.heroImageAlt}
                    loading="lazy"
                    className="w-full h-[360px] md:h-[460px] lg:h-[520px] object-cover"
                  />
                  <Icon className="absolute right-6 top-6 w-20 text-bone/40 pointer-events-none" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          1b) WHO IS IT FOR?  (optional — Prevent only)
          ═══════════════════════════════════════════════════════ */}
      {data.whoIsItFor && (
        <Section bg="bg-bone">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <SectionHeader
                eyebrow={data.whoIsItFor.eyebrow}
                title={data.whoIsItFor.title}
                align="left"
                className="mb-10"
              />
              <div className="flex flex-col gap-8">
                {data.whoIsItFor.groups.map((g) => (
                  <div key={g.heading}>
                    <p className="text-eyebrow text-clay mb-3">{g.heading}</p>
                    <ul className="flex flex-col gap-2.5">
                      {g.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-body text-ink-soft">
                          <CheckMark />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={0.15}>
                <div className="grid grid-cols-2 gap-4">
                  {data.whoIsItFor.images.map((src) => (
                    <div
                      key={src}
                      className="relative overflow-hidden rounded-2xl shadow-soft aspect-square"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={asset(src)}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </Section>
      )}

      {/* ═══════════════════════════════════════════════════════
          2) IS THIS YOU?
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone-deep">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrowNumber="(01)"
              eyebrow="Self-identify"
              title={data.signalsHeadline}
              description="If two or more of these feel familiar, this is your track. The assessment will confirm it."
              align="left"
            />
            {data.signalsImage && (
              <Reveal delay={0.2}>
                <div className="relative mt-8 rounded-2xl overflow-hidden shadow-soft aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(data.signalsImage)}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-7">
            <Stagger className="grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-3" staggerDelay={0.06}>
              {data.signals.map((signal) => (
                <div
                  key={signal}
                  className="flex items-start gap-3 bg-calcium rounded-[16px] p-4 hairline h-full"
                >
                  <CheckMark />
                  <p className="text-body-sm text-ink">{signal}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          3) 12-WEEK ROADMAP (sticky-scroll timeline)
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone">
        {data.roadmapImage ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-14 md:mb-20">
            <div className="lg:col-span-7">
              <SectionHeader
                eyebrowNumber="(02)"
                eyebrow={data.roadmapEyebrow ?? "The 16-week roadmap"}
                title="What the cycle actually looks like."
                description={data.roadmapLead}
                align="left"
              />
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.2}>
                <div className="relative rounded-2xl overflow-hidden shadow-soft aspect-[5/4]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(data.roadmapImage)}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        ) : (
          <SectionHeader
            eyebrowNumber="(02)"
            eyebrow={data.roadmapEyebrow ?? "The 16-week roadmap"}
            title="What the cycle actually looks like."
            description={data.roadmapLead}
            align="left"
            className="mb-16 md:mb-20"
          />
        )}

        <RoadmapTimeline phases={data.roadmap} />

        {data.bodyRegionNote && (
          <p className="text-body-sm text-ink-soft italic mt-12 max-w-2xl border-l border-line pl-5">
            {data.bodyRegionNote}
          </p>
        )}
      </Section>

      {/* ═══════════════════════════════════════════════════════
          4) FOUR PILLARS — adapted for this severity
          ═══════════════════════════════════════════════════════ */}
      {data.pillars.length > 0 && (
        <Section bg="bg-bone-deep">
          <SectionHeader
            eyebrowNumber="(03)"
            eyebrow="The four pillars"
            title="The same method — tuned for you."
            description={data.pillarsIntro}
            align="left"
            className="mb-12"
          />

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.pillars.map((p, i) => (
              <Card key={p.name} padding="lg" className="bg-calcium flex flex-col gap-3 h-full">
                <div className="flex items-center justify-between">
                  <span className="text-eyebrow text-clay">0{i + 1}</span>
                  <span className="text-caption text-ink-soft">{p.name}</span>
                </div>
                <h4 className="text-h3 font-display text-ink">{p.name}</h4>
                <p className="text-body text-ink-soft">{p.body}</p>
              </Card>
            ))}
          </Stagger>
        </Section>
      )}

      {/* ═══════════════════════════════════════════════════════
          5) EXPECTED OUTCOMES
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone">
        <SectionHeader
          eyebrowNumber="(04)"
          eyebrow="Expected outcomes"
          title="What you can reasonably expect."
          description={data.outcomesIntro}
          align="left"
          className="mb-12"
        />

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.outcomes.map((o) => (
            <Card key={o.label} padding="md" className="bg-calcium flex flex-col gap-3 h-full">
              <div className="w-10 h-10 rounded-full bg-clay-soft text-clay-dark flex items-center justify-center">
                <CheckMark />
              </div>
              <h4 className="text-h4 font-display text-ink">{o.label}</h4>
              {o.body && <p className="text-body-sm text-ink-soft">{o.body}</p>}
            </Card>
          ))}
        </Stagger>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          6) MATCHING TESTIMONIAL
          ═══════════════════════════════════════════════════════ */}
      {testimonial && (
        <Section bg="bg-sage-deep">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-5">
                <div className="relative rounded-[20px] overflow-hidden shadow-soft xray-glow-sage aspect-[4/3]">
                  {/* TODO: replace with consented member photo */}
                  <img
                    src={asset(testimonial.image)}
                    alt={testimonial.imageAlt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 text-bone">
                <p className="text-eyebrow text-clay-soft mb-6">A member on this track</p>
                <blockquote className="text-h2 font-display leading-tight mb-8">
                  <span className="serif-italic text-clay-soft mr-[0.12em]">“</span>
                  {testimonial.quote}
                  <span className="serif-italic text-clay-soft ml-[0.08em]">”</span>
                </blockquote>

                <p className="text-body text-bone/70 mb-8 max-w-xl">{testimonial.story}</p>

                <div className="flex flex-wrap items-end gap-8 hairline-b border-bone/15 pb-6 mb-6">
                  <div>
                    <p className="text-caption text-bone/50">Member</p>
                    <p className="text-body font-medium text-bone">
                      {testimonial.name}, {testimonial.age}
                    </p>
                    <p className="text-body-sm text-bone/60">
                      {testimonial.condition} · {testimonial.location}
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="serif-italic text-h3 text-clay-soft">{testimonial.metric}</p>
                    <p className="text-caption text-bone/50">{testimonial.metricLabel}</p>
                  </div>
                </div>

                <p className="text-caption text-bone/40">
                  Stories shared with explicit consent. Outcomes vary by individual.
                </p>
              </div>
            </div>
          </Reveal>
        </Section>
      )}

      {/* ═══════════════════════════════════════════════════════
          7) TRACK-SPECIFIC FAQ
          ═══════════════════════════════════════════════════════ */}
      {data.faqs.length > 0 && (
        <Section bg="bg-bone">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader
                eyebrowNumber="(05)"
                eyebrow="Questions about this track"
                title="The ones we hear most."
                align="left"
              />
              <p className="text-body-sm text-ink-soft mt-6">
                Not finding yours?{" "}
                <Link href="/contact" className="text-clay font-medium underline-offset-4 hover:underline">
                  Ask Dr.&nbsp;Shruthi directly.
                </Link>
              </p>
            </div>

            <div className="lg:col-span-8">
              <Accordion
                items={data.faqs.map((f) => ({
                  trigger: f.q,
                  content: <p>{f.a}</p>,
                }))}
              />
            </div>
          </div>
        </Section>
      )}

      {/* ═══════════════════════════════════════════════════════
          8) FINAL CTA
          ═══════════════════════════════════════════════════════ */}
      <CTASection
        headline={`Ready to start the ${data.name} track?`}
        description="Book a consultation with Reconnect team — we’ll confirm the right track and shape the program around your body."
        primaryHref="/contact"
        primaryLabel="Book consultation"
        variant="sage"
      />
    </>
  );
}

/* ── tiny inline check icon ────────────────────────────────── */
function CheckMark() {
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
      className="shrink-0 text-clay mt-0.5"
      aria-hidden="true"
    >
      <path d="M4 10l4 4 8-8" />
    </svg>
  );
}
