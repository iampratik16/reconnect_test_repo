import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dir, "../public/videos/conditions");
mkdirSync(OUT_DIR, { recursive: true });

const PROJECT = "radlabs-497004";
const LOCATION = "us-central1";
const MODEL = "veo-2.0-generate-001";
const BASE = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}`;

const CONDITIONS = [
  { name: "knee-oa",              prompt: "Photorealistic medical CGI animation, dark charcoal background, human knee joint in cross-section, femur and tibia bones with highly detailed cartilage layer, camera slowly orbits the knee joint in 3D, warm amber-gold bioluminescent glow pulses through the thinned and eroded cartilage showing osteoarthritis degradation, bone-on-bone contact area glowing brighter, microscopic bone spurs visible at joint margins, synovial fluid shimmer in joint space, dramatic rim lighting on bone surfaces, particles of worn cartilage floating in the joint space, cinematic depth of field, slow smooth camera movement revealing medial compartment damage, seamless loop, no text, no watermark", aspectRatio: "16:9" },
  { name: "back-pain",            prompt: "Cinematic medical education video, person standing and pressing hand on lower back, camera slowly zooms in on lumbar area, anatomical overlay reveals vertebrae L4-L5 with warm amber glow at compressed disc, soft professional lighting, slow motion, no text" },
  { name: "sciatica",             prompt: "Cinematic medical education video, person seated with hand on hip, anatomical overlay reveals sciatic nerve glowing warm amber tracing from lumbar spine through hip down the leg, soft professional lighting, slow motion, no text" },
  { name: "rheumatoid-arthritis", prompt: "Cinematic medical education video, extreme close-up of elderly Indian hands slowly opening, anatomical overlay shows knuckle joints glowing warm amber at inflamed synovial areas, soft window light, slow motion, dignified, no text" },
  { name: "osteoporosis",         prompt: "Cinematic medical education video, elegant older Indian woman standing, anatomical overlay reveals hip and spine bone structure with amber glow showing porous low-density bone, soft side light, slow motion, no text" },
  { name: "frozen-shoulder",      prompt: "Cinematic medical education video, person slowly attempting to raise arm overhead, arm stops partway, anatomical overlay shows shoulder joint capsule with amber glow highlighting the restricted frozen area, slow motion, no text" },
  { name: "cervical-pain",        prompt: "Cinematic medical education video, person slowly tilting neck, anatomical overlay reveals cervical vertebrae with warm amber glow at C4-C6 nerve compression point, soft professional lighting, slow motion, no text" },
  { name: "post-meno",            prompt: "Cinematic medical education video, confident mature Indian woman walking, anatomical overlay reveals hip and spine bone density visualization with amber-gold glow showing bone thinning, soft warm light, slow motion, no text" },
  { name: "joint-stiffness",      prompt: "Cinematic medical education video, close-up of elderly hands slowly trying to extend fingers, anatomical overlay reveals finger joints glowing amber at restricted joint surfaces, soft diffused light, slow motion, no text" },
  { name: "hip-pain",             prompt: "Cinematic medical education video, person walking with slight discomfort, camera tracks hip area, anatomical overlay reveals hip ball-and-socket joint with amber glow on worn cartilage surface, soft cinematic lighting, slow motion, no text" },
];

function getToken() {
  return execSync("gcloud auth print-access-token", { encoding: "utf8" }).trim();
}

async function submit(prompt, token, aspectRatio = "9:16") {
  const resp = await fetch(`${BASE}:predictLongRunning`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: {
        sampleCount: 1,
        durationSeconds: 8,
        aspectRatio,
        negativePrompt: "text, watermark, logo, blurry",
        personGeneration: "allow_adult",
      },
    }),
  });
  if (!resp.ok) throw new Error(`Submit ${resp.status}: ${(await resp.text()).slice(0, 200)}`);
  const { name } = await resp.json();
  return name;
}

async function poll(opName, token, maxWaitSecs = 600) {
  const start = Date.now();
  while ((Date.now() - start) / 1000 < maxWaitSecs) {
    await new Promise(r => setTimeout(r, 10000));
    const resp = await fetch(`${BASE}:fetchPredictOperation`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ operationName: opName }),
    });
    if (!resp.ok) { process.stdout.write("?"); continue; }
    const op = await resp.json();
    if (op.done) return op;
    process.stdout.write(".");
  }
  throw new Error("Timed out after 10 min");
}

async function processOne(cond, token) {
  process.stdout.write(`\n  [${cond.name}] submitting...`);
  const opName = await submit(cond.prompt, token, cond.aspectRatio ?? "9:16");
  process.stdout.write(` polling`);
  const op = await poll(opName, token);

  const vid = op.response?.videos?.[0];
  if (!vid) throw new Error("No video in response");

  let buf;
  if (vid.bytesBase64Encoded) {
    buf = Buffer.from(vid.bytesBase64Encoded, "base64");
  } else if (vid.videoGcsUri) {
    const gcsPath = vid.videoGcsUri.replace("gs://", "");
    const [bucket, ...parts] = gcsPath.split("/");
    const url = `https://storage.googleapis.com/storage/v1/b/${bucket}/o/${encodeURIComponent(parts.join("/"))}?alt=media`;
    const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    buf = Buffer.from(await r.arrayBuffer());
  } else {
    throw new Error("Unknown video format: " + JSON.stringify(vid).slice(0, 100));
  }

  writeFileSync(join(OUT_DIR, `${cond.name}.mp4`), buf);
  console.log(` ✓ (${(buf.length / 1024 / 1024).toFixed(1)} MB)`);
}

async function main() {
  const filter = process.argv.slice(2);
  const todo = filter.length ? CONDITIONS.filter(c => filter.includes(c.name)) : CONDITIONS;
  console.log(`\nGenerating ${todo.length} videos via Veo 2...`);
  let token = getToken();
  let tokenTime = Date.now();

  for (const cond of todo) {
    // Refresh token every 50 min
    if (Date.now() - tokenTime > 50 * 60 * 1000) {
      token = getToken();
      tokenTime = Date.now();
    }
    try { await processOne(cond, token); }
    catch (e) { console.error(`\n  ✗ ${cond.name}: ${e.message}`); }
  }
  console.log("\nDone → public/videos/conditions/");
}

main();
