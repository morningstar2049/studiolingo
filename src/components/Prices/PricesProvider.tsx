"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  fallbackPrices,
  monthsFor,
  type MonthsTable,
  type PriceTable,
} from "@/lib/priceTable";

type Value = { prices: PriceTable; months: MonthsTable };

const PricesContext = createContext<Value | null>(null);

// Hands the server-loaded Sanity prices (and their study periods) to the
// client calculators.
export function PricesProvider({
  prices,
  months,
  children,
}: {
  prices: PriceTable | null;
  months?: MonthsTable;
  children: ReactNode;
}) {
  return (
    <PricesContext.Provider
      value={prices ? { prices, months: months ?? {} } : null}
    >
      {children}
    </PricesContext.Provider>
  );
}

/** The active price table: Sanity when provided, else the built-in fallback. */
export function usePriceTable(): PriceTable {
  return useContext(PricesContext)?.prices ?? fallbackPrices;
}

/** Study period (months) for a price key — Sanity value or format default. */
export function useCourseMonths(): (key: string) => number {
  const ctx = useContext(PricesContext);
  return (key: string) => monthsFor(key, ctx?.months);
}
