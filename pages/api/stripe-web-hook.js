const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
   apiVersion: "2023-10-16",
});

export async function POST(req) {
   const buf = await req.text();
   const sig = req.headers.get("stripe-signature");
   let event;
   try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
   } catch (err) {
      console.log(`Error: Stripe webhook failed: ${err.message}`);
      return NextResponse.json({ received: false, error: err.message }, { status: 400 });
   }
}
