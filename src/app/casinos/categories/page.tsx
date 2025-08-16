import type { NextPage } from 'next';
import Image from "next/image";
import Link from "next/link";
import { getCasinos, getCategories, getPaymentMethods, getMockCasinos, getMockCategories } from '@/lib/strapi';
import { Casino, Category, PaymentMethod } from '@/types/casino';
import CasinoCard from '@/components/CasinoCard';
import CategoriesFilters from '@/components/CategoriesFilters';
import StructuredData from '@/components/StructuredData';
import { generateBreadcrumbStructuredData } from '@/lib/seo';
import { Metadata } from 'next';

interface CategoriesPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
    sortBy?: string;
    minDeposit?: string;
  }>;
}

export async function generateMetadata({ searchParams }: CategoriesPageProps): Promise<Metadata> {
  const params = await searchParams;
  const currentCategory = params.category;
  
  let categoryName = '';
  try {
    if (currentCategory) {
      const categoriesResponse = await getCategories();
      const category = categoriesResponse.data.find(cat => cat.attributes.slug === currentCategory);
      categoryName = category ? ` - ${category.attributes.name}` : '';
    }
  } catch (error) {
    // Fallback - use current category from params
    categoryName = currentCategory ? ` - ${currentCategory.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}` : '';
  }

  const title = `Best Online Casinos Canada 2025${categoryName} | Casino Reviews`;
  const description = `Find the best online casinos in Canada${categoryName ? ` for ${categoryName.slice(3).toLowerCase()}` : ''}. Expert reviews, exclusive bonuses, fast payouts, and safe gaming. Licensed and trusted by Canadian players.`;

  return {
    title,
    description,
    keywords: `online casino Canada${categoryName ? `, ${categoryName.slice(3).toLowerCase()} casinos` : ''}, casino reviews, gambling Canada, casino bonuses, Interac casinos, safe online gambling`,
    alternates: {
      canonical: `/casinos/categories${currentCategory ? `?category=${currentCategory}` : ''}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/casinos/categories${currentCategory ? `?category=${currentCategory}` : ''}`,
    },
    twitter: {
      title,
      description,
    },
  };
}

const CategoriesPage: NextPage<CategoriesPageProps> = async ({ searchParams }) => {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const pageSize = 9;

  let casinos: Casino[] = [];
  let categories: Category[] = [];
  let paymentMethods: PaymentMethod[] = [];
  
  try {
    // Try to fetch from Strapi API
    const [casinosResponse, categoriesResponse, paymentMethodsResponse] = await Promise.all([
      getCasinos({
        search: params.search,
        categories: params.category ? [params.category] : undefined,
        sortBy: params.sortBy as any,
        minDeposit: params.minDeposit ? parseInt(params.minDeposit) : undefined,
      }, page, pageSize),
      getCategories(),
      getPaymentMethods()
    ]);
    
    casinos = casinosResponse.data;
    categories = categoriesResponse.data;
    paymentMethods = paymentMethodsResponse.data;
  } catch (error) {
    console.error('Failed to fetch from Strapi, using mock data:', error);
    // Fallback to mock data
    const mockCasinos = await getMockCasinos();
    const mockCategories = await getMockCategories();
    
    casinos = Array.from({ length: 9 }, (_, i) => ({
      ...mockCasinos[0],
      id: i + 1,
      attributes: {
        ...mockCasinos[0].attributes,
        name: `${mockCasinos[0].attributes.name} ${i + 1}`,
        slug: `${mockCasinos[0].attributes.slug}-${i + 1}`,
      }
    }));
    categories = mockCategories;
    paymentMethods = [];
  }
  
  // Generate breadcrumb structured data
  const breadcrumbs = [
    { name: 'Home', url: 'https://myhighroller.ca' },
    { name: 'Casinos', url: 'https://myhighroller.ca/casinos/categories' },
  ];
  
  if (params.category) {
    const category = categories.find(cat => cat.attributes.slug === params.category);
    if (category) {
      breadcrumbs.push({ 
        name: category.attributes.name, 
        url: `https://myhighroller.ca/casinos/categories?category=${params.category}` 
      });
    }
  }

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
            <div className="flex items-center gap-1">
              <span>Casino Categories</span>
              <Image src="/CaretDown.svg" alt="" width={14} height={16} />
            </div>
            <Link href="#" className="hover:text-firebrick-200 transition-colors">Blog</Link>
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
          <span className="text-gray-300">Categories</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-ghostwhite-200 py-16 px-4 lg:px-[120px] text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-[48px] leading-[130%] font-bold text-gray-300 mb-4">
            Best Online Casinos by Category
          </h1>
          <p className="text-lg leading-[150%] text-gray-100 font-onest">
            Find the perfect casino for your needs using filters and expert rankings.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-8 px-4 lg:px-[120px]">
        <div className="max-w-6xl mx-auto">
          <CategoriesFilters
            categories={categories}
            paymentMethods={paymentMethods}
            sortOptions={[
              { label: 'Rating (High to Low)', value: 'rating-desc' },
              { label: 'Rating (Low to High)', value: 'rating-asc' },
              { label: 'Newest First', value: 'date-desc' },
              { label: 'Oldest First', value: 'date-asc' },
              { label: 'Name (A-Z)', value: 'name-asc' },
              { label: 'Name (Z-A)', value: 'name-desc' },
              { label: 'Bonus Amount (High to Low)', value: 'bonus-desc' },
            ]}
          />

          {/* Casino Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {casinos?.map((casino) => (
              <CasinoCard key={casino.id} casino={casino} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mb-8">
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
          </div>

          <nav className="flex flex-wrap items-center justify-center lg:justify-between gap-4 lg:gap-6 py-6 text-lg font-bold">
            <Link href="/" className="hover:text-gray-100 transition-colors">Home</Link>
            <Link href="/casinos/categories" className="hover:text-gray-100 transition-colors">Casino Categories</Link>
            <Link href="#" className="hover:text-gray-100 transition-colors">Blog</Link>
            <Link href="/about-us" className="hover:text-gray-100 transition-colors">About Us</Link>
            <Link href="/responsible-gambling" className="hover:text-gray-100 transition-colors">Responsible Gambling</Link>
            <Link href="/privacy-policy" className="hover:text-gray-100 transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-gray-100 transition-colors">Terms & Conditions</Link>
          </nav>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 pt-4 border-t border-gray-100/20">
            <div className="flex items-center gap-2 text-sm text-gray-100">
              <span className="font-semibold">Licensed by </span>
              <strong>Kahnawake Gaming Commission, Curacao eGaming</strong>
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

export default CategoriesPage;
