"use client";
import { useCart } from "@/context/CartContext";
import { CartItemView } from "./CartItem";

export const CartView = () => {
   const { cartItems } = useCart();

   return (
      <>
         {/* <div>{JSON.stringify(cartItems, null, 2)}</div> */}
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
