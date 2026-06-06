import React from "react";
import Stagger from "@/components/Stagger";
import Reveal from "@/components/Reveal";
import PillarCard from "@/components/PillarCard";

// Simple icon placeholders using emoji/symbols
const pillars = [
  {
    icon: "▶️",
    title: "Personalized Videos",
    description:
      "Custom-made for your condition, region, and severity. Not templated. Not generic.",
  },
  {
    icon: "📊",
    title: "Dashboard & Tracking",
    description:
      "See your progress week-to-week. Track pain, strength, mobility. Accessible via web today, native app coming later 2026.",
  },
  {
    icon: "👥",
    title: "Personalized Care",
    description:
      "Your coach adjusts the program as you improve. Weekly check-ins, not automated replies.",
  },
  {
    icon: "🗺️",
    title: "16-Week Roadmap",
    description:
      "Clear milestones, reassessment at week 8, direction the generic apps can't give.",
  },
];

export interface FourPillarsShowcaseProps {
  variant?: "full" | "teaser";
}

export default function FourPillarsShowcase({
  variant = "full",
}: FourPillarsShowcaseProps) {
  if (variant === "teaser") {
    // Home page teaser: 4 short lines with icons
    return (
      <div className="space-y-3">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="flex items-start gap-3">
            <span className="text-xl mt-0.5">{pillar.icon}</span>
            <span className="text-body text-ink">{pillar.title}</span>
          </div>
        ))}
      </div>
    );
  }

  // Full showcase (pricing page)
  return (
    <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {pillars.map((pillar) => (
        <Reveal key={pillar.title} delay={0.05}>
          <PillarCard
            icon={pillar.icon}
            title={pillar.title}
            description={pillar.description}
            visualPlaceholder={false}
          />
        </Reveal>
      ))}
    </Stagger>
  );
}
