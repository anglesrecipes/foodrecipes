import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Applies to all user agents
      allow: '/', // Allow crawling all pages
      disallow: '/private/', // Disallow private pages
    },
    sitemap: 'https://www.foudrecipes.com/sitemap.xml', // Update this to your actual sitemap URL
  };
}