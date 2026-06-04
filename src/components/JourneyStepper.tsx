"use client";

/**
 * JourneyStepper — 4-step horizontal flow: Assessment, Exercise, Nutrition, Psychology.
 * Steps are connected by a thin line. Stacks vertically on mobile.
 */

import Reveal from "./Reveal";
import { asset } from "@/lib/asset";

interface Step {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Assessment",
    description: "Comprehensive biomechanical and lifestyle evaluation to map your starting point.",
    image: "/journey-assessment.jpg",
    imageAlt: "Clinical evaluation with stethoscope and notes",
  },
  {
    number: "02",
    title: "Exercise",
    description: "Targeted movement protocols designed around your body's unique mechanics.",
    image: "/journey-exercise.jpg",
    imageAlt: "Women practicing guided mat-based mobility work",
  },
  {
    number: "03",
    title: "Nutrition",
    description: "Anti-inflammatory nutrition plans that fuel repair from within.",
    image: "/journey-nutrition.jpg",
    imageAlt: "Nourishing bowl of greens, avocado and fresh produce",
  },
  {
    number: "04",
    title: "Mind Coaching",
    description: "Mind coaching to break fear patterns and keep movement going long-term.",
    image: "/journey-psychology.jpg",
    imageAlt: "Person meditating in lotus pose at sunrise",
  },
];

interface JourneyStepperProps {
  className?: string;
}

export default function JourneyStepper({ className = "" }: JourneyStepperProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative ${className}`}
    >
      {/* Connecting line — desktop only, passes behind the photo circles */}
      <div
        className="hidden lg:block absolute top-[140px] left-[10%] right-[10%] h-px bg-line"
        aria-hidden="true"
      />

      {steps.map((step, i) => (
        <Reveal key={step.number} delay={i * 0.1}>
          <div className="flex flex-col items-center text-center relative px-4">
            {/* Number */}
            <span className="text-eyebrow text-clay mb-4">{step.number}</span>

            {/* Photo — replaces the abstract icon with a real image */}
            <div className="w-28 h-28 rounded-full overflow-hidden ring-1 ring-line shadow-sm mb-6 relative z-10 bg-sage-tint">
              <img
                src={asset(step.image)}
                alt={step.imageAlt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title */}
            <h3 className="text-h4 font-display text-ink mb-2">{step.title}</h3>

            {/* Description */}
            <p className="text-body-sm text-ink-soft max-w-[240px]">
              {step.description}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
