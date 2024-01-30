import AddToCart from "@/components/Cart/AddToCart";
import Accordion from "@/components/display/Accordion/Accordion";
import ImageCarousel from "@/components/display/ImageCarrousel/ImageCarrousel";
import ProductUsp from "@/components/display/ProductUsp/ProductUsp";
import VariantSelector from "@/components/display/VariantSelector/VariantSelector";
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
               <h1 className="font-semibold capitalize tracking-wide mb-8 text-secondary text-2xl ">{product.name}</h1>

               <VariantSelector attributes={product.attributes} variations={product.variations} />

               <p className="text-2xl">
                  {product.sale_price ? (
                     <>
                        <span className="text-primary font-bold line-through">€{product.regular_price}</span>
                        <span className="ml-2">€{product.sale_price}</span>
                     </>
                  ) : (
                     `€${product.price}`
                  )}
               </p>
               <AddToCart product={product} />
               <ProductUsp />
               {product.description && <Accordion title="Productbeschrijving" content={product.description} />}
            </div>
         </div>
      </>
   );
}
