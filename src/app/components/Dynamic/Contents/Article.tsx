"use client";
import Link from "next/link";
import Image from "next/image";
import { Archivo } from "next/font/google";
import RecentPosts from "@/app/components/Dynamic/Sidebar/RecentPosts";
import About from "@/app/components/Dynamic/Sidebar/About";
import SideNewsletter from "@/app/components/Dynamic/Sidebar/Newsletter";
import CopyLinkButton from "./CopyLinkButton";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { BsPinterest } from "react-icons/bs";
import { useState } from "react";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-old-standard-tt",
});

const defaultImage = `https://dev-foudrecipes.pantheonsite.io/wp-content/uploads/2024/10/loading.webp`;

interface PostProps {
  post: {
    id: number;
    title: {
      rendered: string;
    };
    content: {
      rendered: string;
    };
    featured_media?: number;
    slug: string;
    _embedded?: {
      author: {
        name: string;
        avatar_urls: {
          "48": string;
        };
      }[];
      "wp:featuredmedia"?: {
        source_url: string;
        alt_text: string;
        title: {
          rendered: string;
        };
      }[];
      "wp:term"?: {
        category: {
          name: string;
          slug: string;
        }[];
      }[];
    };
    date: string;
    excerpt: {
      rendered: string;
    };
  };
}

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(dateString));
};

const sanitizeHtml = (html: string) => {
  if (typeof html !== "string") {
    return "";
  }
  return html.replace(/<[^>]*>/g, "");
};

const truncateContent = (content: string, maxLength: number) => {
  const sanitizedContent = sanitizeHtml(content);
  return sanitizedContent.length > maxLength
    ? sanitizedContent.substring(0, maxLength) + "..."
    : sanitizedContent;
};

const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

const generateTableOfContents = (content: string) => {
  if (typeof content !== "string") {
    return { toc: [], modifiedContent: content };
  }

  const headingRegex = /<h([2])[^>]*>(.*?)<\/h[2]>/g;
  const toc: { text: string; id: string; level: number }[] = [];
  const modifiedContent = content.replace(
    headingRegex,
    (match, level, text) => {
      const cleanText = text.replace(/<[^>]+>/g, "").trim();
      const id = createSlug(cleanText);
      toc.push({ text: cleanText, id, level: parseInt(level) });
      return `<h${level} id="${id}">${text}</h${level}>`;
    }
  );

  return { toc, modifiedContent };
};

export default function Post({ post }: PostProps) {
  if (!post) {
    return <div>Post not found</div>;
  }

  const { toc, modifiedContent } = generateTableOfContents(
    post.content.rendered
  );
  const postUrl = `https://www.foudrecipes.com/${post.slug}`;

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const author = post._embedded?.author?.[0];
  const category = post._embedded?.["wp:term"]?.[0]?.category?.[0];

  return (
    <main className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6 mt-16 mb-16">
      <div className="lg:flex gap-8">
        <TableOfContents toc={toc} />
        <MainContent
          post={post}
          modifiedContent={modifiedContent}
          postUrl={postUrl}
          featuredImage={featuredImage}
          author={author}
          category={category}
        />
        <Sidebar />
      </div>
    </main>
  );
}

const TableOfContents = ({ toc }: { toc: { text: string; id: string }[] }) => (
  <nav className="lg:w-2/12 hidden lg:block">
    <div className="sticky top-[100px]">
      <h2
        className={`${archivo.className} font-semibold text-xl mb-5 underline text-slate-700 decoration-amber-500 underline-offset-[3px]`}
      >
        What&apos;s Inside?
      </h2>
      <div className="overflow-y-auto h-[550px] scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-transparent">
        <ul>
          {toc.map((item) => (
            <li
              key={item.id}
              className="mb-1.5 leading-[20px] border-b border-slate-200 pb-1.5"
            >
              <Link
                href={`#${item.id}`}
                className="toc-link text-slate-700 font-semibold text-[13px] transition-all hover:text-slate-950"
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </nav>
);

const MainContent = ({
  post,
  modifiedContent,
  postUrl,
  featuredImage,
  author,
  category,
}: {
  post: PostProps["post"];
  modifiedContent: string;
  postUrl: string;
  featuredImage?: {
    source_url: string;
    alt_text: string;
    title: {
      rendered: string;
    };
  };
  author?: {
    name: string;
    avatar_urls: {
      "48": string;
    };
  };
  category?: {
    name: string;
    slug: string;
  };
}) => (
  <article className="lg:w-7/12 border-0 lg:border-x-2 border-slate-100 px-0 lg:px-8">
    <header>
      <nav aria-label="Breadcrumb" className="-mb-3">
        <ol className="flex justify-start items-center gap-2">
          <li className="text-gray-900 text-[13px] font-semibold">
            <Link href="/">Home</Link>
          </li>
          <li className="inline-block text-slate-500 text-sm">/</li>
          {category ? (
            <li className="text-gray-900 text-[13px] font-semibold">
              <Link href={`/${category.slug}`}>{category.name}</Link>
            </li>
          ) : null}
          <li className="inline-block text-slate-500 text-sm">/</li>
          <li
            className="text-gray-900 text-[13px] font-semibold"
            aria-current="page"
          >
            {truncateContent(post.title.rendered, 35)}
          </li>
        </ol>
      </nav>
      <h1
        className={`${archivo.className} text-3xl lg:text-4xl font-black text-gray-900`}
      >
        {post.title.rendered}
      </h1>
      <p className="text-slate-500 text-md my-5">{post.excerpt.rendered}</p>
      {author && (
        <div className="flex justify-start items-center gap-3 mb-8">
          <div
            className="h-11 w-11 bg-slate-200 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${author.avatar_urls["48"]})` }}
          ></div>
          <div className="flex justify-center items-start flex-col">
            <p className="text-gray-800 text-sm font-bold">
              BY:{" "}
              <Link
                href="/about"
                className="hover:text-gray-900 transition-all duration-500"
              >
                {author.name}
              </Link>
            </p>
            <time
              dateTime={post.date}
              className="text-slate-500 capitalize text-sm"
            >
              Updated: {formatDate(post.date)}
            </time>
          </div>
        </div>
      )}

      <p className="text-gray-600 mb-3 text-sm capitalize">
        Would you recommend this post?
      </p>
      <div className="flex gap-4 mb-4">
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            postUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center gap-0.5 text-sm text-slate-800 gap-y-1.5 font-semibold"
        >
          <FaFacebookF className="text-[#1877F2] size-5 relative -top-[1px]" />
          Facebook
        </Link>
        <Link
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            postUrl
          )}&text=${encodeURIComponent(post.title.rendered)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center gap-0.5 text-sm text-slate-800 gap-y-1.5 font-semibold"
        >
          <FaTwitter className="text-[#1DA1F2] size-5 relative -top-[1px]" />
          Twitter
        </Link>
        <Link
          href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
            postUrl
          )}&media=${encodeURIComponent(
            featuredImage?.source_url || defaultImage
          )}&description=${encodeURIComponent(post.title.rendered)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center gap-1 text-sm text-slate-800 gap-y-1.5 font-semibold"
        >
          <BsPinterest className="text-[#E60023] size-5 relative -top-[1px]" />
          Pinterest
        </Link>
        <CopyLinkButton postUrl={postUrl} />
      </div>
    </header>

    <section>
      {featuredImage && (
        <figure>
          <Image
            src={featuredImage.source_url || defaultImage}
            alt={featuredImage.alt_text || post.title.rendered}
            title={featuredImage.title.rendered || post.title.rendered}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            width={500}
            height={300}
            className="mb-8 rounded w-full h-full"
          />
          {featuredImage.alt_text && (
            <figcaption className="sr-only">
              {featuredImage.alt_text}
            </figcaption>
          )}
        </figure>
      )}

      <div
        className="post_content text-slate-800 text-[17px] tracking-[.2px] leading-[1.5] mb-8"
        dangerouslySetInnerHTML={{ __html: modifiedContent }}
      />
    </section>
  </article>
);

const Sidebar = () => (
  <aside className="lg:w-3/12">
    <About />
    <SideNewsletter />
    <RecentPosts />
  </aside>
);

interface Comment {
  id: number;
  author_name: string;
  content: string;
  date: string;
}

const CommentSection = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://www.foudrecipes.com/wp-json/wp/v2/comments?post=${postId}`
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://www.foudrecipes.com/wp-json/wp/v2/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            post: postId,
            author_name: name,
            content: content,
          }),
        }
      );
      if (response.ok) {
        setName("");
        setContent("");
        fetchComments(); // Refresh comments after submission
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
};
