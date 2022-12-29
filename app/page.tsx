import "keen-slider/keen-slider.min.css";
import { stripe } from "../src/services/stripe";
import { Stripe } from "stripe";
import { Slider } from "../src/components/Slider";
import { Formatter } from "../src/utils/formatter";

export type ProductType = {
  id: string;
  name: string;
  imageUrl: string;
  price: number | string;
  description?: string | null;
  defaultPriceId: string;
};

export async function getProducts(): Promise<ProductType[]> {
  const response = await stripe.products.list({
    expand: ["data.default_price"]
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;
    
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: Formatter.price((price.unit_amount as number)/100),
      defaultPriceId: price.id
    };
  });

  return products;
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <Slider
      products={products}
    />
  );
}