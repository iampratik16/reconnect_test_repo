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
    signalsImage: "/prevent-desk-woman.jpg",
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
        "/prevent/who-1.webp",
        "/lady.png",
        "/prevent/who-3.webp",
        "/prevent/who-4.webp",
      ],
    },

    signalsHeadline: "Is this you?",
    signals: [
      "You’re 30+ and want to stay ahead of joint wear.",
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
        body: "Doctor-led intake, baseline strength testing, posture and joint screening. Movement re-education before loading anything.",
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
        body: "Baseline screen + periodic reassessment.",
      },
      {
        name: "Exercise",
        body: "Moderate intensity, progressive. Heavier loading is introduced gradually once movement quality is good. Bone-stimulating patterns prioritised.",
      },
      {
        name: "Nutrition",
        body: "Protein-led plan tuned to your veg / non-veg preference, calcium and Vitamin D adequacy reviewed, anti-inflammatory food patterns built in.",
      },
      {
        name: "Mind Coaching",
        body: "Mind coach to improve consistency and remove any mental block",
      },
    ],

    outcomesIntro: "",
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
        a: "Resistance training is one of the most reliable non-pharmacological levers for bone density, especially post-menopause.",
      },
      {
        q: "How much time per week?",
        a: "Designed to suit your physical fitness level.",
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
    subhead: "",
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
        body: "",
        focus: ["Flare control", "Pain mapping", "Gentle range"],
      },
      {
        label: "Weeks 4–8",
        title: "Activate & build",
        body: "",
        focus: ["Target muscle wake-up", "Joint stability", "Low-load strength"],
      },
      {
        label: "Weeks 8–12",
        title: "Muscles activating — start loading",
        body: "",
        focus: ["Progressive load", "Standing strength", "Full-body integration"],
      },
      {
        label: "Weeks 12–16",
        title: "Resilience & sustain",
        body: "",
        focus: ["Flare prevention", "Endurance", "Independent training"],
      },
    ],
    bodyRegionNote:
      "Exercise is split across upper body, lower body, back, and the target joint — sequenced to start exactly where the problem is.",

    pillarsIntro: "How the four pillars are tuned for active pain:",
    pillars: [],

    outcomesIntro:
      "What members on this track typically experience over a 16-week cycle. Trajectories — not promises — and the program works alongside, not instead of, your existing medical care.",
    outcomes: [
      {
        label: "Pain down",
        body: "Most members report meaningful reduction in day-to-day pain scores within the cycle.",
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

    faqs: [],
  },

  /* ═════════ STRENGTHEN ═════════ */
  strengthen: {
    slug: "strengthen",
    name: "Strengthen",
    promise: "Rebuild real strength — carefully, with your doctor in the loop.",
    italicWord: "carefully",
    subhead: "",
    whoFor: ["Post-surgery", "Severe osteoarthritis", "Post-fracture rebuild", "Deconditioning"],
    heroImage: "/trainer-guided-exercise.jpg",
    heroImageAlt: "TODO: replace with consented Strengthen-track member photo — supervised, doctor-guided strength session.",
    heroIcon: KneeSvg,

    signalsHeadline: "Is this you?",
    signals: [
      "You’ve had a recent joint replacement or orthopaedic procedure.",
      "You’ve been told strength training is allowed, but you don’t know where to start.",
      "Pain limits what you can do — daily walks, stairs, standing.",
      "You’re post-fracture (often osteoporosis-related) and need to rebuild safely.",
      "Months of inactivity have left you deconditioned — sarcopenia, balance loss.",
      "You want to rebuild bone strength.",
    ],

    roadmapLead:
      "A 16-week milestone-gated rebuild. Every phase has a checkpoint — we don’t progress until your body and your doctor say we should.",
    roadmap: [
      {
        label: "Weeks 1–4",
        title: "Protect & restore range",
        body: "",
        focus: ["Protected range", "Muscle re-activation", "Doctor coordination"],
      },
      {
        label: "Weeks 4–8",
        title: "Activate & build base",
        body: "",
        focus: ["Supporting muscles", "Walking volume", "Balance"],
      },
      {
        label: "Weeks 8–12",
        title: "Load — milestone-gated",
        body: "",
        focus: ["Progressive load", "Standing strength", "Compound patterns"],
      },
      {
        label: "Weeks 12–16",
        title: "Independence",
        body: "",
        focus: ["Independent training", "Maintenance plan", "Doctor hand-off"],
      },
    ],
    bodyRegionNote: "",

    pillarsIntro: "How the four pillars are tuned for cautious rebuilds:",
    pillars: [
      {
        name: "Medical",
        body: "Doctor-led periodic assessments and medical care.",
      },
      {
        name: "Exercise",
        body: "Moderate intensity tier, milestone-gated. Nothing progresses without checkpoints. Most personalised programming of any track.",
      },
      {
        name: "Nutrition",
        body: "Protein optimisation for tissue repair, anti-inflammatory support, calcium and Vitamin D for bone. Veg / non-veg adapted.",
      },
      {
        name: "Mind Coaching",
        body: "Activated when assessment flags psychological barriers to recovery.",
      },
    ],

    outcomesIntro: "",
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

    faqs: [],
  },
};
