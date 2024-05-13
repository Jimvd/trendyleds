import { Stripe } from "stripe";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
   apiVersion: "2023-10-16",
});
const webhookSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;
export const config = {
   api: {
      bodyParser: false,
   },
};
export default async function handler(req, res) {
   const buf = await buffer(req);
   const sig = req.headers["stripe-signature"];

   let stripeEvent;

   try {
      const payloadJson = JSON.parse(buf);
      stripeEvent = stripe.webhooks.constructEvent(payloadJson, sig, webhookSecret);
      console.log("Received Stripe event: " + JSON.stringify(stripeEvent));
   } catch (err) {
      console.log("Webhook Error: " + err.message);
      return res.status(400).json({ error: `Webhook Error: ${err.message}` });
   }

   res.send();
}
