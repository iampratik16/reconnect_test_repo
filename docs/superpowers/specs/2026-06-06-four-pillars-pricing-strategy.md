# Four Pillars Pricing Strategy — Design Spec
**Date:** 2026-06-06  
**Scope:** Showcase Reconnect's core app experience (personalized videos, app, dashboard, personalized care) across pricing page, home page, and journey pages to win client hearts by proving this isn't generic.

---

## Overview

Reconnect's true differentiator isn't the price tiers — it's the **four pillars of daily experience** that make clients realize they're not using a generic app:

1. **Personalized Videos** — custom content designed by Reconnect for *their specific condition, region, severity*
2. **App & Dashboard** — interactive tools for tracking, planning, and seeing progress (dashboard live now, native app launching later 2026)
3. **Personalized Care** — human coaching and adjustment, available in both tiers (Premium adds deep psychology + 1-on-1 sessions)
4. **Structured Roadmap** — the 16-week journey with milestones and reassessment

**Positioning rule:** Don't gate the *tools* (both tiers get all four pillars), gate the *depth* of personalization and human attention.

---

## App Status Messaging

**The "coming shortly" app is positioned as an enhancement, not an apology.**

- **Current state:** "Accessible today via your web dashboard"
- **Future state:** "Native app launching later this year for faster access on-the-go"
- **Tone:** Matter-of-fact, no urgency language, no waitlist. Focus on what's live *now*.

---

## Pricing Page — Full Architecture

### 1. Hero Section (Existing, Refined)
Keep as-is. The intro "Plans that fit your needs" + description stays.

### 2. NEW: Four Pillars Showcase Section
**Location:** Immediately before the pricing cards (between hero and tiers).

**Purpose:** Prove the magic before asking them to decide. Show what a "personalized" program actually means.

**Structure:**
- **Headline:** "What you'll use every day." (or "Your daily toolkit.") — short, benefit-focused
- **4 Pillar Cards** (staggered reveal on scroll):
  - Each card has: icon/visual placeholder, pillar name, 1-2 sentence benefit copy, placeholder for screenshot/video
  - **Personalized Videos:** "Custom-made for your condition, region, and severity. Not templated. Not generic."
  - **Dashboard & Tracking:** "See your progress week-to-week. Track pain, strength, mobility. Built for how you actually move." (Mention: "Accessible via web today, native app coming later 2026.")
  - **Personalized Care:** "Your coach adjusts the program as you improve. Weekly check-ins, not automated replies."
  - **16-Week Roadmap:** "Clear milestones, reassessment at week 8, direction the generic apps can't give."

**Visual approach:** Leave space for screenshots/videos (to be added when dashboard/app designs are ready). For now, use placeholder containers.

**CTA at section end:** "Learn what's in each plan →" links to pricing cards below.

---

### 3. Pricing Cards (Updated)
**Current structure stays.** Add a **new callout** above the feature list:

**For Basic:**
```
Everything you need to start:
```

**For Premium:**
```
Everything in Basic, plus:
```

Then list features. This highlights the additive nature and that both get the four pillars.

---

### 4. Comparison Table (Expanded)
**Add 4 new rows** after the existing medical/program features:

| Feature | Basic | Premium |
|---------|-------|---------|
| Personalized videos designed for your condition | ✓ | ✓ |
| Interactive dashboard & progress tracking | ✓ | ✓ |
| Mobile app access (launching 2026) | ✓ | ✓ |
| Personalized coach support & weekly check-ins | ✓ | ✓ |
| Deep psychological input | — | ✓ |
| Exclusive 1-on-1 sessions | — | ✓ |

**Rationale:** This visually demonstrates that you're not paying for *features*, you're paying for *depth of personalization and human attention*. Both tiers get the toolkit; Premium adds the psychology + exclusivity.

---

## Home Page — Teaser Section

**Location:** New section after "Why Reconnect" / before pricing mention (approximately after hero + proof cards).

**Headline:** "What you'll use every day." (same as pricing page for consistency)

**Format:** 4 short benefit statements (1 line each) with small icons:
- "Personalized videos designed for your condition"
- "Interactive dashboard to track what matters"
- "Native app coming later this year"
- "Coach who adjusts your program weekly"

**CTA:** "See the full picture → Explore pricing"

**Tone:** Snappy, benefit-focused, no detail. The goal is: "oh, this is a real *app experience*, not just a program."

---

## How-It-Works & Approach Pages — Integration

**Weave pillar mentions** into existing sections where they naturally fit:

- **When explaining the program structure:** Mention the 16-week roadmap + dashboard
- **When discussing personalization:** Mention videos are custom-made for their condition
- **When discussing support:** Mention coach check-ins and adjustments

**Rule:** Don't create new sections. Integrate references into existing content to reinforce "this is what your experience looks like."

---

## Copy Principles

**Keep existing brand voice:**
- Honest, specific, no hype
- "We calm the pain, respect it" — conversational, not salesy
- "The medicine sits behind every prescription" — transparent about what you get
- Focus on what's *real* (what works) not what's *promised* (generic app language)

**For the Four Pillars:**
- Each pillar gets **one clear benefit** (not feature-dumping)
- Emphasize **specificity over generics** ("videos designed for *your* condition, not templated")
- Highlight **what makes it different** (dashboard vs app, coach vs bot, roadmap vs random)

---

## Content to Add to pricing.ts

Update `PLAN_FEATURES` array to include:

```typescript
export const PLAN_FEATURES = [
  // Existing medical features
  "Rheumatologist-led medical assessment",
  "Personalised strength program",
  "Fitness & nutrition guidance",
  "Progress tracking & monthly check-in",
  "Mental-health support",
  
  // NEW: Four Pillars
  "Personalized videos designed for your condition",
  "Interactive dashboard & progress tracking",
  "Mobile app access (launching 2026)",
  "Personalized coach support & weekly check-ins",
  
  // Premium-only
  "Deep psychological input",
  "Exclusive 1-on-1 sessions",
] as const;
```

No changes to `plans[]` — both tiers already inherit the base, Premium adds the psychology.

---

## Implementation Sequence

1. **Update pricing.ts** — add four pillars to PLAN_FEATURES
2. **Update pricing/page.tsx** — add Four Pillars Showcase section before cards
3. **Update comparison table** — the new rows render automatically from PLAN_FEATURES
4. **Update home page** — add teaser section
5. **Update how-it-works/approach** — integrate pillar mentions (light touch)
6. **Add visual placeholders** — leave space for screenshots/videos (to be populated later)

---

## Success Criteria

- ✓ Clients see the four pillars as **core to both tiers**, not differentiators
- ✓ Personalized videos feel like **the emotional core** — the thing that makes it real
- ✓ App/dashboard is positioned as **live now, enhanced later** (no apologies, no waitlists)
- ✓ Comparison table visually proves you're paying for **depth, not features**
- ✓ Copy maintains Reconnect's **honest, specific, no-BS voice**

---

## Visual Placeholders (TBD, Later)

- Personalized video thumbnail/screenshot
- Dashboard interface mockup
- Mobile app screenshot
- Coach check-in interface

These will be added when designs are ready. For now, use neutral placeholder containers (e.g., `bg-calcium rounded-lg aspect-video`).
