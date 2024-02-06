"use client";
import React, { useState } from "react";
import { CartView } from "@/components/Cart/CartView";

export default function Afrekenen() {
   const [checkoutData, setCheckoutData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      zip: "",
   });

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCheckoutData({ ...checkoutData, [name]: value });
   };

   const handleCheckout = async () => {
      try {
         // Verzend checkout-gegevens naar WooCommerce API
         const response = await fetch("https://jpcms.nl/wp-json/wc/v3/orders", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization:
                  "Basic " +
                  btoa("ck_adf1684906492020d1c1043d1566f142d6bcb99d:cs_b1b57d9876da7b127873e6a8062beb65e094d5cf"), // Vervang met je eigen WooCommerce API-sleutel en geheim
            },
            body: JSON.stringify({
               payment_method: "stripe",
               payment_method_title: "Credit Card",
               set_paid: true,
               billing: {
                  first_name: checkoutData.firstName,
                  last_name: checkoutData.lastName,
                  address_1: checkoutData.address,
                  city: checkoutData.city,
                  postcode: checkoutData.zip,
                  email: checkoutData.email,
               },
               line_items: [
                  {
                     product_id: 31,
                     quantity: 1,
                  },
               ],
            }),
         });

         const orderData = await response.json();

         console.log("WooCommerce Order Response:", orderData);
      } catch (error) {}
   };

   return (
      <>
         <div>
            <h1 className="text-3xl border-b text-center py-8 content-center">Checkout</h1>
            <div className="py-4">
               <CartView />
            </div>
            <form className="max-w-md mx-auto p-4">
               <label className="block mb-2">
                  <span className="text-gray-700">Voornaam:</span>
                  <input
                     className="w-full mt-1 p-2 border border-red-500 rounded"
                     type="text"
                     name="firstName"
                     value={checkoutData.firstName}
                     onChange={handleInputChange}
                  />
               </label>
               <label className="block mb-2">
                  <span className="text-gray-700">Achternaam:</span>
                  <input
                     className="w-full mt-1 p-2 border border-red-500 rounded"
                     type="text"
                     name="lastName"
                     value={checkoutData.lastName}
                     onChange={handleInputChange}
                  />
               </label>
               <label className="block mb-2">
                  <span className="text-gray-700">E-mail:</span>
                  <input
                     className="w-full mt-1 p-2 border border-red-500 rounded"
                     type="email"
                     name="email"
                     value={checkoutData.email}
                     onChange={handleInputChange}
                  />
               </label>
               <label className="block mb-2">
                  <span className="text-gray-700">Adres:</span>
                  <input
                     className="w-full mt-1 p-2 border border-red-500 rounded"
                     type="text"
                     name="address"
                     value={checkoutData.address}
                     onChange={handleInputChange}
                  />
               </label>
               <label className="block mb-2">
                  <span className="text-gray-700">Stad:</span>
                  <input
                     className="w-full mt-1 p-2 border border-red-500 rounded"
                     type="text"
                     name="city"
                     value={checkoutData.city}
                     onChange={handleInputChange}
                  />
               </label>
               <label className="block mb-2">
                  <span className="text-gray-700">Postcode:</span>
                  <input
                     className="w-full mt-1 p-2 border border-red-500 rounded"
                     type="text"
                     name="zip"
                     value={checkoutData.zip}
                     onChange={handleInputChange}
                  />
               </label>
               <button className="w-full mt-4 p-2 bg-primary text-white rounded" type="button" onClick={handleCheckout}>
                  Afrekenen
               </button>
            </form>
         </div>
      </>
   );
}
