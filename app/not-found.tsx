import Link from "next/link";
import { contact } from "@/lib/content";

/**
 * Slot 8 — the joke that proves the concept was thought through.
 * One bulb that never came on, and the line every regular has heard at least
 * once: sold out for tonight, back tomorrow at five.
 */
export default function NotFound() {
  return (
    <section className="section flex min-h-[70svh] items-center">
      <div className="wrap text-center">
        <svg
          width="72"
          height="104"
          viewBox="0 0 72 104"
          className="mx-auto"
          role="img"
          aria-label="An unlit bulb hanging from a wire"
        >
          <path d="M36 0v22" stroke="rgba(255,217,142,0.35)" strokeWidth="2" />
          <path
            d="M36 22a19 19 0 0 0-11.3 34.3c1.6 1.2 2.5 2.9 2.5 4.8v1.8h17.6v-1.8c0-1.9.9-3.6 2.5-4.8A19 19 0 0 0 36 22Z"
            fill="rgba(251,246,236,0.10)"
            stroke="rgba(255,217,142,0.4)"
            strokeWidth="2"
          />
          <rect x="26" y="68" width="20" height="5" rx="2.5" fill="rgba(255,217,142,0.4)" />
          <rect x="27.5" y="76" width="17" height="5" rx="2.5" fill="rgba(255,217,142,0.4)" />
        </svg>

        <h1 className="mt-7 text-[clamp(2.2rem,9vw,3.4rem)] text-cream">Sold out na.</h1>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-cream/85">
          Wala kami sa page na ito — baka nagbago ang link. Balik tayo sa umpisa, or
          message us and we&rsquo;ll point you the right way.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            Balik sa home
          </Link>
          <a
            href={contact.messenger}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            Message us
          </a>
        </div>
      </div>
    </section>
  );
}
