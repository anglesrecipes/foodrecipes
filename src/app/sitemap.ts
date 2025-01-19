import { MetadataRoute } from "next";
import client from "@/apis/apollo/apollo-client";
import { gql } from "@apollo/client";

const GET_SITEMAP_DATA = gql`
  query GetSitemapData {
    posts(first: 1000) {
      nodes {
        slug
        modified
      }
    }
    categories(first: 100) {
      nodes {
        slug
        posts {
          nodes {
            modified
          }
        }
      }
    }
    pages(first: 100) {
      nodes {
        slug
        modified
      }
    }
  }
`;

interface SitemapNode {
  slug: string;
  modified: string;
  posts?: {
    nodes: {
      modified: string;
    }[];
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const frontendBaseUrl = 'https://www.foudrecipes.com'; // Ensure it's defined here

  try {
    const { data } = await client.query({
      query: GET_SITEMAP_DATA,
    });

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Add home page
    sitemapEntries.push({
      url: frontendBaseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });

    // Process posts
    data.posts.nodes.forEach((post: SitemapNode) => {
      sitemapEntries.push({
        url: `${frontendBaseUrl}/${post.slug}`,
        lastModified: new Date(post.modified),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });

    // Process categories
    data.categories.nodes.forEach((category: SitemapNode) => {
      const lastModified = category.posts?.nodes[0]?.modified || new Date().toISOString();
      sitemapEntries.push({
        url: `${frontendBaseUrl}/${category.slug}`,
        lastModified: new Date(lastModified),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });

    // Process pages
    data.pages.nodes.forEach((page: SitemapNode) => {
      sitemapEntries.push({
        url: `${frontendBaseUrl}/${page.slug}`,
        lastModified: new Date(page.modified),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });

    return sitemapEntries;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [{
      url: 'https://www.foudrecipes.com',
      lastModified: new Date(),
    }];
  }
}
