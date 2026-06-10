"use client";

/**
 * CareModel — the four-pillar care model on the /approach page, replacing the
 * old program-architecture diagram. Accordion on the left (one open at a time);
 * the active pillar's image shows on the right. Icons are Google Material
 * Symbols (loaded in the root layout).
 */

import { useState } from "react";
import { asset } from "@/lib/asset";

type Pillar = {
  icon: string; // Material Symbols name
  title: string;
  image: string;
  items: string[];
};

const PILLARS: Pillar[] = [
  {
    icon: "clinical_notes",
    title: "Medical Assessment",
    image: "/dc1.png",
    items: [
      "One-to-one online Consultation with doctor",
      "Blood and other investigations",
      "Diagnostic work up",
      "Prescribing medicines as required",
      "Personalised treatment plan",
      "Appropriate referral to specialist when necessary",
    ],
  },
  {
    icon: "exercise",
    title: "Physical Fitness",
    image: "/dc2.png",
    items: [
      "Assessing prior fitness level",
      "Designing and formulating exercise plan",
      "Access to pre-recorded exercise videos",
      "Focus on appropriate posture and technique",
      "Guidance on right nutrition",
      "One-to-one personalized coach if required",
      "Physiotherapist advise when required",
    ],
  },
  {
    icon: "psychology",
    title: "Mental and subconscious fitness",
    image: "/dc3.png",
    items: [
      "Online Consultation with psychologist",
      "Formulating and designing appropriate plan",
      "Stress management",
      "Positive thought reinforcement",
      "Logotherapy",
      "Referral to specialist when necessary",
      "Support group",
    ],
  },
  {
    icon: "monitoring",
    title: "Tracking plans",
    image: "/dc4.png",
    items: [
      "Online follow up by doctors, trainers and other specialists",
      "Tracking weight, BMI and other health related parameters",
      "Regular monitoring of Blood pressure, HbA1C, thyroid hormones, uric acid levels etc",
      "Monitoring of pains and joint health",
      "Access to Online tracking diary",
    ],
  },
];

export default function CareModel() {
  const [active, setActive] = useState(0);
  const current = PILLARS[active];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
      {/* Accordion */}
      <div className="flex flex-col">
        {PILLARS.map((p, i) => {
          const open = i === active;
          return (
            <div
              key={p.title}
              className={`border-t border-line ${i === PILLARS.length - 1 ? "border-b" : ""}`}
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-expanded={open}
                className="w-full flex items-center gap-4 py-5 text-left"
              >
                <span
                  className="material-symbols-outlined text-[26px] text-clay shrink-0"
                  aria-hidden="true"
                >
                  {p.icon}
                </span>
                <span className="flex-1 text-h4 font-display text-ink">{p.title}</span>
                <span
                  className="material-symbols-outlined text-ink-soft shrink-0 transition-colors"
                  aria-hidden="true"
                >
                  {open ? "remove" : "add"}
                </span>
              </button>

              {open && (
                <ol className="list-decimal pl-[3.6rem] pr-2 pb-6 flex flex-col gap-2.5 text-body text-ink-soft marker:text-clay">
                  {p.items.map((it) => (
                    <li key={it} className="pl-1">
                      {it}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          );
        })}
      </div>

      {/* Active pillar image */}
      <div className="lg:sticky lg:top-28">
        <div className="relative rounded-[20px] overflow-hidden shadow-lifted aspect-square bg-bone-deep">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={current.image}
            src={asset(current.image)}
            alt={current.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
