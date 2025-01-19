import { gql } from "@apollo/client";
import client from "@/apis/apollo/apollo-client";
import BlogPosts from "@/app/components/Dynamic/Pages/Blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Blog",
    template: "%s | foudrecipes",
  },
  description: "Get expert tire maintenance tips and wheel guides from our automotive blog. Learn about pressure, sizing, and safety to maximize your vehicle's performance.",
  openGraph: {
    title: "Blog | foudrecipes",
    description: "Get expert tire maintenance tips and wheel guides from our automotive blog. Learn about pressure, sizing, and safety to maximize your vehicle's performance.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Define types for the data returned by the GraphQL query
interface Post {
  id: string;
  date: string;
  title: string;
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
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

const GET_INITIAL_POSTS = gql`
  query GetInitialPosts {
    posts(first: 9, where: { status: PUBLISH }) {
      edges {
        node {
          id
          date
          title
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

export default async function BlogPage() {
  const { data } = await client.query<QueryResult>({
    query: GET_INITIAL_POSTS,
  });

  return (
    <section
      className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6 mb-20 mt-20"
      aria-label="Blog Page"
    >
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-4xl font-bold mb-3.5">Blog</h1>
        <p className="text-gray-800 font-semibold mb-10 max-w-[600px]">
          Your go-to blog for tire tips, guides, and updates. Explore expert
          advice on tire pressure, sizes, and wheels to keep your vehicle safe
          and performing at its best.
        </p>
      </div>
      <BlogPosts
        initialPosts={data.posts.edges.map((edge) => edge.node)}
        initialHasNextPage={data.posts.pageInfo.hasNextPage}
        initialEndCursor={data.posts.pageInfo.endCursor}
      />
    </section>
  );
}
