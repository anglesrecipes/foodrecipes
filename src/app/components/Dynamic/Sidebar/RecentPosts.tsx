import React from "react";
import Image from "next/image";
import Link from "next/link";
import { featured_articles } from "@/apis/graphql/articles";

const sanitizeHtml = (html: string) => {
  // Basic sanitization - remove HTML tags
  return html.replace(/<[^>]*>/g, '');
};

const truncateContent = (content: string, maxLength: number) => {
  // First sanitize the HTML content
  const sanitizedContent = sanitizeHtml(content);
  // Then truncate
  return sanitizedContent.length > maxLength
    ? sanitizedContent.substring(0, maxLength) + "..."
    : sanitizedContent;
};

const RecentPosts = async () => {

    const defaultImage = `https://dev-foudrecipes.pantheonsite.io/wp-content/uploads/2024/10/loading.webp`;

  const posts = await featured_articles();

  return (
    <div className="mb-8 sticky top-[80px]">
      <h2 className="text-3xl text-gray-900 font-bold -mb-3">Recent Articles</h2>
      <div className="bg-amber-200 h-[10px] max-w-[220px] mb-5"></div>
      <div>
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li className="mb-3" key={post.id}>
                <Link
                  href={`/${post.slug}`}
                  className="flex justify-center items-center gap-2"
                >
                  <Image
                    src={post.featuredImage?.node?.sourceUrl || defaultImage}
                    alt={post.featuredImage?.node?.altText || post.title}
                    title={post.featuredImage?.node?.title || post.title}
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="float-left w-[40%]"
                  />
                  <div className="flex-col">
                    <h3 className="text-[13px] mb-0.5 text-gray-900 font-semibold">
                      {truncateContent(post.title, 40)}
                    </h3>
                    <p className="text-[11px] text-slate-600">
                      By: {post.author.node.name || "Virginia Olson"}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
};

export default RecentPosts;
