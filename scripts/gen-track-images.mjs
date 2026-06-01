/**
 * gen-track-images.mjs — regenerate the three "Choose your path" track photos
 * with Nano Banana (Gemini 2.5 Flash Image) on Vertex AI.
 *
 * Auth: `gcloud auth print-access-token` (service account already configured).
 * Output: overwrites public/<name>.jpg in place (so every reference updates).
 *
 * Unlike the Imagen 3 scripts here, Gemini image models use :generateContent
 * and return the image as inlineData (base64) inside candidates[].content.parts[].
 *
 * Run:  node scripts/gen-track-images.mjs
 */
import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dir = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dir, "../public");
mkdirSync(PUBLIC, { recursive: true });

const PROJECT = "radlabs-497004";

// Endpoint candidates — tried in order until one returns an image. Gemini image
// model availability differs by region, so we probe instead of guessing.
const CANDIDATES = [
  { host: "https://aiplatform.googleapis.com", loc: "global", model: "gemini-2.5-flash-image" },
  { host: "https://us-central1-aiplatform.googleapis.com", loc: "us-central1", model: "gemini-2.5-flash-image" },
  { host: "https://aiplatform.googleapis.com", loc: "global", model: "gemini-2.5-flash-image-preview" },
  { host: "https://us-central1-aiplatform.googleapis.com", loc: "us-central1", model: "gemini-2.5-flash-image-preview" },
];

// Shared look so the three read as one cohesive set, not stock photos.
const STYLE = `Award-winning editorial wellness photograph, shot on medium format, warm natural side light through tall windows, soft shadows, shallow depth of field, muted premium colour grade balancing warm neutral tones with subtle teal, calm and dignified mood, candid and authentic (not posed), modern healthcare brand photography. Plain unbranded clothing with absolutely NO brand logos, swooshes, symbols, or marks of any kind. No text, no logos, no watermark.`;

const TRACKS = [
  {
    file: "kettlebell-squat.jpg", // PREVENT
    prompt: `A healthy, capable Indian man in his early 30s performing a strong, controlled goblet squat holding a single kettlebell at chest height, in a bright airy studio with warm wood floors and large windows. Focused, confident, in-control expression. Fitted deep-teal athletic t-shirt. Proactive strength and longevity. ${STYLE}`,
  },
  {
    file: "mat-stretching.jpg", // MANAGE
    prompt: `A graceful Indian woman in her early 50s with elegant silver-streaked hair, seated on a yoga mat performing a gentle, careful seated forward-fold stretch, serene and self-assured. Soft teal activewear. A calm studio with a potted plant and warm light. Easing stiffness, rebuilding resilience day to day. ${STYLE}`,
  },
  {
    file: "trainer-guided-exercise.jpg", // RECOVER
    prompt: `A warm, attentive young Indian male physiotherapist gently guiding an Indian woman in her late 50s through a careful resistance-band shoulder exercise, in a clinical-yet-warm rehabilitation studio. Supportive, trusting interaction; the focus is safety and close guidance. Both in teal clothing. ${STYLE}`,
  },
];

function extractImage(json) {
  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  for (const p of parts) {
    const d = p?.inlineData ?? p?.inline_data;
    if (d?.data) return d.data;
  }
  return null;
}

async function call(token, ep, prompt, withAspect) {
  const url = `${ep.host}/v1/projects/${PROJECT}/locations/${ep.loc}/publishers/google/models/${ep.model}:generateContent`;
  const generationConfig = { responseModalities: ["TEXT", "IMAGE"] };
  if (withAspect) generationConfig.imageConfig = { aspectRatio: "3:2" };
  const resp = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    }),
  });
  const text = await resp.text();
  return { ok: resp.ok, status: resp.status, text };
}

async function probe(token, prompt) {
  for (const ep of CANDIDATES) {
    for (const withAspect of [true, false]) {
      const r = await call(token, ep, prompt, withAspect);
      if (r.ok) {
        const b64 = extractImage(JSON.parse(r.text));
        if (b64) {
          console.log(`  using ${ep.model} @ ${ep.loc}${withAspect ? " (3:2)" : ""}`);
          return { ep, withAspect, b64 };
        }
      } else if (r.status !== 404 && r.status !== 400) {
        console.log(`  ${ep.model}@${ep.loc} aspect=${withAspect} → ${r.status}: ${r.text.slice(0, 160)}`);
      }
    }
  }
  return null;
}

async function save(file, b64) {
  const out = join(PUBLIC, file);
  const buf = Buffer.from(b64, "base64");
  // Normalise to a clean landscape JPG, capped width, good quality/size balance.
  await sharp(buf)
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(out);
  console.log(`  saved → public/${file}`);
}

async function main() {
  const token = execSync("gcloud auth print-access-token", { encoding: "utf8" }).trim();

  // Optional filename-substring arg → regenerate just that subset (e.g. "trainer").
  const only = process.argv[2];
  const list = only ? TRACKS.filter((t) => t.file.includes(only)) : TRACKS;
  if (!list.length) {
    console.error(`No track matches "${only}".`);
    process.exit(1);
  }

  // Probe once with the first prompt to lock the working endpoint config.
  console.log(`\n[1/${list.length}] ${list[0].file}`);
  const first = await probe(token, list[0].prompt);
  if (!first) {
    console.error("\nNo Nano Banana endpoint responded with an image. Check model availability / IAM.");
    process.exit(1);
  }
  await save(list[0].file, first.b64);
  const { ep, withAspect } = first;

  for (let i = 1; i < list.length; i++) {
    const t = list[i];
    console.log(`\n[${i + 1}/${list.length}] ${t.file}`);
    let b64 = null;
    for (let attempt = 1; attempt <= 3 && !b64; attempt++) {
      const r = await call(token, ep, t.prompt, withAspect);
      if (r.ok) b64 = extractImage(JSON.parse(r.text));
      else console.log(`  attempt ${attempt} → ${r.status}: ${r.text.slice(0, 160)}`);
    }
    if (!b64) {
      console.error(`  FAILED to generate ${t.file}`);
      continue;
    }
    await save(t.file, b64);
  }

  console.log("\nDone.");
}

main().catch((e) => {
  console.error("Fatal:", e.message);
  process.exit(1);
});
