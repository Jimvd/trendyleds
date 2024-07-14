import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Image from "next/image";

type AccordionProps = {
   title: string;
   content: string;
   image?: {
      src: string;
      height: number;
      width: number;
   };
};

const Accordion = ({ title, content, image }: AccordionProps) => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <div className="text-sm py-4 border-b bg-white">
         <div
            className={`flex justify-between font-semibold items-center cursor-pointer ${
               isOpen ? "open border-b pb-4" : ""
            }`}
            onClick={() => setIsOpen(!isOpen)}
         >
            <span>{title}</span>
            <FiChevronDown className={isOpen ? "transform rotate-180" : ""} />
         </div>
         {isOpen && (
            <div className="my-4">
               <div
                  dangerouslySetInnerHTML={{
                     __html: content,
                  }}
               />
               {image && (
                  <Image
                     src={image.src}
                     className="my-6"
                     height={image.height}
                     width={image.width}
                     alt="Trendy leds led verlichting "
                  />
               )}
            </div>
         )}
      </div>
   );
};

export default Accordion;
