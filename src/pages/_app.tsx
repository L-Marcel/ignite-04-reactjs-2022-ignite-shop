import { AppProps } from "next/app";
import "../styles/global.scss";
import { AppProvider } from "../context/providers/AppProvider";
import { Header } from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Header/>
      <Component {...pageProps}/>
    </AppProvider>
  );
}

export default MyApp;
