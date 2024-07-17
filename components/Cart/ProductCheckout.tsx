"use client";
import { useCart } from "@/context/CartContext";
import { CheckoutView } from "./CheckoutView";
import { CheckIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export const ProductCheckout = () => {
   const { cartItems, cartTotal, shippingCost, isFreeShipping } = useCart();

   return (
      <>
         {cartItems.length === 0 ? (
            <p>Je hebt nog niets in je winkelwagen</p>
         ) : (
            <div className="lg:flex lg:justify-between">
               <div className="lg:w-3/4 lg:mr-4 lg:pb-0 pb-24">
                  {cartItems.map((item) => (
                     <div key={item.product.id}>
                        <CheckoutView item={item} />
                     </div>
                  ))}
               </div>

               <div className="shadow-md p-4 max-w-sm lg:w-1/2 lg:ml-4 border">
                  <p className="font-bold pb-4">Bezorging en service</p>

                  <div className="flex items-center pb-2">
                     <CheckIcon className="h-6 w-6 text-primary" />
                     <p className="pl-2">Voor 16:00 besteld morgen in huis</p>
                  </div>
                  <div className="flex items-center pb-2">
                     <CheckIcon className="h-6 w-6 text-primary" />
                     <p className="pl-2">14 dagen retourneren</p>
                  </div>
                  <div className="flex items-center pb-2">
                     <CheckIcon className="h-6 w-6 text-primary" />
                     <p className="pl-2">Gratis verzending boven de €50</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900 py-4">
                     <p>Bezorgkosten</p>
                     {isFreeShipping ? (
                        <div className="flex items-center ">
                           <p className="pl-2 text-green-500">Gratis</p>
                        </div>
                     ) : (
                        <div className="flex items-center">
                           <p className="pl-2">€{shippingCost.toFixed(2)}</p>
                        </div>
                     )}
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900 py-4">
                     <p>Totaalbedrag</p>
                     <p>€{cartTotal.toFixed(2)}</p>
                  </div>
                  <Link
                     href="/checkout/afrekenen"
                     className="block w-full bg-primary text-white text-center py-2 rounded-full"
                  >
                     Ik ga bestellen
                  </Link>
               </div>
            </div>
         )}
      </>
   );
};
