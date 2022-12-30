import { Stripe } from "stripe";
import { Formatter } from "../utils/formatter";

export const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || "", {
  apiVersion: "2022-11-15",
  appInfo: {
    name: "Ignite Shop"
  },
});

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

export type SessionType = {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
};

export async function getSession(id: string): Promise<SessionType> {
  const response = await stripe.checkout.sessions.retrieve(String(id), {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = response.customer_details?.name as string;
  const product = response.line_items?.data[0].price?.product as Stripe.Product;
  
  return {
    customerName,
    product: {
      imageUrl: product.images[0],
      name: product.name
    }
  };
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