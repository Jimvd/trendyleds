import { Stripe } from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
   apiVersion: "2023-10-16",
});

export default async function POST(req) {
   const buf = req.body;
   const sig = req.headers["stripe-signature"];
   let event;
   try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
   } catch (err) {
      console.log(`Error: Stripe webhook failed: ${err.message}`);
      return NextResponse.json({ received: false, error: err.message }, { status: 400 });
   }
}
