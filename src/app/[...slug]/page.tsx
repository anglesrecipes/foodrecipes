import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Article from "@/app/components/Dynamic/Contents/Article";
import Page from "@/app/components/Dynamic/Contents/Page";
import Category from "@/app/components/Dynamic/Contents/Category";

type Props = {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

type CategoryType = {
  id: number;
  slug: string;
  name: string;
  count: number;
  description: string;
};

type PostType = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
};

// type ContentType = {
//   type: "category" | "post" | "page";
//   id?: number;
//   slug?: string;
//   name?: string;
//   title?: {
//     rendered: string;
//   };
//   description?: string;
//   excerpt?: {
//     rendered: string;
//   };
//   initialPosts?: PostType[];
//   totalPages?: number;
// };

async function fetchCategoryData(slug: string) {
  try {
    const res = await fetch(`https://dev-foudrecipes.pantheonsite.io/wp-json/wp/v2/categories?slug=${slug}`);
    const categories = await res.json();
    return categories.length > 0 ? categories[0] : null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

async function fetchCategoryPosts(categoryId: number) {
  try {
    const res = await fetch(
      `https://dev-foudrecipes.pantheonsite.io/wp-json/wp/v2/posts?categories=${categoryId}&_embed`
    );
    return await res.json();
  } catch (error) {
    console.error('Error fetching category posts:', error);
    return [];
  }
}

async function fetchPostData(slug: string) {
  try {
    const res = await fetch(
      `https://dev-foudrecipes.pantheonsite.io/wp-json/wp/v2/posts?slug=${slug}&_embed`
    );
    const posts = await res.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

async function fetchContent(slug: string[]) {
  const slugString = slug.join("/");
  
  // First try to fetch as category
  const category = await fetchCategoryData(slugString);
  if (category) {
    const posts = await fetchCategoryPosts(category.id);
    return {
      ...category,
      type: "category",
      initialPosts: posts,
      totalPages: Math.ceil(category.count / 10)
    };
  }

  // If not a category, try to fetch as post
  const post = await fetchPostData(slugString);
  if (post) {
    return {
      ...post,
      type: "post"
    };
  }

  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const content = await fetchContent(params.slug);
  
  if (!content) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  const canonicalUrl = `https://www.foudrecipes.com/${params.slug.join("/")}`;
  const title = content.type === "category" ? content.name : content.title?.rendered || content.title;
  const description = content.description || content.excerpt?.rendered || "";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function DynamicPage({ params }: Props) {
  const content = await fetchContent(params.slug);

  if (!content) {
    notFound();
  }

  switch (content.type) {
    case "category":
      return (
        <Category
          category={content}
          initialPosts={content.initialPosts}
          totalPages={content.totalPages}
        />
      );
    case "page":
      return <Page page={content} />;
    case "post":
      return <Article post={content} />;
    default:
      notFound();
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(
      "https://dev-foudrecipes.pantheonsite.io/wp-json/wp/v2/categories?per_page=100"
    );
    const categories: CategoryType[] = await res.json();
    return categories.map((category) => ({
      slug: [category.slug],
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}