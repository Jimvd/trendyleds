import { Stripe } from "stripe";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
   apiVersion: "2023-10-16",
});
const webhookSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;

export async function POST(req, res) {
   if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
   }

   const sig = req.headers["stripe-signature"];
   if (!sig) {
      return res.status(400).json({ error: "Missing Stripe Signature" });
   }

   const buf = await buffer(req);
   try {
      const payload = buf.toString();
      const stripeEvent = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
      console.log("Received Stripe event: " + JSON.stringify(stripeEvent));

      if (stripeEvent.type === "checkout.session.completed") {
         // Handle completed checkout session event
         // Here you can implement your own logic
         return res.status(200).json({ received: true });
      } else {
         return res.status(200).json({ received: false });
      }
   } catch (err) {
      console.error("Webhook Error:", err.message);
      return res.status(400).json({ error: `Webhook Error: ${err.message}` });
   }
}
