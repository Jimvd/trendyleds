"use client";

import { useTransition } from "react";

export default function AddToCart() {
   const [isPending, startTransition] = useTransition();

   const handleAddToCartButton = () => {
      startTransition(() => {});
   };
   return (
      <button
         aria-label="Add item to cart"
         title="Add Item to Cart"
         disabled={isPending}
         className=" border  w-full max-w-sm mt-4 py-2 px-8 rounded-lg bg-primary text-white hover:bg-black hover:text-white"
         onClick={() => handleAddToCartButton}
      >
         <span>In winkelwagen</span>
      </button>
   );
}
