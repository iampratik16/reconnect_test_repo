"use client";

/*
 * ⚠️ BACKEND TODO — secure contact submission
 *
 * `submit` only console-logs and shows the success state. Before launch:
 *   • POST to a server route / form service with TLS.
 *   • Add CAPTCHA or rate-limiting (Hcaptcha / Cloudflare Turnstile).
 *   • Forward to the clinical team inbox with a structured subject.
 *   • Store any clinical context (concern, track) under the same medical-data
 *     handling policy as the assessment endpoint.
 */

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Button from "@/components/Button";
import { submitLead } from "@/lib/leads";

type Form = {
  name: string;
  email: string;
  phone: string;
  concern: string;
  track: string;
  message: string;
};

const initial: Form = {
  name: "",
  email: "",
  phone: "",
  concern: "",
  track: "",
  message: "",
};

const CONCERNS = [
  { v: "knee",        l: "Knee pain" },
  { v: "back-neck",   l: "Back or neck pain" },
  { v: "arthritis",   l: "Arthritis" },
  { v: "disc",        l: "Disc issues" },
  { v: "bone-health", l: "Bone health (osteoporosis)" },
  { v: "prevention",  l: "Prevention / staying ahead" },
  { v: "other",       l: "Something else" },
];

const TRACKS = [
  { v: "unsure",  l: "I'm not sure yet" },
  { v: "prevent", l: "Prevent" },
  { v: "manage",  l: "Manage" },
  { v: "strengthen", l: "Strengthen" },
];

export default function ContactForm() {
  const [form, setForm] = useState<Form>(initial);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const prefersReduced = useReducedMotion();

  const update = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setError("");
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return setError("Tell us your name.");
    // Standard email format — rejects obviously malformed / random input.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      return setError("Please enter a valid email address.");
    // Indian mobile: exactly 10 digits starting 6–9 (tolerate +91 / 0 prefixes).
    let phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length === 12 && phoneDigits.startsWith("91")) phoneDigits = phoneDigits.slice(2);
    if (phoneDigits.length === 11 && phoneDigits.startsWith("0")) phoneDigits = phoneDigits.slice(1);
    if (!/^[6-9]\d{9}$/.test(phoneDigits))
      return setError("Enter a valid 10-digit mobile number (starting 6–9).");
    if (!form.message.trim()) return setError("Add a quick note so we know how to help.");

    // Send to the leads spreadsheet (best-effort) with human-readable labels.
    const concernLabel = CONCERNS.find((c) => c.v === form.concern)?.l ?? form.concern;
    const trackLabel = TRACKS.find((t) => t.v === form.track)?.l ?? form.track;
    void submitLead({
      source: "Contact form",
      name: form.name,
      email: form.email,
      phone: form.phone,
      concern: concernLabel,
      track: trackLabel,
      message: form.message,
    });
    setSent(true);
  };

  return (
    <div className="relative bg-calcium rounded-[24px] p-6 sm:p-10 hairline shadow-card">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center py-6 md:py-10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-clay-soft text-clay-dark mb-6">
              <svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 10l4 4 8-8" />
              </svg>
            </div>
            <p className="text-eyebrow text-clay">Message received</p>
            <h3 className="text-h2 font-display text-ink mt-4">
              Thank you, {form.name || "friend"}.
            </h3>
            <p className="text-body-lg text-ink-soft mt-5 max-w-md mx-auto">
              Once we confirm the payment, we will connect back.
            </p>

            {/* Booking QR — scan to book the consultation */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <Image
                src="/qr-reconnect.png"
                alt="QR code — scan to book your Reconnect consultation"
                width={260}
                height={243}
                className="rounded-[16px] hairline shadow-card bg-white"
              />
              <p className="text-caption text-ink-soft">Scan to book your consultation</p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button variant="sage-outline" href="/assessment" arrow>
                Take the assessment
              </Button>
              <button
                onClick={() => { setForm(initial); setSent(false); }}
                className="text-body-sm text-ink-soft hover:text-ink underline-offset-4 hover:underline px-4 py-2"
              >
                Send another message
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            <p className="text-eyebrow text-clay">Send a message</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Your name" value={form.name} onChange={(v) => update("name", v)} placeholder="Full name" autoComplete="name" required />
              <Field label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="you@example.com" autoComplete="email" required />
            </div>

            <Field label="Phone" type="tel" value={form.phone} onChange={(v) => update("phone", v)} placeholder="10-digit mobile" autoComplete="tel" inputMode="numeric" required />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Select
                label="Primary concern"
                value={form.concern}
                onChange={(v) => update("concern", v)}
                options={CONCERNS}
                placeholder="What's going on?"
              />
              <Select
                label="Preferred track"
                value={form.track}
                onChange={(v) => update("track", v)}
                options={TRACKS}
                placeholder="Not sure? Pick that."
              />
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-eyebrow text-ink-soft">Your message</span>
              <textarea
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                rows={5}
                placeholder="A short note — your situation, your questions, what you'd like to know."
                className="rounded-[14px] bg-bone-deep/40 border border-line text-body text-ink p-4 outline-none focus:border-clay transition-colors duration-200"
              />
            </label>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                  className="text-body-sm text-clay-dark bg-clay-soft/60 rounded-pill px-4 py-2 self-start"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <p className="text-caption text-ink-soft max-w-xs">
                Your message is reviewed only by our clinical team.
                Full privacy copy TODO.
              </p>
              <Button variant="clay" size="lg" type="submit" arrow>
                Send message
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Field primitives ──────────────────────────────────────── */

function Field({
  label, value, onChange, type = "text", placeholder, autoComplete, required, inputMode,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; autoComplete?: string;
  required?: boolean; inputMode?: "text" | "tel" | "email" | "numeric";
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-eyebrow text-ink-soft">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-required={required}
        inputMode={inputMode}
        className="rounded-[14px] bg-bone-deep/40 border border-line text-body text-ink p-4 outline-none focus:border-clay transition-colors duration-200"
      />
    </label>
  );
}

function Select({
  label, value, onChange, options, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: { v: string; l: string }[]; placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-eyebrow text-ink-soft">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none w-full rounded-[14px] bg-bone-deep/40 border border-line text-body text-ink p-4 pr-10 outline-none focus:border-clay transition-colors duration-200"
        >
          <option value="" disabled>{placeholder ?? "Choose…"}</option>
          {options.map((o) => (
            <option key={o.v} value={o.v}>{o.l}</option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft pointer-events-none"
          width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </div>
    </label>
  );
}
