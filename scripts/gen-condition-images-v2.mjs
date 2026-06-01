import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dir, "../public/images/conditions");
mkdirSync(OUT_DIR, { recursive: true });

const PROJECT = "radlabs-497004";
const LOCATION = "us-central1";
const ENDPOINT = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/imagen-3.0-generate-001:predict`;

// Primary: B&W editorial lifestyle photos — clearly relevant to each condition
const PRIMARY = [
  { name: "knee-oa",            prompt: "Award-winning editorial photograph, close-up of elderly Indian person's bare knees, one hand gently cupping the knee joint, soft natural window light, deep black and white, intimate and dignified, medical lifestyle photography, no text" },
  { name: "back-pain",          prompt: "Award-winning editorial photograph, mature person seen from behind, both hands pressing on lower lumbar spine area, head slightly bowed, soft directional light, dramatic shadows on spine, deep black and white, no text" },
  { name: "sciatica",           prompt: "Award-winning editorial photograph, person seated on edge of chair, hand pressing hip and upper thigh where sciatic nerve runs, subtle pain expression, side profile, soft light, deep black and white, empathetic, no text" },
  { name: "rheumatoid-arthritis", prompt: "Award-winning editorial photograph, beautiful close-up of elderly Indian woman's hands gently clasped together, prominent swollen knuckle joints, warm soft light, deep black and white, Dorothea Lange style, extremely dignified, no text" },
  { name: "osteoporosis",       prompt: "Award-winning editorial photograph, elegant older Indian woman in profile, slightly rounded upper back posture suggesting bone fragility, soft rim light, deep black and white, graceful and dignified, fine art portrait, no text" },
  { name: "frozen-shoulder",    prompt: "Award-winning editorial photograph, person seen from back, one arm raised only partway — visibly restricted at shoulder — the other arm relaxed, soft dramatic light, deep black and white, sculptural, no text" },
  { name: "cervical-pain",      prompt: "Award-winning editorial photograph, person at a desk, hand cupping the nape of neck, head tilted slightly, fatigue in posture, soft window light, deep black and white, intimate, medical lifestyle photography, no text" },
  { name: "post-meno",          prompt: "Award-winning editorial photograph, confident mature Indian woman standing tall, profile view, soft side light creating beautiful bone structure definition, deep black and white, strength and grace, fine art portrait, no text" },
  { name: "joint-stiffness",    prompt: "Award-winning editorial photograph, extreme close-up of elderly hands trying to fully open, fingers partially curled with visible stiffness, soft diffused light, deep black and white, dignified and honest, no text" },
  { name: "hip-pain",           prompt: "Award-winning editorial photograph, person in mid-stride, one hand resting on hip joint, slight tension in gait, soft natural outdoor light, side profile, deep black and white, cinematic, no text" },
];

// Hover: dark background anatomical medical illustrations showing the affected area
const MEDICAL = [
  { name: "knee-oa-medical",            prompt: "Detailed hyper-realistic medical illustration of a human knee joint cross-section, cartilage worn away on bone ends, dark charcoal black background, warm amber-gold anatomical glow on the joint surfaces and bone, cinematic rim lighting, award-winning medical visualization, no text, no labels" },
  { name: "back-pain-medical",          prompt: "Detailed hyper-realistic medical illustration of lumbar spine vertebrae L4-L5, intervertebral discs slightly compressed, dark black background, warm amber-gold glow highlighting the disc and nerve area, cinematic lighting, award-winning anatomical visualization, no text, no labels" },
  { name: "sciatica-medical",           prompt: "Detailed hyper-realistic medical illustration of the lumbar spine and sciatic nerve pathway glowing warm amber down through the pelvis, dark black background, cinematic lighting, award-winning anatomical visualization, no text, no labels" },
  { name: "rheumatoid-arthritis-medical", prompt: "Detailed hyper-realistic medical illustration of hand joints and knuckle cross-sections showing inflamed synovial tissue glowing warm amber-red, dark black background, cinematic rim light, award-winning anatomical visualization, no text, no labels" },
  { name: "osteoporosis-medical",       prompt: "Detailed hyper-realistic medical illustration cross-section of bone showing porous honeycomb-like osteoporotic structure, dark black background, warm amber glow emanating through the porous trabeculae, cinematic lighting, award-winning scientific visualization, no text, no labels" },
  { name: "frozen-shoulder-medical",    prompt: "Detailed hyper-realistic medical illustration of shoulder ball-and-socket joint showing thickened frozen capsule, dark black background, warm amber-gold glow on the restricted joint capsule, cinematic lighting, award-winning anatomical visualization, no text, no labels" },
  { name: "cervical-pain-medical",      prompt: "Detailed hyper-realistic medical illustration of cervical spine vertebrae C3-C7, nerve roots visible, warm amber-gold highlighting at the nerve compression points, dark black background, cinematic lighting, award-winning anatomical visualization, no text, no labels" },
  { name: "post-meno-medical",          prompt: "Detailed hyper-realistic medical illustration of hip and pelvis bone structure showing reduced bone density, porous bone texture glowing warm amber, dark black background, cinematic lighting, award-winning scientific visualization, no text, no labels" },
  { name: "joint-stiffness-medical",    prompt: "Detailed hyper-realistic medical illustration of finger and hand joints cross-section showing reduced synovial fluid and joint space, warm amber glow on restricted joint areas, dark black background, cinematic lighting, award-winning anatomical visualization, no text, no labels" },
  { name: "hip-pain-medical",           prompt: "Detailed hyper-realistic medical illustration of hip ball-and-socket joint showing worn cartilage on femoral head, warm amber-gold glow highlighting the articular surface damage, dark black background, cinematic lighting, award-winning anatomical visualization, no text, no labels" },
];

async function generate(item, token, ratio = "3:4") {
  const resp = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt: item.prompt }],
      parameters: { sampleCount: 1, aspectRatio: ratio, safetyFilterLevel: "block_some", personGeneration: "allow_adult" },
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

  console.log(`\n── Primary lifestyle photos (${PRIMARY.length}) ─────────────`);
  for (const img of PRIMARY) {
    process.stdout.write(`  ${img.name}...`);
    try { await generate(img, token, "3:4"); }
    catch (e) { console.error(` FAILED: ${e.message}`); }
  }

  console.log(`\n── Medical hover illustrations (${MEDICAL.length}) ──────────`);
  for (const img of MEDICAL) {
    process.stdout.write(`  ${img.name}...`);
    try { await generate(img, token, "3:4"); }
    catch (e) { console.error(` FAILED: ${e.message}`); }
  }

  console.log("\nDone → public/images/conditions/");
}

main();
