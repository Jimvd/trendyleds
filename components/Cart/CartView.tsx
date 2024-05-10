"use client";

import { useCart } from "@/context/CartContext";
import { CartItemView } from "./CartItem";

export const CartView = () => {
   const { cartItems } = useCart();

   return (
      <>
         {cartItems.length === 0 ? (
            <p> Je hebt nog niks in je winkelwagen</p>
         ) : (
            <>
               {cartItems.map((item) => (
                  <div key={item.product.id}>
                     <CartItemView item={item} />
                  </div>
               ))}
            </>
         )}
      </>
   );
};
