import { query } from "@/lib/graphql/lib/query";
import { GET_CONTENT } from "@/lib/graphql/singlepost";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";

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

export async function generateMetadata({ params }: { params: { PostSlug: string } }) {
   const post = await getSinglePost(params.PostSlug);

   console.log(post);

   return {
      title: ` ${post.title}`,
      description:
         `${post.excerpt}` ??
         "Ontdek de voordelen van LED-verlichting en LED-strips voor je interieur. Bespaar energie, creëer sfeer en verbeter je verlichting met onze handige tips en ideeën.",
      alternates: {
         canonical: `https://www.trendyleds.nl/blog/${post.slug}/`,
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

export default async function singlePost({ params }: { params: { PostSlug: string } }) {
   const post = await getSinglePost(params.PostSlug);

   return (
      <>
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
               <div className="mb-10 mt-8 text-sm leading-6 max-w-3xl text-secondary/80 lg:text-base post-content">
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
