import { Stripe } from "stripe";
import { buffer } from "micro";
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
   apiVersion: "2023-10-16",
});

export default async function POST(req) {
   const buf = await buffer(req);

   const sig = req.headers["stripe-signature"];
   let event;
   try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
   } catch (err) {
      console.log(`Error: Stripe webhook failed: ${err.message}`);
      return res.status(400).json({ received: false, error: err.message });
   }
   // Handle the event
   res.json({ received: true });
}
