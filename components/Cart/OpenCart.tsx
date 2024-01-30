import { useCart } from "@/context/CartContext";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function OpenCart() {
   const { cartCount } = useCart();
   const renderCartCount = cartCount > 0 ? <p className="text-sm font-bold text-primary ">{cartCount}</p> : null;

   return (
      <div className="relative flex lg:mr-4 text-black transition-colors dark:border-neutral-700 cursor-pointer">
         {renderCartCount}
         <ShoppingBagIcon className="w-7 h-7 mr-2 transition-all ease-in-out hover:scale-110" />
      </div>
   );
}
