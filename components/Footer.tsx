import { business, contact } from "@/lib/content";
import { groupedHours } from "@/lib/hours";
import { LightStrand } from "./LightStrand";

/**
 * Slot 7 — the bottom of the metaphor, mirroring the header.
 *
 * Full night, and the bulbs are at their brightest. Every way of reaching them
 * is repeated here, because this is where people scroll to when they have
 * decided to go.
 */
export function Footer() {
  const rows = groupedHours();

  return (
    <footer className="relative z-10 bg-night">
      <LightStrand bulbs={15} sag={30} />

      <div className="wrap pb-10 pt-4">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <span className="lightbox inline-block px-2.5 py-2">
              <img
                src="/img/logo-180.webp"
                srcSet="/img/logo-180.webp 180w, /img/logo-320.webp 320w"
                sizes="150px"
                width={797}
                height={535}
                alt={`${business.name} logo`}
                loading="lazy"
                decoding="async"
                className="h-[52px] w-auto"
              />
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {business.legalTagline}. {business.address.barangay}, {business.address.city}.
              Grilling since {business.founded}.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg text-gold-soft">Mag-order</h2>
            <ul className="mt-3 space-y-1">
              <li>
                <a
                  href={`tel:${business.phoneHref}`}
                  className="inline-flex min-h-[44px] items-center font-semibold text-gold-soft hover:text-cream"
                >
                  {business.phone}
                </a>
              </li>
              <li>
                <FooterLink href={contact.messenger}>Messenger</FooterLink>
              </li>
              <li>
                <FooterLink href={contact.facebookPage}>Facebook Page</FooterLink>
              </li>
              <li>
                <FooterLink href={contact.instagram}>Instagram</FooterLink>
              </li>
              <li>
                <FooterLink href={contact.tiktok}>TikTok</FooterLink>
              </li>
              <li>
                <FooterLink href={contact.directionsGoogle}>Google Maps</FooterLink>
              </li>
              <li>
                <FooterLink href={contact.directionsWaze}>Waze</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg text-gold-soft">Oras</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {rows.map((row) => (
                <li key={row.label} className="flex justify-between gap-4">
                  <span className="text-cream/85">{row.label}</span>
                  <span className={row.closed ? "text-red-soft" : "text-muted"}>{row.value}</span>
                </li>
              ))}
            </ul>
            <address className="mt-4 text-sm not-italic leading-relaxed text-muted">
              {business.address.barangay}
              <br />
              {business.address.city}, {business.address.region} {business.address.postalCode}
              <br />
              {business.landmark}
            </address>
          </div>
        </div>

        <p className="mt-9 border-t border-cream/10 pt-5 text-xs text-muted">
          © {new Date().getFullYear()} {business.name}. Salamat sa inyong suporta.
        </p>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-[44px] min-w-[44px] items-center text-[0.97rem] text-cream/85 hover:text-gold-soft"
    >
      {children}
    </a>
  );
}
