const stripe = require("stripe")(
   "sk_test_51Of5VfJ1EDSVBNMygEcy5o2iAexX2GeTKeKNjIvQ0dv2UGibZtFxq8HrGuTcjxW3P7GSSvMt6lljkJSOhuiLNzIY00JEI0qvmv"
);
const express = require("express");
const app = express();

const endpointSecret = "whsec_57cfc14853accbdfcef88d6d89bb785ebb863702523b5140a9b503d6abb72ef1";

app.use(express.json());

app.post("/webhook", async (request, response) => {
   const sig = request.headers["stripe-signature"];

   let event;

   try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
   } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
   }

   // Handle the event
   switch (event.type) {
      case "payment_intent.succeeded":
         const paymentIntentSucceeded = event.data.object;
         // Call the function to handle payment_intent.succeeded event
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

         const createOrder = async (orderData) => {
            try {
               const response = await axios.post("/createOrder", orderData);
               console.log("Order created: " + JSON.stringify(response.data));
            } catch (error) {
               console.log("Error creating order: " + error.message);
            }
         };

         await createOrder(testData);

         break;
      // ... handle other event types
      default:
         console.log(`Unhandled event type ${event.type}`);
   }

   // Return a 200 response to acknowledge receipt of the event
   response.json({ received: true });
});

app.listen(4242, () => console.log("Running on port 4242"));
