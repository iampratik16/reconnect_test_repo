/**
 * Generates HUMAN candidate visuals for the Built-for-Prevention section, so we
 * can pick a direction that feels human (not the clinical spine).
 *
 * Run once: node scripts/gen-prevent-human.mjs
 * Auth: gcloud auth print-access-token (active = radlabs-vertex service account).
 *
 * Output → public/prevent/human/<name>.png  (3:4, exploration only)
 *
 * Palette: warm but in-brand — soft daylight, muted tones that sit beside navy
 * #00295C / blue #0064E0 without clashing. Anti-stock guardrails baked into the
 * shared NEG clause: documentary, un-posed, ordinary, NOT fitness/activewear/
 * studio/smiling-at-camera.
 */

import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dir, "../public/prevent/human");
mkdirSync(OUT_DIR, { recursive: true });

const PROJECT = "radlabs-497004";
const LOCATION = "us-central1";
const MODEL = "imagen-3.0-generate-001";
const ENDPOINT = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:predict`;

// Shared style + anti-stock guardrails.
const STYLE =
  "natural soft daylight, documentary editorial photography, candid un-posed real moment, ordinary everyday clothes, realistic skin and age, muted calm colour grade, shallow depth of field, cinematic, premium, authentic";
const NEG =
  "NOT stock photo, NOT fitness model, NOT activewear, NOT gym, NOT studio lighting, no smiling at camera, no thumbs up, no text, no logo";

// Matched C-pair: SAME framing/crop/subject, only strain→ease changes, so the
// two crossfade as one person transforming. Shared FRAME repeated verbatim.
const C_FRAME =
  "a 45-year-old man with short greying hair seen from behind, upper body filling the frame, centered, plain dark charcoal background, the same man in both images";

const IMAGES = [
  {
    name: "C1-glow-strain",
    prompt: `${C_FRAME}, shoulders hunched and tense, a soft warm RED glow of strain concentrated at his neck and upper back, dim and shadowed, ${STYLE}, ${NEG}`,
  },
  {
    name: "C2-glow-ease",
    prompt: `${C_FRAME}, standing tall, shoulders relaxed and open, a soft healthy BLUE glow flowing gently and evenly down a calm aligned spine, brighter and at ease, ${STYLE}, ${NEG}`,
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
  console.log(`Generating ${IMAGES.length} human candidates...\n`);
  for (const img of IMAGES) {
    try {
      process.stdout.write(`  → ${img.name}... `);
      await generateImage(img, token);
    } catch (e) {
      console.error(`\n  ✗ ${e.message}`);
    }
  }
  console.log("\nDone → public/prevent/human/");
}

main();
