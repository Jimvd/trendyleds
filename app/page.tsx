import ProductCard from "@/components/display/Card/productCard";
import SiteHeader from "@/components/navigation/MainMenu/navigation";
import { fetchWooCommerceProducts } from "@/utils/wooCommerceApi";
import { Product } from "@/utils/wooCommerceTypes";
import Link from "next/link";

interface Props {
   product: Product[];
}

export default async function Home() {
   // Deze functie fetcht al je products, maar je moet hem nog wel destructuren (en ik heb hem een alias gegeven, i.p.v. "Data")
   const { data: products } = await fetchWooCommerceProducts();

   return (
      <>
         <title>KKeijzer | Stijlvolle Dameskleding en Modetrends - Ontdek Onze Collectie</title>
         <meta
            name="description"
            content="Stijlvolle Dameskleding en Modetrends - Ontdek Onze Collectie"
            key="metadescription"
         />

         <div className="min-h-screen bg-[url('/storebanner.jpg')] relative ">
            <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>

            <SiteHeader />
            <main>
               <div className="min-h-[50vh] flex flex-col items-center justify-center z-10 relative">
                  <h1 className="text-4xl text-center text-slate-100">
                     <span className="text-pink-200">KKeijzer</span> Stijlvolle Trends voor elke gelegenheid
                  </h1>
                  <div className="mt-20">
                     <Link
                        href="/blog"
                        className="text-xl text-slate-100 py-3 px-4 bg-pink-400 hover:bg-white hover:text-black"
                     >
                        Lees het mode blog
                     </Link>
                  </div>
               </div>
            </main>
         </div>
      </>
   );
}
