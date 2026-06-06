#!/usr/bin/env python3
"""Generate scene-04-roadmap using Vertex AI Imagen 3 with character references."""

import warnings
warnings.filterwarnings("ignore")

import sys
import os
import base64
import io
import json
import subprocess

CHAR_DIR = "/Users/guru/Desktop/Projects/Reconnect/reconnect_website/public/images/train-journey/characters"
OUT_PATH = "/Users/guru/Desktop/Projects/Reconnect/reconnect_website/public/images/train-journey/scene-04-roadmap.png"
PROJECT = "radlabs-497004"
LOCATION = "us-central1"
ENDPOINT = f"https://{LOCATION}-aiplatform.googleapis.com/v1/projects/{PROJECT}/locations/{LOCATION}/publishers/google/models/imagen-3.0-capability-001:predict"
FALLBACK_ENDPOINT = f"https://{LOCATION}-aiplatform.googleapis.com/v1/projects/{PROJECT}/locations/{LOCATION}/publishers/google/models/imagen-3.0-generate-001:predict"

PROMPT = """Editorial illustration in the spirit of Christoph Niemann meets Malika Favre, with the restraint of Tom Gauld. New Yorker cover aesthetic, Bloomberg Businessweek, Apple editorial.

PALETTE (strict):
- Background: warm cream #FAF7F0
- Primary fills: deep medical blue #2563EB
- Ink/lines: charcoal #1A1A1A
- Accent: muted coral #E76F51 (5% max, only on roadmap calendar icon)

TECHNIQUE: Flat 2D only. No gradients, no shadows, no rendering. Confident varied linework 1-4pt. Subtle riso grain texture on fills. Generous negative space. Adult proportions, dignified.

SCENE: Interior cross-section of train conference car (car #4). Five people seated around a long rectangular conference table centered in frame.

LEFT SIDE of table: Dr. Shruthi — Indian woman, white coat, short dark hair, glasses, warm confident expression, facing slightly right. Next to her: Nutritionist — South Indian woman, bright professional attire, gentle smile.

RIGHT SIDE of table: Trainer — athletic Indian man, sports/casual attire, engaged posture. Next to him: Physiotherapist — Indian woman, professional calm expression.

HEAD OF TABLE (center-right, facing viewer): Patient — Indian woman mid-40s, elegant kurta/attire, mid-laugh with head tilted slightly back, eyes crinkled, genuine joy. The whole team is smiling with her in collegial warmth.

ON THE TABLE: A large unfolded paper roadmap. On it, three icons connected by a dashed dotted line:
(1) Salad bowl icon — simple flat illustration
(2) Wristwatch icon with "10K" text on face
(3) Calendar grid icon with one square circled in coral

TRAIN CAR INTERIOR: Four rectangular windows along the top wall showing simple sky silhouette outside. Overhead strip lighting as flat rectangles. Cream wall panels. Blue seat cushions.

TRACK: Visible beneath the train, curved gently upward to the right.

LABEL: At top of composition, clean sans-serif text: "04 — STRUCTURED ROADMAP" in charcoal.

16:9 landscape. Cream background. Beautiful flat editorial illustration."""


def compress_image(path: str, max_size: int = 512) -> str:
    """Compress image to JPEG and return base64."""
    try:
        from PIL import Image
        img = Image.open(path).convert("RGB")
        img.thumbnail((max_size, max_size))
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=85)
        return base64.b64encode(buf.getvalue()).decode()
    except ImportError:
        # Fallback: use raw PNG bytes
        with open(path, "rb") as f:
            return base64.b64encode(f.read()).decode()


def get_token() -> str:
    return subprocess.check_output(
        ["gcloud", "auth", "print-access-token"], text=True
    ).strip()


def call_api(endpoint: str, body: dict, token: str):
    import urllib.request
    data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(
        endpoint,
        data=data,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=180) as resp:
        return json.loads(resp.read().decode("utf-8"))


def main():
    print(f"Getting auth token...")
    token = get_token()

    # Load and compress character reference images
    # NOTE: Imagen 3 capability-001 supports max 4 refs for square (1:1) and max 2 for 16:9.
    # For 16:9, use only the 2 most important characters.
    char_files = [
        ("char-dr-shruthi.png", "Dr. Shruthi: Indian female doctor, white coat, short dark hair, glasses"),
        ("char-patient.png", "Patient: Indian woman mid-40s, warm smile, elegant attire"),
    ]

    print(f"Loading and compressing {len(char_files)} character references...")
    reference_images = []
    for i, (fname, description) in enumerate(char_files):
        path = os.path.join(CHAR_DIR, fname)
        if not os.path.exists(path):
            print(f"  WARNING: {path} not found, skipping")
            continue
        b64 = compress_image(path, max_size=512)
        reference_images.append({
            "referenceId": i + 1,
            "referenceType": "REFERENCE_TYPE_SUBJECT",
            "referenceImage": {
                "bytesBase64Encoded": b64,
            },
            "subjectImageConfig": {
                "subjectType": "SUBJECT_TYPE_PERSON",
                "subjectDescription": description,
            },
        })
        print(f"  Loaded {fname}: {len(b64):,} chars")

    print(f"\nGenerating with {len(reference_images)} character references...")
    print("Using model: imagen-3.0-capability-001 (Imagen 3 with editing/reference support)")

    body = {
        "instances": [{
            "prompt": PROMPT,
            "referenceImages": reference_images,
        }],
        "parameters": {
            "sampleCount": 1,
            "aspectRatio": "16:9",
            "personGeneration": "allow_adult",
            "safetyFilterLevel": "block_some",
            "addWatermark": False,
        },
    }

    try:
        result = call_api(ENDPOINT, body, token)
        predictions = result.get("predictions", [])
        if predictions and predictions[0].get("bytesBase64Encoded"):
            b64_out = predictions[0]["bytesBase64Encoded"]
            with open(OUT_PATH, "wb") as f:
                f.write(base64.b64decode(b64_out))
            size = os.path.getsize(OUT_PATH)
            print(f"\nSaved: {OUT_PATH}")
            print(f"File size: {size:,} bytes")
            print("Method: vertex-ai with character references (imagen-3.0-capability-001)")
            return
        else:
            print(f"No image in response: {json.dumps(result)[:300]}")
            raise ValueError("No image in response")

    except Exception as e:
        print(f"\nError with reference model: {e}")
        print("Falling back to imagen-3.0-generate-001 (text-only, best quality prompt)...")

        fallback_body = {
            "instances": [{"prompt": PROMPT}],
            "parameters": {
                "sampleCount": 1,
                "aspectRatio": "16:9",
                "personGeneration": "allow_adult",
                "safetyFilterLevel": "block_some",
                "addWatermark": False,
            },
        }

        try:
            result = call_api(FALLBACK_ENDPOINT, fallback_body, token)
            predictions = result.get("predictions", [])
            if predictions and predictions[0].get("bytesBase64Encoded"):
                b64_out = predictions[0]["bytesBase64Encoded"]
                with open(OUT_PATH, "wb") as f:
                    f.write(base64.b64decode(b64_out))
                size = os.path.getsize(OUT_PATH)
                print(f"\nSaved (text-only fallback): {OUT_PATH}")
                print(f"File size: {size:,} bytes")
                return
        except Exception as e2:
            print(f"Fallback also failed: {e2}")
            sys.exit(1)


if __name__ == "__main__":
    main()
