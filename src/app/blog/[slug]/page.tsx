import type { NextPage } from 'next';
import Image from "next/image";
import Link from "next/link";
import { getNewsArticles, getMockArticles } from '@/lib/strapi';
import { NewsArticle } from '@/types/casino';
import StructuredData from '@/components/StructuredData';
import { generateBreadcrumbStructuredData, generateArticleStructuredData } from '@/lib/seo';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  let article: NewsArticle | null = null;
  
  try {
    // Try to get the specific article from Strapi
    const articlesResponse = await getNewsArticles(1, 100);
    article = articlesResponse.data.find(a => a.attributes.slug === slug) || null;
  } catch (error) {
    // Fallback to mock articles
    const mockArticles = await getMockArticles();
    article = mockArticles.find(a => a.attributes.slug === slug) || null;
  }

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  const title = `${article.attributes.title} | myHighRoller Canada`;
  const description = article.attributes.excerpt || article.attributes.title;

  return {
    title,
    description,
    keywords: `${article.attributes.category}, casino guide, gambling tips, ${article.attributes.title}`,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/blog/${slug}`,
      publishedTime: article.attributes.publishedDate,
      modifiedTime: article.attributes.updatedAt,
      authors: [article.attributes.author || 'Casino Expert'],
      section: article.attributes.category,
      images: article.attributes.featuredImage?.data?.attributes?.url ? [{
        url: article.attributes.featuredImage.data.attributes.url,
        width: 1200,
        height: 630,
        alt: article.attributes.title,
      }] : [],
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      images: article.attributes.featuredImage?.data?.attributes?.url ? [article.attributes.featuredImage.data.attributes.url] : [],
    },
  };
}

const BlogPostPage: NextPage<BlogPostPageProps> = async ({ params }) => {
  const { slug } = await params;
  
  let article: NewsArticle | null = null;
  
  try {
    // Try to get the specific article from Strapi
    const articlesResponse = await getNewsArticles(1, 100);
    article = articlesResponse.data.find(a => a.attributes.slug === slug) || null;
  } catch (error) {
    // Fallback to mock articles
    const mockArticles = await getMockArticles();
    article = mockArticles.find(a => a.attributes.slug === slug) || null;
  }

  if (!article) {
    notFound();
  }
  
  // Generate breadcrumb structured data
  const breadcrumbs = [
    { name: 'Home', url: 'https://myhighroller.ca' },
    { name: 'Blog', url: 'https://myhighroller.ca/blog' },
    { name: article.attributes.title, url: `https://myhighroller.ca/blog/${slug}` },
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
          
          <nav className="hidden lg:flex items-center gap-6 text-lg text-gray-300">
            <Link href="/" className="hover:text-firebrick-200 transition-colors">Home</Link>
            <Link href="/casinos/categories" className="flex items-center gap-1 hover:text-firebrick-200 transition-colors">
              <span>Casino Categories</span>
              <Image src="/CaretDown.svg" alt="" width={14} height={16} />
            </Link>
            <Link href="/blog" className="hover:text-firebrick-200 transition-colors">Blog</Link>
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

      {/* Main Content */}
      <div className="py-8 px-4 lg:px-[120px]">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl lg:text-[48px] leading-[130%] font-bold text-gray-300 mb-4">
              Top 5 No-Deposit Casinos for Canadian Players in 2025
            </h1>
            <div className="text-lg text-gray-100 mb-6">July 17, 2025</div>
          </header>

          {/* Hero Image */}
          <div className="relative rounded-2xl overflow-hidden mb-8">
            <div className="aspect-[2/1] bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center">
              <div className="text-8xl">🎰</div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-[150%] text-gray-100 font-onest mb-6">
              No-deposit bonus casinos are a great way to start gambling online without risking your own money. In 2025, Canadian players have access to a growing number of licensed sites offering free spins or bonus funds simply for signing up.
            </p>

            <p className="text-lg leading-[150%] text-gray-100 font-onest mb-8">
              In this article, we've handpicked the top 5 platforms offering the best no-deposit deals — based on licensing, payout speed, and bonus terms.
            </p>

            {/* How to Choose Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-300 mb-4">How to Choose the Best Online Casino in Canada</h2>
              <p className="text-lg leading-[150%] text-gray-100 font-onest mb-4">
                Looking for risk-free ways to explore real money casinos in Canada? No-deposit bonuses are the perfect way to start. In this guide, we explore the best options for 2025.
              </p>
            </section>

            {/* Top 5 No-Deposit Casinos Table */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-300 mb-6">Top 5 No-Deposit Casinos for 2025</h2>
              
              {/* Casino Cards */}
              <div className="space-y-6">
                {/* Gamdom Casino */}
                <div className="bg-white border border-gray-300 rounded-2xl p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-300 mb-2">Gamdom Casino</h3>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-center gap-2">
                          <Image src="/CheckCircle.svg" alt="" width={20} height={20} className="text-seagreen" />
                          <span className="text-gray-100">25 Free Spins on Book of Dead</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Image src="/CheckCircle.svg" alt="" width={20} height={20} className="text-seagreen" />
                          <span className="text-gray-100">Licensed by Curacao</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Image src="/CheckCircle.svg" alt="" width={20} height={20} className="text-seagreen" />
                          <span className="text-gray-100">Instant withdrawals via Interac</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-300 mb-2">LuckyDays Casino</h3>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-center gap-2">
                          <Image src="/CheckCircle.svg" alt="" width={20} height={20} className="text-seagreen" />
                          <span className="text-gray-100">C$10 free on signup</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Image src="/CheckCircle.svg" alt="" width={20} height={20} className="text-seagreen" />
                          <span className="text-gray-100">MGA Licensed</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Image src="/CheckCircle.svg" alt="" width={20} height={20} className="text-seagreen" />
                          <span className="text-gray-100">Fast e-wallet withdrawals</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* What is No-Deposit Bonus Info Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-12">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">!</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-300 mb-3">What is a No-Deposit Bonus?</h3>
                  <p className="text-lg leading-[150%] text-gray-100 font-onest">
                    A no-deposit bonus allows you to enjoy casino games and win real money without depositing your own funds. It's a common welcome offer and is ideal for beginners who want to explore before committing.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Image */}
            <div className="relative rounded-2xl overflow-hidden mb-12">
              <div className="aspect-[2/1] bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center">
                <div className="text-8xl">🎰</div>
              </div>
            </div>

            <p className="text-lg leading-[150%] text-gray-100 font-onest mb-8">
              Looking for risk-free ways to explore real-money casinos in Canada? No-deposit bonuses are the perfect way to start. In this guide, we explore the best options for 2025.
            </p>

            {/* FAQ Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-300 mb-6">Common Questions About Best Online Casino Canada</h2>
              
              <div className="space-y-4">
                {/* FAQ Item 1 */}
                <div className="bg-white border border-gray-300 rounded-2xl p-6">
                  <button className="flex items-center justify-between w-full text-left">
                    <h3 className="text-xl font-bold text-gray-300">What is the best online casino Canada for real money play?</h3>
                    <Image src="/CaretDown.svg" alt="" width={24} height={24} />
                  </button>
                </div>

                {/* FAQ Item 2 - Expanded */}
                <div className="bg-white border border-gray-300 rounded-2xl p-6">
                  <button className="flex items-center justify-between w-full text-left mb-4">
                    <h3 className="text-xl font-bold text-gray-300">What payment methods are common for Canadian players?</h3>
                    <Image src="/CaretUp.svg" alt="" width={24} height={24} />
                  </button>
                  <p className="text-lg leading-[150%] text-gray-100 font-onest">
                    Canadian players frequently use Interac for deposits and withdrawals due to its convenience, security, and direct integration with Canadian banks. Other popular options include major credit cards (Visa, Mastercard), various e-wallets (e.g., EcoPayz, MuchBetter), and increasingly, cryptocurrencies. We assess each casino's banking options for Canadian compatibility and efficiency.
                  </p>
                </div>

                {/* FAQ Item 3 */}
                <div className="bg-white border border-gray-300 rounded-2xl p-6">
                  <button className="flex items-center justify-between w-full text-left">
                    <h3 className="text-xl font-bold text-gray-300">Can I play on my mobile device at Canadian online casinos?</h3>
                    <Image src="/CaretDown.svg" alt="" width={24} height={24} />
                  </button>
                </div>

                {/* FAQ Item 4 */}
                <div className="bg-white border border-gray-300 rounded-2xl p-6">
                  <button className="flex items-center justify-between w-full text-left">
                    <h3 className="text-xl font-bold text-gray-300">Are winnings from online casinos taxed in Canada?</h3>
                    <Image src="/CaretDown.svg" alt="" width={24} height={24} />
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Recommended Articles Section */}
          <section className="mt-16 mb-8">
            <h2 className="text-2xl font-bold text-gray-300 mb-8">Recommended Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((item) => (
                <article key={item} className="bg-white border border-silver rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-steelblue rounded-lg h-[160px] mb-3 overflow-hidden relative">
                    <div className="w-full h-full bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center">
                      <div className="text-6xl">🎰</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-skyblue text-darkslategray text-sm font-semibold px-3 py-1 rounded-full">
                      Bonuses
                    </span>
                    <span className="text-sm text-gray-100">July 17, 2025</span>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-300 leading-[130%] mb-2">
                      Top Casino Welcome Bonuses for Canadian Players in 2025
                    </h3>
                    <p className="text-base leading-[150%] text-gray-100 font-onest">
                      Explore the most rewarding welcome offers, with fair wagering terms and free spins.
                    </p>
                  </div>
                  
                  <Link 
                    href="/blog/top-casino-welcome-bonuses-canadian-players-2025"
                    className="block w-full bg-firebrick-200 text-white font-bold py-2 text-center rounded-lg hover:bg-firebrick-100 transition-colors text-sm"
                  >
                    Read More
                  </Link>
                </article>
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="flex justify-between">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Image src="/CaretLeft.svg" alt="Previous" width={16} height={16} />
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Image src="/CaretRight.svg" alt="Next" width={16} height={16} />
              </button>
            </div>
          </section>
        </div>
      </div>

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
      <StructuredData data={generateArticleStructuredData(article)} />
    </div>
  );
};

export default BlogPostPage;
