import SiteHeader from "@/components/navigation/MainMenu/navigation";
import { query } from "@/lib/graphql/lib/query";
import { GET_CONTENT } from "@/lib/graphql/singlepost";
import { notFound } from "next/navigation";
import Image from "next/image";

const getSinglePost = async (slug: string) => {
   const { data } = await query({
      query: GET_CONTENT,
      variables: {
         slug: slug,
      },
      revalidate: true,
   });

   if (!data) throw new Error("Failed to fetch post data");
   if (!data || !data.post) return notFound();

   return data.post;
};

export default async function singlePost({ params }: { params: { PostSlug: string } }) {
   const post = await getSinglePost(params.PostSlug);

   return (
      <>
         <div className="w-1920 h-1000 bg-[url('/storebanner.jpg')] relative">
            <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>
            <SiteHeader />
         </div>
         <article className="mt-4 flex w-full flex-col-reverse justify-center lg:my-10 lg:flex-row">
            <div className="px-3 lg:mr-4 lg:max-w-2/3">
               <h1 className="my-4 text-xl max-w-3xl font-semibold lg:my-0 lg:text-4xl">{post.title}</h1>
               {post.featuredImage?.node?.mediaDetails?.sizes && (
                  <Image
                     src={post.featuredImage.node.mediaDetails.sizes.sourceUrl}
                     alt={post.featuredImage.node.mediaDetails.meta.caption}
                     width={post.featuredImage.node.mediaDetails.sizes.width}
                     height={post.featuredImage.node.mediaDetails.sizes.height}
                  />
               )}
               <div className="mb-10 mt-8 text-sm leading-6 max-w-3xl text-secondary/80 lg:text-base">
                  <div
                     dangerouslySetInnerHTML={{
                        __html: post.content,
                     }}
                  />
               </div>
            </div>
         </article>
      </>
   );
}
