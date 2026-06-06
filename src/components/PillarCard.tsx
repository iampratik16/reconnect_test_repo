import React from "react";

export interface PillarCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  visualPlaceholder?: boolean;
}

export default function PillarCard({
  icon,
  title,
  description,
  visualPlaceholder = true,
}: PillarCardProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Icon/Visual */}
      <div className="flex items-center gap-3">
        <div className="text-clay text-2xl">{icon}</div>
        <h3 className="text-h4 font-display text-ink">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-body-sm text-ink-soft max-w-sm">{description}</p>

      {/* Visual Placeholder */}
      {visualPlaceholder && (
        <div className="mt-4 rounded-[16px] bg-calcium aspect-video border border-line flex items-center justify-center">
          <span className="text-caption text-ink-soft/50">
            Screenshot/video goes here
          </span>
        </div>
      )}
    </div>
  );
}
