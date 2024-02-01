"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { VariantSelectorProps } from "./VariantSelector.types";

const VariantSelector: React.FC<VariantSelectorProps> = ({ attributes, variations }) => {
   const searchParams = useSearchParams();
   const router = useRouter();
   const pathname = usePathname();

   const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});

   useEffect(() => {
      // Update the URL when selectedAttributes change
      const optionSearchParams = new URLSearchParams(searchParams?.toString());
      for (const attributeName in selectedAttributes) {
         optionSearchParams.set(attributeName, selectedAttributes[attributeName]);
      }
      router.push(pathname + "?" + optionSearchParams, { scroll: false });
   }, [selectedAttributes, searchParams, router, pathname]);

   const handleAttributeChange = (attributeName: string, option: string) => {
      setSelectedAttributes({
         ...selectedAttributes,
         [attributeName]: option,
      });
   };

   return (
      <div>
         {attributes.map((attribute) => (
            <div key={attribute.id} className="mb-6">
               <p className="text-sm font-semibold mb-2">{attribute.name}:</p>
               <div className="flex flex-wrap gap-2">
                  {attribute.options.map((option) => (
                     <div
                        key={option}
                        onClick={() => handleAttributeChange(attribute.name, option)}
                        className={`cursor-pointer border text-sm  p-4 py-2 rounded ${
                           selectedAttributes[attribute.name] === option ? "bg-primary text-white" : ""
                        }`}
                     >
                        {option}
                     </div>
                  ))}
               </div>
            </div>
         ))}
      </div>
   );
};

export default VariantSelector;
