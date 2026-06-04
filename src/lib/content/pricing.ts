export type PlanFeature = {
  label: string;
  included: boolean;
};

export type Plan = {
  name: string;
  price: number;
  period: string;
  billingNote: string;
  features: PlanFeature[];
  popular: boolean;
  description: string;
};

/**
 * The seven features shown on every plan card, in display order.
 * Each plan declares how many of these are included (from the top).
 */
export const PLAN_FEATURES = [
  "Medical Consultation",
  "Personalized Health Plan",
  "Fitness & Nutrition Guidance",
  "Progress Tracking Tools",
  "Mental Health Support",
  "Deep Psychological Input",
  "Exclusive 1-on-1 Sessions",
] as const;

function buildFeatures(includedCount: number): PlanFeature[] {
  return PLAN_FEATURES.map((label, i) => ({
    label,
    included: i < includedCount,
  }));
}

export const plans: Plan[] = [
  {
    name: "Basic",
    price: 4999,
    period: "/month",
    billingNote: "₹20,000 for 4 months",
    features: buildFeatures(5),
    popular: true,
    description:
      "Medical consultation, a personalised plan, fitness and nutrition guidance, progress tracking, and mental-health support.",
  },
  {
    name: "Premium",
    price: 9999,
    period: "/month",
    billingNote: "₹40,000 for 4 months",
    features: buildFeatures(7),
    popular: false,
    description:
      "Everything in Basic, plus deep psychological input and exclusive 1-on-1 sessions — the full Reconnect experience.",
  },
];
