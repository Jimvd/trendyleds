import { Banner } from "@/components/Banner/Banner";
import ProductCard from "@/components/display/Card/productCard";
import { fetchWooCommerceProductCategoryById, fetchWooCommerceProductsByCategorySlug } from "@/utils/wooCommerceApi";
import { Product } from "@/utils/wooCommerceTypes";
import bannerMobile from "../../../public/mobielvoorbeeld.webp";
import bannerDesktop from "../../../public/collectievoorbeeld.webp";
import { StaticImageData } from "next/image";

interface BannerMap {
   [key: string]: {
      mobileImg: StaticImageData;
      desktopImg: StaticImageData;
   };
}

const bannerMap: BannerMap = {
   "smart-verlichting": { mobileImg: bannerMobile, desktopImg: bannerDesktop },
   ledstrip: { mobileImg: bannerMobile, desktopImg: bannerDesktop },
};

export async function generateMetadata({
   params,
}: {
   params: {
      categorie: string;
   };
}) {
   const getCategorieData = async () => {
      const categorie = params.categorie;
      const categorieBySlug = await fetchWooCommerceProductsByCategorySlug(categorie);

      return categorieBySlug;
   };

   const product = await getCategorieData();
   const category = await fetchWooCommerceProductCategoryById(product[0].categories[0].id);

   return {
      title: ` ${category.name} kopen? | Trendy Leds specialist`,
      description: `${category.description}`,

      alternates: {
         canonical: `https://www.trendyleds.nl/led-verlichting/${params.categorie}/`,
      },
      robots: {
         index: true,
         follow: true,
         googleBot: {
            index: true,
            follow: true,
         },
      },
   };
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
      const categorieBySlug = await fetchWooCommerceProductsByCategorySlug(categorie);

      return categorieBySlug;
   };

   const product = await getCategorieData();

   const categoryName = product.length > 0 ? product[0].categories[0].name : "";

   const { mobileImg, desktopImg } = bannerMap[params.categorie] || { mobileImg: "", desktopImg: "" };

   return (
      <>
         <Banner mobileImg={mobileImg} desktopImg={desktopImg} priority={true} />
         <div className="mx-auto max-w-custom my-12 lg:px-0 px-4">
            <h1 className="font-semibold capitalize tracking-wide my-12 text-center text-secondary text-xl lg:text-2xl">
               {categoryName}
            </h1>
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
