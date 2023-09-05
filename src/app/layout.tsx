import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import { MobileMenuContextProvider } from "@/Context/MobileMenuContext";
import MobileNavMenu from "@/components/MobileNavMenu";

export const metadata: Metadata = {
  title: "Studio Lingo",
  description: "Step into the new world",
  icons: {
    icon: "/lingo-logo-round.png",
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
    <html lang="en" className={`${firago.variable} font-sans scroll-smooth`}>
      <body>
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
  );
}
