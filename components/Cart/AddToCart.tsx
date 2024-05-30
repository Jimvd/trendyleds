"use client";
import { useCart } from "@/context/CartContext";
import { Product } from "@/utils/wooCommerceTypes";

export default function AddToCart({ product }: any) {
  const { addToCart } = useCart();

  const handleAddToCartClick = (product: Product) => {
    addToCart(product);
  };

  return (
    <button
      aria-label="Add item to cart"
      title="Add Item to Cart"
      className="w-full max-w-sm mt-4 py-2 px-8 rounded-lg hover:bg-[#d6c8af] bg-primary text-black"
      onClick={() => handleAddToCartClick(product)}
    >
      <span>In winkelwagen</span>
    </button>
  );
}
