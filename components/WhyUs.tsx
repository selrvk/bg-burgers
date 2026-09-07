import { whyUs } from "@/lib/content";
import { LightStrand } from "./LightStrand";

/**
 * Every claim here traces back to something a reviewer wrote, something the
 * owner said, or something painted on their own truck. The attribution line
 * under each card is the point — it keeps the section honest.
 */
export function WhyUs() {
  return (
    <section className="section">
      <LightStrand className="mb-10" bulbs={9} sag={22} />

      <div className="wrap">
        <p className="eyebrow text-gold-soft">Bakit dito</p>
        <h2 className="mt-2 max-w-xl text-[clamp(2rem,8vw,3rem)] text-cream">
          Slow food, sa gilid ng kalsada
        </h2>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {whyUs.map((reason) => (
            <li
              key={reason.title}
              className="rounded-xl border border-cream/12 bg-cream/[0.04] p-5 backdrop-blur-[2px]"
            >
              <h3 className="font-display text-xl text-gold-soft">{reason.title}</h3>
              <p className="mt-2 text-[0.97rem] leading-relaxed text-cream/85">{reason.body}</p>
              {reason.source && (
                <p className="mt-3 text-xs uppercase tracking-wider text-muted">{reason.source}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
