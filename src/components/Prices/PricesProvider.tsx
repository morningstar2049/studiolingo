"use client";

import { createContext, useContext, type ReactNode } from "react";
import { fallbackPrices, type PriceTable } from "@/lib/priceTable";

const PricesContext = createContext<PriceTable | null>(null);

// Hands the server-loaded Sanity price table to client calculators.
export function PricesProvider({
  prices,
  children,
}: {
  prices: PriceTable | null;
  children: ReactNode;
}) {
  return (
    <PricesContext.Provider value={prices}>{children}</PricesContext.Provider>
  );
}

/** The active price table: Sanity when provided, else the built-in fallback. */
export function usePriceTable(): PriceTable {
  return useContext(PricesContext) ?? fallbackPrices;
}
