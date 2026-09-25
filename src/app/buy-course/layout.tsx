import type { Metadata } from "next";
import { PricesProvider } from "@/components/Prices/PricesProvider";
import { loadPrices } from "@/lib/loadPrices";

// Prices are edited in Sanity; refresh at most once a minute.
export const revalidate = 60;

// buy-course/page.tsx is a client component and can't export metadata, so the
// noindex lives here. Checkout is private — kept out of search via noindex
// (not a robots.txt disallow, so Google can crawl it and honor the tag).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function BuyCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const prices = await loadPrices();
  return <PricesProvider prices={prices?.prices ?? null} months={prices?.months}>{children}</PricesProvider>;
}
