import ProductCard from "@/components/display/Card/productCard";
import HomepageBanner from "@/components/HomepageBanner/HomepageBanner";
import { fetchWooCommerceProducts } from "@/utils/wooCommerceApi";
import { Product } from "@/utils/wooCommerceTypes";
import { BanknotesIcon, ChatBubbleBottomCenterTextIcon, TruckIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import Image from "next/image";

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
         <HomepageBanner mobileImg="/banners/trendyledsmobile.jpg" desktopImg="/banners/trendyledsdesktop.jpg" />

         <div className="max-w-custom mx-auto grid grid-cols-1 gap-y-12 p-3 lg:p-0 lg:py-12">
            <div className="mx-auto text-center ">
               <h1 className="text-3xl font-semibold lg:text-3xl mt-12 tracking-wide">
                  Trendy Leds slimme led verlichting
               </h1>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:m-0 lg:grid-cols-4 ">
               {latestProducts.map((product: Product) => (
                  <div key={product.id}>
                     <ProductCard product={product} />
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
            <Image
               src={"https://www.trendyleds.nl/wp-content/uploads/2022/09/giphy-kopie-4.gif"}
               className="aspect-video lg:max-h-96"
               layout={"responsive"}
               height={480}
               width={270}
               alt={`A cute animal!`}
               unoptimized={true}
            />
            <div className="flex flex-col md:flex-row justify-around items-stretch text-center w-full p-8">
               <div className="max-w-xs mb-8 md:mb-0 flex-grow">
                  <BanknotesIcon className="w-16 h-16 bg-gray-100 rounded-full p-4 mb-2 mx-auto" />
                  <p className="text-lg font-bold mb-2">100% Geld terug</p>
                  <p>
                     Mocht het zover komen, dan vinden we het jammer om je te zien vertrekken. En we zijn bliksemsnel
                     met je terugbetaling.
                  </p>
               </div>
               <div className="max-w-xs mb-8 md:mb-0 flex-grow">
                  <TruckIcon className="w-16 h-16 bg-gray-100 rounded-full p-4 mb-2 mx-auto" />
                  <p className="text-lg font-bold mb-2">Gratis verzending boven €50</p>
                  <p>Bestel zonder zorgen. Wij dekken de verzendkosten voor bestellingen boven de €50</p>
               </div>
               <div className="max-w-xs flex-grow">
                  <ChatBubbleBottomCenterTextIcon className="w-16 h-16 bg-gray-100 rounded-full p-4 mb-2 mx-auto" />
                  <p className="text-lg font-bold mb-2">Premium support</p>
                  <p>
                     Onze premium support staat altijd klaar om je snel en deskundig te helpen. Ons team van experts
                     staat altijd voor u klaar.
                  </p>
               </div>
            </div>
         </div>
      </>
   );
}
