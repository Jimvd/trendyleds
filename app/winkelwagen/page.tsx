import { ProductCheckout } from "@/components/Cart/ProductCheckout";

export default function winkelwagen() {
   return (
      <>
         <div className="max-w-5xl mx-auto p-4 lg:p-0 mb-12">
            <h1 className="text-3xl font-bold text-center lg:text-left py-8">Winkelwagen</h1>

            <ProductCheckout />
         </div>
      </>
   );
}
