import { business, contact, hoursNote, todoHoursNote, service } from "@/lib/content";
import { groupedHours } from "@/lib/hours";
import { LightStrand } from "./LightStrand";
import { MapEmbed } from "./MapEmbed";
import { OpenStatus } from "./OpenStatus";
import { Todo } from "./Todo";

/**
 * Given the situation on Google — an old listing marked permanently closed,
 * and no street address anywhere — this section carries more weight than it
 * normally would. Landmarks come first, because that is how people here
 * actually navigate.
 */
export function FindUs() {
  const rows = groupedHours();
  const searchQuery = `${business.name} ${business.address.barangay} ${business.address.city}`;

  return (
    <section id="find-us" className="section">
      <LightStrand className="mb-10" bulbs={13} sag={24} />

      <div className="wrap">
        <p className="eyebrow text-gold-soft">Nasaan kami</p>
        <h2 className="mt-2 text-[clamp(2rem,8vw,3rem)] text-cream">Find us</h2>

        <div className="mt-7 grid gap-7 md:grid-cols-2 md:gap-9">
          <div>
            <h3 className="font-display text-xl text-gold-soft">Ang address</h3>
            <address className="mt-2 not-italic leading-relaxed text-cream/90">
              {business.address.street && (
                <>
                  {business.address.street}
                  <br />
                </>
              )}
              {business.address.barangay}
              <br />
              {business.address.city}, {business.address.region} {business.address.postalCode}
            </address>

            <p className="mt-3 inline-flex items-center gap-2 rounded-lg bg-gold/12 px-3 py-2 text-sm font-semibold text-gold-soft ring-1 ring-gold/30">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a7 7 0 0 0-7 7c0 5.1 6.3 12.4 6.6 12.7a.6.6 0 0 0 .9 0C12.7 21.4 19 14.1 19 9a7 7 0 0 0-7-7zm0 9.6A2.6 2.6 0 1 1 12 6.4a2.6 2.6 0 0 1 0 5.2z" />
              </svg>
              {business.landmark}
            </p>

            <Todo>{business.address.todoStreet}</Todo>
            <Todo>{business.todoLandmark}</Todo>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <a
                href={contact.directionsGoogle}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full sm:w-auto"
              >
                Google Maps
              </a>
              <a
                href={contact.directionsWaze}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost w-full sm:w-auto"
              >
                Waze
              </a>
            </div>

            <Todo>{contact.todoDirections}</Todo>
          </div>

          <div>
            <h3 className="font-display text-xl text-gold-soft">Bukas kami</h3>
            <OpenStatus className="mt-2" />

            <table className="mt-3 w-full text-[0.97rem]">
              <caption className="sr-only">Opening hours</caption>
              <tbody className="divide-y divide-cream/10">
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="py-2.5 text-left font-semibold text-cream/90">
                      {row.label}
                    </th>
                    <td
                      className={`py-2.5 text-right ${row.closed ? "text-red-soft" : "text-cream/85"}`}
                    >
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-3 text-sm leading-relaxed text-muted">{hoursNote}</p>
            <Todo>{todoHoursNote}</Todo>
            <Todo>{business.todoPhone}</Todo>
            <Todo>{service.todoSeating}</Todo>
          </div>
        </div>

        <div className="mt-8">
          <MapEmbed query={searchQuery} label={`Map showing ${business.name}`} />
        </div>
      </div>
    </section>
  );
}
