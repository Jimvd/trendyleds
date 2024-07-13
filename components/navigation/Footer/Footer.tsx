import { BanknotesIcon, ChatBubbleBottomCenterTextIcon, TruckIcon } from "@heroicons/react/24/outline";

export default function Footer() {
   const ontdek = ["Producten", "Over ons"];
   const meerWeten = ["Levertijd", "FAQ"];
   const support = ["Installatiegids", "Contact", "Algemene voorwaarden", "Privacy Policy"];
   return (
      <>
         <div className="flex flex-col md:flex-row justify-around items-stretch text-center w-full p-8">
            <div className="max-w-xs mb-8 md:mb-0 flex-grow">
               <BanknotesIcon className="w-16 h-16 bg-gray-100 rounded-full p-4 mb-2 mx-auto" />
               <p className="text-lg font-bold mb-2">100% Geld terug</p>
               <p>
                  Mocht het zover komen, dan vinden we het jammer om je te zien vertrekken. En we zijn bliksemsnel met
                  je terugbetaling.
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
                  Onze premium support staat altijd klaar om je snel en deskundig te helpen. Ons team van experts staat
                  altijd voor u klaar.
               </p>
            </div>
         </div>
         <footer className="mt-14 bg-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
               <div>
                  <h2 className="text-xl mb-2 font-bold">TrendyLeds</h2>

                  <p className="text-sm md:text-base">
                     Trendyleds.nl is een nederlands bedrijf opgericht in 2020. Wij van trendyleds streven naar een
                     goede service.
                  </p>
               </div>
               <div>
                  <h2 className="text-xl font-bold">Ontdek</h2>
                  <ul className="text-sm md:text-base">
                     {ontdek.map((ontdek, index) => (
                        <li key={index} className="py-2">
                           {ontdek}
                        </li>
                     ))}
                  </ul>
               </div>
               <div>
                  <h2 className="text-xl font-bold">Meer weten</h2>
                  <ul className="text-sm md:text-base">
                     {meerWeten.map((meerWeten, index) => (
                        <li key={index} className="py-2">
                           {meerWeten}
                        </li>
                     ))}
                  </ul>
               </div>
               <div>
                  <h2 className="text-xl font-bold">Support</h2>
                  <ul className="text-sm md:text-base">
                     {support.map((support, index) => (
                        <li key={index} className="py-2">
                           {support}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </footer>
      </>
   );
}
