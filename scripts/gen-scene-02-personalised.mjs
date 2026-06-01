import { execSync } from "child_process";
import { writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const CHAR_DIR = join(__dir, "../public/images/train-journey/characters");
const OUT_PATH = join(__dir, "../public/images/train-journey/scene-02-personalised.png");

const PROJECT = "radlabs-497004";
const LOCATION = "us-central1";

const ENDPOINT = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/imagen-3.0-generate-001:predict`;

const PROMPT = `Editorial illustration in the spirit of Christoph Niemann meets Malika Favre, with the restraint of Tom Gauld. Reminiscent of New Yorker covers, Bloomberg Businessweek, Apple editorial work.

PALETTE (strict, no other colors):
- Primary: deep medical blue #2563EB
- Background: warm cream #FAF7F0
- Accent: muted coral #E76F51 (max 5% of canvas, emotional emphasis only)
- Ink: charcoal #1A1A1A

TECHNIQUE:
- Flat 2D, no gradients, no rendering, no shading
- Confident line work with intentional weight variation (1pt to 4pt)
- Textured fills with subtle riso-print grain
- Generous negative space, formal composition
- All figures drawn with adult proportions and dignity

TONE: intelligent, quietly emotional, slightly witty, never sentimental.

EXPLICITLY AVOID: cartoonish, chibi, anime, children's book style, big eyes, sweat drops, exclamation marks, speech bubbles, 3D rendering, gradients, Corporate Memphis, generic stock illustration, photorealism.

SCENE: Same train shown in cross-section from the side, now with TWO distinct passenger cars side by side.

Car one (left car): Dr. Shruthi is visible through the rectangular window — an Indian female doctor in a white coat, short dark hair, professional bearing — seated at a small desk, writing notes with focused expression. She is seen from the side through the window, pen on paper.

Car two (right car): The patient — an Indian woman in her mid-40s in elegant attire — sits across a small fold-out table from the Nutritionist. The nutritionist is a South Indian woman with a warm professional expression. The nutritionist holds a clipboard tilted toward the patient. On the clipboard face, clearly handwritten in large bold letters at the top: "PRIYA". The patient's expression has shifted from neutral to curious — she leans slightly forward, engaged, with a soft half-smile of recognition.

On the fold-out table between them: a single illustrated tomato drawn flat and clean, with a small coral-colored question mark beside it — the tomato and question mark together signal the conversation that personalises everything. The tomato is rendered in coral (#E76F51), the only use of that accent color.

The train track underneath both cars transitions left to right: jagged and uneven under car one, slightly smoother and more regular under car two — a subtle visual metaphor for progress.

Label above the entire scene in clean sans-serif charcoal lettering: "02 — PERSONALISED"

The two cars are connected by a visible coupling. Train exterior rendered in flat medical blue. Wheels as simple black circles. Rectangular windows. Cream interior walls visible through windows. Overhead lighting as thin rectangular bars.

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
  ];

  // Build subject reference images for Imagen 3 (max 4 allowed)
  const subjectReferenceImages = chars.map((c, i) => {
    const imgData = readFileSync(join(CHAR_DIR, c.file));
    return {
      referenceId: i + 1,
      referenceType: "REFERENCE_TYPE_SUBJECT",
      referenceImage: {
        bytesBase64Encoded: imgData.toString("base64"),
      },
      subjectImageConfig: {
        subjectType: "SUBJECT_TYPE_PERSON",
      },
    };
  });

  console.log(`Loaded ${subjectReferenceImages.length} character references`);

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
- Dr. Shruthi: Indian female doctor, white coat, short dark hair, glasses optional, confident professional bearing, seen through window writing notes
- Patient (Priya): Indian woman mid-40s, elegant attire (saree or kurta), curious expression leaning slightly forward
- Nutritionist: South Indian woman, warm professional expression, holding clipboard labelled "PRIYA" toward the patient

Train with two connected cars shown in cross-section. Tomato and coral question mark on fold-out table. Track below transitions from jagged to smoother.`;

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
