import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dir, "../public/images/conditions");
mkdirSync(OUT_DIR, { recursive: true });

const PROJECT = "radlabs-497004";
const LOCATION = "us-central1";
const MODEL = "imagen-3.0-generate-001";
const ENDPOINT = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:predict`;

const IMAGES = [
  {
    name: "knee-oa",
    prompt: "Award-winning editorial photograph, close-up of an elderly Indian person's knee with a gentle hand resting on it, soft diffused window light, dramatic shadows, black and white, elegant and dignified medical lifestyle photography, shallow depth of field, no text",
  },
  {
    name: "back-pain",
    prompt: "Award-winning editorial photograph, mature Indian person gently placing hand on their lower back, soft side light, contemplative expression, black and white, high contrast, intimate and empathetic medical lifestyle photography, no text",
  },
  {
    name: "sciatica",
    prompt: "Award-winning editorial photograph, close-up of lower back and hip area of a person in gentle movement, soft natural light, abstract and elegant, black and white, fine art medical photography, no text",
  },
  {
    name: "rheumatoid-arthritis",
    prompt: "Award-winning editorial photograph, beautiful close-up of elderly Indian woman's hands gently clasped together, prominent veins and joints, warm soft light, black and white, extremely dignified, Dorothea Lange style portrait photography, no text",
  },
  {
    name: "osteoporosis",
    prompt: "Award-winning editorial photograph, elegant older Indian woman standing tall in profile, graceful posture, soft side light creating beautiful rim lighting, black and white, strength and grace, fine art portrait photography, no text",
  },
  {
    name: "frozen-shoulder",
    prompt: "Award-winning editorial photograph, close-up of shoulder and neck of a person doing a gentle stretch, dramatic lighting, black and white, sculptural and elegant, fine art medical lifestyle photography, no text",
  },
  {
    name: "cervical-pain",
    prompt: "Award-winning editorial photograph, elegant close-up of neck and jaw of an Indian person, soft rim lighting from behind, graceful and sculptural, black and white, high fashion editorial style, no text",
  },
  {
    name: "post-meno",
    prompt: "Award-winning editorial photograph, confident mature Indian woman in a serene outdoor setting, golden hour light converted to black and white, empowering and radiant, fine art portrait photography, no text",
  },
  {
    name: "joint-stiffness",
    prompt: "Award-winning editorial photograph, close-up of hands in a gentle stretching or opening gesture, soft diffused light, black and white, elegant and calming, fine art photography, no text",
  },
  {
    name: "hip-pain",
    prompt: "Award-winning editorial photograph, side profile of a person walking gracefully on a path, light catching their silhouette, black and white, cinematic, award-winning lifestyle photography, sense of movement and freedom, no text",
  },
];

async function generateImage(item, token) {
  const resp = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt: item.prompt }],
      parameters: { sampleCount: 1, aspectRatio: "3:4", safetyFilterLevel: "block_some", personGeneration: "allow_adult" },
    }),
  });
  if (!resp.ok) throw new Error(`${resp.status}: ${await resp.text()}`);
  const json = await resp.json();
  const b64 = json?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error("No image returned");
  const buf = Buffer.from(b64, "base64");
  writeFileSync(join(OUT_DIR, `${item.name}.png`), buf);
  console.log(`  ✓ ${item.name}.png  (${(buf.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  const token = execSync("gcloud auth print-access-token", { encoding: "utf8" }).trim();
  console.log(`Generating ${IMAGES.length} condition images via Imagen 3...\n`);
  for (const img of IMAGES) {
    process.stdout.write(`  → ${img.name}... `);
    try { await generateImage(img, token); }
    catch (e) { console.error(`FAILED: ${e.message}`); }
  }
  console.log("\nDone → public/images/conditions/");
}

main();
