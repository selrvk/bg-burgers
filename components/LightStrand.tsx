/**
 * Slots 3 & 4 — the connective tissue of the concept.
 *
 * A strand of festoon bulbs slung between sections, the same way they are
 * slung across the lot. The wire is a single element with an elliptical
 * border-radius, so it sags like a real cable and never distorts on resize;
 * the bulbs are positioned along a parabola matching that sag.
 */

type Props = {
  /** How many bulbs on the wire. */
  bulbs?: number;
  /** How far the wire dips, in pixels. */
  sag?: number;
  className?: string;
};

export function LightStrand({ bulbs = 11, sag = 26, className = "" }: Props) {
  // Bulbs are inset from the edges: a bulb centred at exactly 0% or 100% is
  // half outside the viewport, which pushes the document a few pixels wider
  // than the screen and produces a horizontal scrollbar.
  const INSET = 2.5;
  const points = Array.from({ length: bulbs }, (_, i) => {
    const t = bulbs === 1 ? 0.5 : i / (bulbs - 1);
    return { left: INSET + t * (100 - INSET * 2), drop: 4 * t * (1 - t) * sag };
  });

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ height: sag + 30 }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-x-0 top-0 border-b-2 border-gold-soft/30"
        style={{ height: sag, borderRadius: "50% / 0 0 100% 100%" }}
      />
      {points.map((p, i) => (
        <span
          key={i}
          className="absolute flex flex-col items-center"
          style={{ left: `${p.left}%`, top: p.drop, transform: "translateX(-50%)" }}
        >
          <span className="block h-[6px] w-[2px] bg-gold-soft/40" />
          <span
            className="block rounded-full bg-gold-soft bulb-on"
            style={{
              width: i % 2 === 0 ? 9 : 7,
              height: i % 2 === 0 ? 12 : 10,
              borderRadius: "45% 45% 55% 55% / 35% 35% 65% 65%",
            }}
          />
        </span>
      ))}
    </div>
  );
}

/** Slot 4 — the short version, for rules inside a section. */
export function LightRule({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto w-40 ${className}`}>
      <LightStrand bulbs={3} sag={10} />
    </div>
  );
}
