/**
 * Upscales Dr. Shruthi's REAL portrait via Vertex Imagen upscaling (image-to-
 * image — the one op that takes an input image). Keeps her actual face; only
 * raises resolution/sharpness so it holds up as a hero portrait.
 *
 * Input:  public/dr-shruthi.jpg (500x350)
 * Output: public/dr-shruthi-hires.png (upscaled)
 */
import { execSync } from "child_process";
import { writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const PROJECT = "radlabs-497004";
const LOCATION = "us-central1";
const MODEL = "imagen-3.0-generate-001";
const ENDPOINT = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:predict`;

const token = execSync("gcloud auth print-access-token", { encoding: "utf8" }).trim();
const inB64 = readFileSync(join(__dir, "../public/dr-shruthi.jpg")).toString("base64");

const body = JSON.stringify({
  instances: [{ image: { bytesBase64Encoded: inB64 } }],
  parameters: {
    sampleCount: 1,
    mode: "upscale",
    upscaleConfig: { upscaleFactor: "x4" },
  },
});

const resp = await fetch(ENDPOINT, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body,
});
if (!resp.ok) {
  console.error("ERR", resp.status, (await resp.text()).slice(0, 600));
  process.exit(1);
}
const json = await resp.json();
const b64 = json?.predictions?.[0]?.bytesBase64Encoded;
if (!b64) { console.error("no image", JSON.stringify(json).slice(0,400)); process.exit(1); }
writeFileSync(join(__dir, "../public/dr-shruthi-hires.png"), Buffer.from(b64, "base64"));
console.log("✓ dr-shruthi-hires.png written");
