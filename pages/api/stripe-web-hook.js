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
   try {
      const stripeEvent = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      console.log("Received Stripe event: " + JSON.stringify(stripeEvent));

      res.status(200).json({ received: true });
   } catch (err) {
      console.log("Webhook Error: " + err.message);
      return res.status(400).json({ error: `Webhook Error: ${err.message}` });
   }
}
