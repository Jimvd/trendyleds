import { ProductCheckout } from "@/components/Cart/ProductCheckout";
import { CheckBadgeIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Levertijd | trendy leds led verlichting",
   description:
      "Benieuwd naar de levertijd van je led strip? Wij streven ernaar om je product de volgende dag te bezorgen. Bestel vandaag en geniet morgen al van je nieuwe verlichting!",
   alternates: {
      canonical: "https://www.trendyleds.nl/levertijd/",
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

export default function winkelwagen() {
   return (
      <>
         <div className="max-w-5xl mx-auto p-4 lg:p-0 mb-12">
            <h1 className="text-3xl font-bold text-center lg:text-left py-8">Winkelwagen</h1>

            <ProductCheckout />
         </div>
      </>
   );
}
