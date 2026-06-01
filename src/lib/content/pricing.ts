export type PlanFeature = {
  label: string;
  included: boolean;
};

export type Plan = {
  name: string;
  price: number;
  period: string;
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
    name: "Standard",
    price: 20000,
    period: "",
    features: buildFeatures(4),
    popular: false,
    description:
      "Medical consultation, a personalised plan, and the fitness and nutrition guidance to start strong.",
  },
  {
    name: "Basic",
    price: 30000,
    period: "",
    features: buildFeatures(5),
    popular: true,
    description:
      "Everything in Standard, plus mental-health support so the work is sustainable beyond week three.",
  },
  {
    name: "Premium",
    price: 40000,
    period: "",
    features: buildFeatures(7),
    popular: false,
    description:
      "The full Reconnect experience — dedicated mind coaching sessions and exclusive 1-on-1 support on top of everything else.",
  },
];
