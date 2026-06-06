import { execSync } from "child_process";
import { writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const CHAR_DIR = join(__dir, "../public/images/train-journey/characters");
const OUT_PATH = join(__dir, "../public/images/train-journey/scene-04-roadmap.png");

const PROJECT = "radlabs-497004";
const LOCATION = "us-central1";

// Imagen 3 generate endpoint
const ENDPOINT = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/imagen-3.0-generate-001:predict`;

const PROMPT = `Editorial illustration in the spirit of Christoph Niemann meets Malika Favre, with the restraint of Tom Gauld. Reminiscent of New Yorker covers, Bloomberg Businessweek, Apple editorial work.

PALETTE (strict):
- Primary: deep medical blue #2563EB
- Background: warm cream #FAF7F0
- Accent: muted coral #E76F51 (max 5% of canvas)
- Ink: charcoal #1A1A1A

TECHNIQUE:
- Flat 2D, no gradients, no rendering, no shading
- Confident line work with intentional weight variation 1pt to 4pt
- Textured fills with subtle riso-print grain
- Generous negative space, formal composition
- All figures drawn with adult proportions and dignity

TONE: intelligent, quietly emotional, slightly witty, never sentimental.

AVOID: cartoonish, chibi, anime, children's book style, big eyes, sweat drops, exclamation marks, speech bubbles, 3D rendering, gradients, Corporate Memphis, generic stock illustration, photorealism.

SCENE: Train car four interior shown in cross-section. A conference car. Four healthcare professionals and a patient seated around a long rectangular table. Left to right: Dr. Shruthi (Indian female doctor in white coat, short dark hair, confident posture), a nutritionist (female, warm expression), a trainer (athletic build, male), a physiotherapist (female, professional attire). The patient (Indian woman, mid-40s, saree or elegant kurta) sits at the head of the table, genuinely smiling mid-laugh, head tilted slightly back. The entire team smiles warmly with her — collegial, genuine energy, not clinical.

On the table surface visible to viewer: a folded paper roadmap, unfolded to show three illustrated icons connected by a dotted line path:
1. A salad bowl (nutrition icon)
2. A wristwatch with "10K" subtly on face (movement icon)
3. A small calendar grid with one square circled in coral (consistency icon)

Train car interior: rectangular windows showing passing landscape, overhead lighting as simple rectangular shapes, warm cream walls. Track underneath curves gently upward toward the right.

Label at top: "04 — STRUCTURED ROADMAP" in clean sans-serif, charcoal ink.

16:9 aspect ratio. Warm cream #FAF7F0 background. Flat editorial illustration. Beautiful, precise, intentional.`;

async function main() {
  console.log("Getting auth token...");
  const token = execSync("gcloud auth print-access-token", { encoding: "utf8" }).trim();

  // Read character reference images as base64
  console.log("Loading character reference images...");
  const chars = [
    { name: "char-dr-shruthi", file: "char-dr-shruthi.png" },
    { name: "char-patient", file: "char-patient.png" },
    { name: "char-nutritionist", file: "char-nutritionist.png" },
    { name: "char-trainer", file: "char-trainer.png" },
    { name: "char-physio", file: "char-physio.png" },
  ];

  // Imagen 3 allows max 4 reference images — prioritise the two key characters
  // plus nutritionist and physio (trainer described well enough via text)
  const priorityChars = chars.filter((c) => c.name !== "char-trainer");

  // Build subject reference images for Imagen 3.
  // Correct REST field: "referenceImage" (NOT "image") containing bytesBase64Encoded.
  // Images must be compressed to JPEG to keep payload manageable.
  const subjectReferenceImages = await Promise.all(
    priorityChars.map(async (c, i) => {
      // Use sharp if available, otherwise load raw bytes
      const imgData = readFileSync(join(CHAR_DIR, c.file));
      // Compress via jimp or just use raw bytes (resize not needed since JPEG is fine)
      return {
        referenceId: i + 1,
        referenceType: "REFERENCE_TYPE_SUBJECT",
        referenceImage: {
          bytesBase64Encoded: imgData.toString("base64"),
        },
        subjectImageConfig: {
          subjectType: "SUBJECT_TYPE_PERSON",
          subjectDescription: "",
        },
      };
    })
  );

  console.log(`Loaded ${subjectReferenceImages.length} character references (max 4 allowed by API)`);

  const requestBody = {
    instances: [
      {
        prompt: PROMPT,
        referenceImages: subjectReferenceImages,
      },
    ],
    parameters: {
      sampleCount: 1,
      aspectRatio: "16:9",
      safetyFilterLevel: "block_some",
      personGeneration: "allow_adult",
      addWatermark: false,
    },
  };

  console.log("Calling Vertex AI Imagen 3 with character references...");
  const resp = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    console.error(`HTTP ${resp.status}: ${errText.slice(0, 500)}`);

    // Fallback: try without reference images (plain text-to-image)
    console.log("\nFalling back to text-only generation...");
    await generateTextOnly(token);
    return;
  }

  const json = await resp.json();
  const b64 = json?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) {
    console.error("No image in response:", JSON.stringify(json).slice(0, 300));
    console.log("\nFalling back to text-only generation...");
    await generateTextOnly(token);
    return;
  }

  writeFileSync(OUT_PATH, Buffer.from(b64, "base64"));
  console.log(`\nSaved: ${OUT_PATH}`);
}

async function generateTextOnly(token) {
  const fallbackPrompt = `${PROMPT}

Characters to include:
- Dr. Shruthi: Indian female doctor, white coat, short dark hair, glasses, confident professional bearing
- Patient: Indian woman mid-40s, warm smile, head tilted back in genuine laughter, elegant attire
- Nutritionist: South Indian woman, warm expression, professional casual
- Trainer: Athletic Indian man, energetic posture, sports-adjacent attire
- Physiotherapist: Indian woman, calm focused expression, medical professional look

All five characters around conference table inside train car.`;

  const resp = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      instances: [{ prompt: fallbackPrompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: "16:9",
        safetyFilterLevel: "block_some",
        personGeneration: "allow_adult",
        addWatermark: false,
      },
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`HTTP ${resp.status}: ${errText.slice(0, 500)}`);
  }

  const json = await resp.json();
  const b64 = json?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error("No image in response: " + JSON.stringify(json).slice(0, 300));

  writeFileSync(OUT_PATH, Buffer.from(b64, "base64"));
  console.log(`Saved (text-only fallback): ${OUT_PATH}`);
}

main().catch((e) => {
  console.error("Fatal error:", e.message);
  process.exit(1);
});
