import React from "react";
import { Product } from "@/utils/wooCommerceTypes";
import Image from "next/image";
import Link from "next/link";

interface RelatedProductsProps {
  relatedProducts: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  relatedProducts,
}) => {
  return (
    <>
      <h2 className="font-bold text-2xl text-center my-8">
        Misschien vind je dit leuk?
      </h2>
      <div className="flex items-center justify-center ">
        <div className="flex flex-wrap">
          {relatedProducts.map((product) => (
            <div key={product.id} className="m-4 flex flex-col">
              <Link href={`${product.slug}`} title="gerelateerd product">
                <Image
                  src={product.images[0].src}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="object-cover w-80 h-80"
                />
                <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
                <p>
                  {" "}
                  {product.sale_price ? (
                    <>
                      <span className="text-primary font-bold line-through">
                        €{product.regular_price}
                      </span>
                      <span className="ml-2">€{product.sale_price}</span>
                    </>
                  ) : (
                    `€${product.price}`
                  )}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedProducts;
