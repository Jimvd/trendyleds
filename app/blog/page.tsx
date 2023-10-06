import SiteHeader from "@/components/navigation/MainMenu/navigation";
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

export default async function BlogHome() {
   const allPosts = await getPosts();

   return (
      <>
         <title>Blog</title>

         <div className="w-1920 h-1000 bg-[url('/storebanner.jpg')] relative">
            <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>
            <SiteHeader />
         </div>

         <div className="shadow-sm border-b-4 border-pink-400">
            <h1 className="text-4xl text-center relative z-10 py-8 text-pink-400">BLOG</h1>
            <p className="relative z-10 text-center text-pink-400 pb-8 text-2xl">Lees de laatste blogs!</p>
         </div>

         <div className="py-8">
            <ul>
               {allPosts.map((post: Post) => (
                  <li key={post.slug} className="grid grid-cols-5 gap-4 mb-4">
                     <div className="col-span-2">
                        <FeaturedImage post={post} />
                     </div>

                     <div className="col-span-3">
                        <h2 className="py-4">
                           <Link href={`/blog/${post.slug}`} className="text-pink-400 text-2xl hover:text-pink-600">
                              {post.title}
                           </Link>
                        </h2>
                        <div className="text-lg" dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
                        <div className="py-4">
                           geplaatst onder{" "}
                           {post.categories && post.categories.nodes ? (
                              post.categories.nodes.map((category) => (
                                 <Link
                                    className="text-pink-400"
                                    href={`/category/${category.slug}`}
                                    key={category.slug}
                                 >
                                    {" "}
                                    {category.name}
                                 </Link>
                              ))
                           ) : (
                              <span>Geen categorieën beschikbaar</span>
                           )}
                        </div>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </>
   );
}
