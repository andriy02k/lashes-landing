import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Playfair } from "next/font/google";

export const metadata: Metadata = {
  title: "Lashes Studio",
  description: "Lashes Studio by Alona Polonets",
};

export const playfair = Playfair({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-playfair",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} scroll-smooth`}>
      <body>{children}</body>
    </html>
  );
}
