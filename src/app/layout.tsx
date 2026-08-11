import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import { MobileMenuContextProvider } from "@/Context/MobileMenuContext";
import MobileNavMenu from "@/components/MobileNavMenu";
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
  },
  openGraph: {
    title: "სტუდიო ლინგო - ინგლისური ენების სკოლა",
    description: "ისწავლეთ ინგლისური სტუდიო ლინგოში!",
    images: ["https://i.ibb.co/f8s59ww/page-Thumbnail.png"],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={localization}>
      <html lang="ka" className={`${firago.variable} font-sans scroll-smooth`}>
        <body>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchemas) }}
          />
          {/* <Analytics /> */}
          <MobileMenuContextProvider>
            <div className="sticky top-[-2px] z-10">
              <Header />
              <Navbar />
            </div>
            <MobileNavMenu />
            {children}
          </MobileMenuContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
