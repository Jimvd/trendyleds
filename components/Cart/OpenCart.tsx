import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function OpenCart() {
   return (
      <div className="relative flex   text-black transition-colors dark:border-neutral-700 cursor-pointer">
         <ShoppingBagIcon className="w-7 h-7 mr-2 transition-all ease-in-out hover:scale-110" />
      </div>
   );
}
