import Image from "next/image";
import { stripe } from "../../../src/services/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "../../../src/styles/pages/product";
import { Formatter } from "../../../src/utils/formatter";
import { ProductType, getProducts } from "../../page";
import { Stripe } from "stripe";
import { BuyProductButton } from "../../../src/components/BuyProjectButton/index";

interface ProductPageProps {
  params: {
    id: string;
  }
}

export async function getProduct(id: string): Promise<ProductType> {
  const response = await stripe.products.retrieve(id, {
    expand: ["default_price"]
  });

  const price = response.default_price as Stripe.Price;

  const product = {
    id: response.id,
    name: response.name,
    imageUrl: response.images[0],
    description: response.description,
    price: Formatter.price((price.unit_amount as number)/100),
    defaultPriceId: price.id
  };

  return product;
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