import type { NextPage } from 'next';
import Image from "next/image";
import Link from "next/link";
import { getNewsArticles, getMockArticles } from '@/lib/strapi';
import { NewsArticle } from '@/types/casino';
import BlogFilters from '@/components/BlogFilters';
import StructuredData from '@/components/StructuredData';
import { generateBreadcrumbStructuredData } from '@/lib/seo';
import { Metadata } from 'next';

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Casino News & Guides | Expert Tips for Canadian Players",
  description: "Latest casino news, expert guides, and tips for Canadian players. Learn about bonuses, game strategies, payment methods, and responsible gambling. Updated daily.",
  keywords: "casino news, gambling guides, casino tips Canada, slot strategies, bonus guides, online gambling news, casino reviews, gambling tips",
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: "Casino News & Guides | Expert Tips for Canadian Players",
    description: "Latest casino news, expert guides, and tips for Canadian players. Learn about bonuses, game strategies, payment methods, and responsible gambling.",
    type: 'website',
    url: '/blog',
  },
  twitter: {
    title: "Casino News & Guides | Expert Tips for Canadian Players",
    description: "Latest casino news, expert guides, and tips for Canadian players.",
  },
};

const BlogPage: NextPage<BlogPageProps> = async ({ searchParams }) => {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const pageSize = 9;

  let articles: NewsArticle[] = [];
  
  try {
    const articlesResponse = await getNewsArticles(page, pageSize);
    articles = articlesResponse.data;
  } catch (error) {
    console.error('Failed to fetch articles from Strapi, using mock data:', error);
    const mockArticles = await getMockArticles();
    articles = mockArticles;
  }
  
  // Get unique categories from articles
  const categories = [...new Set(articles.map(article => article.attributes.category))];
  const categoryOptions = categories.map(category => ({
    label: category,
    value: category.toLowerCase().replace(/\s+/g, '-'),
    count: articles.filter(article => article.attributes.category === category).length
  }));
  
  // Sort options for articles
  const sortOptions = [
    { label: 'Newest First', value: 'date-desc' },
    { label: 'Oldest First', value: 'date-asc' },
    { label: 'Title (A-Z)', value: 'title-asc' },
    { label: 'Title (Z-A)', value: 'title-desc' },
    { label: 'Read Time (Short to Long)', value: 'read-time-asc' },
    { label: 'Read Time (Long to Short)', value: 'read-time-desc' },
  ];
  
  // Generate breadcrumb structured data
  const breadcrumbs = [
    { name: 'Home', url: 'https://myhighroller.ca' },
    { name: 'Blog', url: 'https://myhighroller.ca/blog' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white py-4 px-4 lg:px-[120px] border-b border-gray-100">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image 
              src="/Logo.svg" 
              alt="High Roller Casino" 
              width={178} 
              height={38}
              className="w-auto h-8 lg:h-10"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-lg text-gray-300">
            <Link href="/" className="hover:text-firebrick-200 transition-colors">Home</Link>
            <Link href="/casinos/categories" className="flex items-center gap-1 hover:text-firebrick-200 transition-colors">
              <span>Casino Categories</span>
              <Image src="/CaretDown.svg" alt="" width={14} height={16} />
            </Link>
            <span className="text-firebrick-200 font-semibold">Blog</span>
            <Link href="/about-us" className="hover:text-firebrick-200 transition-colors">About Us</Link>
            <Link href="/responsible-gambling" className="hover:text-firebrick-200 transition-colors">Responsible Gambling</Link>
            <Link href="/contact-us" className="hover:text-firebrick-200 transition-colors">Contact Us</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Image 
              src="/MagnifyingGlass.svg" 
              alt="Search" 
              width={24} 
              height={24}
              className="cursor-pointer hover:opacity-70 transition-opacity"
            />
            <Image 
              src="/Laguage.png" 
              alt="Language" 
              width={28} 
              height={28}
              className="rounded-full cursor-pointer hover:opacity-70 transition-opacity"
            />
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4 px-4 lg:px-[120px]">
        <div className="flex items-center gap-2 text-sm text-gray-100">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            <Image src="/House.svg" alt="Home" width={16} height={16} />
          </Link>
          <Image src="/CaretRight.svg" alt="" width={8} height={8} />
          <Link href="/casinos" className="hover:text-gray-300 transition-colors">Online Casinos</Link>
          <Image src="/CaretRight.svg" alt="" width={8} height={8} />
          <span className="text-gray-300">Gamdom</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-ghostwhite-200 py-16 px-4 lg:px-[120px] text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-[48px] leading-[130%] font-bold text-gray-300 mb-4">
            Latest Casino News & Guides
          </h1>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mt-8">
            <div className="relative">
              <Image 
                src="/MagnifyingGlass.svg" 
                alt="Search" 
                width={20} 
                height={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-100"
              />
              <input
                type="text"
                placeholder="Search articles by topic, category, etc."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 text-gray-300 placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-firebrick-200 focus:border-firebrick-200 hover:border-gray-400 transition-all duration-200 bg-white shadow-sm"
                defaultValue={params.search || ''}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-8 px-4 lg:px-[120px]">
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <BlogFilters
            categoryOptions={categoryOptions}
            sortOptions={sortOptions}
          />
          <p className="text-gray-100 font-onest">
            Showing {articles?.length || 0} articles
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {articles?.map((article, index) => (
            <article key={article.id} className="bg-white border border-silver rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              {/* Article Image */}
              <div className="bg-steelblue rounded-lg h-[200px] mb-3 overflow-hidden relative">
                <div className="w-full h-full bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center">
                  <div className="text-6xl">🎰</div>
                </div>
              </div>
              
              {/* Article Meta */}
              <div className="flex items-center justify-between mb-3">
                <span className="bg-skyblue text-darkslategray text-sm font-semibold px-3 py-1 rounded-full">
                  Bonuses
                </span>
                <span className="text-base text-gray-100">July 17, 2025</span>
              </div>
              
              {/* Article Content */}
              <div className="mb-5">
                <h3 className="text-xl font-bold text-gray-300 leading-[130%] mb-2">
                  Top Casino Welcome Bonuses for Canadian Players in 2025
                </h3>
                <p className="text-lg leading-[150%] text-gray-100 font-onest">
                  Explore the most rewarding welcome offers, with fair wagering terms and free spins.
                </p>
              </div>
              
              {/* Read More Button */}
              <Link 
                href={`/blog/${article.attributes.slug}`}
                className="block w-full bg-gradient-to-r from-firebrick-200 to-firebrick-100 text-white font-bold py-3 text-center rounded-xl hover:shadow-lg hover:scale-105 transform transition-all duration-200"
              >
                Read More
              </Link>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <button className="flex items-center justify-center w-10 h-10 rounded border border-gray-300 hover:bg-gray-50 transition-colors">
            <Image src="/CaretLeft.svg" alt="Previous" width={16} height={16} />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded bg-firebrick-200 text-white font-bold">
            1
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded border border-gray-300 hover:bg-gray-50 transition-colors font-bold text-gray-300">
            2
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded border border-gray-300 hover:bg-gray-50 transition-colors font-bold text-gray-300">
            3
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded border border-gray-300 hover:bg-gray-50 transition-colors font-bold text-gray-300">
            4
          </button>
          <span className="px-2">...</span>
          <button className="flex items-center justify-center w-10 h-10 rounded border border-gray-300 hover:bg-gray-50 transition-colors font-bold text-gray-300">
            123
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded border border-gray-300 hover:bg-gray-50 transition-colors">
            <Image src="/CaretRight.svg" alt="Next" width={16} height={16} />
          </button>
        </div>
      </div>

      {/* How to Choose Section */}
      <section className="bg-white py-20 px-4 lg:px-[120px]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-[40px] leading-[130%] font-bold text-gray-300 mb-6">
            How to Choose the Best Online Casino in Canada
          </h2>
          <div className="space-y-4 text-lg leading-[150%] text-gray-100 font-onest">
            <p>
              With hundreds of online casinos available to Canadian players in 2025, finding the right one can be overwhelming. That's why our comparison tools and expert filters help you narrow down your options based on what really matters: bonuses, payment methods, licenses, and payout speed.
            </p>
            <p>
              We only list trusted Canadian online casinos that are fully licensed by respected regulators like the Malta Gaming Authority (MGA), Curacao, or the Kahnawake Gaming Commission. This means you can play with confidence, knowing your funds and data are protected.
            </p>
            <p>
              Looking for fast withdrawals? Use the filter for instant payout casinos. Prefer to deposit with Interac or crypto? Select your preferred payment methods to see casinos that support them. Want to maximize value? Sort by highest bonus offers to find the most rewarding sites.
            </p>
            <p>
              Whether you're a casual player or a high roller, our casino list is designed to help you find the best online casino Canada has to offer — quickly, safely, and based on real data, not ads.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 py-10 px-4 lg:px-[120px] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
            <Image 
              src="/Logo.svg" 
              alt="High Roller Casino" 
              width={188} 
              height={40}
              className="w-auto h-10"
            />
            <Image 
              src="/Certificate.svg" 
              alt="License" 
              width={122} 
              height={36}
              className="rounded"
            />
          </div>

          <nav className="flex flex-wrap items-center justify-center lg:justify-between gap-4 lg:gap-6 py-6 text-lg font-bold">
            <Link href="/" className="hover:text-gray-100 transition-colors">Home</Link>
            <Link href="/casinos/categories" className="hover:text-gray-100 transition-colors">Casino Categories</Link>
            <Link href="/blog" className="hover:text-gray-100 transition-colors">Blog</Link>
            <Link href="/about-us" className="hover:text-gray-100 transition-colors">About Us</Link>
            <Link href="/responsible-gambling" className="hover:text-gray-100 transition-colors">Responsible Gambling</Link>
            <Link href="/privacy-policy" className="hover:text-gray-100 transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-gray-100 transition-colors">Terms & Conditions</Link>
          </nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 pt-4 border-t border-gray-100/20">
            <div className="flex items-center gap-2 text-sm text-gray-100">
              <Image 
                src="/Certificate.svg" 
                alt="License" 
                width={46} 
                height={32}
                className="opacity-70"
              />
              <div>
                <span className="font-semibold">Licensed by </span>
                <strong>Kahnawake Gaming Commission</strong>
                <span className="font-semibold">, </span>
                <strong>Curacao eGaming</strong>
              </div>
            </div>
            <div className="text-sm text-gray-100">
              © 2025 myHighRoller Canada. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      
      {/* Structured Data */}
      <StructuredData data={generateBreadcrumbStructuredData(breadcrumbs)} />
    </div>
  );
};

export default BlogPage;
