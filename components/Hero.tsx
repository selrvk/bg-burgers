import { business, contact } from "@/lib/content";
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
  return (
    <section id="top" className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden">
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet="/img/hero-wide-900.webp 900w, /img/hero-wide-1200.webp 1200w, /img/hero-wide-1600.webp 1600w, /img/hero-wide-2048.webp 2048w"
          sizes="100vw"
        />
        <img
          src="/img/sinlge-burger-shot-640.webp"
          srcSet="/img/sinlge-burger-shot-400.webp 400w, /img/sinlge-burger-shot-640.webp 640w, /img/sinlge-burger-shot-900.webp 900w"
          sizes="100vw"
          width={1080}
          height={1440}
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

      <div className="wrap pb-9 pt-28">
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
          <a
            href={contact.messenger}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full sm:w-auto"
          >
            <MessengerIcon />
            Message us to order
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
          Walang phone line — orders and questions go through Facebook Messenger.
        </p>
      </div>
    </section>
  );
}

function MessengerIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.3 2 2 6.2 2 11.8c0 3.2 1.4 6 3.7 7.8V24l3.4-1.9c.9.3 1.9.4 2.9.4 5.7 0 10-4.2 10-9.8S17.7 2 12 2zm1 13.2-2.6-2.7-5 2.7 5.5-5.8 2.6 2.7 4.9-2.7-5.4 5.8z" />
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
