import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import { MobileMenuContextProvider } from "@/Context/MobileMenuContext";
import MobileNavMenu from "@/components/MobileNavMenu";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Studio Lingo - ინგლისური ენის კურსები",
  description: "ინგლისური ენის კურსები. ისწავლეთ ინგლისური სტუდიო ლინგოში!",
  icons: {
    icon: "/favicon.png",
  },
  keywords: [
    "ინგლისურის კურსები",
    "ინგლისური",
    "ონლაინ ინგლისურის კურსები",
    "english classes",
    "შეაბიჯე ახალ სამყაროში",
  ],
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
    <>
      <Head>
        <meta
          name="description"
          content="ინგლისური ენის კურსები ონლაინ. ისწავლეთ ინგლისური სტუდიო ლინგოში!"
          key="desc"
        />
      </Head>
      <html lang="en" className={`${firago.variable} font-sans scroll-smooth`}>
        <body>
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
    </>
  );
}
