import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dir, "../public/images/nutrition");
mkdirSync(OUT_DIR, { recursive: true });

const PROJECT = "radlabs-497004";
const LOCATION = "us-central1";
const ENDPOINT = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/imagen-3.0-generate-001:predict`;

// ONE complete plate per diet — a round white plate divided into 4 quadrants,
// each quadrant holding a distinct dish. Top-down, dark slate background.
const IMAGES = [
  {
    name: "plate-veg",
    prompt: "Award-winning top-down overhead food photograph of a single round white ceramic plate divided into four equal quadrants, perfectly centered, dark charcoal slate background. Quadrant one: kabuli chana chickpea curry. Quadrant two: fresh paneer cubes with dahi yogurt. Quadrant three: sautéed mushrooms. Quadrant four: cooked palak spinach with walnuts. Each dish neatly separated in its own quarter of the plate, warm soft cinematic studio light, glossy fresh appetising textures, fine-art food styling, symmetrical composition, no text, no hands, no cutlery",
  },
  {
    name: "plate-nonveg",
    prompt: "Award-winning top-down overhead food photograph of a single round white ceramic plate divided into four equal quadrants, perfectly centered, dark charcoal slate background. Quadrant one: grilled salmon fillet. Quadrant two: greek yogurt with cheese. Quadrant three: halved boiled eggs with golden yolks. Quadrant four: sliced grilled chicken breast with herbs. Each dish neatly separated in its own quarter of the plate, warm soft cinematic studio light, glossy seared appetising textures, fine-art food styling, symmetrical composition, no text, no hands, no cutlery",
  },
];

async function generate(item, token) {
  const resp = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt: item.prompt }],
      parameters: { sampleCount: 1, aspectRatio: "1:1", safetyFilterLevel: "block_some", personGeneration: "dont_allow" },
    }),
  });
  if (!resp.ok) throw new Error(`${resp.status}: ${(await resp.text()).slice(0, 200)}`);
  const json = await resp.json();
  const b64 = json?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error("No image in response");
  writeFileSync(join(OUT_DIR, `${item.name}.png`), Buffer.from(b64, "base64"));
  process.stdout.write(` ✓\n`);
}

async function main() {
  const token = execSync("gcloud auth print-access-token", { encoding: "utf8" }).trim();
  console.log(`\n── Nutrition plates (${IMAGES.length}) ─────────────`);
  for (const img of IMAGES) {
    process.stdout.write(`  ${img.name}...`);
    try { await generate(img, token); }
    catch (e) { console.error(` FAILED: ${e.message}`); }
  }
  console.log("\nDone → public/images/nutrition/");
}

main();
