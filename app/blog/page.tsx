import { query } from "@/lib/graphql/lib/query";
import { GET_POSTS } from "../../lib/graphql/posts.queries";
import Link from "next/link";
import FeaturedImage from "@/components/display/FeaturedImage/FeaturedImage";

interface Post {
   slug: string;
   title: string;
   date: string;
   excerpt: string;
   categories: {
      nodes: Array<{
         slug: string;
         name: string;
      }>;
   };
}

const getPosts = async () => {
   const { data } = await query({
      query: GET_POSTS,
      revalidate: true,
   });

   if (!data.posts) throw new Error("Kon berichten niet ophalen");
   return data.posts.nodes;
};

function formatDate(dateString: string | number | Date) {
   const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
   };
   const formattedDate = new Date(dateString).toLocaleDateString("en-US", options);
   return formattedDate;
}

export default async function BlogHome() {
   const allPosts = await getPosts();

   return (
      <>
         <div className="shadow-sm border-b-4 border-primary">
            <h1 className="text-4xl text-center relative py-2 text-black">Led verlichting en led strip blogs</h1>
            <p className="relative text-center text-black pb-8 text-md">Vol trends & inspiratie</p>
         </div>

         <div className="my-12 mx-auto lg:max-w-5xl p-4">
            <ul>
               {allPosts.map((post: Post) => (
                  <li key={post.slug} className="flex flex-col lg:flex-row shadow-lg rounded-xl lg:gap-4 mb-4">
                     <div className="lg:w-2/5">
                        <FeaturedImage post={post} />
                     </div>

                     <div className="lg:w-3/5 p-4">
                        <Link href={`/blog/${post.slug}`} className="text-black">
                           <h2 className="text-2xl pt-4">{post.title}</h2>
                           <div className="text-sm text-gray-500">Geplaatst op {formatDate(post.date)}</div>
                           <div
                              className="pr-4 py-4 text-base"
                              dangerouslySetInnerHTML={{ __html: post.excerpt }}
                           ></div>
                           <div className="flex pb-4 gap-2">
                              geplaatst onder{" "}
                              {post.categories?.nodes.length ? (
                                 post.categories.nodes.map((category) => (
                                    <p className="text-primary font-bold" key={category.slug}>
                                       {category.name}
                                    </p>
                                 ))
                              ) : (
                                 <span>Geen categorieën beschikbaar</span>
                              )}
                           </div>
                        </Link>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </>
   );
}
