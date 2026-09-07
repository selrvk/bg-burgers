import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { Menu } from "@/components/Menu";
import { WhyUs } from "@/components/WhyUs";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { FindUs } from "@/components/FindUs";

/**
 * Section order is fixed: hero, proof, the offer, why us, gallery, reviews,
 * find us, footer. The footer lives in the layout.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <Menu />
      <WhyUs />
      <Gallery />
      <Reviews />
      <FindUs />
    </>
  );
}
