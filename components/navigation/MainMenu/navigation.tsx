"use client";
import { Suspense, useState } from "react";
import { FiX } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { MENU_ITEMS } from "@/constants/navigation";
import Cart from "@/components/Cart";
import OpenCart from "../../Cart/OpenCart";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

interface MenuItem {
   label: string;
   path: string;
   subitems?: SubItem[];
}

interface SubItem {
   name: string;
   link?: string;
}

export default function SiteHeader() {
   const [menuOpen, setMenuOpen] = useState(false);
   const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

   const handleMenuToggle = () => {
      setMenuOpen(!menuOpen);
      setActiveAccordion(null);
      disableBodyScroll(!menuOpen);
   };

   const handleAccordionToggle = (index: number) => {
      setActiveAccordion(activeAccordion === index ? null : index);
   };

   const handleLinkClick = () => {
      if (menuOpen) {
         handleMenuToggle();
      }
   };
   const pathName = usePathname();

   if (pathName?.includes("afrekenen")) {
      return null;
   }

   return (
      <>
         <div className=" bg-primary text-white py-2 text-center">
            <span className="text-white font-bold lg:text-md text-sm">Gratis verzending boven de €50,- 🚚</span>
         </div>
         <header className="z-10 bg-white shadow-sm sticky top-0 lg:px-4 px-2 ">
            <div className="logo-area grid grid-cols-3 py-6 items-center">
               <div className="flex items-center lg:justify-center">
                  <nav className="w-full">
                     <div className="lg:hidden flex items-center">
                        <button onClick={handleMenuToggle}>
                           <Bars3Icon className="w-8 h-8" />
                        </button>
                     </div>

                     <span
                        className={menuOpen ? "fixed inset-0 bg-black bg-opacity-50 z-10" : "hidden"}
                        onClick={handleMenuToggle}
                     ></span>

                     {menuOpen && (
                        <>
                           <button
                              onClick={handleMenuToggle}
                              className="fixed items-center right-44 m-2 justify-center z-30 bg-white rounded-full p-2 "
                           >
                              <FiX className="text-3xl text-black" />
                           </button>
                        </>
                     )}

                     <ul
                        className={`${
                           menuOpen
                              ? "fixed bottom-0 left-0 w-full h-3/4 bg-white rounded-xl z-20 overflow-y-auto"
                              : "hidden"
                        } lg:grid  text-sm text-secondary font-medium lg:text-sm pt-4 lg:pt-0`}
                     >
                        <div className="lg:flex">
                           {MENU_ITEMS.map((item: MenuItem, index: number) => (
                              <li
                                 key={index}
                                 className="group relative"
                                 onMouseEnter={() => !menuOpen && handleAccordionToggle(index)}
                                 onMouseLeave={() => setActiveAccordion(null)}
                              >
                                 <div className={`px-3 justify-between flex py-2`}>
                                    <Link
                                       href={item.path}
                                       className="relative lg:text-sm text-2xl text-black font-bold after:content-[''] after:block after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-width after:duration-300 hover:after:w-full"
                                       onClick={handleLinkClick}
                                    >
                                       {item.label}
                                    </Link>
                                 </div>
                                 {activeAccordion === index && item.subitems && item.subitems.length > 0 && (
                                    <ul
                                       className={`p-4 lg:text-sm text-xs w-full flex-col space-y-2 lg:absolute lg:top-full lg:left-0 bg-white border-b-2 border-gray`}
                                    >
                                       {item.subitems.map((subitem, subindex) => (
                                          <li key={subindex}>
                                             {subitem.link ? (
                                                <Link href={subitem.link}>{subitem.name}</Link>
                                             ) : (
                                                <span>{subitem.name}</span>
                                             )}
                                          </li>
                                       ))}
                                    </ul>
                                 )}
                              </li>
                           ))}
                        </div>
                     </ul>
                  </nav>
               </div>
               <div className="flex justify-center">
                  <Link href="/">
                     <Image src="/TrendyledsLogo.png" alt="TrendyLeds slimme led strip" width={180} height={120} />
                  </Link>
               </div>
               <div className="flex justify-end">
                  <Suspense fallback={<OpenCart />}>
                     <Cart />
                  </Suspense>
               </div>
            </div>
         </header>
      </>
   );
}

// functions

const disableBodyScroll = (state: boolean) => {
   if (state) {
      document.documentElement.classList.add("overflow-y-hidden", "fixed", "w-full");
   } else {
      document.documentElement.classList.remove("overflow-y-hidden", "fixed", "w-full");
   }
};
