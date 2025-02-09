// ./src/app/components/Dynamic/Contents/CategoryPosts.tsx
'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { RxDividerVertical } from "react-icons/rx";
import { Post } from '@/types'; // You'll need to create this type

interface CategoryPostsProps {
  initialPosts: Post[];
  categoryId: number;
  totalPages: number;
}

const truncateContent = (content: string, maxLength: number) => {
  const strippedContent = content.replace(/<[^>]*>/g, "");
  const normalizedContent = strippedContent.replace(/\s+/g, " ").trim();
  
  if (normalizedContent.length > maxLength) {
    return normalizedContent.substring(0, maxLength).trim() + "...";
  }
  return normalizedContent;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

export default function CategoryPosts({ initialPosts, categoryId, totalPages }: CategoryPostsProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadMorePosts = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const nextPage = currentPage + 1;

    try {
      const response = await fetch(
        `https://dev-foudrecipes.pantheonsite.io/wp-json/wp/v2/posts?categories=${categoryId}&per_page=10&page=${nextPage}&_embed`
      );
      const newPosts = await response.json();
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="columns-1 sm:columns-2 lg:columns-2 xl:columns-2 gap-6 space-y-5">
        {posts.map((post) => (
          <div
            className="break-inside-avoid bg-white shadow-md overflow-hidden"
            key={post.id}
          >
            <Link
              href={`/${post.slug}`}
              aria-label={`View recipe: ${post.title.rendered}`}
            >
              <Image
                src={
                  post._embedded["wp:featuredmedia"]?.[0]?.source_url ||
                  `https://dev-foudrecipes.pantheonsite.io/wp-content/uploads/2024/10/loading.webp`
                }
                alt={post._embedded["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered}
                width={400}
                height={280}
                objectFit="cover"
                className="w-full h-auto"
              />
            </Link>
            <div className="p-4">
              <div className="flex justify-start items-center gap-1 mt-1 mb-4">
                <Link
                  href="/about"
                  className="animated-underline text-slate-800 text-sm font-semibold underline decoration-amber-500 underline-offset-2"
                  aria-label="About the author"
                >
                  Virginia Olson
                </Link>
                <span>
                  <RxDividerVertical className="text-slate-300" />
                </span>
                <time
                  dateTime={post.date}
                  className="text-slate-500 text-sm"
                >
                  {formatDate(post.date)}
                </time>
              </div>
              <Link
                href={`/${post.slug}`}
                aria-label={`Read ${post.title.rendered}`}
              >
                <h2 className="text-lg leading-6 font-bold mb-3 text-gray-800 transition-all hover:text-gray-900 capitalize">
                  {post.title.rendered}
                </h2>
              </Link>
              <p className="text-slate-500 text-sm">
                {truncateContent(post.content.rendered, 100)}
              </p>
            </div>
          </div>
        ))}
      </section>

      {currentPage < totalPages && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMorePosts}
            disabled={isLoading}
            className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-amber-400"
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}