/**
 * Per-track rich content for the Program Detail template.
 * Keyed by program slug; consumed by /programs/[slug]/page.tsx.
 *
 * Medical claims stay measured: works alongside existing care, never replaces it.
 * No cure language — outcomes describe trajectory, not promise.
 */

import type { ComponentType, SVGProps } from "react";
import {
  HandSvg,
  HipSvg,
  KneeSvg,
  SkeletonSvg,
  SpineSvg,
} from "@/components/AnatomicalArt";

type SvgComponent = ComponentType<{ className?: string } & SVGProps<SVGSVGElement>>;

export type RoadmapPhase = {
  label: string;        // e.g. "Weeks 1–4"
  title: string;        // e.g. "Settle the pain"
  body: string;
  focus: string[];      // 2-4 short focus tags
};

export type PillarAdaptation = {
  name: "Medical" | "Exercise" | "Nutrition" | "Mind Coaching";
  body: string;
};

export type Outcome = {
  label: string;
  body: string;
};

export type FaqItem = { q: string; a: string };

export type ProgramDetail = {
  slug: "prevent" | "manage" | "strengthen";
  name: string;
  promise: string;           // h1
  italicWord: string;        // word inside promise that should be italic-clay
  subhead: string;
  whoFor: string[];          // chips
  heroImage: string;
  heroImageAlt: string;
  heroIcon: SvgComponent;
  /** Optional per-section accent images (Prevent distributes three across the page). */
  signalsImage?: string;
  roadmapImage?: string;

  /** Optional "Who is it for?" audience section (rendered right after the hero). */
  whoIsItFor?: {
    eyebrow: string;
    title: string;
    groups: { heading: string; items: string[] }[];
    images: string[];
  };

  // Section 2
  signalsHeadline: string;
  signals: string[];

  // Section 3
  roadmapEyebrow?: string;   // optional override; defaults to "The 16-week roadmap"
  roadmapLead: string;       // short paragraph above timeline
  roadmap: RoadmapPhase[];
  bodyRegionNote: string;    // short line under timeline

  // Section 4
  pillarsIntro: string;
  pillars: PillarAdaptation[];

  // Section 5
  outcomesIntro: string;
  outcomes: Outcome[];

  // Section 6
  testimonialName: string;   // matches testimonials.ts `name`

  // Section 7
  faqs: FaqItem[];
};

/* ──────────────────────────────────────────────────────────── */

export const programDetails: Record<ProgramDetail["slug"], ProgramDetail> = {
  /* ═════════ PREVENT ═════════ */
  prevent: {
    slug: "prevent",
    name: "Prevent",
    promise: "Protect the joints and bones you’ll need at seventy — starting now.",
    italicWord: "now",
    subhead:
      "For early signs, family history, or age-related risk. A proactive 16-week program to build strength and bone density before problems start. Being protective now prevents future problems.",
    whoFor: ["Early arthritis signs", "Family history", "Post-menopausal bone health", "Adults 40+"],
    heroImage: "/prevent/desk-night.png",
    heroImageAlt: "A late night at the desk — the everyday posture and habits Prevent gets ahead of.",
    heroIcon: SkeletonSvg,
    signalsImage: "/prevent/desk-back.png",
    roadmapImage: "/prevent/desk-neck.png",

    whoIsItFor: {
      eyebrow: "Who it’s for",
      title: "For people looking to prevent the problem before it starts.",
      groups: [
        {
          heading: "Typical clientele",
          items: [
            "Busy professionals, entrepreneurs, executives, healthcare and IT workers, teachers, and parents.",
            "Spending long hours sitting, commuting, or working at a desk.",
            "Limited time for exercise despite understanding its importance.",
          ],
        },
        {
          heading: "Current health status",
          items: [
            "Not diagnosed with a major chronic disease yet.",
            "Beginning to notice early warning signs — pain in joints, neck, or back.",
            "Reduced fitness and stamina, with persistent body pains.",
            "Stiffness after prolonged sitting and poor posture.",
            "Low energy, and difficulty keeping up with children or recreational activities.",
          ],
        },
      ],
      images: [
        "/prevent/who-1.avif",
        "/prevent/who-2.avif",
        "/prevent/who-3.avif",
        "/prevent/who-4.webp",
      ],
    },

    signalsHeadline: "Is this you?",
    signals: [
      "You’re 40+ and want to stay ahead of joint wear.",
      "A parent or sibling has arthritis or osteoporosis.",
      "You’ve had occasional knee, back, or neck stiffness — nothing clinical yet.",
      "You’re post-menopausal and worried about bone density.",
      "You sit for long hours and have noticed posture or strength decline.",
      "Your last DEXA or blood panel had a borderline marker.",
    ],

    roadmapEyebrow: "The 16-week roadmap",
    roadmapLead:
      "A 16-week base-building cycle. Moderate, progressive — designed to lay down strength and bone density without flaring anything that’s already grumbling.",
    roadmap: [
      {
        label: "Weeks 1–4",
        title: "Foundation & assessment",
        body: "Rheumatologist-led intake, baseline strength testing, posture and joint screening. Movement re-education before loading anything.",
        focus: ["Posture", "Joint screening", "Movement quality"],
      },
      {
        label: "Weeks 4–8",
        title: "Activate & build",
        body: "Introduce light resistance across upper body, lower body, and posterior chain. Focus on the hips, spine, and shoulders — the sites most at risk.",
        focus: ["Hips", "Posterior chain", "Shoulders"],
      },
      {
        label: "Weeks 8–12",
        title: "Load & density",
        body: "Progressive loading to stimulate bone formation — squat patterns, hinge patterns, controlled impact where appropriate.",
        focus: ["Squat & hinge", "Bone-loading patterns", "Standing strength"],
      },
      {
        label: "Weeks 12–16",
        title: "Sustain",
        body: "Settle into the routine you’ll keep. Long-term habit, periodic reassessment, and a check-in cadence with the medical team.",
        focus: ["Habit lock-in", "Reassessment", "Maintenance"],
      },
    ],
    bodyRegionNote:
      "Exercise is split across upper body, lower body, back, and any joint with early signs — sequenced to start where the early signal showed up.",

    pillarsIntro: "How the four pillars are tuned for early-risk bodies:",
    pillars: [
      {
        name: "Medical",
        body: "Baseline screen + periodic reassessment. We coordinate with your physician on any existing supplementation (Vitamin D, calcium, HRT) — we never change prescriptions, we work alongside them.",
      },
      {
        name: "Exercise",
        body: "Moderate intensity, progressive. Heavier loading is introduced gradually once movement quality is solid. Bone-stimulating patterns prioritised.",
      },
      {
        name: "Nutrition",
        body: "Protein-led plan tuned to your veg / non-veg preference, calcium and Vitamin D adequacy reviewed, anti-inflammatory food patterns built in.",
      },
      {
        name: "Mind Coaching",
        body: "Referral only if we detect a block — typically adherence dips or post-menopausal mood shifts. Never reflexive.",
      },
    ],

    outcomesIntro:
      "What members on this track typically experience after a 16-week cycle. Trajectories — not promises — and they sit alongside, not instead of, your existing medical care.",
    outcomes: [
      {
        label: "Strength gained",
        body: "Measurable improvement in baseline strength tests across the major joints we’re protecting.",
      },
      {
        label: "Posture restored",
        body: "Better alignment through the spine and shoulders — the everyday posture losses caught early.",
      },
      {
        label: "Bone-loading habit",
        body: "A weekly load pattern shown in research to support bone density maintenance over time.",
      },
      {
        label: "Quiet confidence",
        body: "The reassurance that comes from knowing you’re no longer drifting toward future problems.",
      },
    ],

    testimonialName: "Amit Kapoor",

    faqs: [
      {
        q: "I don’t have any pain yet — is Prevent overkill?",
        a: "It’s the opposite. The early years before symptoms are when strength and density are most defensible. Once degeneration starts, you’re working uphill.",
      },
      {
        q: "I’m post-menopausal. Will this help bone density?",
        a: "Resistance training is one of the most reliable non-pharmacological levers for bone density, especially post-menopause. We coordinate with your treating physician on any supplementation or HRT you’re on.",
      },
      {
        q: "How much time per week?",
        a: "Three sessions of ~45 minutes, plus a brief daily movement habit. Designed to fit a working week.",
      },
      {
        q: "Can I keep my current gym or yoga routine?",
        a: "Often yes. We’ll review it in the assessment and integrate or adjust where it conflicts with what your body needs.",
      },
    ],
  },

  /* ═════════ MANAGE ═════════ */
  manage: {
    slug: "manage",
    name: "Manage",
    promise: "Calm the pain first. Then build a stronger body around it.",
    italicWord: "first",
    subhead:
      "For those living with arthritis, joint pain, back or neck pain, or disc issues. Take the knee story: the right medical measure calms the pain — then a full-body program is built around the joint to reduce flare-ups and rebuild resilience.",
    whoFor: ["Active arthritis", "Chronic joint pain", "Back / neck pain", "Disc bulge"],
    heroImage: "/mat-stretching.jpg",
    heroImageAlt: "TODO: replace with consented Manage-track member photo — guided session for active joint pain.",
    heroIcon: SpineSvg,

    signalsHeadline: "Is this you?",
    signals: [
      "You wake up with stiffness that takes time to ease.",
      "Stairs, getting up from a chair, or carrying a bag hurt more than they used to.",
      "You have a diagnosis — knee OA, RA, disc bulge, cervical pain — and you’re managing it.",
      "You’ve had flare-ups in the last six months.",
      "You’re on long-term painkillers or anti-inflammatories and want to need less.",
      "You stopped exercising because everything hurt — and now everything hurts more.",
    ],

    roadmapLead:
      "16 weeks built around your specific joint. We calm the pain first — with whatever medical measure is appropriate — then activate the muscles around it, then load the full body.",
    roadmap: [
      {
        label: "Weeks 1–4",
        title: "Settle the pain",
        body: "Coordinate with your physician on the right medical measure for flare control. Gentle, pain-respecting movement to restore baseline.",
        focus: ["Flare control", "Pain mapping", "Gentle range"],
      },
      {
        label: "Weeks 4–8",
        title: "Activate & build",
        body: "Switch on the muscles around the painful joint — quads for knees, glutes for hips, deep core for backs. Targeted, low load.",
        focus: ["Target muscle wake-up", "Joint stability", "Low-load strength"],
      },
      {
        label: "Weeks 8–12",
        title: "Muscles activating — start loading",
        body: "Now the supporting muscles are firing, we load progressively. Standing strength, real-life patterns, full-body work that protects the joint.",
        focus: ["Progressive load", "Standing strength", "Full-body integration"],
      },
      {
        label: "Weeks 12–16",
        title: "Resilience & sustain",
        body: "Higher capacity, fewer flare-ups, a routine you can carry. Periodic medical reassessment to confirm progress and adjust.",
        focus: ["Flare prevention", "Endurance", "Independent training"],
      },
    ],
    bodyRegionNote:
      "Exercise is split across upper body, lower body, back, and the target joint — sequenced to start exactly where the problem is.",

    pillarsIntro: "How the four pillars are tuned for active pain:",
    pillars: [
      {
        name: "Medical",
        body: "Rheumatologist-led intake, imaging review, medication audit. We coordinate with your treating physician — never replace them, never modify prescriptions unilaterally.",
      },
      {
        name: "Exercise",
        body: "Pain-first sequencing: calm, activate, then load. Intensity is low-to-moderate and scaled to flare status week-to-week.",
      },
      {
        name: "Nutrition",
        body: "Anti-inflammatory pattern, protein adequacy, weight-management support where it eases joint load. Veg / non-veg adapted.",
      },
      {
        name: "Mind Coaching",
        body: "Many members carry fear of movement or pain catastrophising. If we detect it, we refer in a clinical psychologist — it’s as load-bearing as the exercise.",
      },
    ],

    outcomesIntro:
      "What members on this track typically experience over a 16-week cycle. Trajectories — not promises — and the program works alongside, not instead of, your existing medical care.",
    outcomes: [
      {
        label: "Pain down",
        body: "Most members report meaningful reduction in day-to-day pain scores within the cycle. We track, we don’t guess.",
      },
      {
        label: "Mobility up",
        body: "Range of motion returns to joints that had quietly stiffened over years.",
      },
      {
        label: "Flare-ups fewer",
        body: "Stronger supporting muscles and a calmer joint reduce how often things flare — and how badly.",
      },
      {
        label: "Confidence back",
        body: "The activities you stopped — stairs, walks, picking up grandkids — come back into range.",
      },
    ],

    testimonialName: "Meera Raghavan",

    faqs: [
      {
        q: "I’m on long-term painkillers — will I have to stop?",
        a: "No. We don’t change your medication. We work alongside your treating physician; as pain reduces, they may choose to taper — that conversation is theirs.",
      },
      {
        q: "I’ve been told I need a knee replacement. Should I still try?",
        a: "Many members in this position improve enough to delay or avoid surgery — others use the program to enter surgery stronger and rebuild faster. The assessment will tell us which path is realistic for you.",
      },
      {
        q: "What if my pain flares mid-program?",
        a: "Flares are expected. The program adjusts intensity in the week of a flare and steps back up as it settles. We do not push through pain.",
      },
      {
        q: "Is this safe for rheumatoid arthritis?",
        a: "Yes, with the right modifications. We coordinate with your rheumatologist on disease activity and adjust load and timing accordingly.",
      },
    ],
  },

  /* ═════════ STRENGTHEN ═════════ */
  strengthen: {
    slug: "strengthen",
    name: "Strengthen",
    promise: "Rebuild real strength — carefully, with your doctor in the loop.",
    italicWord: "carefully",
    subhead:
      "For post-surgery, severe joint degeneration, or rebuilding after a fracture. The most cautious progression we offer — non-surgical ourselves, coordinating closely with your treating doctor at every stage.",
    whoFor: ["Post-surgery", "Severe osteoarthritis", "Post-fracture rebuild", "Deconditioning"],
    heroImage: "/trainer-guided-exercise.jpg",
    heroImageAlt: "TODO: replace with consented Strengthen-track member photo — supervised, doctor-guided strength session.",
    heroIcon: KneeSvg,

    signalsHeadline: "Is this you?",
    signals: [
      "You’ve had a recent joint replacement or other orthopaedic surgery.",
      "You’ve been told strength training is allowed, but you don’t know where to start.",
      "Severe OA limits what you can do — daily walks, stairs, standing.",
      "You’re post-fracture (often osteoporosis-related) and need to rebuild safely.",
      "Months of inactivity have left you deconditioned — sarcopenia, balance loss.",
      "Your treating doctor would happily share your case with a structured program.",
    ],

    roadmapLead:
      "A 16-week milestone-gated rebuild. Every phase has a checkpoint — we don’t progress until your body and your doctor say we should.",
    roadmap: [
      {
        label: "Weeks 1–4",
        title: "Protect & restore range",
        body: "Coordinate with your treating doctor on current restrictions. Restore joint range gently, retrain the muscles that switched off during inactivity.",
        focus: ["Protected range", "Muscle re-activation", "Doctor coordination"],
      },
      {
        label: "Weeks 4–8",
        title: "Activate & build base",
        body: "Low-load strength work on supporting muscles. Walking volume and balance training. Confidence in basic movement returns.",
        focus: ["Supporting muscles", "Walking volume", "Balance"],
      },
      {
        label: "Weeks 8–12",
        title: "Load — milestone-gated",
        body: "Progressive loading begins, but only once range, pain, and your doctor’s sign-off allow it. Standing strength, controlled compound patterns.",
        focus: ["Progressive load", "Standing strength", "Compound patterns"],
      },
      {
        label: "Weeks 12–16",
        title: "Independence",
        body: "Build a routine you can sustain solo, with periodic medical reassessment. Hand-off the maintenance plan to your treating doctor.",
        focus: ["Independent training", "Maintenance plan", "Doctor hand-off"],
      },
    ],
    bodyRegionNote:
      "Exercise is split across upper body, lower body, back, and the target joint or surgical site — always starting where you’re cleared to start.",

    pillarsIntro: "How the four pillars are tuned for cautious rebuilds:",
    pillars: [
      {
        name: "Medical",
        body: "We coordinate with your treating surgeon or physician throughout — current restrictions, imaging, sign-offs. We are non-surgical; we refer surgery questions back to them.",
      },
      {
        name: "Exercise",
        body: "Lowest intensity tier, milestone-gated. Nothing progresses without checkpoints. Most personalised programming of any track.",
      },
      {
        name: "Nutrition",
        body: "Protein optimisation for tissue repair, anti-inflammatory support, calcium and Vitamin D for bone. Veg / non-veg adapted.",
      },
      {
        name: "Mind Coaching",
        body: "Surgery and severe degeneration carry real psychological weight. If fear of re-injury or low mood is holding back progress, we refer in a clinical psychologist.",
      },
    ],

    outcomesIntro:
      "What members on this track typically experience. The slowest, most careful trajectory we offer — alongside, never instead of, your treating doctor’s care.",
    outcomes: [
      {
        label: "Safe range restored",
        body: "Joint range returns to functional levels within the limits your doctor has set.",
      },
      {
        label: "Strength rebuilt",
        body: "Supporting muscle returns — often the difference between depending on aids and walking unaided.",
      },
      {
        label: "Balance & fall risk",
        body: "Balance training reduces fall risk, especially important in osteoporosis and post-fracture cases.",
      },
      {
        label: "Confidence to move",
        body: "Many members arrive afraid to move. They leave with a routine — and the trust that they can use their body again.",
      },
    ],

    testimonialName: "Rajesh Sharma",

    faqs: [
      {
        q: "I’m three weeks post-surgery. Is it too early?",
        a: "Usually yes — we typically begin once your surgeon has cleared you for active rehabilitation. The assessment confirms timing in coordination with them.",
      },
      {
        q: "Do you work with my surgeon or physiotherapist?",
        a: "Yes. We see it as complementary. We share progress notes and respect any restrictions they’ve set.",
      },
      {
        q: "I have severe OA but want to avoid surgery — can you help?",
        a: "Often, yes. Many members improve enough to delay or avoid surgery. We are honest when surgery is the more reasonable path and we refer it back to your doctor.",
      },
      {
        q: "What if my doctor advises against strength training?",
        a: "We follow their lead. We won’t override clinical advice. Where there’s ambiguity, we’ll happily share our plan with them so they can review it.",
      },
    ],
  },
};
