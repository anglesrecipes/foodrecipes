export interface CommentAuthor {
    name: string;
    email?: string;
    avatar_urls?: {
      [key: string]: string;
    };
  }
  
  export interface CommentContent {
    rendered: string;
    raw?: string;
  }
  
  export interface Comment {
    id: number;
    author: number;
    author_name: string;
    author_email?: string;
    author_url?: string;
    author_avatar_urls: {
      [key: string]: string;
    };
    date: string;
    date_gmt: string;
    content: CommentContent;
    status: string;
    parent: number;
    post: number;
  }
  
  export interface CommentFormData {
    author_name: string;
    author_email: string;
    content: string;
  }
  