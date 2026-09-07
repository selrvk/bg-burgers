import manifest from "./images.generated.json";

type Entry = { widths: number[] };
const sizes = manifest as unknown as Record<string, Entry>;

/**
 * Maps a logical src ("/img/place-shot") plus a requested width onto the
 * nearest pre-generated file ("/img/place-shot-900.webp").
 *
 * Static export means there is no image optimisation server, so every width
 * next/image can ask for must already exist on disk. Anything unrecognised is
 * passed through untouched.
 */
export default function loader({ src, width }: { src: string; width: number }) {
  const name = src.replace(/^\/img\//, "").replace(/\.\w+$/, "");
  const entry = sizes[name];
  if (!entry) return src;
  const picked = entry.widths.find((w) => w >= width) ?? entry.widths[entry.widths.length - 1];
  return `/img/${name}-${picked}.webp`;
}
