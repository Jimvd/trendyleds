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
    const categorieBySLug = await fetchWooCommerceProductsByCategorySlug(
      categorie
    );

    return categorieBySLug;
  };

  const product = await getCategorieData();

  const categoryName = product.length > 0 ? product[0].categories[0].name : "";

  return (
    <>
      <div className="mx-auto max-w-screen-2xl ">
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
