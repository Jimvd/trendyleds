"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import OpenCart from "../Cart/OpenCart";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { CartView } from "./CartView";
import { useCart } from "@/context/CartContext";

export default function CartModal() {
   const [openCart, setOpenCart] = useState(false);
   const { cartTotal, isFreeShipping, shippingCost, cartItems } = useCart(); // Assuming you have cartItems in your context

   const isEmptyCart = cartItems.length === 0;

   return (
      <>
         <button aria-label="Open cart" onClick={() => setOpenCart(true)}>
            <OpenCart />
         </button>
         <Transition.Root show={openCart} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setOpenCart(false)}>
               <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
               </Transition.Child>
               <div className="fixed inset-0 overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden">
                     <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <Transition.Child
                           as={Fragment}
                           enter="transform transition ease-in-out duration-500 sm:duration-700"
                           enterFrom="translate-x-full"
                           enterTo="translate-x-0"
                           leave="transform transition ease-in-out duration-500 sm:duration-700"
                           leaveFrom="translate-x-0"
                           leaveTo="translate-x-full"
                        >
                           <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                 <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                       <Dialog.Title className="text-lg font-medium text-gray-900">
                                          Winkelwagen
                                       </Dialog.Title>
                                       <div className="ml-3 flex h-7 items-center">
                                          <button
                                             type="button"
                                             className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                             onClick={() => setOpenCart(false)}
                                          >
                                             <span className="absolute -inset-0.5" />
                                             <span className="sr-only">Close panel</span>
                                             <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                          </button>
                                       </div>
                                    </div>
                                    <div className="mt-8">
                                       <div className="flow-root">
                                          <ul role="list" className="grid grid-cols-1 divide-y divide-gray-200">
                                             <CartView />
                                          </ul>
                                       </div>
                                    </div>
                                 </div>
                                 {!isEmptyCart && ( // Render only if cart is not empty
                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                       <div className=" justify-between text-base font-medium text-gray-900">
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
                                       </div>
                                       <p className="mt-0.5 text-sm text-gray-500">Vandaag besteld morgen in huis</p>
                                       <div className="mt-6">
                                          <a
                                             href="/winkelwagen"
                                             className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#d6c8af]"
                                          >
                                             Bestellen
                                          </a>
                                       </div>
                                       <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                          <p>
                                             <button
                                                type="button"
                                                className="font-medium text-black hover:text-sky-700 px-2"
                                                onClick={() => setOpenCart(false)}
                                             >
                                                Verder winkelen <span aria-hidden="true"> &rarr;</span>
                                             </button>
                                          </p>
                                       </div>
                                    </div>
                                 )}
                              </div>
                           </Dialog.Panel>
                        </Transition.Child>
                     </div>
                  </div>
               </div>
            </Dialog>
         </Transition.Root>
      </>
   );
}
