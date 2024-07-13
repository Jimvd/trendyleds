import React from "react";
import ProductHeader from "@/components/Product/ProductHeader";
import RelatedProducts from "@/components/display/RelatedProducts/RelatedProducts";
import { fetchWooCommerceProductBySlug } from "@/utils/wooCommerceApi";

export default async function ProductBySlug({
   params,
}: {
   params: {
      productSlug: string;
   };
}) {
   const getProductData = async () => {
      const productSlug = params.productSlug;
      const productBySlug = await fetchWooCommerceProductBySlug(productSlug);

      return productBySlug;
   };

   const product = await getProductData();

   return (
      <>
         <div className="pt-16 bg-primary-lighter">
            <div className="m-auto p-4 bg-white shadow-sm rounded-lg max-w-custom ">
               <ProductHeader product={product} />
               {product.cross_sell_ids && product.cross_sell_ids.length > 0 && (
                  <RelatedProducts relatedProducts={product.cross_sell_ids} />
               )}
            </div>
         </div>
      </>
   );
}
