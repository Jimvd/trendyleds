import SiteHeader from "@/components/navigation/MainMenu/navigation";
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

   const productData = await getProductData();

   return (
      <>
         <SiteHeader />

         {productData.name}
      </>
   );
}
