"use client";

import Image from "next/image";
import { CartItem, Image as ProductImage } from "@/utils/wooCommerceTypes";
import { useCart } from "@/context/CartContext";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Props {
   item: CartItem;
}

export const CartItemView = ({ item }: Props) => {
   const { removeFromCart, updateCartItemQuantity } = useCart();
   const productImage: ProductImage | undefined = item.product.images[0];

   const handleQuantityChange = (qty: number) => {
      const quantity = Number(qty);
      if (quantity >= 1) {
         updateCartItemQuantity(item.product.id, quantity);
      }
   };

   const handleRemoveClick = () => {
      removeFromCart(item.product.id);
   };

   return (
      <>
         <div className="flex p-2">
            <Image src={productImage.src} alt={item.product.name} width="50" height="50" />
            <div className="flex flex-col ml-5">
               <p>{item.product.name}</p>
               <div className="flex">
                  <button
                     type="button"
                     onClick={() => {
                        handleQuantityChange(item.quantity - 1);
                     }}
                  >
                     <MinusIcon className="h-6 w-6 mr-2" />
                  </button>
                  <p>{item.quantity}</p>
                  <button
                     type="button"
                     onClick={() => {
                        handleQuantityChange(item.quantity + 1);
                     }}
                  >
                     <PlusIcon className="h-6 w-6 ml-2" />
                  </button>

                  <p className="pl-16">
                     €{((item.product.price as unknown as number) * (item.quantity as number)).toFixed(2)}
                  </p>
                  <button type="button" onClick={handleRemoveClick}>
                     <TrashIcon className="w-6 h-6 ml-6" />
                  </button>
               </div>
            </div>
         </div>

         {/* <div>{JSON.stringify(item, null, 2)}</div> */}
      </>
   );
};
