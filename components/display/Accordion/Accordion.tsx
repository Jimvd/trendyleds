"use client";
import React, { useState } from "react";
import { AccordionProps } from "./Accordion.types";
import { FiChevronDown } from "react-icons/fi";

const Accordion = ({ title, content }: AccordionProps) => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <div className="text-sm max-w-sm mt-4 p-4 rounded-sm bg-white shadow-sm ">
         <div
            className={`flex justify-between font-semibold tems-center cursor-pointer ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
         >
            <span>{title}</span>
            {isOpen ? <FiChevronDown /> : <FiChevronDown />}
         </div>
         {isOpen && (
            <div className="my-4 ">
               <p
                  dangerouslySetInnerHTML={{
                     __html: content,
                  }}
               />
            </div>
         )}
      </div>
   );
};

export default Accordion;
