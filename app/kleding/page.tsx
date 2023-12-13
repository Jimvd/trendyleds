import ProductCard from "@/components/display/Card/productCard";
import { fetchWooCommerceProducts } from "@/utils/wooCommerceApi";

export default async function Kleding() {
   const products = await fetchWooCommerceProducts();

   console.log(products);

   return (
      <>
         <div className="mx-auto max-w-screen-2xl ">
            <h1 className="font-semibold capitalize tracking-wide my-12 text-center text-secondary text-xl lg:text-2xl ">
               Dames kelding
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
               {products.data.map((product: any) => (
                  <div key={product.id}>
                     <ProductCard product={product} />
                  </div>
               ))}
            </div>
         </div>
      </>
   );
}
