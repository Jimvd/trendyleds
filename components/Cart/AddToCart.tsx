"use client";
import { useCart } from "@/context/CartContext";
import { Product } from "@/utils/wooCommerceTypes";

interface Props {
   product: Product;
   className: string;
   text: string;
}

export default function AddToCart({ product, className, text }: Props) {
   const { addToCart } = useCart();

   const handleAddToCartClick = (product: Product) => {
      addToCart(product);
   };

   return (
      <button
         aria-label="Add item to cart"
         title="Add Item to Cart"
         className={className}
         onClick={() => handleAddToCartClick(product)}
      >
         <span>{text}</span>
      </button>
   );
}
