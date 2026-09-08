import { business, contact } from "@/lib/content";
import { srcSetFor, fallbackSrc, dimensions } from "@/lib/srcset";
import { OpenStatus } from "./OpenStatus";

/**
 * The hero carries the two jobs that matter most: message them, and find them.
 * Both buttons sit in the lower third of the first screen, inside easy reach
 * of a thumb, and neither requires a scroll at 390×844.
 *
 * The background image is art-directed rather than responsive: portrait phones
 * get the burger (product, and it already has the string lights in the bokeh),
 * wide screens get the lot at golden hour. Hand-rolled <picture> because this
 * is the LCP element and only one of the two files should ever be fetched.
 */
export function Hero() {
  const phone = dimensions("sinlge-burger-shot");

  return (
    <section id="top" className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden">
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet={srcSetFor("hero-wide")}
          sizes="100vw"
        />
        <img
          src={fallbackSrc("sinlge-burger-shot")}
          srcSet={srcSetFor("sinlge-burger-shot")}
          sizes="100vw"
          width={phone.width}
          height={phone.height}
          alt="A BG Burgers double bacon cheeseburger with fries, served on the shop's branded paper under strings of warm bulbs at dusk"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      </picture>

      {/* Keeps the copy legible over a photo that changes with the viewport. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/78 via-45% to-night/15"
        aria-hidden="true"
      />

      <div className="wrap flex items-end justify-between gap-14 pb-9 pt-28">
        <div className="xl:max-w-2xl">
          <p className="eyebrow text-gold-soft">
            {business.address.barangay} · {business.address.city}
          </p>

          <h1 className="mt-2.5 text-[clamp(2.9rem,13vw,5.5rem)] text-cream">{business.name}</h1>

          <p className="mt-1 font-display text-[clamp(1.05rem,4.4vw,1.6rem)] tracking-wide text-gold">
            {business.legalTagline}
          </p>

          <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-cream/90">
            &ldquo;{business.promise}&rdquo;
          </p>

          <OpenStatus className="mt-5" />

          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <a href={`tel:${business.phoneHref}`} className="btn btn-primary w-full sm:w-auto">
              <PhoneIcon />
              Call {business.phone}
            </a>
            <a
              href={contact.directionsGoogle}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost w-full sm:w-auto"
            >
              <PinIcon />
              Get directions
            </a>
          </div>

          <p className="mt-3 text-sm text-muted">
            Or{" "}
            <a
              href={contact.messenger}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold-soft underline underline-offset-4"
            >
              message us on Facebook
            </a>{" "}
            — sagot kami agad tuwing bukas.
          </p>
        </div>

        {/*
          Only rendered from 1280px up (see .hero-plate). Below that the burger
          IS the background image, so showing it twice would be redundant.
        */}
        <div
          className="hero-plate"
          role="img"
          aria-label="A BG Burgers double bacon cheeseburger with fries, served on the shop's branded paper"
        />
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.3 0 .7-.2 1l-2.3 2.1z" />
    </svg>
  );
}


function PinIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.1 6.3 12.4 6.6 12.7a.6.6 0 0 0 .9 0C12.7 21.4 19 14.1 19 9a7 7 0 0 0-7-7zm0 9.6A2.6 2.6 0 1 1 12 6.4a2.6 2.6 0 0 1 0 5.2z" />
    </svg>
  );
}
