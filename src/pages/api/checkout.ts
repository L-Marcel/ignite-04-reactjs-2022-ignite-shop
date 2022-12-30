import { NextApiRequest, NextApiResponse } from "next";
import { CartProduct } from "../../context/providers/AppProvider";
import { stripe } from "../../services/stripe";

interface CheckoutHandlerParams {
  products: CartProduct;
}

export default async function checkoutHandler(req: NextApiRequest, res: NextApiResponse) {
  const { products } = req.body as CheckoutHandlerParams;

  if(req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed."});
  } 

  if(!products || !Array.isArray(products) || products?.length === 0) {
    return res.status(404).json({ error: "Not found."});
  } 

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.PUBLIC_NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.PUBLIC_NEXT_URL}`,
    mode: "payment",
    line_items: products.map((product: CartProduct) => {
      return {
        price: product.defaultPriceId,
        quantity: product.amount
      };
    })
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  });
}