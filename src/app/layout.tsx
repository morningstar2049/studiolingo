import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Noto_Sans_Georgian } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import SiteFooter from "@/components/SiteFooter";
import StyleRestoreGuard from "@/components/StyleRestoreGuard";
import { MobileMenuContextProvider } from "@/Context/MobileMenuContext";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { localization } from "./localization";
import { SITE_URL, siteSchemas } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Studio Lingo - ინგლისური ენის კურსები",
  description: "ინგლისური ენის კურსები. ისწავლეთ ინგლისური სტუდიო ლინგოში!",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "სტუდიო ლინგო - ინგლისური ენების სკოლა",
    description: "ისწავლეთ ინგლისური სტუდიო ლინგოში!",
    images: ["/og-logo.png"],
  },
};

const firago = localFont({
  src: [
    {
      path: "../../public/fonts/FiraGO-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/FiraGO-Bold.ttf",
      weight: "700",
    },
    {
      path: "../../public/fonts/FiraGO-Medium.ttf",
      weight: "500",
    },
    {
      path: "../../public/fonts/FiraGO-Light.ttf",
      weight: "300",
    },
  ],
  variable: "--font-firago",
});

// Noto Sans Georgian includes Mtavruli (capital Georgian) glyphs, which FiraGO
// lacks — used only for the capitalized hero headline.
const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian", "latin"],
  weight: ["700"],
  variable: "--font-noto-ge",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={localization}>
      <html
        lang="ka"
        className={`${firago.variable} ${notoGeorgian.variable} font-sans scroll-smooth`}
      >
        <body>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchemas) }}
          />
          <Analytics />
          <StyleRestoreGuard />
          <MobileMenuContextProvider>
            <SiteChrome />
            {children}
            <SiteFooter />
          </MobileMenuContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
