import { getCoursePrices } from "@/sanity/queries";
import {
  priceKey,
  type MonthsTable,
  type PriceTable,
} from "./priceTable";

// Server-side: the price table and each price's study period from Sanity, or
// null to use the fallback (dataset unreachable or no prices entered yet).
export async function loadPrices(): Promise<{
  prices: PriceTable;
  months: MonthsTable;
} | null> {
  const res = await getCoursePrices();
  if (!res || res.total === 0) return null;
  const prices: PriceTable = {};
  const months: MonthsTable = {};
  for (const p of res.prices) {
    const key = priceKey(p.course, p.format, p.lessonType, p.frequency);
    prices[key] = p.price;
    if (p.months) months[key] = p.months;
  }
  return { prices, months };
}

/** Prices only — kept for callers that don't need the study period. */
export async function loadPriceTable(): Promise<PriceTable | null> {
  return (await loadPrices())?.prices ?? null;
}
