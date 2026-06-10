/**
 * Pricing content — additive model.
 *
 * Cards never show what a plan *doesn't* include (no strikethroughs). Each plan
 * lists only the features it adds; higher tiers inherit the lower tier's list
 * via `inheritsFrom` and render an "Everything in {tier}, plus —" header above
 * their own additions.
 *
 * The /pricing comparison table still needs a yes/no matrix across all features,
 * so PLAN_FEATURES + featureMatrix() derive that from the same source of truth.
 */

export type Plan = {
  name: string;
  /** Program total, e.g. 20000 — the headline figure. */
  priceTotal: number;
  /** Equivalent monthly figure, e.g. 4999 — the sub-line. */
  priceMonthly: number;
  /** Months in the minimum program. */
  months: number;
  /** One-line audience sentence: who this tier is for. */
  bestFor: string;
  /** Longer description (used by /pricing cards + meta). */
  description: string;
  /** If set, this tier inherits the named tier's features and only lists its own additions. */
  inheritsFrom?: string;
  /** The features THIS tier adds (additive — never the full cumulative list). */
  features: string[];
  /** Features that should be highlighted with a star (premium-like treatment). */
  highlightedFeatures?: string[];
  popular: boolean;
};

export const plans: Plan[] = [
  {
    name: "Basic",
    priceTotal: 20000,
    priceMonthly: 5000,
    months: 4,
    bestFor: "For chronic pain that needs medical accountability to stay on track.",
    description:
      "Medical consultation, a personalised plan, fitness and nutrition guidance, progress tracking, and mental-health support.",
    features: [
      "Rheumatologist-led medical assessment",
      "Personalised strength program",
      "Fitness & nutrition guidance",
      "Progress tracking & monthly check-in",
      "Mental-health support",
      "Personalized videos designed for your condition",
      "Interactive dashboard & progress tracking",
      "Mobile app access (launching 2026)",
      "Personalized coach support & weekly check-ins",
      "Calorie tracker & personalized food suggestions",
    ],
    highlightedFeatures: [
      "Personalized videos designed for your condition",
      "Interactive dashboard & progress tracking",
      "Mobile app access (launching 2026)",
      "Personalized coach support & weekly check-ins",
      "Calorie tracker & personalized food suggestions",
    ],
    popular: true,
  },
  {
    name: "Premium",
    priceTotal: 40000,
    priceMonthly: 10000,
    months: 4,
    bestFor: "For complex cases that want maximum guidance.",
    description:
      "Everything in Basic, plus deep psychological input and exclusive 1-on-1 sessions — the full Reconnect experience.",
    inheritsFrom: "Basic",
    features: ["Deep psychological input", "Exclusive 1-on-1 sessions"],
    highlightedFeatures: ["Deep psychological input", "Exclusive 1-on-1 sessions"],
    popular: false,
  },
];

/* ── Comparison-table support ──────────────────────────────────
   The full ordered feature list, and a yes/no matrix per plan derived
   from each plan's cumulative (inherited + own) features. */

export const PLAN_FEATURES = [
  "Rheumatologist-led medical assessment",
  "Personalised strength program",
  "Fitness & nutrition guidance",
  "Progress tracking & monthly check-in",
  "Mental-health support",
  "Personalized videos designed for your condition",
  "Interactive dashboard & progress tracking",
  "Mobile app access (launching 2026)",
  "Personalized coach support & weekly check-ins",
  "Calorie tracker & personalized food suggestions",
  "Deep psychological input",
  "Exclusive 1-on-1 sessions",
] as const;

/** Cumulative feature set for a plan (its own features plus anything inherited). */
export function cumulativeFeatures(plan: Plan): string[] {
  const parent = plan.inheritsFrom
    ? plans.find((p) => p.name === plan.inheritsFrom)
    : undefined;
  const inherited = parent ? cumulativeFeatures(parent) : [];
  return [...inherited, ...plan.features];
}

/** For each feature in PLAN_FEATURES, whether each plan includes it. */
export function featureMatrix(): { label: string; byPlan: boolean[] }[] {
  return PLAN_FEATURES.map((label) => ({
    label,
    byPlan: plans.map((p) => cumulativeFeatures(p).includes(label)),
  }));
}
