// Prefix raw public-asset paths with the deploy basePath.
//
// next/image and next/link automatically respect `basePath`, but RAW
// references — <img>, <video>, <source>, <link rel="preload">, and
// three.js `useGLTF()` — do NOT. On a subpath deploy (e.g. GitHub Pages
// at /reconnect_website/) those raw paths would 404 without this prefix.
//
// NEXT_PUBLIC_BASE_PATH is injected at build time (see next.config.ts).
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix an absolute public-asset path with the deploy basePath. Leaves empty / external paths untouched. */
export const asset = (p: string): string =>
  p && p.startsWith("/") ? BASE_PATH + p : p;
