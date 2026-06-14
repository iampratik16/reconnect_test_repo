"use client";

/*
 * ⚠️ BACKEND TODO — secure contact submission
 *
 * `submit` sends the lead (best-effort) and advances to the booking flow.
 * Before launch:
 *   • POST to a server route / form service with TLS.
 *   • Add CAPTCHA or rate-limiting (Hcaptcha / Cloudflare Turnstile).
 *   • Forward to the clinical team inbox with a structured subject.
 *   • Store any clinical context (concern, track) under the same medical-data
 *     handling policy as the assessment endpoint.
 *   • Replace the static UPI QR with a real per-booking payment intent and
 *     reconcile payment status before confirming the consultation.
 */

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
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

/** Post-submit flow: collect details → pick a consultation date → pay. */
type Step = "form" | "booking" | "payment";

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

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** "Monday, 23 June 2025" */
function formatLongDate(d: Date): string {
  return `${DAYS_FULL[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function firstNameOf(full: string): string {
  return full.trim().split(/\s+/)[0] || "friend";
}

export default function ContactForm() {
  const [form, setForm] = useState<Form>(initial);
  const [error, setError] = useState("");
  const [step, setStep] = useState<Step>("form");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const prefersReduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // On each step change after submit, bring the card into view (offset for the
  // sticky nav via scroll-mt on the card itself).
  useEffect(() => {
    if (step !== "form" && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    }
  }, [step, prefersReduced]);

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
    setStep("booking");
  };

  const reset = () => {
    setForm(initial);
    setSelectedDate(null);
    setError("");
    setStep("form");
  };

  const first = firstNameOf(form.name);

  return (
    <div ref={cardRef} className="relative scroll-mt-28 bg-calcium rounded-[24px] p-6 sm:p-10 hairline shadow-card">
      <AnimatePresence mode="wait">
        {/* ── STEP: Thank you + pick a consultation date ──────────── */}
        {step === "booking" && (
          <motion.div
            key="booking"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center py-6 md:py-10"
          >
            <SuccessBadge />
            <p className="text-eyebrow text-clay">Message received</p>
            <h3 className="text-h2 font-display text-ink mt-4">
              Thank you, {first}.
            </h3>
            <p className="text-body-lg text-ink-soft mt-5 max-w-md mx-auto">
              One last step — pick a date for your consultation.
            </p>

            <ConsultationCalendar value={selectedDate} onChange={setSelectedDate} />

            <button
              type="button"
              disabled={!selectedDate}
              onClick={() => setStep("payment")}
              className={`mx-auto mt-6 block w-full max-w-[340px] rounded-pill px-7 py-4 font-medium text-calcium bg-clay transition-opacity ${
                selectedDate ? "opacity-100" : "opacity-40 pointer-events-none"
              }`}
            >
              Confirm booking →
            </button>

            <div className="mt-6">
              <button
                onClick={reset}
                className="text-body-sm text-ink-soft hover:text-ink underline-offset-4 hover:underline px-4 py-2"
              >
                Send another message
              </button>
            </div>
          </motion.div>
        )}

        {/* ── STEP: Payment ───────────────────────────────────────── */}
        {step === "payment" && (
          <motion.div
            key="payment"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center py-6 md:py-10"
          >
            <SuccessBadge />
            <p className="text-eyebrow text-clay">Final step</p>
            <h3 className="text-h2 font-display text-ink mt-4">
              Almost there, {first}.
            </h3>
            <p className="text-body-lg text-ink-soft mt-5 max-w-md mx-auto">
              Your consultation is booked for{" "}
              <span className="text-ink font-medium">
                {selectedDate ? formatLongDate(selectedDate) : ""}
              </span>
              . Complete your payment to confirm.
            </p>

            {/* Reconnect-branded UPI QR (brand name + scan label baked into the
                artwork — no personal name). */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <Image
                src="/qr-reconnect.png"
                alt="Reconnect UPI QR code — scan to pay with any UPI app"
                width={270}
                height={279}
                className="rounded-[16px]"
              />
              <p className="text-body-sm text-ink-soft max-w-sm">
                Once we receive your payment, we&rsquo;ll send you a confirmation on WhatsApp.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
              <button
                onClick={() => setStep("booking")}
                className="text-body-sm text-ink-soft hover:text-ink underline-offset-4 hover:underline px-4 py-2"
              >
                ← Change date
              </button>
              <button
                onClick={reset}
                className="text-body-sm text-ink-soft hover:text-ink underline-offset-4 hover:underline px-4 py-2"
              >
                Send another message
              </button>
            </div>
          </motion.div>
        )}

        {/* ── STEP: Contact form ──────────────────────────────────── */}
        {step === "form" && (
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

            <Field label="Phone" type="tel" value={form.phone} onChange={(v) => update("phone", v)} placeholder="Your phone number" autoComplete="tel" inputMode="tel" required />

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

/* ── Consultation date picker ──────────────────────────────────
   Hand-built calendar (no library). Today and past dates are disabled
   (bookings start tomorrow); the chosen date is filled. Mounts only after
   submit, so the client-only `new Date()` can't cause a hydration mismatch. */

function ConsultationCalendar({
  value,
  onChange,
}: {
  value: Date | null;
  onChange: (d: Date) => void;
}) {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);
  const [view, setView] = useState(() => ({ y: today.getFullYear(), m: today.getMonth() }));

  const firstWeekday = new Date(view.y, view.m, 1).getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const prevDisabled =
    view.y < today.getFullYear() ||
    (view.y === today.getFullYear() && view.m <= today.getMonth());

  const goPrev = () => {
    if (prevDisabled) return;
    setView((v) => (v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 }));
  };
  const goNext = () =>
    setView((v) => (v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 }));

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="mx-auto mt-8 w-full max-w-[340px] rounded-[16px] border border-line bg-white p-5 text-left">
      {/* Month navigation */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          disabled={prevDisabled}
          aria-label="Previous month"
          className="rounded-lg border border-line px-2.5 py-1 text-body text-ink transition-colors hover:bg-bone-deep disabled:opacity-30 disabled:cursor-default"
        >
          ‹
        </button>
        <span className="text-body font-medium text-ink">
          {MONTHS[view.m]} {view.y}
        </span>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next month"
          className="rounded-lg border border-line px-2.5 py-1 text-body text-ink transition-colors hover:bg-bone-deep"
        >
          ›
        </button>
      </div>

      {/* Weekday labels */}
      <div className="mb-2 grid grid-cols-7 text-center text-[11px] uppercase tracking-wide text-ink-soft">
        {DAY_ABBR.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (d === null) return <span key={`pad-${i}`} aria-hidden="true" />;
          const date = new Date(view.y, view.m, d);
          date.setHours(0, 0, 0, 0);
          // Bookings start tomorrow — today and any earlier date are disabled.
          const isDisabled = date.getTime() <= today.getTime();
          const isSelected = !!value && date.getTime() === value.getTime();

          let cls = "flex aspect-square items-center justify-center rounded-full text-body-sm transition-colors";
          if (isDisabled) cls += " text-ink-soft/30 cursor-not-allowed";
          else if (isSelected) cls += " bg-clay text-calcium font-medium";
          else cls += " text-ink hover:bg-clay/10";

          return (
            <button
              type="button"
              key={d}
              disabled={isDisabled}
              aria-pressed={isSelected}
              onClick={() => onChange(date)}
              className={cls}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Shared bits ───────────────────────────────────────────── */

function SuccessBadge() {
  return (
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-clay-soft text-clay-dark mb-6">
      <svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 10l4 4 8-8" />
      </svg>
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
