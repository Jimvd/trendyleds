import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
   title: "Installatiegids | trendy leds led verlichting",
   description:
      "Ontdek met onze installatiegids hoe je eenvoudig en snel een trendy leds led strip installeert. Creëer de perfecte sfeer in jouw kamer met onze handige tips!",
   alternates: {
      canonical: "https://www.trendyleds.nl/installatiegids/",
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

export default function installatiegids() {
   return (
      <>
         <div className="max-w-3xl mx-auto p-4 lg:p-0 mb-12">
            <h1 className="text-3xl font-bold text-center py-8 content-center">Installatiegids</h1>
            <p>Installatiegids voor de TrendyLeds SP110E Bluetooth led strip </p>
            <p className="my-4">
               Hieronder vind je een gebruikershandleiding om je op weg te helpen met het installeren van jou trendy
               leds led strip
            </p>
            <h2 className="text-xl font-bold my-6">Stap 1: Meet de lengte</h2>
            <ul className="list-disc list-outside ml-4 text-left">
               <li className="mb-4">
                  Gebruik een meetlint om de lengte van het oppervlak te meten waar je de LED-strip wilt installeren.
               </li>
               <li>
                  Noteer deze afmeting en knip de LED-strip op maat als dat nodig is. Knip alleen op de daarvoor
                  gemarkeerde punten op de strip.
               </li>
            </ul>

            <h2 className="text-xl font-bold my-6">Stap 2: Kies de locatie voor jou led strip</h2>
            <p>
               Bepaal de exacte plek waar de LED-strip moet komen. Zorg ervoor dat de strip in een rechte lijn kan
               worden bevestigd en dat er een stopcontact in de buurt is voor de voedingsadapter.
            </p>
            <p className="font-bold my-2">
               Let op! zorg ervoor dat je de led strip in de rechte lijn plaats mocht hij stuk gaan bij een andere
               constructie door bochten etc dan is dit je eigen verantwoording!
            </p>

            <h2 className="text-xl font-bold my-6">Stap 3: Reinig en droog het oppervlak</h2>
            <ul className="list-disc list-outside ml-4 text-left">
               <li className="mb-4">
                  Gebruik alcohol of een ander reinigingsmiddel en een doek om het oppervlak waar de LED-strip wordt
                  bevestigd goed te reinigen. Dit verwijdert stof, vet en vuil, wat essentieel is voor een goede
                  hechting.
               </li>
               <li>Zorg ervoor dat het oppervlak volledig droog is voordat je verdergaat met de volgende stap.</li>
            </ul>

            <h2 className="text-xl font-bold my-6">Stap 4: Bevestigen van de LED-strip</h2>
            <ul className="list-disc list-outside ml-4 text-left">
               <li className="mb-4">
                  Verwijder de beschermlaag: verwijder de zelfklevende achterkant voorzichtig om de kleefstrip bloot te
                  leggen.
               </li>
               <li>
                  Begin aan één uiteinde en druk de LED-strip stevig op het oppervlak waar je de led strip wilt
                  plaatsen. Werk langzaam naar het andere uiteinde toe, waarbij je ervoor zorgt dat de strip recht en
                  stevig vastzit.
               </li>
               <li className="mb-4">Druk de strip stevig aan om ervoor te zorgen dat deze goed hecht</li>
            </ul>

            <h2 className="text-xl font-bold my-6">Stap 5: Aansluiten van de Led strip</h2>
            <ul className="list-disc list-outside ml-4 text-left">
               <li className="mb-4">
                  Verbind de voedingsadapter met de LED-strip en steek de adapter in het stopcontact.
               </li>
               <li className="mb-4">Ga naar de app store of goole play store en download de Led hue app</li>
               <li className="mb-4">
                  Zorg ervoor dat je jouw bluetooth aan hebt staan open de app en selecteer de sp110e
               </li>
            </ul>

            <p>
               Gefeliciteerd! Je LED-strip is nu geïnstalleerd en klaar voor gebruik. Veel plezier met je nieuwe
               verlichting!
            </p>

            <p className="my-6">
               Kom jij er niet uit met de installatie van de led strip? dan helpen wij je graag! neem contact op met
               onze{" "}
               <Link href="/contact" className="font-bold text-primary">
                  Klantenservices
               </Link>
            </p>
         </div>
      </>
   );
}
