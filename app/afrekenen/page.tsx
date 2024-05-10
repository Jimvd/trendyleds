import Bestelling from "@/components/Bestelling/Bestelling";

export default function Afrekenen() {
   return (
      <>
         <div>
            <h1 className="text-3xl border-b text-center py-8 content-center">Checkout</h1>

            <div className="my-12">
               <Bestelling />
            </div>
         </div>
      </>
   );
}
