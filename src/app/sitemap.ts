import { MetadataRoute } from 'next';
import { getCasinos, getNewsArticles, getCategories, getMockCasinos, getMockArticles, getMockCategories } from '@/lib/strapi';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://myhighroller.ca';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/casinos/categories`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/responsible-gambling`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
  ];

  let casinoPages: MetadataRoute.Sitemap = [];
  let articlePages: MetadataRoute.Sitemap = [];
  let categoryPages: MetadataRoute.Sitemap = [];

  try {
    // Get casinos from Strapi
    const casinosResponse = await getCasinos({}, 1, 100);
    casinoPages = casinosResponse.data.map((casino) => ({
      url: `${baseUrl}/casinos/${casino.attributes.slug}`,
      lastModified: new Date(casino.attributes.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Get articles from Strapi
    const articlesResponse = await getNewsArticles(1, 100);
    articlePages = articlesResponse.data.map((article) => ({
      url: `${baseUrl}/blog/${article.attributes.slug}`,
      lastModified: new Date(article.attributes.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // Get categories from Strapi
    const categoriesResponse = await getCategories();
    categoryPages = categoriesResponse.data.map((category) => ({
      url: `${baseUrl}/casinos/categories?category=${category.attributes.slug}`,
      lastModified: new Date(category.attributes.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

  } catch (error) {
    console.error('Failed to fetch from Strapi for sitemap, using mock data:', error);
    
    // Fallback to mock data
    try {
      const mockCasinos = await getMockCasinos();
      casinoPages = mockCasinos.map((casino) => ({
        url: `${baseUrl}/casinos/${casino.attributes.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));

      const mockArticles = await getMockArticles();
      articlePages = mockArticles.map((article) => ({
        url: `${baseUrl}/blog/${article.attributes.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));

      const mockCategories = await getMockCategories();
      categoryPages = mockCategories.map((category) => ({
        url: `${baseUrl}/casinos/categories?category=${category.attributes.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    } catch (mockError) {
      console.error('Failed to fetch mock data for sitemap:', mockError);
    }
  }

  return [...staticPages, ...casinoPages, ...articlePages, ...categoryPages];
}
