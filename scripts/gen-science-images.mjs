/**
 * Generates science section hero images via Vertex AI Imagen 3.
 * Run once: node scripts/gen-science-images.mjs
 * Requires: gcloud auth login (active session)
 */

import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dir, "../public/images/science");
mkdirSync(OUT_DIR, { recursive: true });

const PROJECT = "radlabs-497004";
const LOCATION = "us-central1";
const MODEL = "imagen-3.0-generate-001";
const ENDPOINT = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:predict`;

const IMAGES = [
  {
    name: "less-pain",
    prompt:
      "Cinematic macro photograph of a healthy human knee joint, warm soft light, golden hour glow, translucent cartilage visible, soft bokeh background, clinical beauty, hyper-realistic, award-winning medical photography, muted warm tones, ivory and terracotta palette, no text",
  },
  {
    name: "denser-bones",
    prompt:
      "Artistic X-ray visualization of strong human bone structure, glowing bone density lines, deep navy background, subtle golden mineral deposits visible inside, ethereal scientific beauty, award-winning editorial photography, minimalist, no text",
  },
  {
    name: "retained-muscle",
    prompt:
      "Cinematic close-up of defined forearm and hand muscles of an older adult, warm rim lighting, skin texture visible, strength and grace, soft ivory background, award-winning lifestyle photography, inspiring, warm neutral tones, no text",
  },
  {
    name: "joint-protection",
    prompt:
      "Beautiful anatomical illustration of a hip joint with protective cartilage glowing softly, muted sage and bone white palette, 3D medical visualization style, artistic, award-winning, dark background with warm rim light, no text",
  },
];

// Get token without exposing it — pipe direct into curl
function getToken() {
  return execSync("gcloud auth print-access-token", { encoding: "utf8" }).trim();
}

async function generateImage(item, token) {
  const body = JSON.stringify({
    instances: [{ prompt: item.prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: "16:9",
      safetyFilterLevel: "block_some",
      personGeneration: "allow_adult",
    },
  });

  const resp = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body,
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Imagen API error for ${item.name}: ${resp.status} — ${err}`);
  }

  const json = await resp.json();
  const b64 = json?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error(`No image returned for ${item.name}`);

  const buf = Buffer.from(b64, "base64");
  const outPath = join(OUT_DIR, `${item.name}.png`);
  writeFileSync(outPath, buf);
  console.log(`✓  Saved ${item.name}.png  (${(buf.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  console.log("Fetching access token...");
  const token = getToken();
  console.log(`Generating ${IMAGES.length} images via Imagen 3 on ${PROJECT}...\n`);

  for (const img of IMAGES) {
    try {
      process.stdout.write(`  → ${img.name}... `);
      await generateImage(img, token);
    } catch (e) {
      console.error(`\n  ✗ ${e.message}`);
    }
  }

  console.log("\nDone. Images written to public/images/science/");
}

main();
