import React from "react";
import { notFound } from "next/navigation";
import { getContentBySlug, getAllSlugs } from "@/apis/graphql/content";
import { Metadata } from "next";
import Article from "@/app/components/Dynamic/Contents/Article";
import Page from "@/app/components/Dynamic/Contents/Page";
import Category from "@/app/components/Dynamic/Contents/Category";

type Props = {
  params: { slug: string[] };
};

// Define a type for Post
interface Post {
  title: string;
  slug: string;
}

async function fetchContent(slug: string[]) {
  let content = await getContentBySlug(slug.join("/"));
  if (!content) {
    const parentSlug = slug[0];
    const parentContent = await getContentBySlug(parentSlug);
    if (parentContent?.type === "category") {
      const childSlug = slug.slice(1).join("/");
      content = await getContentBySlug(childSlug);
      if (content) {
        content = { ...content, parentSlug, isSubCategory: true };
      }
    }
  }
  return content;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const content = await fetchContent(params.slug);
  if (!content) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  const description =
    content.description ||
    (content.content ? content.content.substring(0, 160) : "");

  const canonicalUrl = `https://www.foudrecipes.com/${params.slug.join("/")}`;

  switch (content.type) {
    case "category":
      return {
        title: content.name,
        description,
        alternates: {
          canonical: canonicalUrl,
        },
        robots: {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
      };
    case "page":
      return {
        title: content.title,
        description: content.seo?.metaDesc || description,
        robots: {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
        alternates: {
          canonical: canonicalUrl,
        },
      };
    case "post":
      return {
        title: content.title,
        description: content.seo?.metaDesc || description,
        openGraph: {
          title: content.seo?.title || content.title,
          description: content.seo?.metaDesc || description,
          type: "article",
          publishedTime: content.seo?.opengraphPublishedTime,
          modifiedTime: content.seo?.opengraphModifiedTime,
          authors: [content.author?.node?.name],
          images: [
            {
              url: content.featuredImage?.node?.sourceUrl || "",
              alt: content.featuredImage?.node?.altText || "",
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: content.seo?.title || content.title,
          description: content.seo?.metaDesc || description,
          images: [content.featuredImage?.node?.sourceUrl || ""],
        },
        robots: {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
        alternates: {
          canonical: canonicalUrl,
        },
      };
    default:
      return {
        title: "Content",
        description: "Dynamic content page",
        alternates: {
          canonical: canonicalUrl,
        },
      };
  }
}

export default async function DynamicPage({ params }: Props) {
  const content = await fetchContent(params.slug);
  if (!content) notFound();

  // Schema Markup
  let schemaMarkup = {};

  switch (content.type) {
    case "post":
      schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: content.title,
        description: content.seo?.metaDesc || content.description,
        image: content.featuredImage?.node?.sourceUrl || "",
        author: {
          "@type": "Person",
          name: content.author?.node?.name,
        },
        datePublished: content.seo?.opengraphPublishedTime,
        dateModified: content.seo?.opengraphModifiedTime,
      };
      break;
    case "page":
      schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: content.title,
        description: content.description,
      };
      break;
    case "category":
    case "subCategory":
      schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: content.name,
        itemListElement: Array.isArray(content.posts)
          ? content.posts.map((post: Post, index: number) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "BlogPosting",
                name: post.title,
                url: `/${post.slug}`,
              },
            }))
          : [],
      };
      break;
    default:
      schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Dynamic Content Page",
      };
      break;
  }

  // Stringify the schema markup
  const jsonLd = JSON.stringify(schemaMarkup);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      {content.type === "category" ? (
        <Category category={content} />
      ) : content.type === "page" ? (
        <Page page={content} />
      ) : content.type === "post" ? (
        <Article post={content} />
      ) : (
        notFound()
      )}
    </>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug: slug.split("/") }));
}
