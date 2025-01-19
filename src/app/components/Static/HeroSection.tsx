import React from "react";
import Image from "next/image";
import Link from "next/link";
import { featured_articles } from "@/apis/graphql/articles";

const PopularRecipes = async () => {
  const posts = await featured_articles();

  // Ensure there are enough posts to display the layout
  if (posts.length < 4) {
    return <p>Not enough posts to display.</p>;
  }

  const mainPost = posts[0];
  const sidePosts = posts.slice(0, 5);

  // Check if the necessary image and data are available for the main post
  if (!mainPost.featuredImage?.node?.sourceUrl) {
    return <p>Featured image is missing for the main post.</p>;
  }

  return (
    <section className="max-w-[90%] mx-auto my-20 mb-32">
      <div className="lg:flex gap-6">
        <div className="lg:w-8/12">
          <Link
            href={`/${mainPost.slug}`}
            aria-label={`View recipe: ${mainPost.title}`}
          >
            <Image
              src={mainPost.featuredImage?.node?.sourceUrl || "/default-image.jpg"} // Fallback to a default image
              alt={`Featured image for ${mainPost.title}`}
              width={500}
              height={300}
              objectFit="cover"
              className="w-full h-auto"
            />
            <h3 className="mt-2 mb-1 text-2xl text-blue-950 font-bold">
              {mainPost.title}
            </h3>
            <p className="text-slate-500">{mainPost.seo.metaDesc}</p>
          </Link>
        </div>
        <div className="lg:w-4/12">
          <div className="bg-slate-50 p-6 !pt-0">
            <h3 className="text-black font-bold mb-3 text-center mt-0">
              News & Trending
            </h3>

            {sidePosts.slice(0, 4).map((post, index) => (
              <div
                className="lg:flex justify-start items-start gap-2 mb-3"
                key={index}
              >
                <div>
                  <Link
                    href={`/${post.slug}`}
                    aria-label={`View recipe: ${post.title}`}
                  >
                    <Image
                      src={post.featuredImage?.node?.sourceUrl || "/default-image.jpg"} // Fallback to a default image
                      alt={`Featured image for ${post.title}`}
                      width={500}
                      height={300}
                      objectFit="cover"
                      className="w-full h-auto"
                    />
                  </Link>
                </div>
                <div>{post.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularRecipes;