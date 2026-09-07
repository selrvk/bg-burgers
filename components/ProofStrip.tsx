import { socialProof } from "@/lib/content";

/**
 * Thin, immediate, above everything else. The strongest number here is not the
 * Google rating — it is 25,000 Facebook followers, because that is where this
 * business's audience actually lives.
 *
 * The band is a dark scrim rather than a translucent one: this far up the page
 * the evening gradient is still mid-amber, and cream text over amber fails
 * contrast. The scrim keeps every figure legible in daylight.
 */
export function ProofStrip() {
  return (
    <section className="relative z-10 border-y border-cream/12 bg-night/80 backdrop-blur-sm">
      <div className="wrap">
        <ul className="grid grid-cols-2 divide-cream/12 py-1 sm:grid-cols-4 sm:divide-x">
          <Stat
            value={
              <span className="inline-flex items-baseline gap-1">
                {socialProof.googleRating}
                <span aria-hidden="true" className="text-gold">
                  ★
                </span>
              </span>
            }
            label={`on Google · ${socialProof.googleReviewCount} reviews`}
          />
          <Stat value={socialProof.facebookFollowers} label="followers on Facebook" />
          <Stat value="2014" label="grilling since June" />
          <Stat value="5PM" label="open Tuesday to Sunday" />
        </ul>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <li className="px-2 py-4 text-center">
      <p className="font-display text-2xl leading-none text-cream sm:text-3xl">{value}</p>
      <p className="mt-1.5 text-xs leading-tight text-muted">{label}</p>
    </li>
  );
}
