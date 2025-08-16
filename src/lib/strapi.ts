import { Casino, Category, PaymentMethod, NewsArticle, CasinoFilters, StrapiResponse, TeamMember, Testimonial, FAQItem, SiteSettings, ContactSubmission } from '@/types/casino';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

interface FetchOptions {
  headers?: Record<string, string>;
  cache?: RequestCache;
  next?: {
    revalidate?: number;
  };
}

async function fetchAPI(path: string, options: FetchOptions = {}) {
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_API_TOKEN) {
    defaultHeaders.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const mergedOptions: RequestInit = {
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    cache: options.cache || 'force-cache',
  };

  if (options.next) {
    (mergedOptions as any).next = options.next;
  }

  const requestUrl = `${STRAPI_URL}/api${path}`;
  
  try {
    const response = await fetch(requestUrl, mergedOptions);
    
    if (!response.ok) {
      console.error(`API request failed: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch data from ${requestUrl}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function getCasinos(
  filters: CasinoFilters = {},
  page = 1,
  pageSize = 12
): Promise<StrapiResponse<Casino[]>> {
  let query = `/casinos?populate[0]=logo&populate[1]=heroImage&populate[2]=categories&populate[3]=paymentMethods&populate[4]=licenses&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

  // Add filters
  if (filters.search) {
    query += `&filters[name][$containsi]=${encodeURIComponent(filters.search)}`;
  }

  if (filters.categories?.length) {
    filters.categories.forEach((category, index) => {
      query += `&filters[categories][slug][$in][${index}]=${category}`;
    });
  }

  if (filters.minDeposit) {
    query += `&filters[minDeposit][$gte]=${filters.minDeposit}`;
  }

  // Add sorting
  if (filters.sortBy) {
    const order = filters.sortOrder || 'desc';
    query += `&sort[0]=${filters.sortBy}:${order}`;
  } else {
    query += `&sort[0]=rating:desc`;
  }

  return fetchAPI(query, {
    next: { revalidate: 300 }, // 5 minutes
  });
}

export async function getCasinoBySlug(slug: string): Promise<StrapiResponse<Casino[]>> {
  const query = `/casinos?filters[slug][$eq]=${slug}&populate[0]=logo&populate[1]=heroImage&populate[2]=categories&populate[3]=paymentMethods&populate[4]=games&populate[5]=licenses`;
  
  return fetchAPI(query, {
    next: { revalidate: 300 },
  });
}

export async function getFeaturedCasinos(limit = 4): Promise<StrapiResponse<Casino[]>> {
  const query = `/casinos?populate[0]=logo&populate[1]=heroImage&populate[2]=categories&populate[3]=paymentMethods&filters[featured][$eq]=true&pagination[pageSize]=${limit}&pagination[page]=0&sort[0]=rating:desc`;
  
  return fetchAPI(query, {
    next: { revalidate: 300 },
  });
}

export async function getCategories(): Promise<StrapiResponse<Category[]>> {
  const query = `/categories?sort[0]=name:asc`;
  
  return fetchAPI(query, {
    next: { revalidate: 3600 }, // 1 hour
  });
}

export async function getPaymentMethods(): Promise<StrapiResponse<PaymentMethod[]>> {
  const query = `/payment-methods?populate[0]=logo&sort[0]=name:asc`;
  
  return fetchAPI(query, {
    next: { revalidate: 3600 },
  });
}

export async function getNewsArticles(page = 1, pageSize = 6): Promise<StrapiResponse<NewsArticle[]>> {
  const query = `/news-articles?populate[0]=featuredImage&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=publishedDate:desc`;
  
  return fetchAPI(query, {
    next: { revalidate: 300 },
  });
}

export async function searchCasinos(searchTerm: string, limit = 10): Promise<StrapiResponse<Casino[]>> {
  const query = `/casinos?filters[name][$containsi]=${encodeURIComponent(searchTerm)}&populate[0]=logo&pagination[pageSize]=${limit}`;
  
  return fetchAPI(query, {
    cache: 'no-store',
  });
}

export async function getTeamMembers(): Promise<StrapiResponse<TeamMember[]>> {
  const query = `/team-members?populate[0]=avatar&sort[0]=order:asc`;
  
  return fetchAPI(query, {
    next: { revalidate: 3600 },
  });
}

export async function getTestimonials(page = 1, pageSize = 8): Promise<StrapiResponse<Testimonial[]>> {
  const query = `/testimonials?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=createdAt:desc&filters[isVerified][$eq]=true`;
  
  return fetchAPI(query, {
    next: { revalidate: 1800 },
  });
}

export async function getFAQItems(category?: string): Promise<StrapiResponse<FAQItem[]>> {
  let query = `/faq-items?sort[0]=order:asc`;
  
  if (category) {
    query += `&filters[category][$eq]=${category}`;
  }
  
  return fetchAPI(query, {
    next: { revalidate: 3600 },
  });
}

export async function getSiteSettings(): Promise<StrapiResponse<SiteSettings[]>> {
  const query = `/site-settings`;
  
  return fetchAPI(query, {
    next: { revalidate: 3600 },
  });
}

export async function submitContactForm(data: ContactSubmission): Promise<any> {
  const response = await fetch(`${STRAPI_URL}/api/contact-submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit form');
  }

  return response.json();
}

export async function submitReview(data: ContactSubmission): Promise<any> {
  const reviewData = {
    ...data,
    type: 'review' as const,
  };

  return submitContactForm(reviewData);
}

// Utility function to get media URL
export function getStrapiMediaURL(media: any): string {
  if (!media?.data?.attributes?.url) {
    return '/Logo.svg'; // fallback image
  }

  const { url } = media.data.attributes;
  
  if (url.startsWith('/')) {
    return `${STRAPI_URL}${url}`;
  }
  
  return url;
}

// Mock data fallback functions (for development without Strapi)
export async function getMockCasinos(): Promise<Casino[]> {
  return [
    {
      id: 1,
      attributes: {
        name: "Gamdom Casino",
        slug: "gamdom-casino",
        description: "Fast payouts, 2000+ games, and exclusive C$1000 bonus for Canadian players.",
        shortDescription: "Fast payouts, 2000+ games, and exclusive C$1000 bonus for Canadian players.",
        rating: 4.5,
        userRating: 4.5,
        bonusAmount: "Exclusive C$1000 bonus",
        freeSpins: "100 Free Spins",
        isNew: true,
        fastPayouts: true,
        noDeposit: true,
        licenseInfo: "Licensed by Kahnawake Gaming Commission, Curacao eGaming",
        websiteUrl: "https://gamdom.com",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        publishedAt: "2024-01-01T00:00:00.000Z",
        minDeposit: "$10",
        maxPayout: "$50,000",
        withdrawalSpeed: "24-48 hours",
        customerSupport: "24/7 Live Chat, Email",
        pros: [
          "Fast withdrawals",
          "Great game selection",
          "Generous bonuses",
          "Mobile-friendly"
        ],
        cons: [
          "Limited customer support languages",
          "High wagering requirements on some bonuses"
        ],
        tags: [
          "slots", "cad", "welcome_bonus"
        ]
      }
    }
  ];
}

export async function getMockCategories(): Promise<Category[]> {
  return [
    {
      id: 1,
      attributes: {
        name: "New Casinos",
        slug: "new-casinos",
        description: "Latest casino sites with modern features",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        publishedAt: "2024-01-01T00:00:00.000Z"
      }
    },
    {
      id: 2,
      attributes: {
        name: "Crypto Casinos",
        slug: "crypto-casinos", 
        description: "Casinos accepting cryptocurrencies",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        publishedAt: "2024-01-01T00:00:00.000Z"
      }
    },
    {
      id: 3,
      attributes: {
        name: "Live Dealer",
        slug: "live-dealer",
        description: "Real dealers, real-time gaming",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z", 
        publishedAt: "2024-01-01T00:00:00.000Z"
      }
    }
  ];
}

export async function getMockArticles(): Promise<NewsArticle[]> {
  return [
    {
      id: 1,
      attributes: {
        title: "Top Casino Welcome Bonuses for Canadian Players in 2025",
        slug: "top-casino-welcome-bonuses-canadian-players-2025",
        excerpt: "Explore the most rewarding welcome offers, with fair wagering terms and free spins.",
        content: "Detailed content about casino bonuses...",
        category: "Bonuses",
        publishedDate: "2025-07-17T00:00:00.000Z",
        author: "Casino Expert",
        readTime: 5,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        publishedAt: "2024-01-01T00:00:00.000Z"
      }
    },
    {
      id: 2,
      attributes: {
        title: "Top 5 No-Deposit Casinos for Canadian Players in 2025",
        slug: "top-5-no-deposit-casinos-canadian-players-2025",
        excerpt: "No-deposit bonus casinos are a great way to start gambling online without risking your own money.",
        content: "In 2025, Canadian players have access to a growing number of licensed sites offering free spins or bonus funds simply for signing up...",
        category: "Bonuses",
        publishedDate: "2025-07-17T00:00:00.000Z",
        author: "Casino Expert",
        readTime: 8,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        publishedAt: "2024-01-01T00:00:00.000Z"
      }
    }
  ];
}

export async function getMockTeamMembers(): Promise<TeamMember[]> {
  return [
    {
      id: 1,
      attributes: {
        name: "Sarah M.",
        role: "Payment Systems Expert",
        expertise: "Payment Systems",
        description: "10+ years combined in the Canadian gaming industry.",
        yearsExperience: 10,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        publishedAt: "2024-01-01T00:00:00.000Z"
      }
    },
    {
      id: 2,
      attributes: {
        name: "Alex K.",
        role: "Customer Experience Expert",
        expertise: "Customer Experience",
        description: "10+ years combined in the Canadian gaming industry.",
        yearsExperience: 10,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        publishedAt: "2024-01-01T00:00:00.000Z"
      }
    },
    {
      id: 3,
      attributes: {
        name: "Mike T.",
        role: "Casino Games Expert",
        expertise: "Casino Games Analysis",
        description: "10+ years combined in the Canadian gaming industry.",
        yearsExperience: 10,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        publishedAt: "2024-01-01T00:00:00.000Z"
      }
    },
    {
      id: 4,
      attributes: {
        name: "Emma R.",
        role: "Responsible Gaming Expert",
        expertise: "Responsible Gaming & Analysis",
        description: "10+ years combined in the Canadian gaming industry.",
        yearsExperience: 10,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        publishedAt: "2024-01-01T00:00:00.000Z"
      }
    }
  ];
}

export async function getMockTestimonials(): Promise<Testimonial[]> {
  const baseReview = "Thanks to your reviews, I finally found a casino that paid out fast and supports Interac!";
  const names = ["David R.", "Sarah K.", "Daniel S.", "Rachel B.", "Michael T.", "Jennifer L.", "Robert M.", "Lisa D."];
  
  return names.map((name, index) => ({
    id: index + 1,
    attributes: {
      name,
      review: baseReview,
      rating: 5,
      isVerified: true,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
      publishedAt: "2024-01-01T00:00:00.000Z"
    }
  }));
}

export async function getMockFAQItems(): Promise<FAQItem[]> {
  return [
    {
      id: 1,
      attributes: {
        question: "What is the best online casino Canada for real money play?",
        answer: "The best online casino depends on your preferences, but we recommend casinos that are licensed, secure, and offer good bonuses.",
        category: "General",
        order: 1,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        publishedAt: "2024-01-01T00:00:00.000Z"
      }
    },
    {
      id: 2,
      attributes: {
        question: "What payment methods are common for Canadian players?",
        answer: "Canadian players frequently use Interac for deposits and withdrawals due to its convenience, security, and direct integration with Canadian banks. Other popular options include major credit cards (Visa, Mastercard), various e-wallets (e.g., EcoPayz, MuchBetter), and increasingly, cryptocurrencies.",
        category: "Payments",
        order: 2,
        isExpanded: true,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        publishedAt: "2024-01-01T00:00:00.000Z"
      }
    },
    {
      id: 3,
      attributes: {
        question: "Can I play on my mobile device at Canadian online casinos?",
        answer: "Yes, most modern Canadian online casinos offer mobile-optimized websites or dedicated mobile apps.",
        category: "General",
        order: 3,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        publishedAt: "2024-01-01T00:00:00.000Z"
      }
    },
    {
      id: 4,
      attributes: {
        question: "Are winnings from online casinos taxed in Canada?",
        answer: "In Canada, gambling winnings are generally not taxed for recreational players, but professional gamblers may need to pay taxes.",
        category: "Legal",
        order: 4,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        publishedAt: "2024-01-01T00:00:00.000Z"
      }
    }
  ];
}

export async function getMockSiteSettings(): Promise<SiteSettings> {
  return {
    id: 1,
    attributes: {
      siteName: "myHighRoller Canada",
      siteDescription: "Independent Canadian Online Casino Reviews 2025",
      contactEmail: "support@myhighroller.ca",
      supportEmail: "support@myhighroller.ca",
      phone: "+1-800-123-4567",
      socialMedia: {
        facebook: "https://facebook.com/myhighroller",
        twitter: "https://twitter.com/myhighroller",
        instagram: "https://instagram.com/myhighroller",
        linkedin: "https://linkedin.com/company/myhighroller",
        youtube: "https://youtube.com/myhighroller"
      },
      responseTime: "Within 24 hours",
      licenseInfo: "Licensed by Kahnawake Gaming Commission, Curacao eGaming",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
      publishedAt: "2024-01-01T00:00:00.000Z"
    }
  };
}
