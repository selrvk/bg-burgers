import { hours } from "./content";

/** "17:00" → "5:00 PM" */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

/** ₱1,250 — symbol, comma separator, no space. */
export function peso(amount: number): string {
  return `₱${amount.toLocaleString("en-PH")}`;
}

const DAY_INDEX = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Reads the wall clock in Batangas regardless of where the visitor is, so an
 * OFW checking from Dubai still sees the right answer.
 */
function manilaClock(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const weekday = DAY_INDEX.indexOf(get("weekday"));
  // Intl can emit "24" for midnight.
  const hour = Number(get("hour")) % 24;
  return { weekday, minutes: hour * 60 + Number(get("minute")) };
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export type OpenState = {
  open: boolean;
  /** Short line for the badge, e.g. "Bukas hanggang 11:00 PM". */
  label: string;
  /** True within the last 45 minutes of service. */
  closingSoon: boolean;
};

/** Next day (searching forward) that has opening hours. */
function nextOpenDay(fromWeekday: number) {
  for (let i = 1; i <= 7; i++) {
    const idx = (fromWeekday + i) % 7;
    const entry = hours[(idx + 6) % 7]; // content.ts starts on Monday
    if (entry.open) return { entry, isTomorrow: i === 1 };
  }
  return null;
}

export function getOpenState(now: Date = new Date()): OpenState {
  const { weekday, minutes } = manilaClock(now);
  // content.ts is Monday-first; JS getDay() is Sunday-first.
  const today = hours[(weekday + 6) % 7];

  if (today.open && today.close) {
    const opensAt = toMinutes(today.open);
    const closesAt = toMinutes(today.close);

    if (minutes >= opensAt && minutes < closesAt) {
      const left = closesAt - minutes;
      return {
        open: true,
        closingSoon: left <= 45,
        label:
          left <= 45
            ? `Closing in ${left} ${left === 1 ? "minute" : "minutes"}`
            : `Bukas na — hanggang ${formatTime(today.close)}`,
      };
    }

    if (minutes < opensAt) {
      return {
        open: false,
        closingSoon: false,
        label: `Bukas mamaya, ${formatTime(today.open)}`,
      };
    }
  }

  const next = nextOpenDay(weekday);
  if (!next?.entry.open) {
    return { open: false, closingSoon: false, label: "Sarado" };
  }
  const when = next.isTomorrow ? "bukas" : next.entry.day;
  return {
    open: false,
    closingSoon: false,
    label: `Sarado — balik kami ${when}, ${formatTime(next.entry.open)}`,
  };
}

/** Grouped for display: consecutive days with identical hours collapse. */
export function groupedHours() {
  const rows: { label: string; value: string; closed: boolean }[] = [];
  let i = 0;
  while (i < hours.length) {
    const cur = hours[i];
    let j = i;
    while (
      j + 1 < hours.length &&
      hours[j + 1].open === cur.open &&
      hours[j + 1].close === cur.close
    ) {
      j++;
    }
    rows.push({
      label: i === j ? hours[i].day : `${hours[i].short}–${hours[j].short}`,
      value: cur.open && cur.close ? `${formatTime(cur.open)} – ${formatTime(cur.close)}` : "Closed",
      closed: !cur.open,
    });
    i = j + 1;
  }
  return rows;
}

/** ISO day codes for schema.org openingHoursSpecification. */
export function openingHoursSpec() {
  return hours
    .filter((h) => h.open && h.close)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: h.open,
      closes: h.close,
    }));
}
