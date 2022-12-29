import { ReactNode } from "react";
import "../src/styles/main.scss";
import { Roboto } from "@next/font/google";
import logoImg from "../src/assets/Logo.svg";
import Image from "next/image";
import { BodyContainer, Header } from "../src/styles/layout/styles";

const roboto = Roboto({ 
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--roboto-font"
});

export default function AppLayout({ children }: {
  children: ReactNode
}) {
  return (
    <html className={roboto.variable} lang="en">
      <BodyContainer>
        <Header>
          <Image
            src={logoImg}
            alt=""
          />
        </Header>
        {children}
      </BodyContainer>
    </html>
  );
}