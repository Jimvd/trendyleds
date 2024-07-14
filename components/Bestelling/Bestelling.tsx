"use client";
import React, { useState } from "react";
import axios from "axios";
import { useCart } from "@/context/CartContext";
import { CartView } from "../Cart/CartView";
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
   const { cartItems, clearCart } = useCart();

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

   const [billingInfo, setBillingInfo] = useState<BillingInfo>(initialBillingInfo);
   const [shippingInfo, setShippingInfo] = useState<BillingInfo>({
      ...billingInfo,
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setBillingInfo((prevInfo) => ({
         ...prevInfo,
         [name]: value,
      }));

      setShippingInfo((prevInfo) => ({
         ...prevInfo,
         [name]: value,
      }));
   };

   const createOrder = async (orderData: OrderData) => {
      try {
         const response = await axios.post("/api/createOrder", orderData);
         console.log("Order created:", response.data);
         setBillingInfo(initialBillingInfo);
         setShippingInfo(initialBillingInfo);

         clearCart();
         router.push("/bedankt");
      } catch (error) {
         console.error("Error creating order:", error);
      }
   };

   const makePayment = async () => {
      const stripe = await loadStripe(
         "pk_test_51Of5VfJ1EDSVBNMyfCVIoVLsN8nJG2V79rnQGYM5X4TWobhQYTu3Vm3yphyf5WHHIzCkXYgvUrsFhhqJ2fUnG8Ok00q7mOkWtY"
      );

      const body = {
         products: cartItems,
         billing: billingInfo,
         shipping: shippingInfo,
      };

      const headers = {
         "Content-Type": "application/json",
      };

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
      <div className="max-w-md mx-auto">
         <div className="mb-4">
            <label htmlFor="first_name" className="block text-gray-700">
               First Name
            </label>
            <input
               type="text"
               id="first_name"
               name="first_name"
               value={billingInfo.first_name}
               onChange={handleChange}
               className="border border-gray-300 p-2 w-full"
            />
         </div>
         <div className="mb-4">
            <label htmlFor="last_name" className="block text-gray-700">
               Last Name
            </label>
            <input
               type="text"
               id="last_name"
               name="last_name"
               value={billingInfo.last_name}
               onChange={handleChange}
               className="border border-gray-300 p-2 w-full"
            />
         </div>
         <div className="mb-4">
            <label htmlFor="address_1" className="block text-gray-700">
               Address
            </label>
            <input
               type="text"
               id="address_1"
               name="address_1"
               value={billingInfo.address_1}
               onChange={handleChange}
               className="border border-gray-300 p-2 w-full"
            />
         </div>
         <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700">
               City
            </label>
            <input
               type="text"
               id="city"
               name="city"
               value={billingInfo.city}
               onChange={handleChange}
               className="border border-gray-300 p-2 w-full"
            />
         </div>
         <div className="mb-4">
            <label htmlFor="postcode" className="block text-gray-700">
               Postcode
            </label>
            <input
               type="text"
               id="postcode"
               name="postcode"
               value={billingInfo.postcode}
               onChange={handleChange}
               className="border border-gray-300 p-2 w-full"
            />
         </div>
         <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700">
               Country
            </label>
            <input
               type="text"
               id="country"
               name="country"
               value={billingInfo.country}
               onChange={handleChange}
               className="border border-gray-300 p-2 w-full"
            />
         </div>
         <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
               Email
            </label>
            <input
               type="email"
               id="email"
               name="email"
               value={billingInfo.email}
               onChange={handleChange}
               pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
               className="border border-gray-300 p-2 w-full"
            />
         </div>
         <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">
               Phone
            </label>
            <input
               type="tel"
               id="phone"
               name="phone"
               value={billingInfo.phone}
               onChange={handleChange}
               pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
               className="border border-gray-300 p-2 w-full"
            />
         </div>
         <div className="my-12">
            <h2 className="my-4">Mijn bestelling:</h2>
            <CartView />
         </div>
         {/* <button onClick={handleClick} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Plaats bestelling
         </button> */}
         <button onClick={makePayment} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Plaats bestelling
         </button>
      </div>
   );
};

export default OrderButton;
