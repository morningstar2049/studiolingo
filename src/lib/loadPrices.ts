import { getCoursePrices } from "@/sanity/queries";
import { priceKey, type PriceTable } from "./priceTable";

// Server-side: the price table from Sanity, or null to use the fallback
// (dataset unreachable or no prices entered yet).
export async function loadPriceTable(): Promise<PriceTable | null> {
  const res = await getCoursePrices();
  if (!res || res.total === 0) return null;
  const table: PriceTable = {};
  for (const p of res.prices) {
    table[priceKey(p.course, p.format, p.lessonType, p.frequency)] = p.price;
  }
  return table;
}
