import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Studio Lingo",
  description: "Step into the new world",
  icons: {
    icon: "/lingo-logo-svg.svg",
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
    <html lang="en" className={`${firago.variable} font-sans`}>
      <body>{children}</body>
    </html>
  );
}
