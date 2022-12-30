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
  price: number;
  formattedPrice: string;
  description?: string | null;
  defaultPriceId: string;
};

export async function getProducts(): Promise<ProductType[]> {
  const response = await stripe.products.list({
    expand: ["data.default_price"]
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;
    const priceAmount = price.unit_amount as number;
    
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: priceAmount,
      formattedPrice: Formatter.price(priceAmount/100),
      defaultPriceId: price.id
    };
  });

  return products;
}

export type SessionType = {
  amount: number;
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[];
};

export async function getSession(id: string): Promise<SessionType> {
  const response = await stripe.checkout.sessions.retrieve(String(id), {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = response.customer_details?.name;

  let amount = 0;
  const products = response.line_items?.data.map((data) => {
    amount += (data.quantity || 1);
    const product = data.price?.product as Stripe.Product;

    return {
      imageUrl: product.images[0],
      name: product.name,
      id: product.id
    };
  });
  
  if(typeof products === "undefined" || typeof customerName === "undefined" || customerName === null) {
    throw new Error("Products or customer not found.");
  }

  return {
    customerName,
    products,
    amount
  };
}

export async function getProduct(id: string): Promise<ProductType> {
  const response = await stripe.products.retrieve(id, {
    expand: ["default_price"]
  });

  const price = response.default_price as Stripe.Price;
  const priceAmount = price.unit_amount as number;

  const product = {
    id: response.id,
    name: response.name,
    imageUrl: response.images[0],
    description: response.description,
    price: priceAmount,
    formattedPrice: Formatter.price(priceAmount/100),
    defaultPriceId: price.id
  };

  return product;
}