import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
   apiVersion: "2023-10-16",
});

async function createShippingRate(displayName, amount) {
   try {
      const shippingRate = await stripe.shippingRates.create({
         display_name: displayName,
         type: "fixed_amount",
         fixed_amount: { amount: amount, currency: "eur" },
      });
      return shippingRate.id;
   } catch (error) {
      console.error("Error creating shipping rate:", error);
      throw error;
   }
}

export default async function handler(req, res) {
   if (req.method === "POST") {
      try {
         const { products, billing } = req.body;

         const billingInfoString = JSON.stringify(billing);
         const productDetails = JSON.stringify(
            products.map(({ product, quantity }) => ({
               id: product.id,
               name: product.name,
               price: product.price,
               quantity: quantity,
               maat: product.selectedAttributes.maat,
            }))
         );

         const lineItems = products.map((product) => {
            const price = parseFloat(product.product.price);
            const unitAmount = isNaN(price) ? 0 : Math.round(price * 100);

            return {
               price_data: {
                  currency: "eur",
                  product_data: {
                     name: product.product.name,
                     metadata: {
                        maat: product.product.selectedAttributes.maat,
                     },
                  },
                  unit_amount: unitAmount,
               },
               quantity: product.quantity,
            };
         });

         // Calculate cart total
         const cartTotalWithoutShipping = products.reduce(
            (total, product) => total + parseFloat(product.product.price) * product.quantity,
            0
         );

         const cartTotalInCents = Math.round(cartTotalWithoutShipping * 100);

         // Determine which shipping rate to use
         const shippingRateId =
            cartTotalWithoutShipping >= 50
               ? await createShippingRate("Free Shipping", 0)
               : await createShippingRate("Standard Shipping", 295);

         const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: "https://wp-headless-pi.vercel.app/bedankt",
            cancel_url: "https://wp-headless-pi.vercel.app",
            metadata: {
               billing_info: billingInfoString,
               productDetails: productDetails,
            },
            shipping_options: [
               {
                  shipping_rate: shippingRateId,
               },
            ],
            payment_method_configuration: "pmc_1PjLH7J1EDSVBNMysvQVadmS",
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
