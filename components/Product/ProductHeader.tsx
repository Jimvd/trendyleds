import AddToCart from "@/components/Cart/AddToCart";
import Accordion from "@/components/display/Accordion/Accordion";
import ImageCarousel from "@/components/display/ImageCarrousel/ImageCarrousel";
import ProductUsp from "@/components/display/ProductUsp/ProductUsp";
import VariantSelector from "@/components/display/VariantSelector/VariantSelector";
import { Product } from "@/utils/wooCommerceTypes";
import Image from "next/image";
import DangerouslyHTML from "../display/dangerouslyParagraf/DangerouslyHTML";

interface ProductProps {
  product: Product;
}

export default function ProductHeader({ product }: ProductProps) {
  return (
    <>
      <div className="p-4 grid grid-cols-1 gap-x-6 lg:grid-cols-2">
        <ImageCarousel images={product.images} />

        <div className="my-12">
          <h1 className="font-semibold capitalize tracking-wide text-secondary text-2xl">
            {product.name}
          </h1>
          <div className="flex mt-2">
            <Image
              src="/stars-5.svg"
              alt="trust pilot 5 sterren reviews"
              width="100"
              height="100"
              className="mr-2"
            />
            <h2 className="text-sm">Gebaseerd op 243 beoordelingen</h2>
          </div>
          <DangerouslyHTML
            content={product.short_description}
            classname="my-4"
          />
          <VariantSelector
            attributes={product.attributes}
            variations={product.variations}
          />
          <p className="text-2xl mt-6">
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
          <AddToCart product={product} />
          <ProductUsp />
          <div className="mt-4 bg-white">
            {product.description && (
              <Accordion
                title="Productbeschrijving"
                content={product.description}
              />
            )}
            <Accordion
              title="Reviews"
              content="Dit is de content voor reviews"
            />
          </div>
        </div>
      </div>
    </>
  );
}
