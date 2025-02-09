// ./src/apis/wordpress/fetchData.ts
export async function fetchCategoryData(slug: string) {
    const response = await fetch(
      `https://dev-foudrecipes.pantheonsite.io/wp-json/wp/v2/categories?slug=${slug}`
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch category data");
    }
  
    const categories = await response.json();
    return categories[0];
  }
  
  export async function fetchCategoryPosts(categoryId: number, page = 1, perPage = 10) {
    const response = await fetch(
      `https://dev-foudrecipes.pantheonsite.io/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${perPage}&page=${page}&_embed`
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch category posts");
    }
  
    return await response.json();
  }
  
  export async function fetchPostData(slug: string) {
    const response = await fetch(
      `https://dev-foudrecipes.pantheonsite.io/wp-json/wp/v2/posts?slug=${slug}&_embed`
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch post data");
    }
  
    const posts = await response.json();
    return posts[0];
  }
  