import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../src/services/stripe";

export default async function checkoutHandler(req: NextApiRequest, res: NextApiResponse) {
  const { defaultPriceId } = req.body;

  if(req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed."});
  } 

  if(!defaultPriceId) {
    return res.status(404).json({ error: "Price not found."});
  } 

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.PUBLIC_NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.PUBLIC_NEXT_URL}`,
    mode: "payment",
    line_items: [
      {
        price: defaultPriceId,
        quantity: 1
      }
    ]
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  });
}