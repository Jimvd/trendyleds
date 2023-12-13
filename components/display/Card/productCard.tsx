import Image from "next/image";
import { Product } from "../../../utils/wooCommerceTypes";
import Link from "next/link";

interface Props {
   product: Product;
}

const ProductCard = (props: Props) => {
   const { product } = props;

   return (
      <Link href={`/${product.slug}`}>
         <div className="max-w-md rounded shadow-md block">
            <div className="relative group" style={{ aspectRatio: "4/3" }}>
               {product.images && product.images.length > 0 ? (
                  <Image src={product.images[0].src} alt={product.images[0].alt} layout="fill" objectFit="cover" />
               ) : (
                  <Image src="/kkeijzer.png" width={200} height={100} alt="Product binnenkort verkrijgbaar" />
               )}
               {product.images && product.images.length > 1 && (
                  <Image
                     className="hidden group-hover:block"
                     src={product.images[1].src}
                     alt={product.images[1].alt}
                     layout="fill"
                     objectFit="cover"
                  />
               )}
            </div>
            <div className="py-3 px-4">
               <div className="mb-2">
                  <span className="text-lg font-semibold">{product.name}</span>
               </div>
               <div>
                  <span className="font-semibold">€{product.price}</span>
               </div>
            </div>
         </div>
      </Link>
   );
};

export default ProductCard;
