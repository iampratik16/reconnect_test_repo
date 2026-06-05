/**
 * Generates the MID-MOVEMENT prevention pair for the Built-for-Prevention
 * section — the "building, not hurting" direction.
 *
 * Replaces the passive strain→ease back shot with an ACTIVE pair: the same
 * 40-something person mid controlled strength movement, shot tight on the
 * working joint. The transformation reads effort → earned strength rather than
 * pain → relief, so prevention looks like something you DO, not something you
 * wait out. Two matched stills crossfade on scroll inside SpineTransform.tsx.
 *
 *   NOW (top layer, fades out): the moment of effort — a warm red glow of load
 *     concentrated at the working joint, body braced and working.
 *   10 YEARS (base layer): the same movement owned with ease — a calm blue glow
 *     flowing down an aligned, strong spine; controlled, capable, unstrained.
 *
 * Same person, same crop, same lighting in both — only the glow + posture-ease
 * shift, so they crossfade as one person mastering the movement over time.
 *
 * Run once: node scripts/gen-prevent-movement.mjs
 * Auth: gcloud auth print-access-token (active = radlabs-vertex service account).
 * Output → public/prevent/movement/<name>.png  (3:4, to match the 4/5 frame crop)
 *
 * Palette: warm skin on a deep charcoal-navy ground so the art dissolves into
 * the section's bg-sage-deep (#00295C) frame — no warm-on-cool clash. Colour is
 * carried by ONE accent of light (red→blue), nothing else.
 */

import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dir, "../public/prevent/movement");
mkdirSync(OUT_DIR, { recursive: true });

const PROJECT = "radlabs-497004";
const LOCATION = "us-central1";
const MODEL = "imagen-3.0-generate-001";
const ENDPOINT = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:predict`;

// Shared style + anti-stock guardrails. Documentary, editorial, premium — the
// award-winning health-brand register: real skin, real age, no fitness-ad gloss.
const STYLE =
  "fine-art editorial photography, natural soft directional daylight from one side, documentary and candid, real unposed moment of focused effort, ordinary plain clothes (a simple grey tee), realistic mature skin texture and a few greys, muted cinematic colour grade, deep charcoal-navy background so the figure emerges from shadow, shallow depth of field, tight intimate crop, premium, authentic, photographed on a 85mm lens";

const NEG =
  "NOT a stock photo, NOT a glossy fitness model, NOT activewear or branded sportswear, NOT a bright gym, NOT studio beauty lighting, no smiling at camera, no thumbs up, no sweat-drenched cliché, no grimace of pain, no clenched agony, no medical setting, no equipment logos, no text, no logo, no watermark";

// Matched pair: SAME 45-ish person, SAME controlled movement (a slow, deep
// goblet-style squat — the cleanest "I am protecting my joints" movement),
// SAME tight crop on the loaded knees + braced spine, SAME one-sided light.
// Only the glow of load and the ease of the posture change, so the two stills
// crossfade as one person who has grown into the movement over a decade.
const FRAME =
  "a fit but ordinary 45-year-old person of ambiguous build, mid controlled deep squat, photographed three-quarter from the side, framed tight from mid-thigh to head so the working knees and the long braced spine fill the frame, weight held close to the chest, the same person in both images, identical pose and crop and lighting";

const IMAGES = [
  {
    name: "M1-effort",
    prompt: `${FRAME}, the very moment of effort under load, muscles engaged and working hard, a soft warm RED glow of strain concentrated at the loaded knee joint and lower back, jaw set in quiet concentration, slightly dimmer and tenser, ${STYLE}, ${NEG}`,
  },
  {
    name: "M2-strength",
    prompt: `${FRAME}, the same movement now owned with calm control and ease, posture tall and aligned and capable, a soft healthy BLUE glow flowing smoothly down a strong aligned spine and steady knees, composed and unstrained, a touch brighter, ${STYLE}, ${NEG}`,
  },
];

function getToken() {
  return execSync("gcloud auth print-access-token", { encoding: "utf8" }).trim();
}

async function generateImage(item, token) {
  const body = JSON.stringify({
    instances: [{ prompt: item.prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: "3:4",
      safetyFilterLevel: "block_some",
      personGeneration: "allow_adult",
      addWatermark: false,
      // Same seed across the pair → maximally consistent subject/framing so the
      // two stills crossfade as the same human.
      seed: 21,
    },
  });

  const resp = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body,
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Imagen error for ${item.name}: ${resp.status} — ${err}`);
  }

  const json = await resp.json();
  const b64 = json?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error(`No image for ${item.name} (likely safety-filtered)`);

  const buf = Buffer.from(b64, "base64");
  const outPath = join(OUT_DIR, `${item.name}.png`);
  writeFileSync(outPath, buf);
  console.log(`✓  ${item.name}.png  (${(buf.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  console.log("Fetching token (service account)...");
  const token = getToken();
  console.log(`Generating ${IMAGES.length} mid-movement candidates...\n`);
  for (const img of IMAGES) {
    try {
      process.stdout.write(`  → ${img.name}... `);
      await generateImage(img, token);
    } catch (e) {
      console.error(`\n  ✗ ${e.message}`);
    }
  }
  console.log("\nDone → public/prevent/movement/");
}

main();
