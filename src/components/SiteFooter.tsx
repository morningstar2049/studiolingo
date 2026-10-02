"use client";
import { usePathname } from "next/navigation";
import Footer from "./Contact/Footer";
import type { FooterData } from "@/lib/loadFooter";

// Rendered globally from the root layout so the footer appears on every page.
// The Sanity Studio (/studio) is a full-screen app, so it's excluded — same as
// the header chrome.
export default function SiteFooter({ data }: { data: FooterData }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;
  return <Footer data={data} />;
}
