// Custom next/image loader for static export on a subpath (GitHub Pages).
//
// With `output: export`, images aren't optimized at runtime. This loader
// simply returns the original asset path, prefixed with the deploy basePath
// so <Image> srcs resolve correctly under /reconnect_website/.
export default function imageLoader({ src }: { src: string; width: number; quality?: number }): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (/^https?:\/\//.test(src)) return src; // external URLs untouched
  return src.startsWith("/") ? `${base}${src}` : src;
}
