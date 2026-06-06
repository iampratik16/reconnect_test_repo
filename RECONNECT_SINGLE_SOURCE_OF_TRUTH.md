# RECONNECT — SINGLE SOURCE OF TRUTH
## Page-by-Page Build Prompts for Claude Code (Awwwards-tier)

> **What this is:** the definitive, paste-ready build spec for the Reconnect website. It merges two inputs into one: (a) the **strategy + design-system master spec**, and (b) the **21st.dev component-sourcing page prompts**. Where they differed, this file is the tie-breaker — build to *this*.
>
> **Quality bar:** `https://www.myhealthprac.com` (cinematic, editorial, scroll-driven, high whitespace, looping muted media, horizontally-scrolling cards, numbered sticky sequences, soft photography, restrained palette + one warm accent).
> **Positioning:** doctor-led strength & nutrition for **bones & joints** (the deliberate niche). Do **not** revert to generic "all lifestyle diseases" copy.
> **The #1 rule:** never ship a template. Every section needs intentional layout + real motion. If a block looks like a generic Tailwind/Bootstrap starter, it's wrong.

---

## HOW TO USE (operator — read first)

1. **Paste `PROMPT 0` first.** It scaffolds the project, the design system, fonts, smooth scroll, global nav/footer, and the reusable primitives. Verify the tokens + nav before continuing.
2. **Then paste `PROMPT 1 → PROMPT 10` one at a time, in order.** After each, build, fix all errors/warnings, and visually verify at **mobile + desktop** (and confirm reduced-motion) before moving on. **Do not batch-paste.**
3. **Finish with the `QA PASS`.** Then deploy to Vercel.

**Before you start:** confirm the **21st.dev Magic MCP** is connected (`https://github.com/21st-dev/magic-mcp`). Every page sources its base components from `https://21st.dev/community/components` via this MCP, then adapts them to our tokens. If the MCP isn't connected, connect it first.

**Golden constraints (true for every prompt):**
- Source section primitives from the **21st.dev Magic MCP**, then re-skin to our design tokens — never paste a component raw with its own colors/fonts.
- Use the **design tokens** from the design system — never hardcode hex inline.
- Every section has **≥1 deliberate motion behaviour**; the hero gets one orchestrated, staggered entrance. Respect **`prefers-reduced-motion`** everywhere (opacity-only fallback, no transforms/parallax/marquee autoplay/pinning).
- **Mobile-first**, fully responsive (390 / 768 / 1024 / 1440 / 1920; test iPad mini portrait).
- **Accessibility (WCAG 2.1 AA)** is non-negotiable.
- All copy below is **final approved copy** in the founder's voice unless marked `TODO`/`placeholder`.
- Keep all **medical claims measured** — supports, never replaces, medical care; no cure claims.

---

## CONTEXT (read once — applies to every prompt)

**Who:** Reconnect Wellness, founded by **Dr. Shruthi Desai** — a *rheumatologist* (chronic conditions, chronic pain; **non-surgical** — she refers surgical cases to orthopedics). She *is* the product.

**The pivot (the entire reason for this rebuild):** the old site tried to cover every lifestyle disease and competed with HealthifyMe / Fitternity / Cult. **The whole brand now focuses on BONES & JOINTS** — arthritis, knee pain, back/neck pain, disc issues, osteoporosis, joint protection — delivered through **doctor-designed, personalised strength training.** Everything generic gets cut. This niche choice is also an SEO play (own "arthritis exercise program", "best ortho alternative treatment").

**Her one-sentence differentiator (use everywhere):** *"Not random workouts — a strength program designed for YOUR specific body condition, by a doctor."* Four proof-points: **doctor-led** (not just trainers) · **personalised to your body/condition** (not one-size-fits-all) · **pain-first** (treat the pain, THEN train) · **structured roadmap** (not random YouTube exercises).

**The client journey is the spine of the site — show it explicitly, in order, on multiple pages:**
**1. Medical Assessment** (always first) → **2. Personalised Exercise Program** (split by upper body / lower body / back / specific joints; starts where the problem is; age-appropriate progression) → **3. Nutrition Plan** (driven by a pre-questionnaire capturing veg/non-veg + food preferences + medical history) → **4. Psychology Referral** (only if a mental block is detected). Frame the four as **one interconnected journey**, not four separate services.

**Founder voice — use these as real copy:**
- *Knee-pain:* "People in pain won't exercise. So we calm the pain first with the right medical measure, then build a full-body program around it."
- *YouTube:* "YouTube has endless exercises — but no motivation, and no direction for *where your body is at*. We give the roadmap: weeks 1–3 are this, weeks 4–6 are this, by month 2 your muscles activate, then we progress."
- *Age-specific:* a 30-yr-old gets dumbbells; a busy 40-yr-old mother gets an efficient 30-minute plan. Same method, different prescription.
- *Beginners:* "Never lifted a dumbbell? I won't throw numbers at you — that's how people quit on day one."

**CGM product (secondary — a revenue service, NOT the brand):** a **Continuous Glucose Monitoring** package, **₹15,000 / 6 months**. A sensor on the arm logs glucose ~15 days, sent to a remote monitoring centre; the person sees what spikes their sugar and adjusts nutrition + exercise. For borderline-diabetic / medication-avoidant people. Give it **one dedicated page + one slim home teaser**, clearly subordinate to bones & joints. Never let it dominate.

**Trust / pricing-resistance goal:** prospects hesitate to pay. Every page must build perceived value and credibility — patient outcomes, doctor credentials, the "designed for you, not generic" proof — to justify the price.

**Imagery rule:** the current site uses watermarked Adobe Stock — **do NOT ship stock watermarks.** Use clean licensed/AVIF placeholders with descriptive `alt`, and leave clear `TODO` comments where Dr. Shruthi's real patient/clinic photos go (with consent). Apply a consistent warm grade so all photography harmonises with the palette.

**⚠️ Pricing conflict to resolve (flag, don't block):** the founder verbally quoted **₹15,000 / 6 months**; the Phase-2 site shows monthly tiers (Essential ₹2,499 · Care ₹4,999 · Elite ₹8,999). Build the pricing page with the monthly tiers as the structure, present the ₹15K as a likely "6-month program" framing, and leave a prominent `TODO` to confirm real numbers with the client before launch.

---

## DESIGN SYSTEM SUMMARY (every prompt assumes this)

**Aesthetic direction — "Restorative Clinical Editorial":** high-end wellness-magazine feel crossed with a precision medical lab. Airy, confident, warm-but-clinical. Generous negative space, large editorial display headlines, asymmetric/overlapping layouts, elegant **anatomical line-art** motifs (knee, spine, hand, hip, skeleton) as accents/oversized watermarks, a faint **paper grain**, and a subtle **"x-ray glow"** behind hero media and key cards. Oversized editorial section numbers (e.g. `(01) The Science`). One **dark section** (`--sage-deep`) as a dramatic contrast moment.

**Color tokens (definitive — wire into Tailwind theme + CSS vars; no pure white/black):**
```
--bone:       #FAF7F2   /* page canvas */
--bone-deep:  #F0EBE1   /* alternating sections */
--ink:        #1A1A1A   /* primary text */
--ink-soft:   #4A4A46   /* secondary text */
--clay:       #C75B39   /* PRIMARY warm accent — CTAs/highlights, used sparingly */
--clay-soft:  #E7C3B2
--sage:       #3E5C54   /* SECONDARY brand — links, motifs, outlines */
--sage-deep:  #28403A   /* dark-section background (text = --bone) */
--sage-tint:  #DDE7E2   /* soft wash for chips/cards */
--calcium:    #FCFBF8   /* brightest card surface on bone bg */
--line:       #E3DCCF   /* hairline rules / borders */
```
Usage: `--bone` dominates; `--ink` for type; `--sage` is the workhorse; `--clay` stays special (primary CTAs + key highlights only).

**Typography:** distinctive **display serif** for headlines — **Fraunces** (preferred; variable, optical sizing) or *PP Editorial New* / *Newsreader* — paired with a clean **humanist/grotesk** body — **Hanken Grotesk** or **Geist** or **Schibsted Grotesk**. **Forbidden: Inter, Roboto, Arial, system-ui, Space Grotesk.** Fluid `clamp()` scale: hero `clamp(2.75rem,7vw,6.5rem)` lh~0.98; H2 `clamp(1.75rem,3.5vw,3rem)`; eyebrow `0.8125rem` uppercase tracking `0.12em`. Use occasional serif *italic* on emphasis words.

**Spacing/grid:** 12-col, max `~1240px`, generous gutters, allow full-bleed; desktop section padding `≥120px` vertical; soft radii (cards 16–20px, pills full); embrace asymmetry/overlap.

**Motion:** default ease `cubic-bezier(0.16,1,0.3,1)`, durations 0.6–0.9s, stagger children 0.06–0.1s. **Framer Motion** for orchestration + **Lenis** for smooth scroll.

**Reusable primitives to build in PROMPT 0 (used by all pages):**
`<SmoothScroll>` (Lenis) · `<Section>` · `<Eyebrow>` (numbered) · `<SplitReveal>` (mask/line headline reveal) · `<Reveal>` (fade-up + slight blur) · `<Stagger>` · `<AnimatedCounter>` · `<ScrollMarquee>` (infinite, pause-on-hover) · `<BentoGrid>` · `<Accordion>` (animated height) · `<JourneyStepper>` (the recurring 4-step Assessment→Exercise→Nutrition→Psychology flow) · `<MagneticButton>` · `<PageTransition>` · `<CTASection>` · `<Button>` (clay primary / sage outline / ghost) · `<Pill>` (condition chips) · `<Card>` · `<SectionHeader>`.

**21st.dev primitive → section map (fetch via Magic MCP, then re-skin):**
hero w/ video & mask headline · animated counter strip · feature/comparison cards · **bento grid** · **infinite scroll marquee** · image-card grid w/ hover zoom · **sticky-scroll / pinned numbered timeline** · testimonial slider · **premium pricing table** · **multi-step form / stepper** · accordion · split contact layout.

**Content as data:** put repeated content in typed objects under `/lib/content/*.ts` (`programs`, `conditions`, `journey`, `differentiators`, `science`, `testimonials`, `pricing`, `faqs`, `nav`) so pages map over them and copy is editable in one place.

---

## PROMPT 0 — Project Scaffold & Global Design System

```
You are building an award-tier marketing site for "Reconnect Wellness," a rheumatologist-led, personalised strength-training program focused EXCLUSIVELY on BONES & JOINTS (arthritis, knee/back/neck pain, disc issues, osteoporosis, joint protection). Founder & medical lead: Dr. Shruthi Desai (rheumatology; non-surgical, refers surgery out). Visual benchmark: myhealthprac.com — cinematic, editorial, scroll-driven, high whitespace, one warm accent. Set up the FOUNDATION ONLY in this step; do not build pages yet. Do not ship anything that looks like a template.

STACK
- Next.js (App Router) + TypeScript + Tailwind CSS.
- Framer Motion for entrance/scroll animation; Lenis for smooth scroll.
- Use the 21st.dev Magic MCP (https://github.com/21st-dev/magic-mcp) to fetch UI primitives throughout the project. Confirm the MCP is connected now; if not, tell me how to connect it before proceeding.

DESIGN SYSTEM (Tailwind theme tokens + CSS variables) — aesthetic name "Restorative Clinical Editorial":
- Palette (NO pure white, NO pure black):
  --bone #FAF7F2 (canvas) · --bone-deep #F0EBE1 (alt sections) · --ink #1A1A1A (text) · --ink-soft #4A4A46 ·
  --clay #C75B39 (PRIMARY warm accent / CTAs, used sparingly) · --clay-soft #E7C3B2 ·
  --sage #3E5C54 (secondary brand) · --sage-deep #28403A (dark sections, text=--bone) · --sage-tint #DDE7E2 ·
  --calcium #FCFBF8 (brightest card) · --line #E3DCCF (hairlines).
- Type: display serif headlines = Fraunces (variable; optical sizing) [fallbacks: PP Editorial New / Newsreader]; body = Hanken Grotesk [or Geist / Schibsted Grotesk]. DO NOT use Inter, Roboto, Arial, system-ui, or Space Grotesk. Self-host via next/font. Big editorial scale with clamp(): hero clamp(2.75rem,7vw,6.5rem) line-height ~0.98; H2 clamp(1.75rem,3.5vw,3rem); eyebrow 0.8125rem uppercase tracking 0.12em. Allow serif italic on emphasis words.
- Spacing: 12-col grid, ~1240px max width, generous gutters, full-bleed allowed; desktop vertical section padding >=120px; soft radii (cards 16-20px, pills full). Embrace asymmetry/overlap.
- Motion: ease cubic-bezier(0.16,1,0.3,1), 0.6-0.9s, stagger 0.06-0.1s. Fade-up + mask reveals, hero parallax, hover lifts. RESPECT prefers-reduced-motion everywhere (opacity-only fallback; no transforms/parallax/marquee autoplay/pinning).
- Signature visual language: thin elegant anatomical line-art SVGs (knee, spine, hand, hip, skeleton) as accents/oversized watermarks; subtle paper-grain/noise overlay at low opacity; soft "x-ray glow" radial behind hero media & key cards; oversized editorial section numbers.
- Imagery: rounded-2xl, soft shadows, AVIF/WebP, lazy-loaded, consistent warm grade. NO stock watermarks — clean placeholders + clear TODO comments where Dr. Shruthi's real patient/clinic photos go (with consent).

GLOBAL COMPONENTS to scaffold now
- Sticky nav: transparent over hero -> frosted/solid (backdrop-blur, --calcium ~85%, hairline bottom border) on scroll. Links: Programs · How It Works · About Dr. Shruthi · Pricing · FAQ. Primary button "Take the free assessment" (clay, magnetic). Mobile: full-screen overlay with large serif links that stagger in, CTA pinned bottom, anatomical motif in corner; focus-trapped, closes on Esc/route change.
- Footer: DARK (--sage-deep bg, --bone text) with an oversized serif CTA band on top "Your joints deserve better than painkillers and rest." + assessment CTA. Columns: brand blurb (rheumatologist-led; works alongside your medication, not instead of it) · Programs (Prevent/Manage/Recover/CGM) · Company (How It Works/About/Pricing) · Support (FAQ/Contact/Assessment) · Legal (Privacy/Terms/Accessibility). Newsletter capture ("Insights that move you forward — no noise.") with success state. Tagline "Designed by Dr. Shruthi Desai, Rheumatologist." + Instagram/LinkedIn + (c) 2026. Faint oversized skeleton/spine line-art watermark behind it.
- Reusable primitives (build + a quick demo of each): <SmoothScroll> (Lenis provider), <Section>, <Eyebrow> (numbered), <SplitReveal> (mask/line headline reveal), <Reveal> (fade-up+blur on inView), <Stagger>, <AnimatedCounter>, <ScrollMarquee> (infinite, pause-on-hover, reduced-motion static), <BentoGrid>, <Accordion> (animated height), <JourneyStepper> (the 4-step Assessment->Exercise->Nutrition->Psychology flow that recurs site-wide), <MagneticButton>, <PageTransition>, <CTASection>, <Button> (clay primary / sage outline / ghost + arrow nudge), <Pill>, <Card>, <SectionHeader>.
- Content-as-data: create /lib/content/*.ts typed objects for programs, conditions, journey, differentiators, science, testimonials, pricing, faqs, nav.
- Routes (empty shells for now): / · /programs · /programs/prevent · /programs/manage · /programs/recover · /how-it-works · /about · /pricing · /cgm · /faq · /assessment · /contact.

DELIVERABLE: scaffolded project, tokens, fonts (confirm NOT Inter), smooth scroll, reduced-motion support, global nav (transparent->solid) + mobile overlay, dark footer, all primitives, routed shells. Show me the tokens, fonts, and nav before we continue.
```

---

## PROMPT 1 — Home Page (`/`)  ★ the showpiece

```
Build the Reconnect home page at "/". Cinematic, scroll-driven, myhealthprac-grade — this page sets the bar for the whole site, so get the design language right here. Source each section's base component via the 21st.dev Magic MCP, then re-skin to our tokens. Core message: bones & joints, doctor-designed, personalised, pain-first. Every section animates on scroll; reduced-motion safe; mobile-first. Sections in order:

1) HERO (full viewport). Looping muted background video (poster /woman-dumbbell.jpg; still image on mobile/reduced-motion) of a real person doing a guided strength exercise, warm-graded, with a soft x-ray glow + gentle parallax. Eyebrow with verified icon: "Designed by Dr. Shruthi Desai, Rheumatologist." Orchestrated staggered load: eyebrow -> <SplitReveal> headline line-by-line "Stronger joints. Denser bones. A life without the *pain.*" (italic serif on "pain") -> subhead "A doctor-designed strength and nutrition program for arthritis, joint pain, back issues, and osteoporosis. Built for real people, not athletes." -> CTAs. CTAs: primary "Take Free Assessment" (clay, magnetic) -> /assessment ; secondary "Book Consultation" -> /contact.

2) STAT STRIP — <AnimatedCounter> on scroll, hairline-separated, understated/editorial: 500+ Members helped · 12 wk Structured programs · 4.9 Average rating · 3 Specialist tracks.

3) THE DIFFERENTIATOR (the most important block — make it land). Eyebrow "(01) Why Reconnect". Headline "Not random workouts. A program designed for your body." Visually contrast generic fitness apps vs Reconnect. Four proof cards: Doctor-led (not just trainers) · Personalised to your exact condition (not height+weight) · Pain-first (we calm the pain, then train) · Structured roadmap (not endless YouTube videos). Weave the founder's voice as a pull-quote: "YouTube has endless exercises — but no motivation, and no direction for where your body is at. We give you the roadmap."

4) THE SCIENCE — Eyebrow "(02) The Science". "Why strength training changes everything." <BentoGrid> 4 cards w/ hover lift + anatomical icon motifs: Less Pain ("Targeted strength work reduces joint load and inflammation, easing chronic pain over time.") · Denser Bones ("Resistance training stimulates bone formation and slows mineral loss, especially post-menopause.") · Retained Muscle ("After 30 you lose 3-5% muscle per decade — strength training reverses sarcopenia at any age.") · Prevent Degeneration ("Strong muscles stabilise joints and protect cartilage, slowing osteoarthritis.").

5) CONDITIONS MARQUEE (SIGNATURE — mirrors the reference's scrolling cards). Heading "Built for the conditions you actually live with." Two <ScrollMarquee> rows scrolling opposite directions (pause on hover), condition cards each w/ line-art motif + name + one-line note: Knee Osteoarthritis · Chronic Back Pain · Disc Bulge / Sciatica · Rheumatoid Arthritis · Osteoporosis · Frozen Shoulder · Cervical (Neck) Pain · Post-menopausal Bone Loss · Joint Stiffness · Hip Pain. Cards link to the relevant Program track. Reduced-motion: render as a static wrapped grid.

6) THE JOURNEY — render <JourneyStepper>: Medical Assessment -> Personalised Exercise Program -> Nutrition Plan -> Psychology (if needed). Make explicit assessment ALWAYS comes first and the four are interconnected (one line each; full copy lives in How It Works). Animate the connectors in sequence. CTA "See how it works" -> /how-it-works.

7) PROGRAMS — Eyebrow "(03) Programs". "Choose your path." Intro: "Three tracks for where you are today. Each is personalised after your medical assessment." Three large image cards (staggered reveal, image zoom on hover) -> /programs/prevent, /manage, /recover, with tag chips (Prevent: Early arthritis · Bone health · 40+ · Manage: Active arthritis · Joint pain · Back pain · Recover: Post-surgery · Severe OA · Rehab).

8) WHAT MAKES US DIFFERENT (DARK section, --sage-deep, --bone text — the dramatic contrast moment). Headline "This isn't a fitness app. It's medicine that moves you." Four points (stagger): Doctor-led, not influencer-led · Personalised to your diagnosis · Pain-first ("we work around pain, respect it, reduce it — then build strength") · Structured 12-week roadmap (the direction & motivation YouTube can't give).

9) MEET DR. SHRUTHI — asymmetric editorial split, portrait (/dr-shruthi.jpg, warm-graded, parallax) + text. Eyebrow "Your medical lead". "MBBS, MD (Internal Medicine), DM (Rheumatology). Over 12 years in rheumatology. Reconnect was born from her belief that strength training, done right, is the most powerful medicine for joint and bone health." Note non-surgical / works alongside your doctor. CTA "Read full story" -> /about.

10) TESTIMONIALS — Eyebrow "(04) Results". "Real people, real outcomes." Slider of 3 (give it room — trust is a priority): Rajesh 58 / Knee OA / "Pain reduced 60%" — "I was told I needed a knee replacement. After 12 weeks my pain dropped from 8 to 3. I'm walking 5 km daily." ; Meera 42 / Back pain & disc bulge / "Zero flare-ups in 4 months" ; Amit 65 / Osteoporosis (T-score -3.2) / "DEXA score improved." (placeholders — TODO real consented stories.)

11) CGM TEASER (slim, clearly secondary — must NOT compete visually with bones/joints). One band: "Managing borderline sugar? Ask about our Continuous Glucose Monitoring program — ₹15,000 / 6 months." -> /cgm.

12) PRICING TEASER — three compact plans (Essential ₹2,499/mo · Care ₹4,999/mo [Most Popular] · Elite ₹8,999/mo) with short bullets -> /pricing. Note "All plans include a medical assessment and a personalised program." TODO: confirm pricing vs the ₹15K/6-month program figure.

13) FINAL CTA — <CTASection> big serif "Your joints deserve better than painkillers and rest." Sub "Take a 2-minute assessment and find the right program for your body." Buttons -> /assessment + /contact. Anatomical watermark behind.

Render and show me at mobile + desktop.
```

---

## PROMPT 2 — Programs Overview (`/programs`)  ★ the rebuilt "Services" section

```
Build "/programs" — the hub for the three condition tracks and the connected journey. IMPORTANT FRAMING: in this niche rebuild, "what we offer" = condition-focused BONE & JOINT programs (NOT the old generic Medical/Exercise/Nutrition/Psychology service list — those four are the METHOD, shown on /how-it-works). Source comparison/bento/card + categorized-list components via the 21st.dev Magic MCP, re-skin to tokens. Animate on scroll; reduced-motion safe; mobile-first.

1) HERO: Eyebrow "Programs". Headline "One method. Three starting points." Subhead: every member gets a medical assessment first, then a personalised program; every track runs the same connected journey (Assessment -> Exercise -> Nutrition -> Psychology) tuned to their condition and severity. CTA "Take Free Assessment".

2) DIFFERENTIATOR (brief restatement): designed for your body, not generic; pain-first; doctor-led.

3) THE THREE TRACKS — alternating split rows (image + copy + tag chips + "Explore" button), each with the connected journey implied:
   - PREVENT -> /programs/prevent — "For early signs, family history, or age-related risk. Build strength and bone density before problems start." Tags: Early arthritis · Bone health · 40+.
   - MANAGE -> /programs/manage — "For those living with arthritis, joint pain, or disc issues. Reduce flare-ups and build resilience." Tags: Active arthritis · Joint pain · Back pain.
   - RECOVER -> /programs/recover — "For post-surgery or severe degeneration. Rebuild strength safely under close medical guidance." Tags: Post-surgery · Severe OA · Rehab.

4) CONDITIONS WE TREAT (reference-style categorized columns — comprehensive + SEO-rich, stagger in). Group:
   - Joints & Arthritis: Knee osteoarthritis · Rheumatoid arthritis · Joint pain & stiffness · Frozen shoulder · Hip pain
   - Spine & Back: Chronic back pain · Disc bulge / herniation · Sciatica · Cervical (neck) pain · Posture-related pain
   - Bone Health: Osteoporosis · Osteopenia · Post-menopausal bone loss · Fracture-risk strength building
   - Recovery & Rehab: Post-surgical strength rebuild · Severe osteoarthritis support · Deconditioning / sarcopenia
   Each item deep-links/anchors to the most relevant track.

5) "HOW EVERY PROGRAM IS BUILT" — render <JourneyStepper> with full framing: Medical Assessment first; Exercise split by upper body / lower body / back / specific joints, starting where the problem is, age-appropriate; Nutrition via veg/non-veg pre-questionnaire; Psychology referral only if a block is detected. Add a small body-region diagram with selectable regions.

6) SELF-SELECT COMPARISON TABLE: tracks x (who it's for / intensity / typical conditions / goal).

7) CGM add-on card (clearly subordinate) -> /cgm.

8) CTA band -> /assessment.

Render and show me at mobile + desktop.
```

---

## PROMPT 3 — Program Detail Template + 3 instances (`/programs/[prevent|manage|recover]`)

```
Build ONE data-driven Program Detail template (from /lib/content/programs.ts); render all three instances. Source sticky-scroll/timeline + FAQ + testimonial components via the 21st.dev Magic MCP. Keep all medical claims measured (works alongside existing care; no cure claims). Animate; reduced-motion safe; mobile-first.

TEMPLATE sections:
1) Hero: track name, one-line promise, "who this is for" chips, hero image, CTA "Take Free Assessment".
2) "Is this you?" — signals/conditions checklist for this track (self-identification).
3) THE 12-WEEK ROADMAP — sticky-pinned scroll timeline using the founder's real framing: weeks 1-3 (settle pain / foundation), weeks 4-6 (activate & build), month 2 (muscles activating -> progress, start loading/standing), then sustain. Show how the program splits by body region (upper / lower / back / target joint) and starts where the problem is. (Reduced-motion: stacked vertical sequence, no pinning.)
4) How the four pillars adapt for this track's severity (Medical · Exercise · Nutrition · Psychology).
5) Expected outcomes — cautious, responsible cards (pain down, mobility up, bone support, confidence). No cure claims; note it works alongside existing medical care.
6) A matching testimonial (Manage -> Meera ; Recover -> Rajesh ; Prevent -> Amit / bone health).
7) Track-specific FAQ accordion (3-4 Qs).
8) CTA band -> /assessment.

INSTANCE CONTENT:
- PREVENT: early signs / family history / 40+ / post-menopausal bone health. Goal: build strength & density before problems start; "being protective now prevents future problems."
- MANAGE: active arthritis, chronic joint pain, back/neck pain, disc bulge. Goal: reduce flare-ups, manage symptoms, build resilience. Lead with the knee-pain story (calm the pain first with the right medical measure, then a full-body program around it).
- RECOVER: post-surgery, severe OA, rehab. Goal: rebuild strength safely under close guidance; most cautious progression; non-surgical, coordinates with the treating doctor.

Render all three and show me.
```

---

## PROMPT 4 — How It Works (`/how-it-works`)  ★ sticky scroll-storytelling centerpiece

```
Build "/how-it-works" as the cinematic, scroll-driven explainer of the connected journey — echoing myhealthprac's numbered sticky reveals. This is where the old "Medical / Exercise / Nutrition / Psychology" services are INTEGRATED into one premium journey. It must make the "designed for YOU, not generic" mechanic unmistakable. Source sticky-scroll/pinned-step components via the 21st.dev Magic MCP. Animate; reduced-motion safe; mobile-first.

1) HERO: "How Reconnect works" + subhead: a doctor-led, personalised process — assessment first, then a program built around your exact condition.

2) BIG NUMBERED STICKY-SCROLL SEQUENCE — a sticky visual panel updates as step text advances (pinned). (Reduced-motion: render as a clean vertical stacked sequence, no pinning.)
   01 Medical Assessment (always first) — "A detailed review of your condition, history, medications, and imaging by our medical team. This decides everything that follows. Care is patient-to-patient."
   02 Personalised Exercise Program — "Not random workouts. Split across upper body, lower body, back, and specific joints — we start where your problem is. If you've never lifted a dumbbell, we won't throw numbers at you. A 30-year-old and a busy 40-year-old get different prescriptions."
   03 Nutrition Plan — "A nutrition chart built from a pre-questionnaire capturing your food preferences (veg / non-veg) and history. Anti-inflammatory and bone-supportive, tied to your program."
   04 Psychology Support (only if needed) — "If we detect a mental block to movement, we refer you to a psychologist. Mindset matters as much as the muscle."

3) "WHY NOT JUST YOUTUBE?" callout — endless exercises, zero direction or motivation; Reconnect gives the roadmap and knows where your body is at.

4) RECONNECT vs GENERIC APPS comparison block — HealthifyMe / Fitternity = height + weight + preferences -> one generic template; Reconnect = medical assessment -> condition-specific, body-region-split, personalised program.

5) "WHAT MAKES US DIFFERENT" 4-card recap (doctor-led · personalised · pain-first · structured roadmap).

6) EXPECTATION TIMELINE: week 1, weeks 4-6, month 2, month 3 (measured language).

7) CTA band -> /assessment.

Render and show me at mobile + desktop.
```

---

## PROMPT 5 — About Dr. Shruthi (`/about`)

```
Build "/about" — an editorial founder/story page; magazine-grade typography and pacing like myhealthprac's narrative sections. Source editorial/quote + timeline components via the 21st.dev Magic MCP. Do NOT invent extra credentials or claims. Animate; reduced-motion safe.

1) HERO: portrait (/dr-shruthi.jpg, warm-graded, parallax), name "Dr. Shruthi Desai", credentials "MBBS, MD (Internal Medicine), DM (Rheumatology)". Eyebrow "Your medical lead".
2) ORIGIN STORY — long-form, true to the call: a rheumatologist treating chronic conditions and chronic pain (non-surgical — surgical cases referred to orthopedics). She started broad across lifestyle conditions, but six months of patient response showed her real strength is bones & joints + personalised strength training, so she focused there. Reconnect exists because she saw patients harmed by generic exercise advice.
3) PHILOSOPHY pull-quote (large display serif): pain-first, doctor-led, designed-for-your-body — "we work around the pain, respect it, and reduce it."
4) WHAT "DOCTOR-LED" MEANS in practice — clean list: medical assessment first · program tuned to diagnosis · works alongside your medication, not instead of it · coordinates with your treating doctor.
5) "WHY BONES & JOINTS" — tie to the three tracks and the all-ages joint-protection point.
6) CTA band -> /assessment or /contact.

Render and show me.
```

---

## PROMPT 6 — Pricing (`/pricing`)

```
Build "/pricing". Source a premium pricing-table component via the 21st.dev Magic MCP; re-skin to tokens. PRICING IS UNRESOLVED — see the TODO. Animate (stagger cards; popular card subtle glow); reduced-motion safe; mobile-first.

1) HERO: "Plans that fit your needs." Subhead "All plans include a medical assessment and a personalised program."
2) THREE TIERS (Care = Most Popular, elevated):
   - Essential ₹2,499/month: Medical assessment · Personalised strength plan · Monthly check-in.
   - Care ₹4,999/month: Everything in Essential · Nutrition guidance · Weekly coaching calls · Progress tracking.
   - Elite ₹8,999/month: Everything in Care · Psychology support · Priority doctor access · Daily coach check-ins.
   Each CTA -> /assessment.
   ⚠️ TODO (prominent code comment): the founder quoted ₹15,000 for a 6-month program. Reconcile these monthly tiers with that figure before launch — likely present a "6-month program" option alongside monthly. Flag to client.
3) ADD-ON ROW: CGM Program — ₹15,000 / 6 months -> /cgm.
4) VALUE-JUSTIFICATION band (pricing resistance is real): why this costs more than a generic app — doctor-designed, personalised to your body, pain-first, structured. Reinforce with an outcome stat or testimonial.
5) FEATURE COMPARISON TABLE across tiers.
6) PRICING FAQ (billing, cancellation/pause — flexible, no lock-ins; what's included; do I need a referral; is it instead of my doctor — no, works alongside).
7) CTA band.

Render and show me.
```

---

## PROMPT 7 — CGM Program (`/cgm`)

```
Build "/cgm" — a dedicated page for the Continuous Glucose Monitoring program. SECONDARY revenue product: reuse the design system but keep it clearly distinct and subordinate to the bones/joints brand (slightly cooler/quieter palette accents to signal it's the metabolic track). Source explainer/step + card components via the 21st.dev Magic MCP. Measured medical language (supports, does not replace, diabetes care). Animate; reduced-motion safe.

1) HERO: "Continuous Glucose Monitoring — see exactly what spikes your sugar." Subhead for borderline-diabetic or medication-avoidant people who want data-driven control.
2) HOW IT WORKS (numbered): a small sensor is placed on your arm -> it logs glucose continuously for ~15 days -> readings are sent to our remote monitoring centre -> you see what foods/activities spike your sugar -> we adjust your nutrition and exercise accordingly.
3) WHO IT'S FOR: borderline diabetes, pre-diabetic, anyone wanting to avoid/delay medication, the metabolically curious.
4) WHAT YOU GET: 6 months of guidance, the monitoring period, personalised nutrition + exercise adjustments, doctor oversight.
5) PRICE: ₹15,000 for 6 months (clearly stated). CTA "Enquire / Book" -> /contact.
6) Soft cross-link back to the core bones/joints programs.

Render and show me.
```

---

## PROMPT 8 — FAQ (`/faq`)

```
Build "/faq" — animated <Accordion> (source base via the 21st.dev Magic MCP), quiet editorial layout, grouped with sticky in-page group nav: "About the program", "Medical & safety", "Logistics & pricing". Seed these (expand to ~12, medically responsible, on-brand). Animate height; reduced-motion safe.

- Will this replace my doctor or medication? "No. Reconnect works alongside your existing treatment. Programs are designed by a rheumatologist to complement your care, not replace it; we coordinate with your treating doctor when needed."
- How is this different from physiotherapy? "Physio focuses on rehab after injury/surgery. Reconnect builds long-term progressive strength designed for joint/bone conditions — not just short-term relief."
- How is this different from HealthifyMe / Fitternity / a YouTube plan? "Those give one generic set of workouts from your height/weight. We start with a medical assessment and design a program around your exact condition, splitting it by body region and starting where your problem is."
- Do you do surgery? "No. Dr. Shruthi is a rheumatologist; surgical cases are referred to orthopedics. We focus on non-surgical strength and pain management."
- I've never exercised / I'm in pain right now. "We calm the pain first with the right measures, then start gently and progress gradually. We never throw heavy numbers at a beginner."
- Can I join if I'm already on arthritis medication? "Yes — the assessment accounts for your treatment, condition, and limitations."
- What's the CGM package? (short answer + link to /cgm).

Closing CTA -> /assessment. Render and show me.
```

---

## PROMPT 9 — Assessment (`/assessment`)  ★ lead-gen funnel

```
Build "/assessment" — a warm, reassuring multi-step "2-minute" intake (stepper UI via the 21st.dev Magic MCP). This doubles as the medical-assessment-first entry point AND captures the nutrition pre-questionnaire. One question per screen, animated progress bar + smooth transitions, validation, fully keyboard-navigable, reduced-motion safe. Steps:
1) Primary concern: knee pain / back & neck pain / arthritis / disc issues / bone health (osteoporosis) / prevention / managing blood sugar (-> flag for CGM).
2) Severity & duration; current pain level (0-10).
3) Current activity level + dumbbell/exercise experience ("never lifted a dumbbell" is a valid, welcomed answer).
4) Age band + any current treatment/medications + relevant imaging (DEXA / X-ray / MRI) — optional uploads.
5) Nutrition pre-questionnaire: veg / non-veg / eggetarian, allergies, food preferences.
6) Contact details (name, email, phone).
On submit: a friendly confirmation that recommends a likely track (Prevent / Manage / Recover) based on answers, plus a "Book consultation" CTA. Wire to a placeholder submit handler with a clear backend TODO (note: medical data needs secure, consented handling).

Render and show me at mobile + desktop.
```

---

## PROMPT 10 — Contact (`/contact`)

```
Build "/contact". Split layout (source split + form components via the 21st.dev Magic MCP). Left = warm copy + ways to reach us (book consultation, email, WhatsApp/phone, Instagram/LinkedIn) + reassurance that Reconnect works alongside existing treatment, is non-surgical, doctor-led. Right = contact form (name, email, phone, primary concern dropdown incl. "CGM program", preferred track, message). Placeholder submit handler + backend TODO. Animated success state. Reduced-motion safe, mobile-first.

Render and show me.
```

---

## FINAL QA PASS (paste after all pages are built)

```
Full-site QA pass:
1) Lighthouse (perf / a11y / best practices / SEO) on desktop + mobile — report scores; fix anything under 90 desktop / 80 mobile perf.
2) Verify prefers-reduced-motion disables ALL transforms/parallax/marquee-autoplay/pinning site-wide (opacity-only fallback); content stays fully visible.
3) Responsive at 390 / 768 (incl. iPad mini portrait) / 1024 / 1440 / 1920 px on every page. No overflow, no broken grids.
4) Consistent tokens (no rogue colors/fonts — confirm NOT Inter/Roboto/system), consistent section spacing, every CTA routes correctly, nav transparent->solid + mobile overlay both work, page transitions fire.
5) SEO: per-page <title> + meta description + OpenGraph/Twitter + canonical, targeting bone/joint/ortho/arthritis keywords (e.g. "rheumatologist-led strength training", "arthritis exercise program India", "knee pain strength training", "osteoporosis exercise", "joint pain without surgery", "best ortho alternative treatment"). Semantic headings (one h1/page) + JSON-LD (MedicalBusiness / Physician for Dr. Shruthi, FAQPage, Service/Offer for programs+pricing, BreadcrumbList). sitemap.xml + robots.txt.
6) Confirm NO stock watermarks anywhere; all imagery AVIF/WebP, lazy-loaded, descriptive alt; list every spot awaiting Dr. Shruthi's real photos.
7) Confirm positioning is bones & joints throughout (no resurfaced generic "all lifestyle diseases" copy); CGM present but subordinate; the "Services -> Programs (offerings) + How-It-Works (the Method)" split is intact.
8) List any component still hand-rolled that should have come from a 21st.dev Magic MCP primitive, and all remaining TODOs (form backends, pricing reconciliation, CGM enquiry routing, real imagery).
```

---

## APPENDIX A — "Don't ship a template" (what NOT to do)
- No generic centered-headline + two gray buttons + right-side stock photo hero.
- No Inter/Roboto/system fonts; no purple-on-white gradient cliché.
- No identical evenly-spaced 3-card rows for every section — vary rhythm, alignment, scale; use asymmetry/overlap.
- No motionless page; no marquee/parallax that ignores reduced-motion.
- No reverting to "we treat every lifestyle disease" — the whole point is the bones & joints niche.
- No raw 21st.dev component pasted with its own colors/fonts — always re-skin to our tokens.

## APPENDIX B — Open items to confirm with the client (don't let these block the build)
1. **Pricing** — reconcile ₹15,000 / 6-month vs the monthly tiers (the biggest one).
2. **Real imagery** — schedule a consented shoot of Dr. Shruthi with patients; replace all stock placeholders.
3. **CGM scope** — confirm it stays a single secondary page and isn't elevated into the core brand.
4. **App** — OUT OF SCOPE for this website build; the meeting noted it's aspirational and unscoped (research Fitternity/HealthifyMe first). Do not build app pages yet.
