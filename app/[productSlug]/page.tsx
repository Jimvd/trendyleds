import React from "react";
import ProductHeader from "@/components/Product/ProductHeader";
import { fetchWooCommerceProductBySlug } from "@/utils/wooCommerceApi";

export async function generateMetadata({
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

   return {
      title: ` ${product.name} kopen? | Trendy Leds specialist`,
      description: `Bent je opzoek naar led verlichting? of wil je jou kamer meer sfeer geven? met de ${product.name} van trendy leds tover jij jouw kamer om tot een toffe plek!`,

      alternates: {
         canonical: `https://www.trendyleds.nl/led-verlichting/${params.productSlug}/`,
      },
      robots: {
         index: true,
         follow: true,
         googleBot: {
            index: true,
            follow: true,
         },
      },
   };
}

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
         <div className="pt-16 lg:py-16 bg-primary-lighter">
            <div className="mx-auto bg-white rounded-lg max-w-custom ">
               <ProductHeader product={product} />
            </div>
         </div>
      </>
   );
}
