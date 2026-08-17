import type { Metadata } from "next";

// buy-course/page.tsx is a client component and can't export metadata, so the
// noindex lives here. Checkout is private — kept out of search via noindex
// (not a robots.txt disallow, so Google can crawl it and honor the tag).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function BuyCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
