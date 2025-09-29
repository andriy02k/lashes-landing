import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { GFS_Didot } from "next/font/google";

export const metadata: Metadata = {
  title: "Lashes Studio",
  description: "Lashes Studio by Alona Polonets",
};

export const gsfDidot = GFS_Didot({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-gsfDidot",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${gsfDidot.variable} scroll-smooth`}>
      <body>{children}</body>
    </html>
  );
}
