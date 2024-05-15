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

const removeCartFromLocalStorage = () => {
   localStorage.removeItem("cart");
};

const createOrder = async (orderData) => {
   try {
      const response = await axios.post("https://jpcms.nl/wp-json/wc/v3/orders", orderData, {
         auth: {
            username: process.env.WOOCOMMERCE_KEY,
            password: process.env.WOOCOMMERCE_SECRET,
         },
      });
      removeCartFromLocalStorage();

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
      }));

      if ("checkout.session.completed" === stripeEvent.type) {
         const orderData = {
            payment_method: "stripe",
            payment_method_title: "Stripe",
            set_paid: true,
            billing: {
               first_name: billingInfo.first_name,
               last_name: billingInfo.last_name,
               address_1: billingInfo.address_1,
               city: billingInfo.city,
               postcode: billingInfo.postcode,
               country: billingInfo.country,
               email: billingInfo.email,
               phone: billingInfo.phone,
            },
            shipping: {
               first_name: billingInfo.first_name,
               last_name: billingInfo.last_name,
               address_1: billingInfo.address_1,
               city: billingInfo.city,
               postcode: billingInfo.postcode,
               country: billingInfo.country,
            },
            line_items: lineItems,
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
