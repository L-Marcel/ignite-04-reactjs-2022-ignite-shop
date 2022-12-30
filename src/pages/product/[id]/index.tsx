import Image from "next/image";
import { ProductType, getProduct, getProducts } from "../../../services/stripe";
import { ImageContainer, ImageTopRightCut, ProductContainer, ProductDetails } from "../../../styles/pages/product";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { useProducts } from "../../../context/hooks/useProducts";
import { Icon } from "../../../components/Icon";
import Link from "next/link";
import { IconButton } from "../../../components/IconButton";
import { Button } from "../../../components/Button";

export const getStaticPaths: GetStaticPaths = async() => {
  const products = await getProducts();

  return {
    paths: products.map(product => ({
      params: { id: product.id }
    })),
    fallback: "blocking"
  };
};

export default function ProductPage(product: ProductType) {
  const {
    name,
    imageUrl,
    formattedPrice,
    description
  } = product;

  const { addProductAmount } = useProducts();

  function handleOnAddProductInCart() {
    addProductAmount(product);
  }

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
          <ImageTopRightCut/>
          <Image 
            alt=""
            className="object-cover relative z-20"
            src={imageUrl}
            width={540}
            height={460}
          />
        </ImageContainer>

        <ProductDetails>
          <h1>{name}</h1>

          <span>{formattedPrice}</span>

          { !!description && <p>{description}</p> }

          <div className="flex items-center gap-5 w-full">
            <Link href="/" className="mt-5 text-3xl rounded-lg">
              <IconButton
                tabIndex={-1}
                icon="CaretLeft"
                size="big"
                iconProps={{
                  weight: "bold"
                }}
              />
            </Link>
            
            <Button onClick={handleOnAddProductInCart}>
              Colocar na sacola
            </Button>
          </div>
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