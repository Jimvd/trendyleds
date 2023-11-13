import Image from "next/image";
import { Product } from "../../../utils/wooCommerceTypes";

interface Props {
   product: Product;
}

const ProductCard = (props: Props) => {
   const { product } = props;

   return (
      <div className="w-full">
         <div className="relative w-full">
            <Image src={product.images[0].src} alt={product.images[0].alt} layout="fill" objectFit="cover" />
         </div>
         <div className="w-full px-4 pt-5 pb-7 flex justify-center gap-12">
            <span>{product.name}</span>
            <span>
               <strong>£{product.regular_price}</strong>
            </span>
         </div>
      </div>
   );
};

export default ProductCard;
