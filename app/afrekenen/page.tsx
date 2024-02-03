"use client";
import React from "react";
import { CartView } from "@/components/Cart/CartView";
import { useCart } from "@/context/CartContext";

export default function Afrekenen() {
   const { cartItems, cartTotal } = useCart();

   return (
      <>
         <h1>Afrekenen</h1>

         <CartView />
      </>
   );
}
