import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import Accordion from "@/components/Accordion";
import { SkeletonSvg, SpineSvg } from "@/components/AnatomicalArt";
import ContactForm from "./_components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Dr. Shruthi's team. Book a consultation, ask about a program, or message us — someone from the team will get in touch.",
};

type Way = {
  label: string;
  body: string;
  actionLabel: string;
  href: string;
  primary?: boolean;
};

const ways: Way[] = [
  {
    label: "Book a consultation",
    body: "A 20-minute call with Dr. Shruthi’s team to talk through your situation. The fastest way to know if Reconnect is right for you.",
    actionLabel: "Open booking →",
    href: "#contact-form",
    primary: true,
  },
  {
    label: "Email",
    body: "hello@reconnectwellness.in",
    actionLabel: "hello@reconnectwellness.in",
    href: "mailto:hello@reconnectwellness.in",
  },
  {
    label: "WhatsApp / phone",
    body: "Quickest for short questions — usually answered within a few working hours.",
    actionLabel: "+91 ⟪TODO⟫",
    href: "tel:+91",
  },
  {
    label: "Instagram",
    body: "Behind-the-scenes from the clinic and patient stories (with consent).",
    actionLabel: "@reconnectwellness",
    href: "https://instagram.com",
  },
  {
    label: "LinkedIn",
    body: "Connect with Dr. Shruthi professionally.",
    actionLabel: "Dr. Shruthi Desai",
    href: "https://linkedin.com",
  },
];

const reassurances = [
  "Reconnect is non-surgical — surgical cases are referred to orthopaedics.",
  "We work alongside your existing medication and treating doctor, never instead of them.",
  "Every program is designed by a rheumatologist; no prescriptions are modified by us.",
] as const;

/* ── FAQ ───────────────────────────────────────────────────── */

type FaqGroup = {
  id: string;
  label: string;
  blurb: string;
  items: { q: string; a: React.ReactNode }[];
};

const faqGroups: FaqGroup[] = [
  {
    id: "about-the-program",
    label: "About the program",
    blurb: "What Reconnect is, what it isn’t, and how it compares to the alternatives.",
    items: [
      {
        q: "How is this different from physiotherapy?",
        a: (
          <p>
            Physiotherapy focuses on rehabilitation after an injury or surgery — typically
            short-term and tied to a specific incident. Reconnect builds long-term,
            progressive strength designed for chronic joint and bone conditions. We&rsquo;re
            not a substitute for the physio you see after a fracture; we&rsquo;re the
            ongoing program that protects the joint for the next 30 years.
          </p>
        ),
      },
      {
        q: "How is this different from a generic fitness app or other available programmes?",
        a: (
          <p>
            Those give you one generic set of workouts based on height, weight, and a few
            preferences. We start with a medical assessment by a rheumatologist and design a
            program around your exact condition — split by body region (upper / lower /
            back / target joint) and started exactly where your problem is. Same age, same
            weight, different diagnosis — different program.
          </p>
        ),
      },
      {
        q: "Do you do surgery?",
        a: (
          <p>
            No. Dr. Shruthi is a rheumatologist; surgical cases are referred to orthopaedics.
            Reconnect focuses on non-surgical strength and pain management, both for people
            avoiding surgery and people rebuilding after one.
          </p>
        ),
      },
    ],
  },
  {
    id: "medical-and-safety",
    label: "Medical & safety",
    blurb: "How we work alongside your existing care — and where we draw the line.",
    items: [
      {
        q: "Will this replace my doctor or medication?",
        a: (
          <p>
            No. Reconnect works alongside your existing treatment. Programs are designed by a
            rheumatologist to complement your care, not replace it. We do not modify
            prescriptions; we coordinate with your treating doctor when needed. As pain and
            function improve, your physician may choose to taper medication — that decision is
            theirs.
          </p>
        ),
      },
      {
        q: "I’ve never exercised, or I’m in significant pain right now. Is this for me?",
        a: (
          <p>
            Yes — this is exactly who the program is built for. We calm the pain first with
            the right measures, then start gently and progress gradually. If you&rsquo;ve never
            picked up a dumbbell, we won&rsquo;t throw heavy numbers at you. The plan adapts
            to your daily pain level, not the other way around.
          </p>
        ),
      },
      {
        q: "Can I join if I’m already on arthritis medication?",
        a: (
          <p>
            Yes. The medical assessment accounts for your current treatment, condition, and
            any limitations your treating doctor has set. Many of our members are on long-term
            anti-inflammatories or DMARDs — the program is built around that, not despite it.
          </p>
        ),
      },
      {
        q: "Is it safe for severe arthritis, rheumatoid arthritis, or post-surgical rebuilding?",
        a: (
          <p>
            Yes, with the right track and the right modifications. The{" "}
            <Link
              href="/programs/strengthen"
              className="text-clay font-medium underline-offset-4 hover:underline"
            >
              Strengthen track
            </Link>{" "}
            specifically handles post-surgery and severe degeneration with milestone-gated
            progression and close coordination with your treating surgeon or physician. We are
            non-surgical ourselves; we follow your doctor&rsquo;s lead on restrictions.
          </p>
        ),
      },
    ],
  },
  {
    id: "logistics-and-pricing",
    label: "Logistics & pricing",
    blurb: "Plans, time commitment, equipment, and how membership works in practice.",
    items: [
      {
        q: "How much does it cost? What plans are available?",
        a: (
          <p>
            Two monthly plans with a minimum 4-month program: Basic (₹5,000/mo — most popular)
            and Premium (₹10,000/mo).{" "}
            <Link
              href="/pricing"
              className="text-clay font-medium underline-offset-4 hover:underline"
            >
              See all plans →
            </Link>
          </p>
        ),
      },
      {
        q: "Do I need gym equipment to start?",
        a: (
          <p>
            No. Most programs begin with bodyweight movement and resistance bands. As you
            progress, light dumbbells help — but a full home gym is never required. Most
            members train entirely at home.
          </p>
        ),
      },
      {
        q: "How much time per week does the program take?",
        a: (
          <p>
            Typically three sessions of around 45 minutes each, plus a short daily movement
            habit. Designed to fit a working week — not to replace one.
          </p>
        ),
      },
      {
        q: "Can I pause or cancel my plan?",
        a: (
          <p>
            Yes — both. Pause for travel, surgery, or any other reason; cancel any
            time before your next billing cycle. No long-term contracts, no lock-ins.
          </p>
        ),
      },
    ],
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          INTRO
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-bone pt-32 md:pt-40 pb-12 md:pb-16">
        <SkeletonSvg className="watermark text-ink right-[-120px] top-[40px] w-[480px] hidden md:block" />

        <div className="container-site relative">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Contact</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-hero text-ink mt-6">
                Talk to the{" "}
                <span className="serif-italic text-clay">team.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-body-lg text-ink-soft mt-6 max-w-2xl">
                Whatever you need — a quick question, a booking, or context on a complicated
                case — there&rsquo;s a real person on the other end. Someone from the team will
                get in touch.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SPLIT: ways to reach us · form
          ═══════════════════════════════════════════════════════ */}
      <section className="bg-bone pb-32 md:pb-40">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* ── LEFT: warm copy + contact methods + reassurance ── */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <Reveal>
                <h2 className="text-h2 font-display text-ink">
                  Five ways to reach&nbsp;us.
                </h2>
                <p className="text-body text-ink-soft mt-4 max-w-md">
                  Pick whichever fits the moment. The form on the right is the easiest if
                  you&rsquo;ve got a few minutes to share context.
                </p>
              </Reveal>

              <div className="mt-10 flex flex-col">
                {ways.map((w, i) => (
                  <a
                    key={w.label}
                    href={w.href}
                    target={w.href.startsWith("http") ? "_blank" : undefined}
                    rel={w.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`group flex items-start justify-between gap-6 py-5 ${
                      i !== ways.length - 1 ? "border-b border-line" : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className={`text-eyebrow ${w.primary ? "text-clay" : "text-ink-soft"}`}>
                        {w.label}
                      </p>
                      <p className="text-body text-ink mt-2 break-words">{w.body}</p>
                    </div>
                    <span className="text-body-sm font-medium text-clay shrink-0 mt-1 opacity-70 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {w.actionLabel}
                    </span>
                  </a>
                ))}
              </div>

              {/* Reassurance block */}
              <Reveal delay={0.15}>
                <div className="mt-10 bg-sage-tint rounded-[18px] p-6">
                  <p className="text-eyebrow text-sage mb-4">Before you write</p>
                  <ul className="flex flex-col gap-3">
                    {reassurances.map((r) => (
                      <li key={r} className="flex items-start gap-3 text-body-sm text-ink">
                        <svg
                          width="16" height="16" viewBox="0 0 20 20" fill="none"
                          stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
                          className="shrink-0 text-sage mt-1"
                          aria-hidden="true"
                        >
                          <path d="M4 10l4 4 8-8" />
                        </svg>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* ── RIGHT: form ────────────────────────────────────── */}
            <div className="lg:col-span-7" id="contact-form">
              <Reveal delay={0.1}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAQ — common questions, answered before you ask
          ═══════════════════════════════════════════════════════ */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="relative bg-bone-deep section-py overflow-hidden scroll-mt-32"
      >
        <SpineSvg className="watermark text-ink left-[-100px] top-[40px] w-[440px] hidden md:block" />

        <div className="container-site relative">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Frequently asked</Eyebrow>
              <h2 id="faq-heading" className="text-h2 text-ink mt-5">
                Before you write,{" "}
                <span className="serif-italic text-clay">the common ones.</span>
              </h2>
              <p className="text-body-lg text-ink-soft mt-6">
                If yours isn&rsquo;t here, use any of the methods above —
                Dr.&nbsp;Shruthi&rsquo;s team reads every message and replies personally,
                usually within a working day.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 flex flex-col gap-16 md:gap-20">
            {faqGroups.map((group, gi) => (
              <section
                key={group.id}
                id={group.id}
                aria-labelledby={`${group.id}-heading`}
                className="scroll-mt-32"
              >
                <Reveal>
                  <p className="text-eyebrow text-clay mb-3">
                    ({String(gi + 1).padStart(2, "0")})
                  </p>
                  <h3
                    id={`${group.id}-heading`}
                    className="text-h3 font-display text-ink mb-3"
                  >
                    {group.label}
                  </h3>
                  <p className="text-body text-ink-soft mb-6 max-w-2xl">{group.blurb}</p>
                </Reveal>

                <Accordion
                  items={group.items.map((i) => ({
                    trigger: i.q,
                    content: i.a,
                  }))}
                />
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
