import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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

export default function levertijd() {
   return (
      <>
         <div className="max-w-3xl mx-auto p-4 lg:p-0 mb-12">
            <h1 className="text-3xl font-bold text-center py-8 content-center">Levertijd</h1>
            <p className="my-4">
               Trendyleds is een nederlands bedrijf actief sinds 2021 met hun eigen geprogammeerde led strips.
            </p>
            <p>
               Wij versturen al onze producten vanuit eigen voorraad zelf en zijn geen dropshippers zoals vele in onze
               branche
            </p>

            <h2 className="text-xl font-bold my-6">Wat is jullie levertijd?</h2>
            <p>
               Ons doel is vandaag besteld, morgen in huis. Echter, kan dit soms mislopen. Daarom kunnen wij jou een
               levertijd garanderen van 1-3 dagen.
            </p>
            <h2 className="text-xl font-bold my-6">Waar versturen jullie de pakketen mee?</h2>
            <p>
               Wij versturen al onze paketten met postnl je ontvangt je track en trace zodra wij het pakket op de post
               hebben gedaan
            </p>
            <Image src="/postnl.png" width={150} height={150} alt="trendy leds bezorgt met postnl" className="my-5" />
            <h2 className="text-xl font-bold my-6">Vraag over je bestelling?</h2>
            <p className="my-6">
               Heb jij een vraag over je bestelling? onze{" "}
               <Link href="/contact" className="font-bold text-primary">
                  klantenservices
               </Link>{" "}
               helpt je graag!
            </p>
         </div>
      </>
   );
}
