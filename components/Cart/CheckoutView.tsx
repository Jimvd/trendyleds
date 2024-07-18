"use client";

import Image from "next/image";
import { CartItem, Image as ProductImage } from "@/utils/wooCommerceTypes";
import { useCart } from "@/context/CartContext";
import { XMarkIcon } from "@heroicons/react/16/solid";

interface Props {
   item: CartItem;
}

export const CheckoutView = ({ item }: Props) => {
   const { removeFromCart, updateCartItemQuantity } = useCart();
   const productImage: ProductImage | undefined = item.product.images[0];

   const handleRemoveClick = () => {
      removeFromCart(item.product.id);
   };

   const handleQuantityChange = (qty: number) => {
      const quantity = Number(qty);
      if (quantity >= 1) {
         updateCartItemQuantity(item.product.id, quantity);
      }
   };

   return (
      <>
         <div className="relative lg:flex p-4 shadow-md justify-between items-center">
            <div className="flex items-center">
               <Image src={productImage.src} alt={item.product.name} width="100" height="100" />
               <div className="flex flex-col p-4 flex-grow">
                  <p className="font-bold">{item.product.name}</p>
                  <div className="flex justify-between py-2">
                     <select
                        className="border rounded px-4"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(Number(e.target.value))}
                     >
                        {[...Array(10)].map((_, index) => (
                           <option key={index} value={index + 1}>
                              {index + 1}
                           </option>
                        ))}
                     </select>
                     <p>€{((item.product.price as unknown as number) * (item.quantity as number)).toFixed(2)}</p>
                  </div>
               </div>
            </div>
            <button
               type="button"
               onClick={handleRemoveClick}
               className="absolute top-2 right-2 lg:relative text-primary lg:text-base"
            >
               <span className="lg:hidden">
                  <XMarkIcon className="w-6 h-6" />
               </span>
               <span className="hidden lg:inline">Verwijder</span>
            </button>
         </div>
      </>
   );
};
