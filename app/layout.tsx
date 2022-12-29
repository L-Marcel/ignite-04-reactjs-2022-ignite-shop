import { ReactNode } from "react";
import { AppBody } from "../src/layout/styles";
import "../src/styles/main.scss";
import { Inter } from "@next/font/google";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--inter-font"
});

export default function AppLayout({ children }: {
  children: ReactNode
}) {
  return (
    <html className={inter.variable} lang="en">
      <AppBody>
        {children}
      </AppBody>
    </html>
  );
}