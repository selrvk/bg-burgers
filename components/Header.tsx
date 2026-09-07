import { business, contact } from "@/lib/content";

/**
 * Slot 1 — the top of the metaphor.
 *
 * The logo sits in a warm, glowing panel because that is exactly how it
 * appears on the lot: a lit lightbox sign on the side of their truck.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-cream/10 bg-night/72 backdrop-blur-md">
      <div className="wrap flex items-center justify-between gap-3 py-2">
        <a href="#top" className="lightbox shrink-0 px-2 py-1.5" aria-label={`${business.name} — home`}>
          <img
            src="/img/logo-180.webp"
            srcSet="/img/logo-180.webp 180w, /img/logo-320.webp 320w"
            sizes="(min-width: 768px) 108px, 88px"
            width={797}
            height={535}
            alt=""
            fetchPriority="high"
            decoding="sync"
            className="h-[38px] w-auto md:h-[46px]"
          />
        </a>

        <nav className="flex items-center gap-1.5 sm:gap-3" aria-label="Main">
          <a
            href="#menu"
            className="rounded-full px-2.5 py-3 text-sm font-semibold text-cream/90 hover:text-gold-soft sm:px-3"
          >
            Menu
          </a>
          <a
            href="#find-us"
            className="hidden rounded-full px-3 py-3 text-sm font-semibold text-cream/90 hover:text-gold-soft sm:inline-block"
          >
            Find us
          </a>
          <a
            href={contact.messenger}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary !min-h-[44px] !px-4 text-sm"
          >
            Message
          </a>
        </nav>
      </div>
    </header>
  );
}
