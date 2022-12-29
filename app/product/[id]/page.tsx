import Image from "next/image";
import { getProduct, getProducts } from "../../../src/services/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "../../../src/styles/pages/product";
import { BuyProductButton } from "../../../src/components/BuyProjectButton/index";

interface ProductPageProps {
  params: {
    id: string;
  }
}

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map(product => ({
    id: product.id
  }));
}

export default async function ProductPage({ params: {
  id
}}: ProductPageProps) {
  const { imageUrl, price, name, description, defaultPriceId } = await getProduct(id);

  return (
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
  );
}