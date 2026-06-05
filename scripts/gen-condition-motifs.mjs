/**
 * Generates 4 ANATOMICAL MOTIF header bands for the "Conditions we treat" cards
 * on the Approach page (Joints / Spine / Bone / Strength).
 *
 * Run once: node scripts/gen-condition-motifs.mjs
 * Auth: gcloud auth print-access-token (active = radlabs-vertex service account).
 *
 * Output → public/conditions/<name>.png  (16:9 landscape header band)
 *
 * The make-or-break is CONSISTENCY: all four must share one visual system so they
 * read as a designed set, not clip-art. So FRAME + LOOK are repeated verbatim and
 * the seed is fixed; only the body part changes. Each is a single, centred,
 * translucent anatomical render in brand navy/blue on a clean light ground that
 * matches the calcium card surface — clinical, premium, restrained.
 */

import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dir, "../public/conditions");
mkdirSync(OUT_DIR, { recursive: true });

const PROJECT = "radlabs-497004";
const LOCATION = "us-central1";
const MODEL = "imagen-3.0-generate-001";
const ENDPOINT = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:predict`;

// Repeated verbatim → one shared visual system across all four bands.
const FRAME =
  "a single anatomical subject centred in a wide landscape frame with generous even margin, on a clean very-light off-white (#F4F6FA) background, plenty of negative space, nothing else in frame";

const LOOK =
  "translucent semi-transparent medical anatomical render, glowing softly in calm deep-navy and clean medical blue (#00295C and #0064E0), soft inner luminescence, elegant clinical medical illustration, premium, refined, subtle, high detail, consistent style";

const NEG =
  "no text, no labels, no logo, no watermark, no gore, no blood, not scary, not a stock photo, " +
  "NO RED, no red glow, no orange, no amber, no warm hotspot, no inflammation highlight, " +
  "entirely cool blue palette only, no busy background, no person's face, no multiple subjects, not cropped awkwardly";

const IMAGES = [
  {
    name: "joints",
    subject: "a human knee joint with femur, tibia and kneecap, showing the joint and surrounding ligaments, cool blue tones only",
  },
  {
    name: "spine",
    subject: "a segment of the human spine and vertebral column, vertebrae and discs clearly visible, gently curved, cool blue tones only",
  },
  {
    name: "bone",
    subject: "a human long bone (femur) shown entirely in cool blue tones with visible internal trabecular bone-density structure, signalling healthy strong bone, no warm colours anywhere",
  },
  {
    name: "strength",
    subject: "a human hip joint with surrounding muscle, rendered entirely in calm blue tones, healthy and strong, signalling strength and recovery, absolutely no red or warm glow",
  },
];

function getToken() {
  return execSync("gcloud auth print-access-token", { encoding: "utf8" }).trim();
}

async function generateImage(item, token) {
  const prompt = `${item.subject}, ${FRAME}, ${LOOK}, ${NEG}`;
  const body = JSON.stringify({
    instances: [{ prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: "16:9", // wide header band
      safetyFilterLevel: "block_some",
      personGeneration: "allow_adult",
      addWatermark: false,
      seed: 11, // fixed → consistent treatment across the set
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
  console.log(`Generating ${IMAGES.length} condition motifs...\n`);
  for (const img of IMAGES) {
    try {
      process.stdout.write(`  → ${img.name}... `);
      await generateImage(img, token);
    } catch (e) {
      console.error(`\n  ✗ ${e.message}`);
    }
  }
  console.log("\nDone → public/conditions/");
}

main();
