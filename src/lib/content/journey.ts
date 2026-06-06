export type JourneyStep = {
  number: string;
  title: string;
  description: string;
  icon: string;
};

export const journeySteps: JourneyStep[] = [
  {
    number: "01",
    title: "Medical Assessment",
    description:
      "A clinical evaluation by Dr. Shruthi that considers your diagnosis, imaging, medication, pain levels, and lifestyle.",
    icon: "stethoscope",
  },
  {
    number: "02",
    title: "Strength Training",
    description:
      "A week-by-week, condition-specific strength programme that respects your pain thresholds and builds real, lasting strength.",
    icon: "fitness_center",
  },
  {
    number: "03",
    title: "Nutrition",
    description:
      "Anti-inflammatory, bone-supportive nutrition guidance tailored to Indian meals, your condition, and your goals.",
    icon: "nutrition",
  },
  {
    number: "04",
    title: "Mind Coaching",
    description:
      "Mind coaching to break fear-of-movement patterns, build consistency, and retrain how your brain relates to pain.",
    icon: "psychology",
  },
];
