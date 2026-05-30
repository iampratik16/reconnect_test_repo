"use client";

/**
 * SpineScene — renders the DRACO GLB spine.
 *  - Strips the skull/mandible/teeth so only the vertebral column shows.
 *  - Recenters the remaining geometry on the world origin so it rotates
 *    around its own central vertical (Y) axis.
 *  - One-time console dump of every scene-node name so we can tighten
 *    the strip list if any annotation geometry survives.
 */

import { Suspense, useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, ContactShadows } from "@react-three/drei";
import { Box3, Group, Vector3 } from "three";
import type { Object3D } from "three";

type RotationRef = MutableRefObject<number>;

/**
 * Stripped objects. Only obvious non-spine anatomy + clearly-named
 * annotation geometry. NO bare "C1 / T1 / L1" patterns — those names
 * are also used by the actual vertebrae in this FBX and were eating
 * real bones.
 */
const STRIP_PATTERNS: RegExp[] = [
  /skull/i,
  /cranium/i,
  /mandible/i,
  /jaw/i,
  /tooth/i,
  /teeth/i,
  /dent/i,
  /eye/i,
  /\blabel\b/i,
  /\btext\b/i,
  /annotation/i,
  /leader/i,
  /callout/i,
];

function shouldStrip(name: string): boolean {
  if (!name) return false;
  return STRIP_PATTERNS.some((p) => p.test(name));
}

function SpineModel({
  rotationRef,
  onReady,
}: {
  rotationRef: RotationRef;
  onReady?: () => void;
}) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF("/models/spine.glb");

  // Suspense has resolved by the time this component mounts; flip the
  // parent's "ready" flag so the canvas wrapper can fade in.
  useEffect(() => {
    onReady?.();
  }, [onReady]);

  const cleanedScene = useMemo(() => {
    const clone = scene.clone(true);

    // One-time dev log so we can spot any remaining annotation names.
    if (process.env.NODE_ENV !== "production") {
      const names: string[] = [];
      clone.traverse((o) => names.push(`${o.type}: ${o.name || "(unnamed)"}`));
      // eslint-disable-next-line no-console
      console.log("[SpineScene] objects in GLB:\n" + names.join("\n"));
    }

    const toRemove: Object3D[] = [];
    clone.traverse((obj) => {
      if (shouldStrip(obj.name)) toRemove.push(obj);
    });
    toRemove.forEach((o) => o.removeFromParent());

    // Recenter the remaining geometry on (0,0,0) — so the spine spins
    // around its true central axis, not the original FBX pivot.
    const box = new Box3().setFromObject(clone);
    const center = box.getCenter(new Vector3());
    clone.position.sub(center);

    return clone;
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = rotationRef.current;
    const cur = groupRef.current.rotation.y;
    const t = 1 - Math.exp(-delta * 6);
    groupRef.current.rotation.y = cur + (target - cur) * t;
  });

  return (
    <group ref={groupRef} scale={1.95}>
      <primitive object={cleanedScene} />
    </group>
  );
}

useGLTF.preload("/models/spine.glb");

export default function SpineScene({
  rotationRef,
  onReady,
}: {
  rotationRef: RotationRef;
  onReady?: () => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.9], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 8, 6]} intensity={1.6} />
        <directionalLight position={[-5, 2, -3]} intensity={0.5} />
        <hemisphereLight args={["#FFFFFF", "#9DB6D4", 0.4]} />
        <SpineModel rotationRef={rotationRef} onReady={onReady} />
        <ContactShadows
          position={[0, -3, 0]}
          opacity={0.18}
          scale={7}
          blur={2.4}
          far={4}
        />
      </Suspense>
    </Canvas>
  );
}
