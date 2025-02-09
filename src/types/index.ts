// ./src/types/index.ts
export interface Post {
    id: number;
    title: {
      rendered: string;
    };
    slug: string;
    content: {
      rendered: string;
    };
    date: string;
    _embedded: {
      "wp:featuredmedia"?: {
        source_url: string;
        alt_text: string;
      }[];
    };
  }