"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
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
               <select
                  value={selectedAttributes[attribute.name] || ""}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                     handleAttributeChange(attribute.name, e.target.value)
                  }
                  className="h-11 w-full  max-w-sm text-xl lg:text-sm rounded shadow-md"
               >
                  <option value="">Selecteer je {attribute.name}</option>
                  {attribute.options.map((option) => (
                     <option key={option} value={option}>
                        {option}
                     </option>
                  ))}
               </select>
            </div>
         ))}
      </div>
   );
};

export default VariantSelector;
