import manifest from "./images.generated.json";

type Entry = { width: number; height: number; widths: number[] };
const images = manifest as unknown as Record<string, Entry>;

/**
 * Builds a srcset string from the widths the image pipeline actually produced.
 *
 * These used to be hand-written in the markup, which silently broke the banner
 * on wide screens the moment the pipeline's width ladder changed: the markup
 * still advertised a file that was no longer generated, and the browser picked
 * it and got a 404. Deriving the string from the manifest means the markup can
 * never advertise a file that does not exist.
 */
export function srcSetFor(name: string): string {
  const entry = images[name];
  if (!entry) throw new Error(`srcSetFor: no image "${name}" in images.generated.json`);
  return entry.widths.map((w) => `/img/${name}-${w}.webp ${w}w`).join(", ");
}

/** A mid-ladder file for the plain `src` fallback. */
export function fallbackSrc(name: string): string {
  const entry = images[name];
  if (!entry) throw new Error(`fallbackSrc: no image "${name}" in images.generated.json`);
  return `/img/${name}-${entry.widths[Math.min(1, entry.widths.length - 1)]}.webp`;
}

export function dimensions(name: string) {
  const entry = images[name];
  if (!entry) throw new Error(`dimensions: no image "${name}" in images.generated.json`);
  return { width: entry.width, height: entry.height };
}
