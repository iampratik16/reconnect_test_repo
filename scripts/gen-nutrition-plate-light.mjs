/**
 * Regenerates the divided-plate nutrition photos on a LIGHT background, so they
 * sit seamlessly inside the now-ivory monochrome journey card (the old plates
 * had a dark charcoal-slate background that read as a dark island on ivory).
 *
 * The component applies `grayscale(1)` in CSS, so colour is irrelevant — what
 * matters is the BACKGROUND tone: a soft warm off-white/light-grey surface that
 * desaturates to a light grey, blending into the ivory card.
 *
 * Overwrites the same filenames the component already loads:
 *   public/images/nutrition/plate-veg.png
 *   public/images/nutrition/plate-nonveg.png
 *
 * Run once: node scripts/gen-nutrition-plate-light.mjs
 * Auth: gcloud auth print-access-token (radlabs-vertex service account).
 */

import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dir, "../public/images/nutrition");
mkdirSync(OUT_DIR, { recursive: true });

const PROJECT = "radlabs-497004";
const LOCATION = "us-central1";
const MODEL = "imagen-3.0-generate-001";
const ENDPOINT = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:predict`;

// PURE WHITE seamless background so the plate floats on the white card with no
// visible square/linen edge. Soft contact shadow keeps it from looking pasted.
const BG = "pure seamless solid white background (#FFFFFF), bright even high-key studio light, the plate floating with only a soft subtle contact shadow beneath it, no surface texture, no table, no linen, isolated product photography on pure white";

const IMAGES = [
  {
    name: "plate-veg",
    prompt: `Award-winning top-down overhead food photograph of a single round white ceramic plate divided into four equal quadrants, perfectly centered, ${BG}. Quadrant one: kabuli chana chickpea curry. Quadrant two: fresh paneer cubes with dahi yogurt. Quadrant three: sautéed mushrooms. Quadrant four: cooked palak spinach with walnuts. Each dish neatly separated in its own quarter of the plate, glossy fresh appetising textures, fine-art food styling, symmetrical composition, no text, no hands, no cutlery`,
  },
  {
    name: "plate-nonveg",
    prompt: `Award-winning top-down overhead food photograph of a single round white ceramic plate divided into four equal quadrants, perfectly centered, ${BG}. Quadrant one: grilled salmon fillet. Quadrant two: greek yogurt with cheese. Quadrant three: halved boiled eggs with golden yolks. Quadrant four: sliced grilled chicken breast with herbs. Each dish neatly separated in its own quarter of the plate, glossy seared appetising textures, fine-art food styling, symmetrical composition, no text, no hands, no cutlery`,
  },
];

const token = execSync("gcloud auth print-access-token", { encoding: "utf8" }).trim();

async function generate(item) {
  const body = JSON.stringify({
    instances: [{ prompt: item.prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: "1:1",
      safetyFilterLevel: "block_some",
      personGeneration: "dont_allow",
      addWatermark: false,
    },
  });
  const resp = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body,
  });
  if (!resp.ok) throw new Error(`${item.name}: ${resp.status} — ${(await resp.text()).slice(0, 300)}`);
  const json = await resp.json();
  const b64 = json?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error(`${item.name}: no image (safety-filtered?)`);
  writeFileSync(join(OUT_DIR, `${item.name}.png`), Buffer.from(b64, "base64"));
  console.log(`✓ ${item.name}.png`);
}

for (const img of IMAGES) {
  process.stdout.write(`  → ${img.name}... `);
  try { await generate(img); } catch (e) { console.error(`\n  ✗ ${e.message}`); }
}
console.log("Done → public/images/nutrition/ (light bg)");
