import ProductCard from "@/components/display/Card/productCard";
import { fetchWooCommerceProductsByCategorySlug } from "@/utils/wooCommerceApi";
import { Product } from "@/utils/wooCommerceTypes";

interface Props {
   product: Product[];
}
export default async function categoriesBySlug({
   params,
}: {
   params: {
      categorie: string;
   };
}) {
   const getCategorieData = async () => {
      const categorie = params.categorie;
      const categorieBySLug = await fetchWooCommerceProductsByCategorySlug(categorie);

      return categorieBySLug;
   };

   const product = await getCategorieData();
   console.log(product);

   return (
      <>
         <div className="mx-auto max-w-screen-2xl ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
               {product.map((product: Product) => (
                  <div key={product.id}>
                     <ProductCard product={product} />
                  </div>
               ))}
            </div>
         </div>
      </>
   );
}
