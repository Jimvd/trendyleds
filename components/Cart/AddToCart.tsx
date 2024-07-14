"use client";
import { useCart } from "@/context/CartContext";
import { Product } from "@/utils/wooCommerceTypes";

interface Props {
   product: Product;
   selectedAttributes?: Record<string, string>;
   quantity: number;
   className: string;
   text: string;
}

export default function AddToCart({ product, selectedAttributes, quantity, className, text }: Props) {
   const { addToCart } = useCart();

   const handleAddToCartClick = (product: Product) => {
      const productWithAttributes = {
         ...product,
         selectedAttributes,
         quantity,
      };
      addToCart(productWithAttributes);

      console.log("productWithAttributes", productWithAttributes);
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
