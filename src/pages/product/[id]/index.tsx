import Image from "next/image";
import { ProductType, getProduct, getProducts } from "../../../services/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "../../../styles/pages/product";
import { BuyProductButton } from "../../../components/BuyProjectButton/index";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async() => {
  const products = await getProducts();

  return {
    paths: products.map(product => ({
      params: { id: product.id }
    })),
    fallback: "blocking"
  };
};

export default function ProductPage({
  name,
  defaultPriceId,
  imageUrl,
  price,
  description
}: ProductType) {
  return (
    <>
      <Head>
        <title>{`Ignite Shop | ${name}`}</title>
        <meta name="description" content={description || ""}/>
        <meta name="author" content="L-Marcel"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image 
            alt=""
            className="object-cover"
            src={imageUrl}
            width={540}
            height={460}
          />
        </ImageContainer>

        <ProductDetails>
          <h1>{name}</h1>
          <span>{price}</span>

          { !!description && <p>{description}</p> }

          <BuyProductButton
            defaultPriceId={defaultPriceId}
          />
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async({ params }) => {
  const product = await getProduct(String(params?.id));

  return {
    props: {
      ...product
    },
  };
};