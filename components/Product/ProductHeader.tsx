"use client";
import AddToCart from "@/components/Cart/AddToCart";
import Accordion from "@/components/display/Accordion/Accordion";
import ImageCarousel from "@/components/display/ImageCarrousel/ImageCarrousel";
import ProductUsp from "@/components/display/ProductUsp/ProductUsp";
import VariantSelector from "@/components/display/VariantSelector/VariantSelector";
import { Product } from "@/utils/wooCommerceTypes";
import DangerouslyHTML from "../display/dangerouslyParagraf/DangerouslyHTML";
import React, { useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";
import postnl from "../../public/postnl.png";

interface ProductProps {
   product: Product;
}

export default function ProductHeader({ product }: ProductProps) {
   const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
   const [quantity, setQuantity] = useState<number>(1);

   const handleAttributesChange = (attributes: Record<string, string>) => {
      setSelectedAttributes(attributes);
   };

   const handleQuantityChange = (newQuantity: number) => {
      if (newQuantity >= 1) {
         setQuantity(newQuantity);
      }
   };

   const isOutOfStock = product.stock_status === "outofstock";

   return (
      <>
         <div className="p-4 grid grid-cols-1 gap-x-6 lg:grid-cols-2">
            <ImageCarousel images={product.images} />

            <div className="my-12">
               <h1 className="font-semibold capitalize tracking-wide text-2xl">{product.name}</h1>
               <p className="mb-8 lg:mb-6 mt-2 ">
                  {product.sale_price ? (
                     <>
                        <span className="text-xl text-black font-bold">€{product.sale_price}</span>
                        <span className="text-gray-400 font-normal pl-2 text-lg line-through">
                           €{product.regular_price}
                        </span>
                     </>
                  ) : (
                     `€${product.price}`
                  )}
               </p>
               <DangerouslyHTML content={product.short_description} classname="my-6 lg:my- " />
               <VariantSelector attributes={product.attributes} onAttributesChange={handleAttributesChange} />
               <div className="my-4 flex max-w-md justify-between items-center">
                  <label htmlFor="quantity" className="block text-sm font-bold mr-4">
                     Aantal
                  </label>
                  <div className="flex justify-center border rounded-md items-center">
                     <button
                        type="button"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="p-1 border-r"
                        disabled={isOutOfStock}
                     >
                        <MinusIcon className="h-6 w-6" />
                     </button>
                     <p className="mx-6 ">{quantity}</p>
                     <button
                        type="button"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="p-1 border-l"
                        disabled={isOutOfStock}
                     >
                        <PlusIcon className="h-6 w-6" />
                     </button>
                  </div>
               </div>
               <AddToCart
                  product={product}
                  selectedAttributes={selectedAttributes}
                  quantity={quantity}
                  className={`w-full max-w-md my-6 py-2 font-bold px-8 rounded-lg ${
                     isOutOfStock ? "bg-gray-400 cursor-not-allowed" : "bg-primary text-white hover:bg-black "
                  }`}
                  text={isOutOfStock ? "Uitverkocht" : "In winkelwagen"}
                  disabled={isOutOfStock}
               />
               <ProductUsp />
               <div className="mt-6 bg-white max-w-md">
                  {product.description && <Accordion title="Beschrijving" content={product.description} />}
                  <Accordion
                     title="Vandaag besteld morgen in huis"
                     content="Bestel vandaag en geniet morgen al van je Trendyleds verlichting! Wij verzenden met PostNL, zodat je bestelling snel en betrouwbaar bij jou thuis wordt afgeleverd. Ervaar het gemak en de snelheid van onze leveringsservice. Bestel nu en transformeer je ruimte met Trendyleds!"
                     image={postnl}
                  />
                  <Accordion
                     title="Installatiegids"
                     content={`Ontdek stap voor stap hoe je jouw Trendyleds eenvoudig kunt installeren met onze uitgebreide installatiegids. Klik hier voor de volledige handleiding: <a href="http://www.jpcms.nl/wp-content/uploads/2024/07/SP110E-TrendyLeds-gebruiksaanwijzing.pdf"><strong>TrendyLeds gebruiksaanwijzing.</strong></a>  Volg de instructies en geniet snel van de magie van onze LED-verlichting in jouw huis!`}
                  />
               </div>
            </div>
         </div>
      </>
   );
}
