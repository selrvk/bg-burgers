import manifest from "@/lib/images.generated.json";

type Entry = { width: number; height: number; widths: number[]; blur: string };
const images = manifest as unknown as Record<string, Entry>;

type Props = {
  /** Key from lib/images.generated.json, e.g. "place-shot". */
  name: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** CSS object-position, for framing away from a burned-in watermark. */
  objectPosition?: string;
};

/**
 * A plain <img> rather than next/image.
 *
 * next/image exists to talk to an optimisation server and to pick a width at
 * runtime. This is a static export where every width already sits on disk, so
 * all it would add is client-side JavaScript on a page whose whole point is
 * loading fast on a mid-range Android. The srcset below is exactly what
 * next/image would have produced, minus the runtime.
 *
 * The blur thumbnail is painted as a CSS background underneath the image, so
 * there is something on screen immediately and still no JavaScript involved.
 * Explicit width and height keep layout shift at zero.
 */
export function Photo({
  name,
  alt,
  sizes,
  className,
  priority = false,
  objectPosition,
}: Props) {
  const meta = images[name];
  if (!meta) return null;

  const srcSet = meta.widths.map((w) => `/img/${name}-${w}.webp ${w}w`).join(", ");
  const fallback = meta.widths[Math.min(1, meta.widths.length - 1)];

  return (
    <img
      src={`/img/${name}-${fallback}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={meta.width}
      height={meta.height}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
      style={{
        ...(meta.blur
          ? {
              backgroundImage: `url("${meta.blur}")`,
              backgroundSize: "cover",
              backgroundPosition: objectPosition ?? "center",
            }
          : {}),
        ...(objectPosition ? { objectPosition } : {}),
      }}
    />
  );
}
