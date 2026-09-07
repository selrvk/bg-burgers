"use client";

import { useEffect, useState } from "react";
import { getOpenState, type OpenState } from "@/lib/hours";

/**
 * Live "are they open right now?" badge, computed from the hours in
 * content.ts against the wall clock in Batangas.
 *
 * Rendered empty on the server and filled on mount — a static export is built
 * once, so the time cannot come from the build. The wrapper reserves its final
 * height so nothing shifts when the text arrives.
 */
export function OpenStatus({ className = "" }: { className?: string }) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const tick = () => setState(getOpenState());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`flex min-h-[34px] items-center ${className}`}>
      {state && (
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold ${
            state.open
              ? "border-gold-soft/45 bg-gold/15 text-gold-soft"
              : "border-cream/25 bg-night/40 text-muted"
          }`}
        >
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${
              state.open ? "bg-gold-soft bulb-on" : "bg-cream/40"
            }`}
          />
          {state.label}
        </span>
      )}
    </div>
  );
}
