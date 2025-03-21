import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import { MobileMenuContextProvider } from "@/Context/MobileMenuContext";
import MobileNavMenu from "@/components/MobileNavMenu";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Studio Lingo",
  description: "შეაბიჯე ახალ სამყაროში",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
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
    <>
      <html lang="en" className={`${firago.variable} font-sans scroll-smooth`}>
        <body>
          {/* <Analytics /> */}
          <div id="fb-root" />

          <div id="fb-customer-chat" className="fb-customerchat" />
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
    </>
  );
}
