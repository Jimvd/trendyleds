"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

interface OrderItem {
   product_id: number;
   quantity: number;
}

interface BillingInfo {
   first_name: string;
   last_name: string;
   address_1: string;
   city: string;
   postcode: string;
   country: string;
   email: string;
   phone: string;
}

interface OrderData {
   payment_method: string;
   payment_method_title: string;
   set_paid: boolean;
   billing: BillingInfo;
   shipping: BillingInfo;
   line_items: OrderItem[];
}

const OrderButton: React.FC = () => {
   const router = useRouter();
   const { cartItems, clearCart, isFreeShipping, shippingCost } = useCart();

   const initialBillingInfo: BillingInfo = {
      first_name: "",
      last_name: "",
      address_1: "",
      city: "",
      postcode: "",
      country: "",
      email: "",
      phone: "",
   };

   const [shippingInfo, setShippingInfo] = useState<BillingInfo>({
      ...initialBillingInfo,
   });

   const [errors, setErrors] = useState<Partial<BillingInfo>>({});
   const [billingInfo, setBillingInfo] = useState<BillingInfo>({
      ...initialBillingInfo,
      country: "Nederland",
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setBillingInfo((prevInfo) => ({
         ...prevInfo,
         [name]: value,
      }));

      setShippingInfo((prevInfo) => ({
         ...prevInfo,
         [name]: value,
      }));

      setErrors((prevErrors) => ({
         ...prevErrors,
         [name]: undefined,
      }));
   };

   const validateInputs = () => {
      const newErrors: Partial<BillingInfo> = {};
      Object.entries(billingInfo).forEach(([key, value]) => {
         if (value === undefined || (key !== "country" && key !== "phone" && !value)) {
            newErrors[key as keyof BillingInfo] = "Verplicht veld";
         }
      });
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const makePayment = async () => {
      if (!validateInputs()) {
       
         return;
      }

      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

      if (!publishableKey) {
         throw new Error("Stripe publishable key is not defined in environment variables.");
      }

      const stripe = await loadStripe(publishableKey);

      const body = {
         products: cartItems,
         billing: billingInfo,
         shipping: shippingInfo,
      };

      const headers = {
         "Content-Type": "application/json",
      };

      clearCart();

      try {
         const response = await fetch(`api/create-checkout-session`, {
            method: "post",
            headers: headers,
            body: JSON.stringify(body),
         });

         const session = await response.json();

         const result = stripe?.redirectToCheckout({
            sessionId: session.id,
         });
      } catch (error) {
         console.error("Error making payment:", error);
      }
   };

   return (
      <div className="max-w-lg mx-auto h-full bg-white rounded-lgshadow-sm lg:p-8 p-4">
         <h1 className="text-lg py-4 font-bold">Contact</h1>
         <div className="mb-4">
            <input
               type="email"
               id="email"
               name="email"
               placeholder="Email"
               value={billingInfo.email}
               onChange={handleChange}
               pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
               className="border border-gray-300 p-3 w-full rounded-lg"
            />
         </div>

         {errors.email && <p className="text-red-500">{errors.email}</p>}

         <h2 className="text-lg py-4 font-bold">Bezorging</h2>
         <div className="mb-4">
            <select
               id="country"
               name="country"
               value={billingInfo.country}
               onChange={handleChange}
               className="border border-gray-300 p-3 w-full rounded-lg"
            >
               <option value="Nederland">Nederland</option>
               <option value="België">België</option>
            </select>
         </div>

         <div className="mb-4">
            <input
               type="text"
               id="first_name"
               name="first_name"
               placeholder="Voornaam"
               value={billingInfo.first_name}
               onChange={handleChange}
               className="border border-gray-300 p-3 w-full rounded-lg"
            />
         </div>

         {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}

         <div className="mb-4">
            <input
               type="text"
               id="last_name"
               name="last_name"
               placeholder="Achternaam"
               value={billingInfo.last_name}
               onChange={handleChange}
               className="border border-gray-300 p-3 w-full rounded-lg"
            />
         </div>

         {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}

         <div className="mb-4">
            <input
               type="text"
               id="address_1"
               name="address_1"
               placeholder="Adress"
               value={billingInfo.address_1}
               onChange={handleChange}
               className="border border-gray-300 p-3 w-full rounded-lg"
            />
         </div>

         {errors.address_1 && <p className="text-red-500">{errors.address_1}</p>}

         <div className="mb-4">
            <input
               type="text"
               id="postcode"
               name="postcode"
               placeholder="Postcode"
               value={billingInfo.postcode}
               onChange={handleChange}
               className="border border-gray-300 p-3 w-full rounded-lg"
            />
         </div>

         {errors.postcode && <p className="text-red-500">{errors.postcode}</p>}

         <div className="mb-4">
            <input
               type="text"
               id="city"
               name="city"
               placeholder="Stad"
               value={billingInfo.city}
               onChange={handleChange}
               className="border border-gray-300 p-3 w-full rounded-lg"
            />
         </div>
         {errors.city && <p className="text-red-500">{errors.city}</p>}

         <div className="mb-4">
            <input
               type="tel"
               id="phone"
               name="phone"
               placeholder="Telefoon"
               value={billingInfo.phone}
               onChange={handleChange}
               pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
               className="border border-gray-300 p-3 w-full rounded-lg"
            />
         </div>
         <h2 className="text-lg py-4 font-bold">Verzending</h2>
         <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
            <div className="flex items-center">
               <input type="radio" name="shipping_methods" className="mr-2" checked disabled />
               <label data-option-selected="true" className="cursor-pointer">
                  <div className="flex items-center">
                     <p className="text-sm">Standaard Postnl (1-3 Werkdagen)</p>
                  </div>
               </label>
            </div>
            <div>
               {isFreeShipping ? (
                  <div className="flex items-center ">
                     <p className="pl-2 text-green-500">Gratis</p>
                  </div>
               ) : (
                  <div className="flex items-center">
                     <p className="pl-2">€{shippingCost.toFixed(2)}</p>
                  </div>
               )}
            </div>
         </div>
         <div className="py-12">
            <button
               onClick={makePayment}
               type="submit"
               className="bg-primary text-white font-bold py-2 px-4  w-full rounded-full  hover:bg-black"
            >
               Naar betalen
            </button>
         </div>
      </div>
   );
};

export default OrderButton;
