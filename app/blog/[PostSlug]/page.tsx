import SiteHeader from "@/components/navigation/MainMenu/navigation";
import { query } from "@/lib/graphql/lib/query";
import { GET_CONTENT } from "@/lib/graphql/singlepost";

const getSinglePost = async (slug: string) => {
   const { data } = await query({
      query: GET_CONTENT,
      variables: {
         slug: slug,
      },
      revalidate: true,
   });

   if (!data.post) throw new Error("Kon berichten niet ophalen");

   return data.post;
};

export default async function singlePost({ params }: { params: { PostSlug: string } }) {
   const post = await getSinglePost(params.PostSlug);

   return (
      <>
         <SiteHeader />

         {post.title}
      </>
   );
}
