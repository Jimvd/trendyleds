import React from "react";
import axios from "axios";

interface OrderItem {
   product_id: number;
   quantity: number;
}

interface OrderData {
   payment_method: string;
   payment_method_title: string;
   set_paid: boolean;
   billing: {
      first_name: string;
      last_name: string;
      address_1: string;
      city: string;
      postcode: string;
      country: string;
      email: string;
      phone: string;
   };
   shipping: {
      first_name: string;
      last_name: string;
      address_1: string;
      city: string;
      postcode: string;
      country: string;
   };
   line_items: OrderItem[];
}

const createOrder = async (orderData: OrderData) => {
   try {
      const response = await axios.post("/api/createOrder", orderData);
   
   } catch (error) {
      console.error("Error creating order:", error);
   }
};

const testData: OrderData = {
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

const OrderButton: React.FC = () => {
   const handleClick = () => {
      createOrder(testData);
   };

   return <button onClick={handleClick}>Create Order</button>;
};

export default OrderButton;
