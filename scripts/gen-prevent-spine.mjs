/**
 * Generates the 3-state spine transformation stills for the Built-for-Prevention
 * section (compressed → mid → open) via Vertex AI Imagen 3.
 *
 * Run once: node scripts/gen-prevent-spine.mjs
 *
 * Auth: uses `gcloud auth print-access-token`, which mints a token as the
 * ACTIVE gcloud account. Here that is the service account
 * radlabs-vertex@radlabs-497004.iam.gserviceaccount.com — no key file needed.
 *
 * Palette discipline: this section's tokens are blue/navy/white
 * (--color-clay #0064E0, --color-sage-deep #00295C). Prompts use deep navy +
 * glowing electric-blue/cyan — NOT the terracotta/ivory used elsewhere — so the
 * stills don't clash with the section. See spec:
 * docs/superpowers/specs/2026-06-05-prevention-spine-transformation-design.md
 */

import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dir, "../public/prevent/spine");
mkdirSync(OUT_DIR, { recursive: true });

const PROJECT = "radlabs-497004";
const LOCATION = "us-central1";
const MODEL = "imagen-3.0-generate-001";
const ENDPOINT = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:predict`;

// Shared scaffolding repeated verbatim across all three prompts so the spine
// stays registered (same camera, crop, framing) and the crossfade reads as ONE
// spine transforming rather than three different pictures.
const FRAME =
  "vertical 3D medical visualization of a single human spine, centered, full spine from base to neck filling the frame top to bottom, front-three-quarter view, deep navy background #00295C, dark editorial studio lighting, award-winning anatomical render, premium, minimalist, no text, no labels, no people, no faces";

const IMAGES = [
  {
    name: "compressed",
    prompt: `${FRAME}, the vertebrae COMPRESSED and tense, discs squeezed thin and crowded together, slight forward hunch, cold faint blue under-glow, sense of strain and pressure, muted and shadowed`,
  },
  {
    name: "mid",
    prompt: `${FRAME}, the vertebrae beginning to decompress and align, discs opening, posture straightening, soft electric-blue rim light starting to flow along the spine, transitional, calmer`,
  },
  {
    name: "open",
    prompt: `${FRAME}, the vertebrae OPEN, aligned and decompressed with even healthy spacing between discs, upright and tall, warm glowing cyan and electric-blue light flowing smoothly along the entire spine, a sense of ease, space and release, luminous`,
  },
];

// A fixed seed improves cross-image consistency. Note: seed requires
// addWatermark:false on Imagen 3.
const SEED = 7;

function getToken() {
  return execSync("gcloud auth print-access-token", { encoding: "utf8" }).trim();
}

async function generateImage(item, token) {
  const body = JSON.stringify({
    instances: [{ prompt: item.prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: "3:4", // closest Imagen ratio to the section's 4:5 figure
      safetyFilterLevel: "block_some",
      personGeneration: "dont_allow", // abstract anatomy, no humans
      addWatermark: false,
      seed: SEED,
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
  if (!b64) throw new Error(`No image returned for ${item.name} (likely safety-filtered)`);

  const buf = Buffer.from(b64, "base64");
  const outPath = join(OUT_DIR, `${item.name}.png`);
  writeFileSync(outPath, buf);
  console.log(`✓  Saved ${item.name}.png  (${(buf.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  console.log("Fetching access token (service account)...");
  const token = getToken();
  console.log(`Generating ${IMAGES.length} spine stills via Imagen 3 on ${PROJECT}...\n`);

  for (const img of IMAGES) {
    try {
      process.stdout.write(`  → ${img.name}... `);
      await generateImage(img, token);
    } catch (e) {
      console.error(`\n  ✗ ${e.message}`);
    }
  }

  console.log("\nDone. Stills written to public/prevent/spine/");
}

main();
