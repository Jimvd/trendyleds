import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface BannerProps {
   mobileImg: string;
   desktopImg: string;
}

export default function HomepageBanner({ mobileImg, desktopImg }: BannerProps) {
   return (
      <div className="relative">
         <picture>
            <source media="(max-width: 767px)" srcSet={mobileImg} width="430" height="413" />
            <source media="(min-width: 768px)" srcSet={desktopImg} width="1920" height="850" />
            <img
               src={mobileImg}
               alt="Trendy LEDs Banner"
               className="aspect-video rounded-lg bg-gray-100 w-full h-[40vh] lg:h-[75vh]"
            />
         </picture>

         {/* Desktop in de banner */}
         <div className="absolute hidden top-0 w-full h-full lg:flex flex-col justify-center items-center text-center lg:text-left lg:items-start lg:pl-20 lg:py-20">
            <div className="shadow-md lg:shadow-none py-8 lg:py-0 text-center lg:text-left flex flex-col items-center lg:items-start bg-white bg-opacity-75 lg:bg-opacity-0 lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none">
               <h2 className="font-bold text-2xl lg:text-4xl text-center lg:text-left">
                  Geef jouw kamer een unieke uitstraling
               </h2>
               <div className="flex justify-center lg:justify-start items-center my-6 max-w-sm lg:max-w-none">
                  <CheckBadgeIcon className="h-7 w-7" />
                  <p className="text-sm font-bold mx-1">120+ effecten</p>
                  <CheckBadgeIcon className="h-7 w-7" />
                  <p className="text-sm font-bold mx-1">Bluetooth app</p>
                  <CheckBadgeIcon className="h-7 w-7 mx-1 " />
                  <p className="text-sm font-bold">1000+ kleuren</p>
               </div>
               <Link
                  href="/"
                  className="bg-black text-white font-bold h-12 w-64 rounded-full flex items-center justify-center"
               >
                  Maak mijn kamer uniek
               </Link>
            </div>
         </div>

         {/* Mobiel onder de banner */}
         <div className="shadow-md lg:hidden py-8 text-center flex flex-col items-center">
            <h1 className=" font-bold text-2xl text-center">Geef jouw kamer een unieke uitstraling</h1>
            <div className="flex justify-center items-center my-6 max-w-sm">
               <CheckBadgeIcon className="h-6 w-6" />
               <p className="text-xs font-bold mx-1">120+ effecten</p>
               <CheckBadgeIcon className="h-6 w-6" />
               <p className="text-xs font-bold">Bluetooth app</p>
               <CheckBadgeIcon className="h-6 w-6 mx-1" />
               <p className="text-xs font-bold">1000+ kleuren</p>
            </div>
            <Link
               href="/"
               className="bg-black text-white font-bold h-12 w-64 rounded-full flex items-center justify-center "
            >
               Maak mijn kamer uniek
            </Link>
         </div>
      </div>
   );
}
