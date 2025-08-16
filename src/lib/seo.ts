import { Metadata } from 'next';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

export function generateMetadata(data: SEOData): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://myhighroller.ca';
  
  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords || 'casino, online casino, Canada, gambling, slots, casino reviews, bonuses',
    
    // Open Graph
    openGraph: {
      title: data.title,
      description: data.description,
      url: data.canonical || baseUrl,
      siteName: 'myHighRoller Canada',
      locale: 'en_CA',
      type: data.type || 'website',
      images: data.image ? [{
        url: data.image,
        width: 1200,
        height: 630,
        alt: data.title,
      }] : [],
      ...(data.type === 'article' && {
        publishedTime: data.publishedTime,
        modifiedTime: data.modifiedTime,
        authors: data.author ? [data.author] : undefined,
        section: data.section,
      }),
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: data.image ? [data.image] : [],
      site: '@myhighroller',
      creator: '@myhighroller',
    },
    
    // Additional meta tags
    alternates: {
      canonical: data.canonical || baseUrl,
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateBreadcrumbStructuredData(breadcrumbs: Array<{name: string, url: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'myHighRoller Canada',
    url: 'https://myhighroller.ca',
    logo: 'https://myhighroller.ca/logo.png',
    description: 'Independent Canadian Online Casino Reviews 2025. Find trusted sites, top bonuses, fast payouts, and expert reviews for Canadian players.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-123-4567',
      contactType: 'customer service',
      availableLanguage: ['English', 'French'],
    },
    sameAs: [
      'https://facebook.com/myhighroller',
      'https://twitter.com/myhighroller',
      'https://instagram.com/myhighroller',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CA',
    },
  };
}

export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'myHighRoller Canada',
    url: 'https://myhighroller.ca',
    description: 'Independent Canadian Online Casino Reviews 2025',
    publisher: {
      '@type': 'Organization',
      name: 'myHighRoller Canada',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://myhighroller.ca/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateCasinoReviewStructuredData(casino: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: casino.attributes.name,
      description: casino.attributes.description,
      url: casino.attributes.websiteUrl,
      image: casino.attributes.logo?.data?.attributes?.url,
      priceRange: '$',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: casino.attributes.rating,
        bestRating: 5,
        worstRating: 1,
        ratingCount: 100,
      },
    },
    author: {
      '@type': 'Organization',
      name: 'myHighRoller Canada',
    },
    publisher: {
      '@type': 'Organization',
      name: 'myHighRoller Canada',
      logo: {
        '@type': 'ImageObject',
        url: 'https://myhighroller.ca/logo.png',
      },
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: casino.attributes.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: casino.attributes.shortDescription,
  };
}

export function generateArticleStructuredData(article: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.attributes.title,
    description: article.attributes.excerpt,
    author: {
      '@type': 'Person',
      name: article.attributes.author || 'Casino Expert',
    },
    publisher: {
      '@type': 'Organization',
      name: 'myHighRoller Canada',
      logo: {
        '@type': 'ImageObject',
        url: 'https://myhighroller.ca/logo.png',
      },
    },
    datePublished: article.attributes.publishedDate,
    dateModified: article.attributes.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://myhighroller.ca/blog/${article.attributes.slug}`,
    },
    image: article.attributes.featuredImage?.data?.attributes?.url,
    articleSection: article.attributes.category,
    wordCount: article.attributes.content?.split(' ').length || 1000,
    timeRequired: `PT${article.attributes.readTime || 5}M`,
  };
}

export function generateFAQStructuredData(faqItems: any[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.attributes.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.attributes.answer,
      },
    })),
  };
}
