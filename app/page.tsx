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
   console.log(products);
   const selectedCategoryId = 18;

   const filteredProducts = products.filter((product: { categories: any[] }) => {
      return product.categories.some((category) => category.id === selectedCategoryId);
   });

   return (
      <>
         <title>KKeijzer | Stijlvolle Dameskleding en Modetrends - Ontdek Onze Collectie</title>
         <meta
            name="description"
            content="Stijlvolle Dameskleding en Modetrends - Ontdek Onze Collectie"
            key="metadescription"
         />

         <div className="min-h-screen relative ">
            <div className="top-bar bg-primary text-white py-2 text-center">
               <span className="text-white">★ Gratis verzending vanaf €75 in NL ★</span>
            </div>
            <SiteHeader />
            <main>
               <div className="min-h-[50vh] relative ">
                  <div className="bg-[url('/storebanner.jpg')] min-h-[50vh] bg-cover bg-center flex flex-col items-center justify-center  relative">
                     <h1 className="text-4xl text-center text-white">
                        <span className="text-primary">KKeijzer</span> Stijlvolle Trends voor elke gelegenheid
                     </h1>
                     <div className="mt-20">
                        <Link
                           href="/blog"
                           className="text-xl text-white py-3 px-4 bg-primary hover:bg-white hover:text-black"
                        >
                           Lees het mode blog
                        </Link>
                     </div>
                  </div>
               </div>
               <div className="mx-auto max-w-screen-xl ">
                  <h2 className="font-semibold capitalize tracking-wide my-12 text-center text-secondary text-xl lg:text-2xl ">
                     Nieuwste producten
                  </h2>
                  <div className="grid grid-cols-1 gap-3 lg:m-0 lg:grid-cols-3">
                     {filteredProducts.map((product: Product) => (
                        <div key={product.id} className="">
                           <ProductCard product={product} />
                        </div>
                     ))}
                  </div>
               </div>
            </main>
         </div>
      </>
   );
}
