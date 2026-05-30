"use client";

/**
 * Button — Three-variant button with optional animated arrow.
 * Variants: clay (primary), sage-outline (secondary), ghost.
 * Renders as Next.js Link when href is provided, button otherwise.
 */

import Link from "next/link";
import { forwardRef } from "react";

const variants = {
  clay: "bg-clay text-calcium hover:bg-clay-dark shadow-soft hover:shadow-lifted",
  "sage-outline":
    "border border-sage text-sage hover:bg-sage/5",
  ghost: "text-ink-soft hover:text-ink",
  /** Outline-on-dark — secondary action on sage-deep / clay CTA bands. */
  "bone-outline":
    "border border-bone/30 text-bone bg-bone/[0.04] backdrop-blur-sm hover:bg-bone/10 hover:border-bone/60 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset]",
} as const;

const sizes = {
  md: "px-6 py-3 text-body-sm",
  lg: "px-8 py-4 text-body",
} as const;

export interface ButtonProps {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

const Button = forwardRef<HTMLAnchorElement & HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      variant = "clay",
      size = "md",
      href,
      arrow,
      className = "",
      type = "button",
      onClick,
      disabled,
    },
    ref
  ) {
    const base =
      "inline-flex items-center justify-center gap-2 font-medium rounded-pill transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none";

    const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

    const arrowIcon = arrow ? (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden="true"
      >
        <path
          d="M3 8h10m0 0L9 4m4 4L9 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : null;

    if (href) {
      return (
        <Link href={href} ref={ref as React.Ref<HTMLAnchorElement>} className={`group ${cls}`}>
          {children}
          {arrowIcon}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`group ${cls}`}
      >
        {children}
        {arrowIcon}
      </button>
    );
  }
);

export default Button;
