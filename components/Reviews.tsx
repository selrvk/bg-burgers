import { reviews, socialProof } from "@/lib/content";

/**
 * Reproduced exactly as Google shows them — original spelling, punctuation and
 * all. Nothing here is rewritten, tidied or invented, and the section links
 * back to the listing so anyone can check.
 *
 * Deliberately NOT marked up as Review/AggregateRating structured data:
 * self-hosted review markup about your own business is ineligible for rich
 * results and can be treated as spam. It is social proof, not schema.
 */
export function Reviews() {
  return (
    <section id="reviews" className="section">
      <div className="wrap">
        <p className="eyebrow text-gold-soft">Sabi ng iba</p>
        <h2 className="mt-2 text-[clamp(2rem,8vw,3rem)] text-cream">
          &ldquo;The best burger in town&rdquo;
        </h2>
        <p className="mt-3 flex flex-wrap items-center gap-x-2 text-sm text-muted">
          <span className="font-semibold text-gold-soft">
            {socialProof.googleRating} ★
          </span>
          <span>from {socialProof.googleReviewCount} Google reviews</span>
        </p>

        <ul className="mt-7 grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <li
              key={review.author}
              className="flex flex-col rounded-xl border border-cream/12 bg-cream/[0.04] p-5"
            >
              <p className="grow text-[0.97rem] leading-relaxed text-cream/90">
                &ldquo;{review.text}&rdquo;
              </p>
              <footer className="mt-4 border-t border-cream/10 pt-3">
                <p className="font-semibold text-cream">{review.author}</p>
                <p className="mt-0.5 text-xs text-muted">{review.meta}</p>
                <p className="mt-0.5 text-xs text-muted">{review.when}</p>
              </footer>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-muted">
          Reviews are shown word-for-word as they appear on{" "}
          <a
            href={socialProof.googleListingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gold-soft underline underline-offset-4"
          >
            the Google listing
          </a>
          .
        </p>
      </div>
    </section>
  );
}
