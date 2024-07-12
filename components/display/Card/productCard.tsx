import { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "../../../utils/wooCommerceTypes";
import Link from "next/link";
import AddToCart from "@/components/Cart/AddToCart";

interface Props {
   product: Product;
}

const ProductCard = (props: Props) => {
   const { product } = props;

   return (
      <div className="max-w-custom rounded-md shadow-md flex flex-col h-full">
         <Link href={`/${product.slug}`} className="flex-shrink-0">
            <div className="relative group aspect-square">
               {product.images && product.images.length > 0 ? (
                  <Image
                     src={product.images[0].src}
                     alt={product.images[0].alt}
                     layout="fill"
                     objectFit="cover"
                     className="rounded-t-md"
                  />
               ) : (
                  <Image src="/TrendyledsLogo.png" width={200} height={100} alt="Product binnenkort verkrijgbaar" />
               )}
            </div>
         </Link>
         <div className="flex-grow flex flex-col py-3 px-4">
            <div className="flex-1">
               <p className="lg:text-lg text-sm font-bold">{product.name}</p>
            </div>
            <div className="my-4">
               {product.sale_price ? (
                  <>
                     <span className="lg:text-lg text-md">€{product.sale_price}</span>
                     <span className="text-gray-400 font-normal pl-4 text-sm line-through">
                        €{product.regular_price}
                     </span>
                  </>
               ) : (
                  <span className="lg:text-lg text-md">€{product.price}</span>
               )}
            </div>
            <div>
               <AddToCart
                  product={product}
                  className="w-full text-center hover:bg-primary hover:font-bold hover:text-white border border-primary text-primary py-2 rounded-full mt-2"
                  text="Bestel Direct"
               />
            </div>
         </div>
      </div>
   );
};

export default ProductCard;
