import { buffer } from "micro";
import axios from "axios";
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
   apiVersion: "2020-08-27",
});
const webhookSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;

export const config = {
   api: {
      bodyParser: false,
   },
};

const createOrder = async (orderData) => {
   try {
      const response = await axios.post("/api/createOrder", orderData);
      logger("Order created: " + JSON.stringify(response.data));
   } catch (error) {
      logger("Error creating order: " + error.message);
   }
};

const handler = async (req, res) => {
   if (req.method === "POST") {
      const buf = await buffer(req);
      const sig = req.headers["stripe-signature"];

      try {
         const stripeEvent = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
         logger("Received Stripe event: " + JSON.stringify(stripeEvent));

         if ("checkout.session.completed" === stripeEvent.type) {
            const session = stripeEvent.data.object;
            logger("Payment success: " + JSON.stringify(session));

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
                     product_id: 1, // Replace with your actual product ID
                     quantity: 2,
                  },
               ],
            };
            await createOrder(testData);

            res.json({ received: true });
         } else {
            res.setHeader("Allow", "POST");
            res.status(405).end("Method Not Allowed");
         }
      } catch (err) {
         logger("Webhook Error: " + err.message);
         res.status(400).send(`Webhook Error: ${err.message}`);
      }
   }
};

export default handler;
