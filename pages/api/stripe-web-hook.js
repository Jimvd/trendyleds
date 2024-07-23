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

const createOrder = async (orderData) => {
   try {
      const response = await axios.post("https://jpcms.nl/wp-json/wc/v3/orders", orderData, {
         auth: {
            username: process.env.WOOCOMMERCE_KEY,
            password: process.env.WOOCOMMERCE_SECRET,
         },
      });

      console.log("Order created: " + JSON.stringify(response.data));
   } catch (error) {
      console.log("Error creating order: " + error.message);
   }
};

export default async function handler(req, res) {
   const buf = await buffer(req);
   const sig = req.headers["stripe-signature"];

   try {
      const payload = buf.toString();
      const stripeEvent = stripe.webhooks.constructEvent(payload, sig, webhookSecret);

      const metadata = stripeEvent.data.object.metadata;

      const billingInfo = JSON.parse(metadata.billing_info);
      const productInfo = JSON.parse(metadata.productDetails);

      const lineItems = productInfo.map((product) => ({
         product_id: product.id,
         quantity: product.quantity,
         meta_data: [
            {
               key: "maat",
               value: product.maat,
            },
         ],
      }));

      if (stripeEvent.type === "checkout.session.completed") {
         const orderData = {
            payment_method: "bacs",
            payment_method_title: "Direct Bank Transfer",
            set_paid: true,
            billing: {
               first_name: "John",
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
                  product_id: 30,
                  quantity: 2,
                  meta_data: [
                     {
                        key: "maat",
                        value: " m",
                     },
                  ],
               },
            ],
         };
         await createOrder(orderData);

         return res.status(200).json({ received: true });
      } else {
         return res.status(405).json({ error: "Method Not Allowed" });
      }
   } catch (err) {
      return res.status(400).json({ error: `Webhook Error: ${err.message}` });
   }
}
