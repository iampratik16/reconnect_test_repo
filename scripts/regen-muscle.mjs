import { execSync } from "child_process";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, "../public/images/science/retained-muscle.png");

const PROJECT = "radlabs-497004";
const LOCATION = "us-central1";
const MODEL = "imagen-3.0-generate-001";
const ENDPOINT = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:predict`;

const PROMPTS = [
  "Cinematic editorial photograph of a strong graceful 55-year-old Indian woman mid-movement in a sun-drenched open field, arms extended in a flowing yoga-like stretch, sari-inspired warm fabrics, golden hour light, peaceful and powerful, award-winning lifestyle photography, warm terracotta and honey tones, no gym equipment, no text",
  "Beautiful close-up of strong healthy forearms and hands in a gentle prayer or stretch pose, warm olive skin, soft natural light, shallow depth of field, no equipment, serene and dignified, award-winning editorial photography, warm cream and amber tones, no text",
  "Cinematic photograph of an older Indian woman walking barefoot on soft grass, arms relaxed, natural flowing clothes, warm morning light, sense of vitality and ease, soft bokeh background, award-winning lifestyle photography, no gym equipment, no text",
];

async function go() {
  const token = execSync("gcloud auth print-access-token", { encoding: "utf8" }).trim();

  for (let i = 0; i < PROMPTS.length; i++) {
    const resp = await fetch(ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        instances: [{ prompt: PROMPTS[i] }],
        parameters: { sampleCount: 1, aspectRatio: "16:9", safetyFilterLevel: "block_some", personGeneration: "allow_adult" },
      }),
    });

    if (!resp.ok) { console.error(await resp.text()); continue; }
    const json = await resp.json();
    const b64 = json?.predictions?.[0]?.bytesBase64Encoded;
    if (!b64) { console.error("No image for prompt", i); continue; }

    const outPath = OUT.replace(".png", `_v${i + 1}.png`);
    writeFileSync(outPath, Buffer.from(b64, "base64"));
    console.log(`✓ Saved ${outPath}`);
  }
}

go();
