import { client } from "@/apis/graphql/graphql-client";

export interface Author {
  id: string;
  name: string;
  avatar: {
    url: string;
  };
  description: string;
}

export const GET_AUTHOR = `
query getAuthordata {
  user(id: "1", idType: DATABASE_ID) {
    id
    name
    avatar {
      url
    }
    description
  }
}
`;

export async function author_details(): Promise<Author | null> {
  try {
    const data = await client.request<{ user: Author }>(GET_AUTHOR);
    return data.user;
  } catch (error) {
    console.error("Error fetching author details:", error);
    return null;
  }
}
