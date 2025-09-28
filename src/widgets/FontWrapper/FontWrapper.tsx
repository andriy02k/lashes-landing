import { Montserrat } from "next/font/google";
import { ReactNode } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
});

export function FontWrapper({ children }: { children: ReactNode }) {
  return <div className={montserrat.variable}>{children}</div>;
}
