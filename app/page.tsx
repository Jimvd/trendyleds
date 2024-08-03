import ProductCard from "@/components/display/Card/productCard";
import HomepageBanner from "@/components/HomepageBanner/HomepageBanner";
import { fetchWooCommerceProducts } from "@/utils/wooCommerceApi";
import { Product } from "@/utils/wooCommerceTypes";
import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

export const metadata: Metadata = {
   title: "Trendyleds | Speciale led verlichting kopen?",
   description:
      "Ben jij op zoek naar speciale led verlichting? Maak jouw kamer bijzonder met onze programmeerbare LED-verlichting 100+ effecten en miljoenen kleuren. Ontdek nu ons assortiment en pimp jouw kamer!",
   alternates: {
      canonical: "https://www.trendyleds.nl",
   },
};

export default async function Home() {
   // Deze functie fetcht al je products, maar je moet hem nog wel destructuren (en ik heb hem een alias gegeven, i.p.v. "Data")
   const { data: products } = await fetchWooCommerceProducts();

   const sortedProducts = products.sort((a: any, b: any) => {
      const dateA = new Date(a.date_created).getTime();
      const dateB = new Date(b.date_created).getTime();
      return dateB - dateA;
   });

   const latestProducts = sortedProducts.slice(0, 4);

   return (
      <>
         <HomepageBanner />
         <div className="max-w-custom mx-auto grid grid-cols-1 gap-y-12 p-3 lg:p-0 lg:py-12">
            <div className="mx-auto text-center ">
               <h1 className="text-3xl font-semibold lg:text-3xl mt-12 tracking-wide">
                  Trendy Leds slimme led verlichting
               </h1>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:m-0 lg:grid-cols-4">
               {latestProducts.map((product: Product) => (
                  <div key={product.id}>
                     <ProductCard product={product} showAddToCart />
                  </div>
               ))}
            </div>
            <div className="mx-auto lg:text-center ">
               <h2 className="text-xl font-semibold  lg:text-3xl tracking-wide">
                  Een levendige lichtshow die je kamer transformeert
               </h2>
               <p className="text-base my-2">
                  Een slim, veelzijdig en kleurrijk lichtsysteem dat elke ruimte tot leven brengt
               </p>
            </div>

            <Suspense>
               <Image
                  src={"http://www.jpcms.nl/wp-content/uploads/2024/08/giphy-2.gif"}
                  className="aspect-video w-full lg:max-h-96"
                  height={480}
                  width={270}
                  alt={`trendy leds slimme led verlichting`}
                  unoptimized={true}
                  loading="lazy"
               />
            </Suspense>
         </div>
      </>
   );
}
