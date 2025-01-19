"use client";
import { gql } from "@apollo/client";
import { useState } from "react";
import client from "@/apis/apollo/apollo-client";
import Image from "next/image";
import Link from "next/link";

// Define types for the Post and GraphQL response
interface Post {
  id: string;
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  date: string;
  title: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      title: string;
    };
  };
  seo: {
    metaDesc: string;
  };
  slug: string;
}

interface QueryResult {
  posts: {
    edges: {
      node: Post;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

const truncateContent = (content: string, maxLength: number) => {
  return content.length > maxLength
    ? content.substring(0, maxLength) + "..."
    : content;
};

interface BlogPostsProps {
  initialPosts: Post[];
  initialHasNextPage: boolean;
  initialEndCursor: string | null;
}

// Skeleton loading component
const PostSkeleton = () => (
  <div className="overflow-hidden animate-pulse">
    {/* Image placeholder */}
    <div className="w-full h-48 bg-gray-200" />

    {/* Date placeholder */}
    <div className="h-4 bg-gray-200 rounded w-1/4 mt-4" />

    <div className="my-3">
      {/* Title placeholder */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />

      {/* Excerpt placeholder */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
    </div>
  </div>
);

const GET_MORE_POSTS = gql`
  query GetMorePosts($after: String) {
    posts(first: 9, after: $after, where: { status: PUBLISH }) {
      edges {
        node {
          id
          date
          title
          content
          categories {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
              title
            }
          }
          seo {
            metaDesc
          }
          slug
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export default function BlogPosts({
  initialPosts,
  initialHasNextPage,
  initialEndCursor,
}: BlogPostsProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [endCursor, setEndCursor] = useState<string | null>(initialEndCursor);

  // Simulate initial loading for skeleton
  useState(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  });

  const handleLoadMore = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const { data } = await client.query<QueryResult>({
        query: GET_MORE_POSTS,
        variables: {
          after: endCursor,
        },
      });

      setPosts([...posts, ...data.posts.edges.map((edge) => edge.node)]);
      setHasNextPage(data.posts.pageInfo.hasNextPage);
      setEndCursor(data.posts.pageInfo.endCursor);
    } catch (error) {
      console.error("Error loading more posts:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {initialLoading
          ? // Show 6 skeleton placeholders while loading
            [...Array(6)].map((_, index) => <PostSkeleton key={index} />)
          : // Show actual posts once loaded
            posts.map((post) => (
              <article key={post.id} className="overflow-hidden">
                <Link href={post.categories.nodes[0].slug}>
                  <span className="absolute bg-white text-gray-900 text-sm font-semibold ml-2 mt-2 px-2 py-0.5">
                    {post.categories.nodes[0].name}
                  </span>
                </Link>
                {post.featuredImage && (
                  <Link href={post.slug}>
                    <div className="aspect-w-16 aspect-h-9">
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || ""}
                        loading="lazy"
                        title={post.featuredImage.node.title || ""}
                        width={400}
                        height={250}
                        className="w-full h-auto"
                      />
                    </div>
                  </Link>
                )}
                <div className="my-3">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <Link href={post.slug}>
                    <h3
                      className="text-xl font-semibold mb-2 text-gray-900 hover:text-amber-600 transition-colors duration-300"
                      dangerouslySetInnerHTML={{ __html: post.title }}
                    />
                  </Link>
                </div>
                <p
                  className="text-slate-700 text-md mt-1.5"
                  dangerouslySetInnerHTML={{
                    __html: truncateContent(post.seo.metaDesc, 90),
                  }}
                  suppressHydrationWarning={true}
                />
              </article>
            ))}
      </div>

      {hasNextPage && !initialLoading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="bg-orange-500 hover:bg-amber-400 text-gray-900 px-6 rounded py-2 font-semibold transition-colors duration-200 disabled:bg-amber-200"
          >
            {isLoading ? "Loading..." : "See more articles..."}
          </button>
        </div>
      )}
    </div>
  );
}
