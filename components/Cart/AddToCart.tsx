"use client";
import { useCart } from "@/context/CartContext";
import { Product } from "@/utils/wooCommerceTypes";

interface Props {
   product: Product;
   selectedAttributes?: Record<string, string>;
   quantity: number;
   className: string;
   text: string;
   disabled?: boolean;
}

export default function AddToCart({ product, selectedAttributes, quantity, className, text, disabled }: Props) {
   const { addToCart } = useCart();

   const handleAddToCartClick = (product: Product) => {
      if (disabled) return;

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
         disabled={disabled}
      >
         <span>{text}</span>
      </button>
   );
}
