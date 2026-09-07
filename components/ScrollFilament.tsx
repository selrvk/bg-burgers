"use client";

import { useEffect, useState } from "react";

const BULBS = 26;

/**
 * Slot 5 — the scroll indicator.
 *
 * A wire of bulbs across the top of the viewport that lights up left to right
 * as you descend the page: evening falling, and a reading-progress cue in the
 * same language as the rest of the site.
 *
 * Two layers of identical bulbs, one dim and one lit; the lit layer is
 * revealed by a clip-path driven by a single CSS custom property. Only that
 * property changes per frame, so the browser never re-lays-out anything.
 */
export function ScrollFilament() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Genuine kill switch: under reduced motion the strand renders fully lit
    // and no scroll listener is attached at all.
    if (query.matches) {
      setReduced(true);
      document.documentElement.style.setProperty("--scroll", "1");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      document.documentElement.style.setProperty("--scroll", ratio.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const row = (lit: boolean) => (
    <div className="flex h-full w-full items-start justify-between px-1">
      {Array.from({ length: BULBS }, (_, i) => (
        <span
          key={i}
          className={`block rounded-full ${lit ? "bg-gold-soft bulb-on" : "bg-cream/22"}`}
          style={{
            width: 5,
            height: 7,
            borderRadius: "45% 45% 55% 55% / 35% 35% 65% 65%",
            marginTop: i % 2 === 0 ? 3 : 5,
          }}
        />
      ))}
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-3.5"
      style={reduced ? { ["--scroll" as string]: 1 } : undefined}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-cream/15" />
      <div className="absolute inset-0">{row(false)}</div>
      <div
        className="absolute inset-0"
        style={{ clipPath: "inset(0 calc(100% - var(--scroll) * 100%) 0 0)" }}
      >
        {row(true)}
      </div>
    </div>
  );
}
