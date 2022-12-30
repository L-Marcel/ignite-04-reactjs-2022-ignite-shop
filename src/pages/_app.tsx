import { AppProps } from "next/app";
import { Header } from "../styles/layout/styles";
import Image from "next/image";
import logoImg from "../assets/Logo.svg";
import "../styles/main.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header>
        <Image
          src={logoImg}
          alt=""
        />
      </Header>
      <Component {...pageProps}/>
    </>
  );
}

export default MyApp;
