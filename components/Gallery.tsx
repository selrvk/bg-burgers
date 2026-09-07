import { gallery } from "@/lib/content";
import { Photo } from "./Photo";
import { LightRule } from "./LightStrand";

/**
 * All Grade A photos (see photos/MANIFEST.md), so they can all run large.
 * A warm multiply wash ties the daylight shots to the evening around them
 * without misrepresenting the food.
 */
export function Gallery() {
  return (
    <section id="gallery" className="section">
      <div className="wrap">
        <div className="text-center">
          <p className="eyebrow text-gold-soft">Ang lugar</p>
          <h2 className="mt-2 text-[clamp(2rem,8vw,3rem)] text-cream">Gabi-gabi, ganito</h2>
          <LightRule className="mt-4" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:gap-4">
          {gallery.map((shot) => (
            <figure
              key={shot.src}
              className={`group relative overflow-hidden rounded-xl ring-1 ring-cream/12 ${
                shot.span === "wide" ? "col-span-2" : ""
              }`}
            >
              <Photo
                name={shot.src}
                alt={shot.alt}
                sizes={shot.span === "wide" ? "(min-width: 768px) 66rem, 100vw" : "50vw"}
                objectPosition={shot.focus}
                className={`w-full object-cover ${
                  shot.span === "wide" ? "h-56 sm:h-80 md:h-[26rem]" : "h-56 sm:h-72 md:h-80"
                }`}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-dusk/18 mix-blend-multiply"
                aria-hidden="true"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
