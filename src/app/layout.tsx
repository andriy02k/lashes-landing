import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { FontWrapper } from "@/widgets/FontWrapper/FontWrapper";

export const metadata: Metadata = {
  title: "Lashes Studio",
  description: "Lashes Studio by Alona Polonets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <FontWrapper>{children}</FontWrapper>
      </body>
    </html>
  );
}
