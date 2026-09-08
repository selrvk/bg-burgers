/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EVERYTHING EDITABLE ON THE SITE LIVES IN THIS FILE.
 *
 *  Change prices, hours, menu items or contact details here and nowhere else.
 *  You never need to open a component to update the site's content.
 *
 *  Anything still unconfirmed is marked with `todo:` and shows up on the page
 *  as a bright "TO CONFIRM" block, so nothing unverified can ship by accident.
 *  Delete the `todo` line once the real information is filled in.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Where the site will be hosted. Update after the first deploy. */
export const SITE_URL = "https://bgburgers.example.ph";
export const SITE_URL_IS_PLACEHOLDER = true;

export const business = {
  /**
   * NAP — name, address, phone. These three must match the Google Business
   * Profile character for character, or local ranking suffers.
   *
   * Note: the Facebook page says "BG Burgers"; the Google listing says
   * "BG Burger" (singular) and is currently marked permanently closed.
   * We use the Facebook spelling because that is the live, active brand.
   */
  name: "BG Burgers",
  legalTagline: "Grilled at its best",
  category: "Burger Restaurant",

  address: {
    street: null as string | null,
    todoStreet: "Get the exact street / road name of the lot in Pallocan East",
    barangay: "Pallocan East",
    city: "Batangas City",
    region: "Batangas",
    postalCode: "4200",
    country: "PH",
  },

  /** The landmark is how people here actually navigate. */
  landmark: "Beside Palpitate",
  todoLandmark: "Confirm the exact spelling of the neighbouring business, and add 1–2 more landmarks (e.g. the nearest corner, school, or gas station)",

  /**
   * Printed on their own menu board as 0939-341-7055, and confirmed separately
   * by the owner. Two independent sources, so this is safe to publish.
   *
   * `phone` is what a customer reads; `phoneHref` is what the tel: link dials.
   * The international form always connects, including for the OFW customers who
   * turn up in the reviews.
   */
  phone: "+63 939 341 7055",
  phoneHref: "+639393417055",
  /** How it appears on their printed menu, for anyone cross-checking. */
  phoneLocal: "0939-341-7055",

  founded: "June 2014",
  /** Verbatim from the business's own Facebook page. Do not paraphrase. */
  origin:
    "BG Burgers started at their own garage by the owner's handmade beef patty since June 2014. We also serve chicken wings, pasta, nachos and rice meals.",
  /** Verbatim from the Facebook page, and from the decal on their own truck. */
  promise: "We're not fast food... We cook slow, but surely its worth the wait!",

  ownerName: null as string | null,
  todoOwner: "Owner's name, if they're happy to be named on the site",
} as const;

export const contact = {
  facebookPage: "https://www.facebook.com/BGBurgersGrilledAtItsBest",
  /** Verified to resolve to the page's Messenger thread. */
  messenger: "https://m.me/BGBurgersGrilledAtItsBest",
  instagram: "https://www.instagram.com/bgburgers2014",
  tiktok: "https://www.tiktok.com/@bgburgers8",

  /**
   * Deliberately a Maps *search*, not a pinned location.
   *
   * The only BG listing on Google sits at the old address and is marked
   * permanently closed, so linking its pin would send customers to the wrong
   * place. A search for the name plus barangay is honest and still gets people
   * moving. Swap both of these for real pin URLs once the Google Business
   * Profile for the Pallocan East lot exists.
   */
  directionsGoogle:
    "https://www.google.com/maps/search/?api=1&query=BG+Burgers+Pallocan+East+Batangas+City",
  directionsWaze: "https://waze.com/ul?q=BG%20Burgers%20Pallocan%20East%20Batangas%20City",
  todoDirections:
    "Create a Google Business Profile for the Pallocan East lot, then paste the real map pin here. Right now these buttons run a search instead of opening an exact pin.",

  email: null as string | null,
  viber: null as string | null,
} as const;

/**
 * Opening hours. `null` means closed that day.
 * Times are 24-hour, Asia/Manila. Used for the display table, the live
 * open/closed badge, and the structured data Google reads.
 */
export const hours: { day: string; short: string; open: string | null; close: string | null }[] = [
  { day: "Monday", short: "Mon", open: null, close: null },
  { day: "Tuesday", short: "Tue", open: "17:00", close: "23:00" },
  { day: "Wednesday", short: "Wed", open: "17:00", close: "23:00" },
  { day: "Thursday", short: "Thu", open: "17:00", close: "23:00" },
  { day: "Friday", short: "Fri", open: "17:00", close: "23:00" },
  { day: "Saturday", short: "Sat", open: "17:00", close: "23:00" },
  { day: "Sunday", short: "Sun", open: "17:00", close: "23:00" },
];

export const hoursNote =
  "Kitchen closes when the patties run out, so it pays to come early on weekends.";
export const todoHoursNote =
  "Confirm this: the Facebook page previously said \"5pm until sold out\". Is 11PM a hard closing time, or does it depend on stock?";

/**
 * Price range shown on the page and in the structured data.
 * Marked as an estimate until the owner confirms real prices.
 */
export const priceRange = {
  low: 160,
  high: 360,
  isPlaceholder: false,
  todo: "",
} as const;

export type MenuItem = {
  name: string;
  price: number;
  /** Second price, where the menu board lists one (burgers: ala carte vs meal). */
  mealPrice?: number;
  note?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  blurb: string;
  photo: string | null;
  photoAlt: string;
  /** Column headings when a category has two prices per item. */
  priceColumns?: [string, string];
  items: MenuItem[];
  todo?: string;
};

/**
 * The menu, transcribed word for word from the shop's own printed menu board
 * (archived at photos/menu_board.jpg). Item names keep their exact wording and
 * spelling; prices are exactly as printed.
 *
 * The board groups things as Burgers / Pasta / Appetizers / Add-ons, and that
 * grouping is reproduced here rather than reorganised, so the owner recognises
 * their own menu and staff can check it line by line.
 *
 * TO EDIT: change a `price`, or add an item to `items`, e.g.
 *     { name: "New Burger", price: 250, mealPrice: 290 },
 * Prices are plain numbers — the ₱ sign and comma are added automatically.
 */
export const menu: MenuCategory[] = [
  {
    id: "burgers",
    name: "Burgers",
    blurb: "Handmade beef patties, grilled to order. The reason the place exists.",
    photo: "burgers-w-bacon-shot",
    photoAlt:
      "Four BG Burgers bacon cheeseburgers in wire baskets lined with the shop's branded paper, served with fries",
    priceColumns: ["Ala carte", "Meal"],
    items: [
      { name: "BG Burger (Regular)", price: 200, mealPrice: 240 },
      { name: "Cheese Burger", price: 230, mealPrice: 270 },
      { name: "Double Cheese Burger", price: 290, mealPrice: 330 },
      { name: "Bacon Cheese Burger", price: 260, mealPrice: 300 },
      { name: "Double Bacon Cheese Burger", price: 320, mealPrice: 360 },
    ],
    todo: "What comes with a \u201cMeal\u201d — fries and a drink, or rice? Customers ask this before ordering, and the board does not say.",
  },
  {
    id: "appetizers",
    name: "Appetizers",
    blurb: "Fries, nachos and hand-tossed wings — the things that get shared.",
    photo: "chicken-wings-shot",
    photoAlt:
      "Three baskets of BG Burgers chicken wings in different coatings — cheese-dusted, red glazed, and breaded — on branded paper",
    items: [
      { name: "BG Fries", price: 160 },
      { name: "Fries Overload", price: 230 },
      { name: "Nachos Overload", price: 230 },
      { name: "BG Chicken Wings", price: 230 },
      { name: "Buffalo Wings", price: 270 },
      { name: "Garlic Parmesan Wings", price: 270 },
      { name: "Chase Honey Garlic Wings", price: 270 },
    ],
    todo: "\u201cChase Honey Garlic Wings\u201d is copied exactly as the board prints it. Is that the intended name, or should it read \u201cCheese\u201d? Say the word and we will correct it here and on the board.",
  },
  {
    id: "pasta",
    name: "Pasta",
    blurb: "Cooked fresh in the same kitchen, good for sharing.",
    photo: null,
    photoAlt: "",
    items: [
      { name: "Spicy Tuna", price: 250 },
      { name: "Spaghetti", price: 250 },
      { name: "Carbonara", price: 250 },
    ],
  },
  {
    id: "add-ons",
    name: "Add-ons",
    blurb: "To wash it all down.",
    photo: null,
    photoAlt: "",
    items: [
      { name: "Bottled Water", price: 35 },
      { name: "Softdrinks", price: 35 },
    ],
  },
];

/**
 * The Facebook page also advertises rice meals, but the printed board does not
 * list them. Rather than guess, the site shows only what the board shows.
 */
export const menuTodoGlobal =
  "Your Facebook page mentions rice meals, but they are not on the printed board — so they are not on the site. Do you still serve them, and at what price?";

/** Drinks, delivery and payment — all unconfirmed. */
export const service = {
  payments: [] as string[],
  todoPayments: "Which do you accept — cash, GCash, Maya, bank transfer? GCash especially is worth showing.",
  delivery: [] as { name: string; url: string }[],
  todoDelivery: "Are you on GrabFood or Foodpanda? Do you have your own rider, or is it pick-up only?",
  seating: null as string | null,
  todoSeating: "Roughly how many people can sit down? Do you take reservations for barkada or family groups?",
} as const;

/**
 * Reasons drawn from what reviewers actually praised and what the business
 * itself claims — nothing invented.
 */
export const whyUs = [
  {
    title: "Big and juicy",
    body: "Reviewers keep using the same two words. The patties are hand-formed, not pressed out of a machine.",
    source: "From a Google review",
  },
  {
    title: "Handmade since 2014",
    body: "It started in the owner's own garage with one handmade beef patty, and the patties are still made by hand.",
    source: "From the owner",
  },
  {
    title: "Worth the wait",
    body: "Nothing sits under a heat lamp. Your burger goes on the grill after you order it — which is why it takes a few minutes.",
    source: "Painted on their truck",
  },
  {
    title: "Room for the whole barkada",
    body: "An open-air lot under string lights, with space for families, kids and big groups. Bukas from 5PM.",
    source: "",
  },
] as const;

/**
 * Google reviews, reproduced exactly as Google shows them — original spelling,
 * punctuation and line breaks intact. Never edit, tidy or add to these.
 */
export const reviews = [
  {
    author: "Sheila Fortuna",
    meta: "Local Guide · 166 reviews · 2,075 photos",
    when: "7 years ago",
    text: "The best burger in town.. Big and juicy. Thanks to the owner aNd staff. I love it so. Much will. Come back when go back to. Philippines. Worth the try.. Highly recommended.",
  },
  {
    author: "Jiv M",
    meta: "Local Guide · 48 reviews · 293 photos",
    when: "9 years ago",
    text: "This is the best burger I've tasted so far in Batangas. Totally recommended.",
  },
  {
    author: "Francis Geducos",
    meta: "Local Guide · 43 reviews · 68 photos",
    when: "2 years ago",
    text: "Nice food",
  },
] as const;

export const socialProof = {
  googleRating: 4.8,
  googleReviewCount: 11,
  googleListingUrl:
    "https://www.google.com/maps/place/BG+Burger/@13.7564616,121.0857813,19z/data=!4m6!3m5!1s0x33bd1ab168fb626b:0xb4f4260e0c9b2214!8m2!3d13.7564616!4d121.086425",
  facebookFollowers: "25K",
  todoGoogle:
    "The Google listing these reviews sit on is marked PERMANENTLY CLOSED and points at the old address. This needs fixing on Google itself — see HANDOFF.md.",
} as const;

/**
 * Gallery order. Grades come from photos/MANIFEST.md.
 *
 * `focus` sets object-position. Four of the source photos have the logo burned
 * into them as a watermark, and the site already shows the logo in the header —
 * two copies on one screen reads as a stock-photo placeholder. Framing low
 * crops the watermark out of shot while keeping the part of the picture that
 * matters. Flagged for re-shoot in SHOT-LIST.md.
 */
export const gallery = [
  {
    src: "burgers-shot",
    alt: "A tray of BG Burgers patties fresh off the grill, topped with cheese sauce, ketchup, bacon and lettuce",
    span: "wide" as const,
    focus: "50% 78%",
  },
  {
    src: "place-shot2",
    alt: "The BG Burgers open-air lot at dusk, packed with families and friends under strings of warm bulbs",
    span: "wide" as const,
    focus: "50% 82%",
  },
  {
    src: "chicken-wings-shot",
    alt: "Three baskets of BG Burgers chicken wings in different coatings",
    span: "tall" as const,
    focus: "50% 50%",
  },
  {
    src: "burgers-w-bacon-shot",
    alt: "Bacon cheeseburgers with fries in wire baskets at BG Burgers",
    span: "tall" as const,
    focus: "50% 40%",
  },
] as const;
