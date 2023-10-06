import Image from "next/image";
import Link from "next/link";

import type { FeaturedImageProps } from "./FeaturedImage.types";

export default function FeaturedImage({ post }: { post: FeaturedImageProps }) {
   const defaultFeaturedImage = "https://www.trendyleds.nl/wp-content/uploads/2023/04/h_pet_cat_01.jpg";
   const defaultWidth = 400;
   const defaultHeight = 200;

   return (
      <Link href={`/blog/${post.slug}`}>
         <Image
            src={`${
               post.featuredImage &&
               post.featuredImage.node.mediaDetails &&
               post.featuredImage.node.mediaDetails.sizes &&
               post.featuredImage.node.mediaDetails.sizes.length > 0
                  ? post.featuredImage.node.mediaDetails.sizes[0].sourceUrl
                  : defaultFeaturedImage
            }`}
            width={defaultWidth}
            height={defaultHeight}
            alt={post.title}
            className="h-full object-cover rounded-xl"
         />
      </Link>
   );
}
