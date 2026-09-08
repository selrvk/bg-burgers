import { menu, menuTodoGlobal, priceRange, service, type MenuCategory } from "@/lib/content";
import { peso } from "@/lib/hours";
import { Photo } from "./Photo";
import { Todo } from "./Todo";

/**
 * "The offer" — the one section that borrows from Concept C.
 *
 * It is a sheet of the shop's own wax paper laid over the evening, with
 * crimped edges top and bottom. Two reasons it is light rather than dark:
 * their food photos are already shot on that paper, so the images and the page
 * become continuous — and prices must stay readable on a dim phone in Batangas
 * daylight, whatever the surrounding gradient is doing.
 *
 * Real text, real headings. Never a PDF, an image of a menu, or a carousel.
 */
export function Menu() {
  return (
    <section id="menu" className="relative z-10">
      <div className="paper-edge paper-edge-top" aria-hidden="true" />

      <div className="waxpaper">
        <div className="wrap py-10 md:py-14">
          <header className="max-w-2xl">
            <p className="eyebrow text-[#9a5f1d]">Ang menu</p>
            <h2 className="mt-2 text-[clamp(2rem,8vw,3rem)] text-[#20190f]">What we cook</h2>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-[#4a3f30]">
              Everything is grilled or fried after you order it. That is the whole idea, and
              it is why there is a wait.
            </p>

            <p className="mt-5 inline-flex flex-wrap items-baseline gap-x-2 rounded-full bg-[#20190f]/6 px-4 py-2.5 text-[#20190f] ring-1 ring-[#20190f]/12">
              <span className="font-display text-xl">
                {peso(priceRange.low)} – {peso(priceRange.high)}
              </span>
              <span className="text-sm text-[#4a3f30]">on the menu</span>
            </p>

            {priceRange.isPlaceholder && <Todo tone="paper">{priceRange.todo}</Todo>}
            <Todo tone="paper">{menuTodoGlobal}</Todo>
          </header>

          <Photo
            name="food-from-menu-shot"
            alt="An overhead spread of BG Burgers food: burgers with fries in baskets, breaded and glazed chicken wings, two plates of pasta, garlic bread and beef nachos, all on the shop's branded paper"
            sizes="(min-width: 768px) 66rem, 100vw"
            className="mt-7 h-64 w-full rounded-xl object-cover ring-1 ring-[#20190f]/10 sm:h-80 md:h-96"
          />

          <div className="mt-9 grid gap-6 md:grid-cols-2">
            {menu.map((category) => (
              <Category key={category.id} category={category} />
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-lg text-[#20190f]">Paano magbayad</h3>
              {service.payments.length > 0 ? (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {service.payments.map((p) => (
                    <li
                      key={p}
                      className="rounded-full bg-[#20190f]/8 px-3 py-1.5 text-sm font-semibold text-[#20190f]"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              ) : (
                <Todo tone="paper">{service.todoPayments}</Todo>
              )}
            </div>

            <div>
              <h3 className="font-display text-lg text-[#20190f]">Delivery</h3>
              {service.delivery.length > 0 ? (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {service.delivery.map((d) => (
                    <li key={d.name}>
                      <a
                        href={d.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center rounded-full bg-[#20190f] px-4 text-sm font-semibold text-paper"
                      >
                        {d.name}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <Todo tone="paper">{service.todoDelivery}</Todo>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="paper-edge paper-edge-bottom" aria-hidden="true" />
    </section>
  );
}

function Category({ category }: { category: MenuCategory }) {
  return (
    <article className="overflow-hidden rounded-xl bg-[#fffdf8] shadow-[0_1px_0_rgba(32,25,15,0.09),0_10px_28px_-22px_rgba(32,25,15,0.5)] ring-1 ring-[#20190f]/8">
      {category.photo && (
        <Photo
          name={category.photo}
          alt={category.photoAlt}
          sizes="(min-width: 768px) 33rem, 100vw"
          className="h-44 w-full object-cover sm:h-52"
        />
      )}

      <div className="p-5">
        <h3 className="font-display text-2xl text-[#20190f]">{category.name}</h3>
        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-[#4a3f30]">{category.blurb}</p>

        {category.items.length > 0 ? (
          category.priceColumns ? (
            /*
             * Two prices per item (ala carte / meal), so it becomes a real table
             * with real column headers — a screen reader announces which price
             * is which, and the columns stay aligned at any text size.
             */
            <table className="mt-4 w-full text-left">
              <caption className="sr-only">{category.name} prices</caption>
              <thead>
                <tr className="border-b border-[#20190f]/15">
                  <th scope="col" className="sr-only">
                    Item
                  </th>
                  {category.priceColumns.map((label) => (
                    <th
                      key={label}
                      scope="col"
                      className="pb-1.5 text-right text-xs font-bold uppercase tracking-wider text-[#7a6a52]"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#20190f]/10">
                {category.items.map((item) => (
                  <tr key={item.name}>
                    <th
                      scope="row"
                      className="py-2.5 pr-3 font-semibold text-[#20190f]"
                    >
                      {item.name}
                    </th>
                    <td className="py-2.5 pl-2 text-right font-display text-lg text-[#20190f]">
                      {peso(item.price)}
                    </td>
                    <td className="py-2.5 pl-3 text-right font-display text-lg text-[#20190f]">
                      {item.mealPrice ? peso(item.mealPrice) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <ul className="mt-4 divide-y divide-[#20190f]/10">
              {category.items.map((item) => (
                <li key={item.name} className="flex items-baseline gap-3 py-2.5">
                  <span className="font-semibold text-[#20190f]">
                    {item.name}
                    {item.note && (
                      <span className="ml-1.5 font-normal text-[#6b5c48]">{item.note}</span>
                    )}
                  </span>
                  <span
                    className="mx-1 grow border-b border-dotted border-[#20190f]/25"
                    aria-hidden="true"
                  />
                  <span className="shrink-0 font-display text-lg text-[#20190f]">
                    {peso(item.price)}
                  </span>
                </li>
              ))}
            </ul>
          )
        ) : (
          category.todo && <Todo tone="paper">{category.todo}</Todo>
        )}

        {category.items.length > 0 && category.todo && (
          <Todo tone="paper">{category.todo}</Todo>
        )}

      </div>
    </article>
  );
}
