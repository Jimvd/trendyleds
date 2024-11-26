import Image from "next/image";
import Link from "next/link";

import type { FeaturedImageProps } from "./FeaturedImage.types";

export default function FeaturedImage({ post }: { post: FeaturedImageProps }) {
   const defaultFeaturedImage = "http://www.jpcms.nl/wp-content/uploads/2023/11/storebanner.jpg";
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
            className="h-full object-cover rounded-t-xl lg:rounded-l-xl"
         />
      </Link>
   );
}
