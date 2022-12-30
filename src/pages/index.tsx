import "keen-slider/keen-slider.min.css";
import { Slider } from "../components/Slider";
import { ProductType, getProducts } from "../services/stripe";
import { GetStaticProps } from "next";
import Head from "next/head";

interface HomePageProps {
  products: ProductType[];
}

export default function HomePage({
  products
}: HomePageProps) {
  return (
    <>
      <Head>
        <title>Ignite Shop</title>
        <meta name="description" content="Uma aplicação que utiliza a API do Stripe para simular compras em um mercado virtual."/>
        <meta name="author" content="L-Marcel"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <Slider
        products={products}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async() => {
  const products = await getProducts();

  return {
    props: {
      products
    }
  };
};