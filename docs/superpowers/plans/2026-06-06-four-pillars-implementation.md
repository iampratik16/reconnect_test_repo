# Four Pillars Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Four Pillars (personalized videos, app/dashboard, personalized care, structured roadmap) across pricing page, home page, and journey pages to showcase core app experience.

**Architecture:** Create reusable pillar card component and showcase section component. Update pricing content to include four pillars as features. Integrate teaser on home page. Weave light mentions into how-it-works pages.

**Tech Stack:** Next.js 15, React, TypeScript, Tailwind CSS, existing animation components (Reveal, Stagger, etc.)

---

### Task 1: Update pricing content with Four Pillars

**Files:**
- Modify: `src/lib/content/pricing.ts`

- [ ] **Step 1: Read the current pricing.ts file**

```bash
Read src/lib/content/pricing.ts
```

Expected: See PLAN_FEATURES array and plans[] structure.

- [ ] **Step 2: Add four pillars to PLAN_FEATURES array**

Replace the `PLAN_FEATURES` array:

```typescript
export const PLAN_FEATURES = [
  "Rheumatologist-led medical assessment",
  "Personalised strength program",
  "Fitness & nutrition guidance",
  "Progress tracking & monthly check-in",
  "Mental-health support",
  "Personalized videos designed for your condition",
  "Interactive dashboard & progress tracking",
  "Mobile app access (launching 2026)",
  "Personalized coach support & weekly check-ins",
  "Deep psychological input",
  "Exclusive 1-on-1 sessions",
] as const;
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/content/pricing.ts
git commit -m "feat: add Four Pillars to pricing feature matrix"
```

---

### Task 2: Create PillarCard component

**Files:**
- Create: `src/components/PillarCard.tsx`

- [ ] **Step 1: Create the PillarCard component**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PillarCard.tsx
git commit -m "feat: create PillarCard component for Four Pillars showcase"
```

---

### Task 3: Create FourPillarsShowcase component

**Files:**
- Create: `src/components/FourPillarsShowcase.tsx`

- [ ] **Step 1: Create the FourPillarsShowcase component**

```typescript
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
            visualPlaceholder={true}
          />
        </Reveal>
      ))}
    </Stagger>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FourPillarsShowcase.tsx
git commit -m "feat: create FourPillarsShowcase component with full & teaser variants"
```

---

### Task 4: Add Four Pillars Showcase section to pricing page

**Files:**
- Modify: `src/app/pricing/page.tsx`

- [ ] **Step 1: Import FourPillarsShowcase at the top**

Add this import after the existing imports:

```typescript
import FourPillarsShowcase from "@/components/FourPillarsShowcase";
```

- [ ] **Step 2: Add the showcase section between hero and pricing cards**

Find the section comment `{/* ═══════════════════════════════════════════════════════ 2) THREE TIERS ═══════════════════════════════════════════════════════ */}`

Insert this new section **before** it:

```typescript
      {/* ═══════════════════════════════════════════════════════
          2) FOUR PILLARS SHOWCASE
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-h2 font-display text-ink mb-4">
              What you'll use every day.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg text-ink-soft mb-12 max-w-2xl">
              Before you choose a plan, here's what's actually inside your program.
            </p>
          </Reveal>

          <FourPillarsShowcase variant="full" />

          <Reveal delay={0.3}>
            <p className="text-center text-caption text-ink-soft mt-12">
              Learn what's in each plan ↓
            </p>
          </Reveal>
        </div>
      </Section>
```

Update the section number comment from `2)` to `3)` for the existing pricing cards section and all subsequent sections (adjust their numbers: 3→4, 4→5, etc.).

- [ ] **Step 3: Commit**

```bash
git add src/app/pricing/page.tsx
git commit -m "feat: add Four Pillars Showcase section to pricing page"
```

---

### Task 5: Add teaser section to home page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Import FourPillarsShowcase at the top**

Add this import:

```typescript
import FourPillarsShowcase from "@/components/FourPillarsShowcase";
```

- [ ] **Step 2: Find the location to add the teaser**

Look for the section after `WhyReconnectSection` or similar proof cards. The teaser should go **after hero + proof cards, before any pricing mention**.

- [ ] **Step 3: Add the teaser section**

Insert this section at the appropriate location (after hero, before any pricing reference):

```typescript
      {/* ═══════════════════════════════════════════════════════
          TEASER: FOUR PILLARS
          ═══════════════════════════════════════════════════════ */}
      <Section bg="bg-bone">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <SectionHeader
              eyebrow="Your daily toolkit"
              title="What you'll actually use every day."
              align="left"
            />
            <p className="text-body text-ink-soft mt-6 max-w-md">
              It's not just a program. It's a complete experience designed to keep
              you engaged, informed, and supported.
            </p>
          </div>

          <div>
            <FourPillarsShowcase variant="teaser" />
            <Button
              variant="clay"
              href={asset("/pricing")}
              arrow
              className="mt-8"
            >
              Explore pricing
            </Button>
          </div>
        </div>
      </Section>
```

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add Four Pillars teaser section to home page"
```

---

### Task 6: Update pricing page comparison table to include new features

**Files:**
- Modify: `src/app/pricing/page.tsx` (comparison table section)

- [ ] **Step 1: Verify the comparison table auto-renders**

The comparison table in `pricing/page.tsx` uses `featureMatrix()` from `pricing.ts` which automatically derives from `PLAN_FEATURES`. Since we added the new features to `PLAN_FEATURES` in Task 1, the table should now include:
- "Personalized videos designed for your condition" ✓ ✓
- "Interactive dashboard & progress tracking" ✓ ✓
- "Mobile app access (launching 2026)" ✓ ✓
- "Personalized coach support & weekly check-ins" ✓ ✓

No code changes needed — the table is already data-driven.

- [ ] **Step 2: Run the dev server to verify**

```bash
npm run dev
```

Navigate to `http://localhost:3000/pricing` and verify the comparison table now includes the four new feature rows with checkmarks for both plans.

- [ ] **Step 3: Commit (no changes, just verification)**

```bash
# No changes to commit — verification only
```

---

### Task 7: Light integration into how-it-works (optional touch)

**Files:**
- Check: `src/app/how-it-works/_components/*.tsx`

- [ ] **Step 1: Check if how-it-works page mentions the program structure**

```bash
grep -r "dashboard\|tracking\|coach\|roadmap" src/app/how-it-works/ || echo "No existing mentions"
```

- [ ] **Step 2: Decision point**

If the page already mentions program structure or tracking, add light references to the dashboard/videos (e.g., "you'll track this in your personalized dashboard"). If not, skip this task — don't force integration where it doesn't fit.

Example integration (if the page describes tracking):
- Original: "Track your progress week-to-week."
- Updated: "Track your progress week-to-week in your interactive dashboard."

- [ ] **Step 3: Commit (if any changes made)**

```bash
git add src/app/how-it-works/_components/*.tsx
git commit -m "feat: light pillar mentions in how-it-works journey description"
```

---

### Task 8: Test and verify all pages

**Files:**
- Test: `http://localhost:3000/` (home page)
- Test: `http://localhost:3000/pricing` (pricing page)

- [ ] **Step 1: Start dev server (if not already running)**

```bash
npm run dev
```

- [ ] **Step 2: Verify home page teaser**

Navigate to `http://localhost:3000/`
- Look for "What you'll use every day." section
- Verify 4 pillar items are visible with icons
- Click "Explore pricing" button — should link to `/pricing`

- [ ] **Step 3: Verify pricing page showcase**

Navigate to `http://localhost:3000/pricing`
- Look for "What you'll use every day." showcase section (before pricing cards)
- Verify 4 pillar cards render with titles, descriptions, and placeholder boxes
- Verify section has stagger animation on scroll
- Verify comparison table includes the 4 new feature rows (all with ✓ for both plans)

- [ ] **Step 4: Verify comparison table**

In the pricing page comparison table:
- "Personalized videos designed for your condition" — both checkmarks
- "Interactive dashboard & progress tracking" — both checkmarks
- "Mobile app access (launching 2026)" — both checkmarks
- "Personalized coach support & weekly check-ins" — both checkmarks
- "Deep psychological input" — only Premium checkmark
- "Exclusive 1-on-1 sessions" — only Premium checkmark

- [ ] **Step 5: Verify mobile responsiveness**

Resize browser to mobile width (375px):
- Home page teaser stacks vertically
- Pricing showcase cards stack to 1 column
- Comparison table switches to mobile card layout

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "test: verify Four Pillars implementation on home & pricing pages"
```

---

## Self-Review Checklist

✓ **Spec coverage:**
- Four Pillars Showcase section on pricing page — Task 4
- Pricing comparison table expanded with new features — Task 1, auto-renders in Task 6
- Home page teaser section — Task 5
- How-it-works light integration — Task 7 (optional)
- App positioning as "live now, enhanced later" — Task 3 (in description copy)
- Both tiers get all four pillars — Task 1 (all features added to base)

✓ **Placeholder scan:** No "TBD", "TODO", all code is complete

✓ **Type consistency:** PillarCard props match FourPillarsShowcase usage

✓ **Exact paths:** All file paths are absolute and correct
