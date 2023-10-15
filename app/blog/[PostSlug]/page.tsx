import SiteHeader from "@/components/navigation/MainMenu/navigation";
import { query } from "@/lib/graphql/lib/query";
import { GET_CONTENT } from "@/lib/graphql/singlepost";
import { notFound } from "next/navigation";

const getSinglePost = async (slug: string) => {
   const { data } = await query({
      query: GET_CONTENT,
      variables: {
         slug: slug,
      },
      revalidate: true,
   });

   if (!data) throw new Error("Kon berichten niet ophalen");
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

         {post.title}
      </>
   );
}
