"use client";
import { Suspense, useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { MENU_ITEMS } from "@/constants/navigation";
import Cart from "@/components/Cart";
import OpenCart from "../../Cart/OpenCart";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    setActiveAccordion(null);
  };

  const handleAccordionToggle = (index: any) => {
    if (!menuOpen) {
      setActiveAccordion(activeAccordion === index ? null : index);
    }
  };

  const handleChevronToggle = (index: any) => {
    if (menuOpen) {
      setActiveAccordion(activeAccordion === index ? null : index);
    }
  };

  return (
    <header className="z-10 bg-white sticky top-0 max-w-full mo:flex items-center lg:border-b-2 border-gray justify-between container mx-auto">
      <div
        className={`logo-area ${
          menuOpen ? "hidden" : "grid grid-cols-3 py-2 items-center"
        }`}
      >
        <div className="col-span-1">{}</div>
        <div className="col-span-1 flex justify-center">
          <Link href="/" className="">
            <Image
              src="/mrslovely.png"
              alt="MrsLovely dameskleding"
              width={180}
              height={120}
            />
          </Link>
        </div>
        <div className="col-span-1 flex justify-end">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>

      <div
        className={` flex lg:border-t-2 lg:py-4 lg:border-gray items-center justify-end mr-4 lg:justify-center`}
      >
        <nav>
          <div className="lg:hidden ">
            <button onClick={handleMenuToggle}>
              {menuOpen ? (
                <FiX className="text-3xl" />
              ) : (
                <Bars3Icon className="w-8 h-8 " />
              )}
            </button>
          </div>
          <ul
            className={`lg:flex lg:flex-col lg:space-y-2 text-sm  text-secondary font-medium lg:text-sm  ${
              menuOpen ? "pt-4 w-screen " : "hidden"
            } `}
          >
            <div className="lg:flex mo:flex mo:flex-col">
              {MENU_ITEMS.map((item, index) => (
                <li
                  key={index}
                  className={`lg:mr-4  ${menuOpen ? "" : "group relative"}`}
                  onMouseEnter={() => !menuOpen && handleAccordionToggle(index)}
                  onMouseLeave={() => setActiveAccordion(null)}
                >
                  <div
                    className={`px-3 justify-between ${
                      activeAccordion === index
                        ? "mo:border-b-2 border-gray"
                        : "mo:border-b-2 border-gray"
                    } flex py-2`}
                  >
                    <Link href={item.path} className="uppercase">
                      {item.label}
                    </Link>

                    {item.hasChevron && (
                      <FiChevronDown
                        className={`ml-1 text-gray-600 h-4 w-4 transform ${
                          activeAccordion === index ? "rotate-180" : ""
                        }`}
                        onClick={() => handleChevronToggle(index)}
                      />
                    )}
                  </div>
                  {activeAccordion === index &&
                    item.subitems &&
                    item.subitems.length > 0 && (
                      <ul
                        className={`mo:flex p-4 lg:text-sm text-xs w-full mo:flex-col mo:space-y-2 lg:absolute lg:top-full lg:left-0 bg-white mo:border-b-2 border-gray`}
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
    </header>
  );
}
