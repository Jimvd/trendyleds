export default function Footer() {
   const ontdek = ["Producten", "Over ons"];
   const meerWeten = ["Levertijd", "FAQ"];
   const support = ["Installatiegids", "Contact", "Algemene voorwaarden", "Privacy Policy"];
   return (
      <footer className="mt-14 bg-black text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
               <h2 className="text-xl mb-2 font-bold">TrendyLeds</h2>

               <p className="text-sm md:text-base">
                  Trendyleds.nl is een nederlands bedrijf opgericht in 2020. Wij van trendyleds streven naar een goede
                  service.
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
   );
}
