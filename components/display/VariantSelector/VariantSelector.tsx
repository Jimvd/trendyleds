"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { VariantSelectorProps } from "./VariantSelector.types";

const VariantSelector: React.FC<VariantSelectorProps> = ({ attributes, onAttributesChange }) => {
   const searchParams = useSearchParams();
   const router = useRouter();
   const pathname = usePathname();

   const initialSelectedAttributes: Record<string, string> = React.useMemo(() => {
      const initial: Record<string, string> = {};
      attributes.forEach((attr) => {
         initial[attr.name] = attr.options[0];
      });
      return initial;
   }, [attributes]);

   const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>(initialSelectedAttributes);

   useEffect(() => {
    
      const optionSearchParams = new URLSearchParams(searchParams?.toString());
      for (const attributeName in selectedAttributes) {
         optionSearchParams.set(attributeName, selectedAttributes[attributeName]);
      }
      router.push(pathname + "?" + optionSearchParams.toString(), { scroll: false });

      onAttributesChange(selectedAttributes);
   }, [selectedAttributes]);

   const handleAttributeChange = useCallback((attributeName: string, option: string) => {
      console.log(`Changing attribute: ${attributeName} to ${option}`);
      setSelectedAttributes((prevAttributes) => ({
         ...prevAttributes,
         [attributeName]: option,
      }));
   }, []);

   const capitalizeFirstLetter = (string: string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
   };

   return (
      <div>
         {attributes.map((attribute) => (
            <div key={attribute.id} className="mb-6 max-w-md">
               <p className="text-sm font-semibold mb-2">{capitalizeFirstLetter(attribute.name)}</p>
               <div className="flex flex-wrap gap-2 w-full">
                  {attribute.options.map((option) => (
                     <div
                        key={option}
                        onClick={() => handleAttributeChange(attribute.name, option)}
                        className={`cursor-pointer border text-sm p-4 py-2 rounded flex-1 ${
                           selectedAttributes[attribute.name] === option ? "border-black border text-black" : ""
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
