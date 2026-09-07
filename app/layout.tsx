import type { Metadata } from "next";
import { Anton } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollFilament } from "@/components/ScrollFilament";
import { business, contact, socialProof, SITE_URL } from "@/lib/content";
import { openingHoursSpec } from "@/lib/hours";

/**
 * One webfont, not two.
 *
 * Anton carries the brand voice in the headings and is worth its 21KB. Inter
 * for body text was another 83KB over mobile data — on a mid-range Android the
 * system stack resolves to Roboto, which is just as readable and costs nothing.
 * next/font self-hosts this at build time; no request ever leaves for Google.
 */
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const description =
  "BG Burgers grills handmade beef patties to order in Pallocan East, Batangas City. Burgers, chicken wings, pasta, nachos and rice meals, served in an open-air lot under string lights from 5PM, Tuesday to Sunday.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${business.name} — Burger Restaurant in ${business.address.barangay}, ${business.address.city}`,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: SITE_URL,
    siteName: business.name,
    title: `${business.name} — ${business.legalTagline}`,
    description,
    images: [
      {
        url: "/img/og.jpg",
        width: 1200,
        height: 630,
        alt: `A BG Burgers bacon cheeseburger and fries, ${business.address.barangay}, ${business.address.city}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} — ${business.legalTagline}`,
    description,
    images: ["/img/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0b1626",
  width: "device-width",
  initialScale: 1,
};

/**
 * Structured data for the listing.
 *
 * Deliberately omitted:
 *  - `geo`: the only coordinates available belong to the old, permanently
 *    closed listing. Publishing them would point Google at the wrong lot.
 *  - `telephone`: no number is published anywhere.
 *  - `aggregateRating` / `review`: self-serving review markup on your own site
 *    is ineligible for rich results.
 */
function structuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: business.name,
    description,
    slogan: business.legalTagline,
    url: SITE_URL,
    image: [`${SITE_URL}/img/og.jpg`],
    servesCuisine: ["Burgers"],
    foundingDate: "2014-06",
    priceRange: "₱₱",
    currenciesAccepted: "PHP",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.barangay,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    areaServed: {
      "@type": "City",
      name: business.address.city,
    },
    openingHoursSpecification: openingHoursSpec(),
    sameAs: [
      contact.facebookPage,
      contact.instagram,
      contact.tiktok,
      socialProof.googleListingUrl,
    ],
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PH" className={anton.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-3 focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>

        <ScrollFilament />

        <div className="evening">
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
      </body>
    </html>
  );
}
