import { buffer } from "micro";
import axios from "axios";
import { NextResponse } from "next/server";
const { Stripe } = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
   apiVersion: "2023-10-16",
});
const webhookSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;

export const config = {
   api: {
      bodyParser: false,
   },
};

const createOrder = async (orderData) => {
   try {
      const response = await axios.post("/createOrder", orderData);
      console.log("Order created: " + JSON.stringify(response.data));
   } catch (error) {
      console.log("Error creating order: " + error.message);
   }
};

export default async function POST(request) {
   const buf = await buffer(request);
   const sig = request.headers["stripe-signature"];

   try {
      const stripeEvent = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      console.log("Received Stripe event: " + JSON.stringify(stripeEvent));

      if ("checkout.session.completed" === stripeEvent.type) {
         const session = stripeEvent.data.object;
         console.log("Payment success: " + JSON.stringify(session));

         const testData = {
            payment_method: "bacs",
            payment_method_title: "Direct Bank Transfer",
            set_paid: true,
            billing: {
               first_name: "Jim",
               last_name: "Doe",
               address_1: "123 Main St",
               city: "Anytown",
               postcode: "12345",
               country: "US",
               email: "john.doe@example.com",
               phone: "123456789",
            },
            shipping: {
               first_name: "John",
               last_name: "Doe",
               address_1: "123 Main St",
               city: "Anytown",
               postcode: "12345",
               country: "US",
            },
            line_items: [
               {
                  product_id: 1,
                  quantity: 2,
               },
            ],
         };
         await createOrder(testData);

         return NextResponse.json({ received: true }, { status: 200 });
      } else {
         return NextResponse.error("Method Not Allowed", { status: 405 });
      }
   } catch (err) {
      console.log("Webhook Error: " + err.message);
      return NextResponse.error(`Webhook Error: ${err.message}`, { status: 400 });
   }
}
