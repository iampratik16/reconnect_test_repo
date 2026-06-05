# Built-for-Prevention → Spine Transformation Section

**Date:** 2026-06-05
**File touched:** `src/app/page.tsx` (section 4b), plus one new component and one Vertex script.
**Status:** Approved for implementation.

## Problem

The current "Built for prevention" section (`src/app/page.tsx` ~L204–282) is the most generic
layout on an otherwise ambitious site:

- A standard image-left / text-right 5/7 split, vertically centered, inert.
- The image is a **placeholder** (`/prevent/desk-night.png`, with a `TODO` for the client to
  supply a consented stock photo) — exactly the placeholder-art the brand avoids.
- The right column is a wall of five stacked paragraphs with no visual rhythm; the strongest
  line ("Movement is natural. Sitting still for twelve hours isn't.") is buried fourth.

The section's job (decided in brainstorming) is to **show the transformation** — make a 30–50yo
desk worker feel the before→after arc. The current visual only shows the *problem*.

## Concept

An **abstract anatomical spine** that eases from **compressed → open** as its visual argument,
produced as **Vertex stills + coded motion**. The spine figure is **sticky** on the left and
morphs through its full compressed→open arc (pronounced, cinematic, with a glow ramp) while the
**full copy** (all five paragraphs — kept, per decision) scrolls past on the right. The act of
scrolling performs the transformation.

This ties the section to the existing `SpineScene` / `AnatomicalArt` visual language, carries
zero stock-footage risk, and reinforces the science.

## Layout

Keep the existing `<Section bg="bg-bone">` + `grid grid-cols-1 lg:grid-cols-12` bones.

- **Left — `lg:col-span-5`:** a new `<SpineTransform />` component.
  - `position: sticky; top: ~6rem` so it pins while the taller text column scrolls past.
  - A `figure` with `aspect-[4/5] rounded-[20px] overflow-hidden shadow-lifted`, navy
    (`bg-sage-deep`) backdrop.
  - Three Vertex stills stacked `absolute inset-0`: `spine-compressed`, `spine-mid`,
    `spine-open`. Scroll progress crossfades compressed→mid→open.
  - A thin vertical timeline rail (`NOW` at top, `10 YEARS` at bottom) labelling the morph.
  - A `figcaption` that swaps with progress: compressed → "Compressed. Aching by evening." /
    open → "Open. Mobile into your 50s."
  - Pronounced treatment: opacity crossfade **plus** a `filter: brightness/saturate` glow ramp
    and a subtle scale (≈1.03→1.0) so the open state visibly "arrives."

- **Right — `lg:col-span-7`:** **all current copy kept**, wrapped in `Reveal` as today
  (eyebrow → h2 → lede → long paragraph → promoted pull-quote → prevention paragraph → buttons).
  The pull-quote keeps its `serif-italic text-h4 text-clay` emphasis. No copy is deleted.

## Motion

- Use `framer-motion` (v12, already installed) `useScroll({ target, offset })` over the section,
  feeding `useTransform` to drive each still's opacity, the glow `filter`, and the scale.
- `useReducedMotion()` → render the `spine-open` still statically, no scroll binding.
- On mobile (`< lg`) the grid is single-column; the figure is **not** sticky there (it stacks
  above the copy) and shows the `open` still, or a short non-sticky crossfade on enter. Keep it
  calm on small screens.

## Vertex production

New script `scripts/gen-prevent-spine.mjs`, reusing the existing pattern
(`gcloud auth print-access-token`, project `radlabs-497004`, `us-central1`,
`imagen-3.0-generate-001`, response `predictions[0].bytesBase64Encoded`).

- **3 stills**, `aspectRatio: "4:5"`, output → `public/prevent/spine/{compressed,mid,open}.png`.
- **Palette discipline (colour-clash guard):** this section's tokens are blue/navy/white
  (`--color-clay #0064E0`, `--color-sage-deep #00295C`, bone white). Prompts MUST use
  **deep navy + glowing cyan/electric-blue**, NOT the terracotta/ivory used by the older
  `gen-science-images.mjs`. Otherwise the stills clash with the section.
- Prompt arc (abstract, anatomical, no text, no literal human):
  - `compressed`: stylized human spine, vertebrae **compressed and tense**, cool deep-navy
    background, faint cold under-glow, 3D medical-visualization style, editorial, no text.
  - `mid`: same spine, mid-transition, beginning to open, soft electric-blue rim light.
  - `open`: same spine, vertebrae **open, aligned, decompressed**, warm glowing cyan/electric-blue
    light flowing along it, sense of ease and space, premium, no text.
  Keep camera/crop/composition consistent across the three so the crossfade reads as one spine
  changing, not three different images.

## Components / files

- New: `src/app/_components/SpineTransform.tsx` (client component; owns the scroll/morph logic).
- New: `scripts/gen-prevent-spine.mjs`.
- Edit: `src/app/page.tsx` section 4b — replace the placeholder `figure` (L207–231) with
  `<SpineTransform />`; keep the entire right column copy unchanged.
- Old `/prevent/desk-night.png` placeholder usage is removed from this section.

## What this fixes

- Placeholder stock image → on-brand generated anatomy, no colour clash.
- Inert symmetric split → sticky, scroll-driven transformation that *is* the argument.
- Wall of text retained (per decision) but given a moving anchor beside it.

## Out of scope

- No copy rewrites/deletions.
- No changes to other sections.
- Video generation (decided against; stills + coded motion instead).
