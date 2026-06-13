"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { asset } from "@/lib/asset";
import { SkeletonSvg } from "@/components/AnatomicalArt";
import { submitLead } from "@/lib/leads";

/* ── Data ──────────────────────────────────────────────────── */

const columns = [
  {
    heading: "Programs",
    links: [
      { href: "/programs/prevent", label: "Prevent" },
      { href: "/programs/manage", label: "Manage" },
      { href: "/programs/strengthen", label: "Strengthen" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/approach", label: "Approach" },
      { href: "/reconnect-team", label: "Team" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    heading: "Support",
    links: [
      { href: "/contact#faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "/assessment", label: "Assessment" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms" },
      { href: "#", label: "Accessibility" },
    ],
  },
] as const;

/* ── Social icons ──────────────────────────────────────────── */

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ── Component ─────────────────────────────────────────────── */

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    void submitLead({ source: "Newsletter", email });
    setSubscribed(true);
  };

  return (
    <footer className="relative overflow-hidden mt-auto">
      {/* ═══ Main Footer ═══════════════════════════════════════ */}
      <section className="relative bg-sage-deep text-bone">
        <div className="container-site py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 md:gap-8">
            {/* Brand column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-4" aria-label="Reconnect home">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset("/brand/logo-white.png")} alt="" aria-hidden="true" className="h-10 w-10 object-contain" />
                <span
                  className="text-[1.2rem] font-semibold tracking-[0.04em] text-bone leading-none"
                  style={{ fontFamily: "var(--font-brand)" }}
                >
                  RECONNECT
                </span>
              </Link>
            </div>

            {/* Link columns */}
            {columns.map((col) => (
              <div key={col.heading}>
                <h3 className="text-eyebrow text-bone/40 mb-4">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-body-sm text-bone/60 hover:text-bone transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ C) Newsletter Row ═══════════════════════════════ */}
        <div className="border-t border-bone/10">
          <div className="container-site py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {subscribed ? (
              <div className="flex items-center gap-2 text-bone/80">
                <CheckIcon className="w-5 h-5 text-clay" />
                <span className="text-body-sm font-medium">
                  You&apos;re in.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="bg-bone/10 border border-bone/20 text-bone placeholder:text-bone/30 rounded-pill px-5 py-3 text-body-sm outline-none focus:border-bone/40 transition-colors duration-200 w-full sm:w-64"
                />
                <Button variant="clay" type="submit" size="md">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* ═══ D) Bottom Bar ═══════════════════════════════════ */}
        <div className="border-t border-bone/10">
          <div className="container-site py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-bone/40 hover:text-bone transition-colors duration-200"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-bone/40 hover:text-bone transition-colors duration-200"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
            </div>

            <p className="text-caption text-bone/40">
              &copy; 2026 Reconnect Wellness
            </p>
          </div>
        </div>

        {/* ═══ E) Skeleton Watermark ═══════════════════════════ */}
        <SkeletonSvg className="absolute bottom-0 right-0 w-[400px] opacity-[0.03] text-bone pointer-events-none" />
      </section>
    </footer>
  );
}
