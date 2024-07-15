import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
   title: "Over ons | trendy leds led verlichting",
   description:
      "Trendyleds is een Nederlands bedrijf dat is opgericht in 2021. Begonnen met hun zelf geprogrammeerde en ontwikkelde ledstrip, die zei verstuurde vanuit hun bedrijspand in Nederland. ",
   alternates: {
      canonical: "https://www.trendyleds.nl/over-ons/",
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

export default function OverOns() {
   return (
      <>
         <div className="max-w-3xl mx-auto p-4 lg:p-0  ">
            <h1 className="text-3xl font-bold text-center py-8 content-center">Over Trendy leds</h1>
            <div className=" items-center ">
               <p className="lg:p-4">
                  Trendyleds is een Nederlands bedrijf dat is opgericht in 2021. Onze reis begon met een
                  zelfgeprogrammeerde en ontwikkelde ledstrip, een product dat we met trots vanuit ons eigen
                  bedrijfspand verstuurden. Deze ledstrip was het resultaat van passie, innovatie en de wens om iets
                  unieks op de markt te brengen. Tot heden staat er een mooie collectie aan geprogrammeerde en smart led
                  verlichting klaar die je de volgende dag in huis kunt hebben!
               </p>
               <Image
                  src="/banner-duo.png"
                  width={500}
                  height={500}
                  alt="trendy leds bezorgt met postnl"
                  className="my-8 mx-auto"
               />
            </div>
         </div>
      </>
   );
}
