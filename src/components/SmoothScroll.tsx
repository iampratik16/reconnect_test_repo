"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { setLenisInstance } from "@/lib/lenis";

/**
 * SmoothScroll — Lenis provider.
 * Wraps the page in butter-smooth kinetic scrolling.
 * Automatically disables itself when prefers-reduced-motion is set.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // On client-side navigation to a new page, start at the top. Lenis manages
  // its own scroll position and bypasses Next's default scroll restoration, so
  // we reset it explicitly. Skipped when the URL targets an in-page #anchor.
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) return;
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      // Intercept in-page anchor jumps (e.g. #three-tracks) and stop 88px
      // short so the section's "(01)" eyebrow clears the fixed nav instead
      // of landing underneath it.
      anchors: { offset: -88 },
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  return <>{children}</>;
}
