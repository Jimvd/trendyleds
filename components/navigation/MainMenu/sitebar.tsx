import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";

export default function Sitebar() {
   return (
      <div className="z-10 relative flex border-b-2 border-gray py-8 items-center justify-center">
         <nav className="text-slate-100">
            <ul className=" justify-center space-x-3 space-y-2">
               <div className="flex items-center">
                  <Link className="px-3 flex py-2" href={"/"}>
                     Kleding
                     <FiChevronDown className="ml-1 h-6 w-6" />
                  </Link>
                  <Link className="px-3 flex py-2" href={"/"}>
                     Party collection
                     <FiChevronDown className="ml-1 h-6 w-6" />
                  </Link>
                  <Link className="px-3 flex py-2" href={"/blog"}>
                     blog
                     <FiChevronDown className="ml-1 h-6 w-6" />
                  </Link>
                  <Link className="px-3 flex py-2" href={"/contact"}>
                     Contact
                     <FiChevronDown className="ml-1 h-6 w-6" />
                  </Link>
                  <Link className="px-3 flex py-2" href={"/"}>
                     SALE
                     <FiChevronDown className="ml-1 h-6 w-6" />
                  </Link>
                  <Link className="px-3 flex py-2" href={"/about"}>
                     Schoenen
                     <FiChevronDown className="ml-1 h-6 w-6" />
                  </Link>
                  <Link className="px-3 flex py-2" href={"/about"}>
                     Zomer
                     <FiChevronDown className="ml-1 h-6 w-6" />
                  </Link>
                  <Link className="px-3 flex py-2" href={"/about"}>
                     About
                     <FiChevronDown className="ml-1 h-6 w-6" />
                  </Link>
               </div>
            </ul>
         </nav>
      </div>
   );
}
