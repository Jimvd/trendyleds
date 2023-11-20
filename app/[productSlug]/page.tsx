import ImageCarousel from "@/components/display/ImageCarrousel/ImageCarrousel";
import { fetchWooCommerceProductBySlug } from "@/utils/wooCommerceApi";
import { Product } from "@/utils/wooCommerceTypes";

interface ProductProps {
   product: Product;
}

export default async function ProductBySlug({
   params,
}: {
   params: {
      productSlug: string;
   };
}) {
   const getProductData = async () => {
      const productSlug = params.productSlug;
      const productBySlug = await fetchWooCommerceProductBySlug(productSlug);
      console.log(productBySlug);

      return productBySlug;
   };

   const product = await getProductData();

   return (
      <>
         <div className="m-auto p-4 grid max-w-screen-xl grid-cols-1 gap-x-6 lg:grid-cols-2">
            <div className="">
               <ImageCarousel images={product.images} />
            </div>
            <div className="my-12">
               <h1 className="font-semibold capitalize tracking-wide text-secondary text-2xl ">{product.name}</h1>
               {/* {product.attributes.map((attribute: any) => (
                  <div key={attribute.id}>
                     <p className="font-semibold">{attribute.name}:</p>
                     <div className="flex">
                        {attribute.options.map((option: any) => (
                           <div key={option} className="border p-2 ml-2">
                              {option}
                           </div>
                        ))}
                     </div>
                  </div>
               ))} */}
            </div>
         </div>
      </>
   );
}
