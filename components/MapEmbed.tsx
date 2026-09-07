"use client";

import { useState } from "react";

/**
 * A click-to-load facade instead of an eager iframe.
 *
 * A Google Maps embed pulls in several hundred kilobytes of third-party
 * JavaScript. Loading that on arrival would blow the performance budget for
 * a panel most visitors never interact with — they tap "Get directions" and
 * leave for the Maps app instead. So the iframe is only mounted on request.
 */
export function MapEmbed({ query, label }: { query: string; label: string }) {
  const [loaded, setLoaded] = useState(false);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  if (loaded) {
    return (
      <iframe
        src={src}
        title={label}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-72 w-full rounded-xl border-0 ring-1 ring-cream/15 sm:h-80"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group relative flex h-72 w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-cream/15 bg-night-2/60 sm:h-80"
    >
      {/* A suggestion of streets, so the panel reads as a map before it is one. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "linear-gradient(rgba(194,205,221,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(194,205,221,0.14) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a7 7 0 0 0-7 7c0 5.1 6.3 12.4 6.6 12.7a.6.6 0 0 0 .9 0C12.7 21.4 19 14.1 19 9a7 7 0 0 0-7-7zm0 9.6A2.6 2.6 0 1 1 12 6.4a2.6 2.6 0 0 1 0 5.2z" />
        </svg>
      </span>
      <span className="relative font-display text-lg text-cream">Show the map</span>
      <span className="relative max-w-xs px-6 text-center text-xs text-muted">
        Loads Google Maps only when you tap, para hindi mabagal ang page.
      </span>
    </button>
  );
}
