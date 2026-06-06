import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
const isExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // ── Static export mode (GitHub Pages demo) ──────────────────────
  // Enabled via STATIC_EXPORT=1. Produces a fully static `out/` folder.
  ...(isExport
    ? {
        output: "export" as const,
        // Custom loader prepends basePath to every <Image> src (unoptimized
        // images don't get basePath automatically on a subpath export).
        images: { loader: "custom" as const, loaderFile: "./image-loader.ts" },
        basePath: basePath || undefined,
        assetPrefix: basePath || undefined,
        trailingSlash: true, // /about → /about/index.html (Pages-friendly)
        // Demo build: don't let type/lint noise block the export.
        typescript: { ignoreBuildErrors: true },
        eslint: { ignoreDuringBuilds: true },
      }
    : {}),

  // During local development, forbid the browser from caching anything.
  // (Not applicable to static export.)
  async headers() {
    if (!isDev || isExport) return [];
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
    ];
  },
};

export default nextConfig;
