/**
 * Generates a TRANSLUCENT ANATOMICAL HUMAN figure for the "Where does it hurt?"
 * body-region selector on the Approach page (replaces public/skeleton.png).
 *
 * Run once: node scripts/gen-bodyregion-human.mjs
 * Auth: gcloud auth print-access-token (active = radlabs-vertex service account).
 *
 * Output → public/bodyregion/<name>.png  (1:1 square, exploration candidates)
 *
 * Why 1:1 + centered full figure: the clickable dots in BodyRegionDiagram.tsx are
 * placed by hand-tuned (cx,cy) inside a 200×200 square viewBox over an
 * object-contain image. A square image with the whole body (skull→feet) centered
 * keeps the joints landing close to the existing coordinate space, so visual
 * recalibration afterward is a nudge, not a rebuild.
 *
 * Design intent: a semi-transparent human body with the skeleton/anatomy glowing
 * softly through — premium medical "inside view", front-facing (anterior), on a
 * clean light background that matches the now-light clinical section. In-brand
 * navy #00295C / blue #0064E0 glow, NOT a gory écorché, NOT a stock photo.
 */

import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dir, "../public/bodyregion");
mkdirSync(OUT_DIR, { recursive: true });

const PROJECT = "radlabs-497004";
const LOCATION = "us-central1";
const MODEL = "imagen-3.0-generate-001";
const ENDPOINT = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:predict`;

// Shared framing — repeated verbatim so every candidate keeps the SAME crop and
// centering, which is what makes the dot coordinates portable across candidates.
// POSTERIOR (back) view: the spine is a continuous visible line down the centre,
// so the neck / back / hip markers all fall naturally on the real spine instead
// of landing on the front ribcage.
const FRAME =
  "a full human body shown head to feet, posterior view seen directly from behind showing the back and spine, standing upright and symmetrical with arms slightly away from the torso, the entire figure centered in a perfect square frame with even margin above the head and below the feet, on a clean very-light off-white background";

// The translucent-anatomy look, in brand palette. From behind, the SPINE is the
// hero — a clear continuous vertebral column down the centre.
const LOOK =
  "translucent semi-transparent human body with the skeleton and anatomy glowing softly through the skin, the spine and vertebral column clearly visible down the centre of the back, calm deep-navy and clean medical blue glow (#00295C and #0064E0), soft inner luminescence at the joints, elegant clinical medical illustration, premium, refined, subtle, high detail";

const NEG =
  "no text, no labels, no logo, no watermark, no gore, no blood, no graphic muscle dissection, not scary, not horror, not a stock photo, no harsh red, no busy background, no multiple people, not cropped, full body must be visible";

const IMAGES = [
  {
    name: "human-back-a",
    prompt: `${FRAME}, ${LOOK}, ${NEG}`,
  },
  {
    name: "human-back-b",
    prompt: `${FRAME}, ${LOOK}, skeletal structure slightly more visible than the soft tissue, ${NEG}`,
  },
  {
    name: "human-back-c",
    prompt: `${FRAME}, ${LOOK}, faint anatomical figure, more ghost-like and minimal, lots of negative space, ${NEG}`,
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
      aspectRatio: "1:1", // square — matches the aspect-square viewBox
      safetyFilterLevel: "block_some",
      personGeneration: "allow_adult",
      addWatermark: false,
      seed: 11,
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
  console.log(`Generating ${IMAGES.length} translucent-anatomy candidates...\n`);
  for (const img of IMAGES) {
    try {
      process.stdout.write(`  → ${img.name}... `);
      await generateImage(img, token);
    } catch (e) {
      console.error(`\n  ✗ ${e.message}`);
    }
  }
  console.log("\nDone → public/bodyregion/");
}

main();
