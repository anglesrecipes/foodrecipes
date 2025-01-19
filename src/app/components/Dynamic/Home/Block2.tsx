import React from "react";
import Image from "next/image";
import Link from "next/link";
import { chiecken_recipes_articles } from "@/apis/graphql/articles";
import { Archivo } from "next/font/google";
import { FaHeart } from "react-icons/fa";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-old-standard-tt",
});

const Block2 = async () => {
  const posts = await chiecken_recipes_articles();

  return (
    <section
      className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6 mb-20"
      aria-label="Featured Articles"
    >
      <div className="flex justify-center items-center flex-col">
        <h3
          className={`${archivo.className} text-gray-900 font-bold mb-5 text-3xl text-center`}
        >
          Chicken {""}
          <span className="bg-orange-500 rounded text-white pb-0.5 px-2">
            Recipes
          </span>
        </h3>
        <p className="text-slate-700 max-w-[550px] text-center mb-8">
        Check out our latest chicken recipes, tips on cooking techniques, and flavor combinations to keep your meals delicious and satisfying. Read our tips!
        </p>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link href={`/${post.slug}`} key={post.id}>
                <article className="relative break-inside-avoid">
                <span className="absolute bg-red-600 ml-2 mt-2 h-10 w-10 rounded-full flex justify-center items-center"><FaHeart className="w-5 h-5 text-white" /></span>
                  <Image
                    src={
                      post.featuredImage?.node?.sourceUrl ||
                      `https://dev-foudrecipes.pantheonsite.io/wp-content/uploads/2024/10/loading.webp`
                    }
                    alt={post.title}
                    title={post.featuredImage?.node.title || post.title}
                    loading="lazy"
                    width={400}
                    height={250}
                    className="w-full h-auto"
                  />
                  <h4 className="text-lg text-gray-800 transition-all hover:text-gray-950 font-bold my-2">
                    {post.title}
                  </h4>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </section>
  );
};

export default Block2;
