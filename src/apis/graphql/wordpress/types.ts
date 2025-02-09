export interface Comment {
    id: number;
    post: number;
    content: {
      rendered: string;
    };
    author_name: string;
    author_email: string;
    date: string;
    author_avatar_urls: {
      [key: string]: string;
    };
  }
  
  export interface Error {
    message: string;
  }
  