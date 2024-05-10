// API code;
import Stripe from "stripe";

export default async function handler(req, res) {
   if (req.method === "POST") {
      try {
         const { products } = req.body;

         const lineItems = products.map((product) => {
            const price = parseFloat(product.product.price);
            const unitAmount = isNaN(price) ? 0 : Math.round(price * 100);

            return {
               price_data: {
                  currency: "eur",
                  product_data: {
                     name: product.product.name,
                  },
                  unit_amount: unitAmount,
               },
               quantity: product.quantity,
            };
         });

         const stripe = new Stripe(
            "sk_test_51Of5VfJ1EDSVBNMygEcy5o2iAexX2GeTKeKNjIvQ0dv2UGibZtFxq8HrGuTcjxW3P7GSSvMt6lljkJSOhuiLNzIY00JEI0qvmv",
            {
               apiVersion: "2020-08-27",
            }
         );

         const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/bedankt", // replace with your success URL
            cancel_url: "https://localhost:3000", // replace with your cancel URL
         });

         res.status(200).json({ id: session.id });
      } catch (error) {
         console.error("Error creating checkout session:", error);
         res.status(500).json({ error: "Error creating checkout session" });
      }
   } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end("Method Not Allowed");
   }
}
