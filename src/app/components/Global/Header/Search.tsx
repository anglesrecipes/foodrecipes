"use client";
import { Archivo } from "next/font/google";
import React, { useState } from "react";
import { RiSearch2Line, RiCloseLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Link from "next/link";
import { GoSearch } from "react-icons/go";
import { FaHeart } from "react-icons/fa";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-old-standard-tt",
});

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
      title: string;
    };
  };
}

interface PostData {
  edges: { node: Post }[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
  };
}

const fetchPosts = async (
  searchTerm: string,
  afterCursor: string | null = null,
  first: number = 12
) => {
  const query = `
    query SearchPosts($search: String!, $first: Int!, $after: String) {
      posts(where: { search: $search }, first: $first, after: $after) {
        edges {
          node {
            id
            title
            slug
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
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  const variables = {
    search: searchTerm,
    first,
    after: afterCursor,
  };

  const response = await fetch(
    "https://dev-foudrecipes.pantheonsite.io/graphql",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    }
  );

  const json = await response.json();
  return json.data.posts as PostData;
};

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState<string | null>(null);

  const toggleSearch = () => setIsOpen(!isOpen);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    NProgress.start();

    try {
      const postData = await fetchPosts(searchTerm, null); // Fetch first 9 posts
      setPosts(postData.edges.map((edge) => edge.node));
      setHasNextPage(postData.pageInfo.hasNextPage);
      setEndCursor(postData.pageInfo.endCursor);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
      NProgress.done();
    }
  };

  const loadMorePosts = async () => {
    if (!hasNextPage) return;

    setIsLoading(true);
    NProgress.start();

    try {
      const postData = await fetchPosts(searchTerm, endCursor); // Fetch next 9 posts
      setPosts((prevPosts) => [
        ...prevPosts,
        ...postData.edges.map((edge) => edge.node),
      ]);
      setHasNextPage(postData.pageInfo.hasNextPage);
      setEndCursor(postData.pageInfo.endCursor);
    } catch (error) {
      console.error("Failed to load more posts:", error);
    } finally {
      setIsLoading(false);
      NProgress.done();
    }
  };

  return (
    <div className="relative">
      <div
        onClick={toggleSearch}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={isOpen ? "Close search" : "Open search"}
      >
        <RiSearch2Line className="text-gray-500 hover:text-gray-90 h-5 w-5" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed left-0 top-0 h-screen w-full bg-slate-50 overflow-y-auto z-50"
          >
            <div className="max-w-7xl mx-auto px-4 py-6">
              <form onSubmit={handleSearch} className="mb-8">
                <div className="flex justify-between items-center gap-5 w-full">
                  <div className="flex justify-center items-center w-full">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search the site..."
                      className={`${archivo.className} flex-1 p-2 text-xl -mr-[52px] w-full font-semibold bg-transparent border-b border-gray-200 focus:outline-none focus:border-gray-400`}
                    />
                    <button
                      onClick={handleSearch}
                      className="px-4 text-gray-900 rounded font-semibold cursor-pointer"
                      role="button"
                      tabIndex={0}
                    >
                      <GoSearch className="size-5 text-gray-900" />
                    </button>
                  </div>
                  <div>
                    <button onClick={toggleSearch}>
                      <RiCloseLine className="text-gray-400 hover:text-gray-600 h-6 w-6" />
                    </button>
                  </div>
                </div>
              </form>

              {isLoading ? (
                <div className="text-center">Loading...</div>
              ) : posts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <Link href={`/${post.slug}`} key={post.id} onClick={toggleSearch}>
                      <article className="relative break-inside-avoid">
                      <span className="absolute bg-red-600 ml-2 mt-2 h-10 w-10 rounded-full flex justify-center items-center"><FaHeart className="w-5 h-5 text-white" /></span>
                        <Image
                          src={
                            post.featuredImage?.node?.sourceUrl ||
                            `https://dev-foudrecipes.pantheonsite.io/wp-content/uploads/2024/10/loading.webp`
                          }
                          alt={post.title}
                          title={post.featuredImage.node.title || post.title}
                          width={400}
                          loading="lazy"
                          height={250}
                          className="w-full h-auto"
                        />
                        <h4 className="text-xl text-left text-gray-800 transition-all hover:text-gray-950 font-bold my-2">
                          {post.title}
                        </h4>
                      </article>
                    </Link>
                  ))}
                </div>
              ) : searchTerm && !isLoading ? (
                <div className="text-center text-gray-600">
                  No results found for &#39;{searchTerm}&#39;
                </div>
              ) : null}

              {hasNextPage && (
                <div className="text-center mt-6">
                  <button
                    onClick={loadMorePosts}
                    className="px-4 py-2 bg-orange-500 text-gray-900 rounded font-semibold cursor-pointer hover:bg-amber-400"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
