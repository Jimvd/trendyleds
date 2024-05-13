import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
   apiVersion: "2023-10-16",
});

const relevantEvents = new Set(["checkout.session.completed"]);

export default async function POST(req) {
   const body = await req.text();
   const sig = req.headers.get("stripe-signature");
   const webhookSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;
   let event;

   try {
      if (!sig || !webhookSecret) return new Response("Webhook secret not found.", { status: 400 });
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
      console.log(`🔔  Webhook received: ${event.type}`);
   } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
   }

   if (relevantEvents.has(event.type)) {
      try {
         switch (event.type) {
            case "checkout.session.completed":
               const checkoutSession = event.data.object;
               console.log(checkoutSession);
               break;
            default:
               throw new Error("Unhandled relevant event!");
         }
      } catch (error) {
         console.log(error);
         return new Response("Webhook handler failed. View your Next.js function logs.", {
            status: 400,
         });
      }
   } else {
      return new Response(`Unsupported event type: ${event.type}`, {
         status: 400,
      });
   }
   return new Response(JSON.stringify({ received: true }));
}
