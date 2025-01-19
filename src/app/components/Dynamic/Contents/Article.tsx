import Link from "next/link";
import Image from "next/image";
import { Archivo } from "next/font/google";
import RecentPosts from "@/app/components/Dynamic/Sidebar/RecentPosts";
import About from "@/app/components/Dynamic/Sidebar/About";
import SideNewsletter from "@/app/components/Dynamic/Sidebar/Newsletter";
import CopyLinkButton from "./CopyLinkButton";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { BsPinterest } from "react-icons/bs";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-old-standard-tt",
});

const defaultImage = `https://dev-foudrecipes.pantheonsite.io/wp-content/uploads/2024/10/loading.webp`;

interface PostProps {
  post: {
    title: string;
    content: string;
    featuredImage: {
      node: {
        sourceUrl: string;
        altText: string;
        title: string;
      };
    } | null;
    slug: string;
    author: {
      node: {
        name: string;
        avatar: {
          url: string;
        };
      };
    };
    seo: {
      metaDesc: string;
      title: string;
      opengraphPublishedTime: string;
      readingTime: number;
    };
    categories: {
      nodes: { name: string; slug: string }[];
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

  const { toc, modifiedContent } = generateTableOfContents(post.content);
  const postUrl = `https://www.foudrecipes.com/${post.slug}`;

  return (
    <main className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6 mt-16 mb-16">
      <div className="lg:flex gap-8">
        <TableOfContents toc={toc} />
        <MainContent
          post={post}
          modifiedContent={modifiedContent}
          postUrl={postUrl}
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
}: {
  post: PostProps["post"];
  modifiedContent: string;
  postUrl: string;
}) => (
  <article className="lg:w-7/12 border-0 lg:border-x-2 border-slate-100 px-0 lg:px-8">
    <header>
      <nav aria-label="Breadcrumb" className="-mb-3">
        <ol className="flex justify-start items-center gap-2">
          <li className="text-gray-900 text-[13px] font-semibold">
            <Link href="/">Home</Link>
          </li>
          <li className="inline-block text-slate-500 text-sm">/</li>
          <li className="text-gray-900 text-[13px] font-semibold">
            <Link href={`/${post.categories.nodes[0].slug}`}>
              {post.categories.nodes[0].name}
            </Link>
          </li>
          <li className="inline-block text-slate-500 text-sm">/</li>
          <li
            className="text-gray-900 text-[13px] font-semibold"
            aria-current="page"
          >
            {truncateContent(post.title, 35)}
          </li>
        </ol>
      </nav>
      <h1
        className={`${archivo.className} text-3xl lg:text-4xl font-black text-gray-900`}
      >
        {post.title}
      </h1>
      <p className="text-slate-500 text-md my-5">{post.seo.metaDesc}</p>
      <div className="flex justify-start items-center gap-3 mb-8">
        <div
          className="h-11 w-11 bg-slate-200 rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${post.author.node.avatar.url})` }}
        ></div>
        <div className="flex justify-center items-start flex-col">
          <p className="text-gray-800 text-sm font-bold">
            BY:{" "}
            <Link
              href="/about"
              className="hover:text-gray-900 transition-all duration-500"
            >
              {post.author.node.name}
            </Link>
          </p>
          <time
            dateTime={post.seo.opengraphPublishedTime}
            className="text-slate-500 capitalize text-sm"
          >
            Updated: {formatDate(post.seo.opengraphPublishedTime)}
          </time>
        </div>
      </div>

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
          )}&text=${encodeURIComponent(post.title)}`}
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
            post.featuredImage?.node.sourceUrl || defaultImage
          )}&description=${encodeURIComponent(post.title)}`}
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
      {post.featuredImage && (
        <figure>
          <Image
            src={post.featuredImage.node.sourceUrl || defaultImage}
            alt={post.featuredImage.node.altText || post.title}
            title={post.featuredImage.node.title || post.title}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            width={500}
            height={300}
            className="mb-8 rounded w-full h-full"
          />
          {post.featuredImage.node.altText && (
            <figcaption className="sr-only">
              {post.featuredImage.node.altText}
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
