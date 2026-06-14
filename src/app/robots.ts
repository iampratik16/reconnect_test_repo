import type { MetadataRoute } from "next";

// Required for `output: export` (static build / GitHub Pages demo).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://reconnect.health/sitemap.xml",
  };
}
