import { gql } from "graphql-request";
import { client } from "@/apis/graphql/graphql-client";

export interface Category {
    id: string;
    name: string;
    slug: string;
    categoryImage: string;
    conetnt: string;
    posts: {
        nodes: {
            slug: string;
            title: string;
            date: string;
            content: string;
        }[];
    };
}

interface CategoriesQueryResult {
    categories: {
        nodes: Category[];
    };
}

const GET_CATEGORIES = gql`
  query GetTopLevelCategories {
    categories(where: { parent: null }) {
      nodes {
        id
        name
        categoryImage
        slug
        posts {
          nodes {
            slug
            date
            title
            content
          }
        }
      }
    }
  }
`;

export async function getCategories(): Promise<Category[]> {
    try {
        const data = await client.request<CategoriesQueryResult>(GET_CATEGORIES);
        return data.categories.nodes;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}
