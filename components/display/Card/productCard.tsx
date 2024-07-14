import { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "../../../utils/wooCommerceTypes";
import Link from "next/link";
import AddToCart from "@/components/Cart/AddToCart";

interface Props {
   product: Product;
   showAddToCart?: boolean;
}

const ProductCard = (props: Props) => {
   const { product, showAddToCart } = props;

   return (
      <div className="max-w-custom rounded-md shadow-md flex flex-col h-full">
         <Link href={`/${product.slug}`} className="flex-shrink-0">
            <div className="relative group aspect-square">
               {product.images && product.images.length > 0 ? (
                  <Image
                     src={product.images[0].src}
                     alt={product.images[0].alt}
                     objectFit="cover"
                     className="rounded-t-md"
                     height={1000}
                     width={1000}
                  />
               ) : (
                  <Image src="/TrendyledsLogo.png" width={200} height={100} alt="Product binnenkort verkrijgbaar" />
               )}
            </div>

            <div className="flex-grow flex flex-col py-3 px-4">
               <div className="flex-1">
                  <p className="text-lg font-bold h-12 overflow-hidden line-clamp-2">{product.name}</p>
               </div>
               <div className="my-4">
                  {product.sale_price ? (
                     <>
                        <span className="text-lg ">€{product.sale_price}</span>
                        <span className="text-gray-400 font-normal pl-4 text-sm line-through">
                           €{product.regular_price}
                        </span>
                     </>
                  ) : (
                     <span className="text-lg">€{product.price}</span>
                  )}
               </div>
            </div>

            {showAddToCart && (
               <div className="mt-auto mx-4 my-4">
                  <p className="w-full text-center hover:bg-primary hover:font-bold hover:text-white border border-primary text-primary py-2 rounded-full mt-2">
                     Bestel direct
                  </p>
               </div>
            )}
         </Link>
      </div>
   );
};

export default ProductCard;
