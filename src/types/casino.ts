export interface Casino {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    logo?: Media;
    heroImage?: Media;
    rating: number;
    userRating: number;
    bonusAmount: string;
    freeSpins: string;
    isNew: boolean;
    fastPayouts: boolean;
    noDeposit: boolean;
    licenseInfo: string;
    websiteUrl: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    categories?: {
      data: Category[];
    };
    paymentMethods?: {
      data: PaymentMethod[];
    };
    games?: {
      data: Game[];
    };
    pros?: string[];
    cons?: string[];
    minDeposit?: string;
    maxPayout?: string;
    withdrawalSpeed?: string;
    customerSupport?: string;
    licenses?: License[];
    tags?: string[]; // For quiz matching system
  };
}

export interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface PaymentMethod {
  id: number;
  attributes: {
    name: string;
    logo?: Media;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Game {
  id: number;
  attributes: {
    name: string;
    provider: string;
    image?: Media;
    gameType: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface License {
  id: number;
  name: string;
  logo?: Media;
  authority: string;
}

export interface Media {
  data?: {
    id: number;
    attributes: {
      name: string;
      alternativeText?: string;
      caption?: string;
      width?: number;
      height?: number;
      formats?: any;
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl?: string;
      provider: string;
      provider_metadata?: any;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface CasinoFilters {
  categories?: string[];
  paymentMethods?: string[];
  withdrawalSpeed?: string[];
  bonusType?: string[];
  minDeposit?: number;
  gameProviders?: string[];
  search?: string;
  sortBy?: 'rating' | 'newest' | 'bonusAmount' | 'name';
  sortOrder?: 'asc' | 'desc';
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export interface NewsArticle {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage?: Media;
    category: string;
    publishedDate: string;
    author?: string;
    readTime?: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface TeamMember {
  id: number;
  attributes: {
    name: string;
    role: string;
    expertise: string;
    description: string;
    avatar?: Media;
    yearsExperience: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Testimonial {
  id: number;
  attributes: {
    name: string;
    review: string;
    rating: number;
    city?: string;
    isVerified: boolean;
    casino?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface FAQItem {
  id: number;
  attributes: {
    question: string;
    answer: string;
    category: string;
    order: number;
    isExpanded?: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject?: string;
  message: string;
  type?: 'contact' | 'review';
  city?: string;
  rating?: number;
}

export interface SiteSettings {
  id: number;
  attributes: {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    supportEmail: string;
    phone?: string;
    address?: string;
    socialMedia: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
      youtube?: string;
    };
    responseTime: string;
    licenseInfo: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Quiz System Types
export interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple';
  options: QuizOption[];
  category: 'games' | 'bonuses' | 'payments' | 'mobile' | 'experience';
}

export interface QuizOption {
  id: string;
  label: string;
  tags: string[];
  weight?: number;
}

export interface QuizAnswer {
  questionId: string;
  selectedOptions: string[];
}

export interface QuizResult {
  casino: Casino;
  matchScore: number;
  matchedCriteria: string[];
  recommendationReason: string;
}

export interface UserPreferences {
  gameTypes: string[];
  bonusTypes: string[];
  paymentMethods: string[];
  mobileImportance: boolean;
  experienceLevel: string;
  priorityFactors: string[];
}
