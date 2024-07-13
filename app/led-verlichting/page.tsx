import { Banner } from "@/components/Banner/Banner";
import ProductCard from "@/components/display/Card/productCard";
import { fetchWooCommerceProducts } from "@/utils/wooCommerceApi";
import { Product } from "@/utils/wooCommerceTypes";
import bannerMobile from "../../public/mobielvoorbeeld.webp";
import bannerDesktop from "../../public/collectievoorbeeld.webp";

interface Props {
   product: Product[];
}

export function generateMetadata() {
   return {
      title: `Led verlichting kopen? | Trendy Leds de specialist voor uw led`,
      description: `Bent u opzoek naar speciale led verlichting? Dan bent u bij trendy leds bij het juiste adres! | 1000 + kleuren | 120+ effecten | bluetooth app`,
      alternates: {
         canonical: `https://www.trendyleds.nl/led-verlichting/`,
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

export default async function Kleding() {
   const products = await fetchWooCommerceProducts();

   return (
      <>
         <Banner mobileImg={bannerMobile} desktopImg={bannerDesktop} priority={true} />
         <div className="mx-auto max-w-custom my-12 lg:px-0 px-4">
            <h1 className="font-semibold capitalize tracking-wide my-12 text-center text-secondary text-xl lg:text-2xl ">
               Alle led verlichting
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
               {products.data.map((product: Product) => (
                  <div key={product.id}>
                     <ProductCard product={product} />
                  </div>
               ))}
            </div>
         </div>
      </>
   );
}
