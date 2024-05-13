import { Stripe } from "stripe";
import axios from "axios";
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
      const payload = buf.toString();
      const stripeEvent = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
      console.log("Received Stripe event: " + JSON.stringify(stripeEvent));

      if ("checkout.session.completed" === stripeEvent.type) {
         // Return the exact received payload as JSON response
         return res.status(200).send(payload);
      } else {
         return res.status(405).json({ error: "Method Not Allowed" });
      }
   } catch (err) {
      console.log("Webhook Error: " + err.message);
      return res.status(400).json({ error: `Webhook Error: ${err.message}` });
   }
}
