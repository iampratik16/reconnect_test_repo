"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { asset } from "@/lib/asset";

/**
 * ClientRedirect — replaces the current history entry with `to` on mount.
 *
 * Used for routes that have been merged elsewhere. A client-side redirect is
 * used (rather than the server `redirect()`) so it also works under static
 * export (`output: "export"`), where there is no request-time server to issue
 * a 3xx. A plain <a> fallback covers the no-JS case.
 */
export default function ClientRedirect({ to }: { to: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(asset(to));
  }, [router, to]);

  return (
    <section className="min-h-[50vh] flex items-center justify-center bg-bone">
      <p className="text-body text-ink-soft">
        This page has moved.{" "}
        <a href={asset(to)} className="text-clay underline underline-offset-4">
          Continue
        </a>
        .
      </p>
    </section>
  );
}
