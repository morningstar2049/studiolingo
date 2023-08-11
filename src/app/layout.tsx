import "./globals.css";
import type { Metadata } from "next";
import localFont from "@next/font/local";

export const metadata: Metadata = {
  title: "Studio Lingo",
  description: "Step into the new world",
};

const firago = localFont({
  src: [
    {
      path: "../../public/fonts/FiraGo-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/FiraGo-Bold.ttf",
      weight: "700",
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
