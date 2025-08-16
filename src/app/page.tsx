import type { NextPage } from 'next';
import Image from "next/image";
import Link from "next/link";
import { getFeaturedCasinos, getNewsArticles, getMockCasinos, getMockArticles, getCategories, getMockCategories, getStrapiMediaURL } from '@/lib/strapi';
import { Casino, NewsArticle, Category } from '@/types/casino';
import CasinoCard from '@/components/CasinoCard';
import HomePageFilters from '@/components/HomePageFilters';
import CasinoQuiz from '@/components/CasinoQuiz';
import StructuredData from '@/components/StructuredData';
import { generateOrganizationStructuredData, generateWebsiteStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo';

const HomePage: NextPage = async () => {
  // Fetch data from Strapi API with fallback to mock data
  let featuredCasinos: Casino[] = [];
  let newsArticles: NewsArticle[] = [];
  let categories: Category[] = [];
  
  try {
    const [casinosResponse, articlesResponse, categoriesResponse] = await Promise.all([
      getFeaturedCasinos(8),
      getNewsArticles(1, 6),
      getCategories()
    ]);
    
    featuredCasinos = casinosResponse.data;
    newsArticles = articlesResponse.data;
    categories = categoriesResponse.data;
  } catch (error) {
    console.error('Failed to fetch from Strapi, using mock data:', error);
    const mockCasinos = await getMockCasinos();
    featuredCasinos = Array.from({ length: 4 }, (_, i) => ({
      ...mockCasinos[0],
      id: i + 1,
      attributes: {
        ...mockCasinos[0].attributes,
        name: `${mockCasinos[0].attributes.name} ${i + 1}`,
        slug: `${mockCasinos[0].attributes.slug}-${i + 1}`,
      }
    }));
    newsArticles = await getMockArticles();
    categories = await getMockCategories();
  }
  
  // Transform categories to filter options
  const categoryOptions = categories.map(category => ({
    label: category.attributes.name,
    value: category.attributes.slug,
    count: featuredCasinos.filter(casino => 
      casino.attributes.categories?.data.some(cat => cat.attributes.slug === category.attributes.slug)
    ).length
  }));
  
  // Sort options for casinos
  const sortOptions = [
    { label: 'Rating (High to Low)', value: 'rating-desc' },
    { label: 'Rating (Low to High)', value: 'rating-asc' },
    { label: 'Newest First', value: 'date-desc' },
    { label: 'Oldest First', value: 'date-asc' },
    { label: 'Name (A-Z)', value: 'name-asc' },
    { label: 'Name (Z-A)', value: 'name-desc' },
  ];
  	return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white py-4 px-4 lg:px-[120px] border-b border-gray-100">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image 
              src="/Logo.svg" 
              alt="High Roller Casino" 
              width={178} 
              height={38}
              className="w-auto h-8 lg:h-10"
            />
          					</div>
          
          {/* Desktop Navigation */}
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
          
          {/* Header Icons */}
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
      {/* Hero Section */}
      <section className="bg-ghostwhite-200 py-[60px] px-4 lg:px-[120px] relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-[-366px] right-[392px] w-[1438px] h-[1438px] opacity-20 hidden lg:block">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-purple-100"></div>
          					</div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-6">
            <h1 className="text-4xl lg:text-[64px] leading-[130%] font-bold text-gray-300 mb-4">
              <span className="block">Best Online Casinos</span>
              <span className="block">in Canada 2025</span>
            </h1>
            <h2 className="text-3xl lg:text-[56px] leading-[130%] font-medium text-gray-300 mb-6">
              Top Sites & Bonuses
            </h2>
            <p className="text-lg leading-[150%] text-gray-100 max-w-3xl mx-auto font-onest">
              Discover <strong>the best online casino Canada</strong> has to offer in 2025. Find trusted sites, top bonuses, fast payouts, and expert reviews for Canadian players.
            </p>
              							</div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/casinos/categories" className="bg-gradient-to-r from-firebrick-200 to-firebrick-100 text-white font-bold py-4 px-10 rounded-xl hover:shadow-lg hover:scale-105 transform transition-all duration-200 text-center text-lg">
              Choose Your Casino
            </Link>
            <Link href="/about-us" className="border-2 border-gray-300 text-gray-300 font-bold py-4 px-10 rounded-xl hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-200 text-center text-lg">
              How We Rate Casinos
            </Link>
              							</div>
          
          {/* Trust Badges */}
          <div className="flex items-center justify-center flex-wrap gap-4 pt-6">
            <Image src="/18+.svg" alt="18+" width={78} height={24} className="opacity-60" />
            <Image src="/Certificate.svg" alt="Responsible Gaming" width={28} height={32} className="opacity-60" />
            <Image src="/ShieldCheck.svg" alt="Secure" width={126} height={36} className="opacity-60" />
            <Image src="/GlobeSimple.svg" alt="Global" width={32} height={32} className="opacity-60" />
            <Image src="/CreditCard.svg" alt="Visa" width={49} height={16} className="opacity-60" />
            <Image src="/ShieldCheck.svg" alt="Gamble Aware" width={121} height={16} className="opacity-60" />
              							</div>
            						</div>
      </section>
      <main>
        {/* Casino Listings Section */}
        <section className="py-20 px-4 lg:px-[120px]">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="mb-10 max-w-4xl">
              <h2 className="text-3xl lg:text-[40px] leading-[130%] font-bold text-gray-300 mb-4">
                <span className="block">Best Online Casino Canada:</span>
                <span className="block">Your Guide to Top Sites in 2025</span>
              </h2>
              <p className="text-lg leading-[150%] text-gray-100 font-onest">
                Every casino listed on our website is tested manually — including registration, gameplay, payment methods, and customer support — before it is approved for publication.
              </p>
            						</div>
            
            {/* Filter Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
              <HomePageFilters 
                categoryOptions={categoryOptions} 
                sortOptions={sortOptions} 
              />
              <Link href="/casinos/categories" className="flex items-center gap-2 bg-firebrick-200 text-white rounded-lg px-6 py-2.5 hover:bg-firebrick-100 hover:shadow-sm transition-all duration-200 font-semibold text-sm">
                <span>View All Casinos</span>
                <Image src="/ArrowRight.svg" alt="" width={16} height={16} />
              </Link>
        				</div>
            {/* Casino Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative">
              {featuredCasinos?.map((casino, index) => (
                <CasinoCard 
                  key={casino.id} 
                  casino={casino} 
                  priority={index < 3} 
                />
              ))}
      			</div>




        				</div>
        </section>
      </main>
      {/* Why Canadian Players Trust Us Section */}
      <section className="bg-ghostwhite-100 py-20 px-4 lg:px-[120px]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl lg:text-[40px] leading-[130%] font-bold text-gray-300 mb-2">
              Why Canadian Players Trust Us
            </h2>
              							</div>
          {/* Trust Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow h-[310px] flex flex-col justify-between">
              <div className="mb-4">
                <Image src="/Timer.svg" alt="" width={48} height={48} className="rounded-lg mb-4" />
              							</div>
              <div>
                <h3 className="text-xl font-bold text-gray-300 leading-[130%] mb-2">
                  10+ Years of Industry Experience
                </h3>
                <p className="text-lg leading-[150%] text-gray-100 font-onest">
                  Our team has reviewed online casinos for over a decade. We know how to spot red flags and highlight what truly matters for Canadian players.
                </p>
            						</div>
          					</div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow h-[310px] flex flex-col justify-between">
              <div className="mb-4">
                <Image src="/ShieldCheck.svg" alt="" width={48} height={48} className="rounded-lg mb-4" />
                  									</div>
              <div>
                <h3 className="text-xl font-bold text-gray-300 leading-[130%] mb-2">
                  Manually Tested & Verified
                </h3>
                <p className="text-lg leading-[150%] text-gray-100 font-onest">
                  Every listed casino is manually tested — from signup and gameplay to support and withdrawals — before being approved for publication.
                </p>
                  									</div>
                								</div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow h-[310px] flex flex-col justify-between">
              <div className="mb-4">
                <Image src="/CheckCircle.svg" alt="" width={48} height={48} className="rounded-lg mb-4" />
              							</div>
              <div>
                <h3 className="text-xl font-bold text-gray-300 leading-[130%] mb-2">
                  100% Independent & Unbiased
                </h3>
                <p className="text-lg leading-[150%] text-gray-100 font-onest">
                  We never accept paid placements or sponsored content. All reviews are based on factual research and genuine user experience.
                </p>
                								</div>
              							</div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow h-[310px] flex flex-col justify-between">
              <div className="mb-4">
                <Image src="/GraduationCap.svg" alt="" width={48} height={48} className="rounded-lg mb-4" />
              							</div>
              <div>
                <h3 className="text-xl font-bold text-gray-300 leading-[130%] mb-2">
                  Respected by Industry Experts
                </h3>
                <p className="text-lg leading-[150%] text-gray-100 font-onest">
                  Our review methodology is cited by iGaming analysts and compliance consultants as a standard for transparency and trust.
                </p>
                  									</div>
                								</div>

            {/* Feature 5 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow h-[310px] flex flex-col justify-between">
              <div className="mb-4">
                <Image src="/ListChecks.svg" alt="" width={48} height={48} className="rounded-lg mb-4" />
                  									</div>
              <div>
                <h3 className="text-xl font-bold text-gray-300 leading-[130%] mb-2">
                  Strict & Transparent Criteria
                </h3>
                <p className="text-lg leading-[150%] text-gray-100 font-onest">
                  Each platform is assessed using a consistent framework focused on safety, fairness, bonus value, speed of payouts, and mobile usability.
                </p>
                								</div>
              							</div>

            {/* Feature 6 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow h-[310px] flex flex-col justify-between">
              <div className="mb-4">
                <Image src="/Heart.svg" alt="" width={48} height={48} className="rounded-lg mb-4" />
                								</div>
              <div>
                <h3 className="text-xl font-bold text-gray-300 leading-[130%] mb-2">
                  Player Safety Comes First
                </h3>
                <p className="text-lg leading-[150%] text-gray-100 font-onest">
                  We prioritize responsible gaming by recommending only licensed casinos that promote fair play and offer essential player protection tools.
                </p>
                  									</div>
                								</div>
              							</div>
                								</div>
      </section>
      {/* Find Your Perfect Casino Match Section */}
      <section className="bg-gray-50 py-20 px-4 lg:px-[120px]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-[40px] leading-[130%] font-bold text-gray-300 mb-4">
              Find Your Perfect Casino Match
            </h2>
            <p className="text-lg leading-[150%] text-gray-100 font-onest max-w-3xl mx-auto">
              Answer a few quick questions to discover the best casino for your preferences — based on bonuses, payment methods, game types, and more.
            </p>
          </div>
          {/* Quiz Component */}
          <CasinoQuiz casinos={featuredCasinos} />
        				</div>
      </section>
      {/* Latest Casino News & Expert Insights Section */}
      <section className="bg-white py-20 px-4 lg:px-[120px]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 max-w-4xl">
            <h2 className="text-3xl lg:text-[40px] leading-[130%] font-bold text-gray-300 mb-4">
              Latest Casino News & Expert Insights
            </h2>
            <p className="text-lg leading-[150%] text-gray-100 font-onest">
              Stay informed with expert commentary on the Canadian iGaming market, new casino launches, bonus trends, and secure payment innovations — all curated by our editorial team.
            </p>
      			</div>
          {/* News Articles Grid */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsArticles.length > 0 ? (
                newsArticles.slice(0, 6).map((article, index) => (
                  <article 
                    key={article.id} 
                    className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-steelblue to-blue-600 overflow-hidden">
                      {article.attributes.featuredImage ? (
                        <Image 
                          src={getStrapiMediaURL(article.attributes.featuredImage)}
                          alt={article.attributes.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                          </div>
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                          {article.attributes.category || "News"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <time className="text-sm text-gray-100" dateTime={article.attributes.publishedAt}>
                          {new Date(article.attributes.publishedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </time>
                        <span className="text-xs text-gray-100">
                          {article.attributes.readTime || "5"} min read
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-300 leading-tight line-clamp-2">
                          {article.attributes.title}
                        </h3>
                        <p className="text-sm text-gray-100 leading-relaxed line-clamp-3">
                          {article.attributes.excerpt || article.attributes.content?.substring(0, 150) + '...'}
                        </p>
                      </div>
                      
                      <Link 
                        href={`/blog/${article.attributes.slug}`}
                        className="block w-full bg-gradient-to-r from-firebrick-200 to-firebrick-100 text-white font-semibold py-3 text-center rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                      >
                        Read Article
                      </Link>
                    </div>
                  </article>
                ))
              ) : (
                // Fallback static articles when no Strapi data
                <>
                  <article className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <div className="relative h-48 bg-gradient-to-br from-red-500 to-orange-500 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                          Bonuses
                        </span>
                      </div>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <time className="text-sm text-gray-100">December 15, 2024</time>
                        <span className="text-xs text-gray-100">7 min read</span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-300 leading-tight">
                          Top Casino Welcome Bonuses for Canadian Players in 2025
                        </h3>
                        <p className="text-sm text-gray-100 leading-relaxed">
                          Discover the most generous welcome bonuses available to Canadian players, featuring fair wagering terms and substantial bonus amounts.
                        </p>
                      </div>
                      <Link 
                        href="/blog/top-casino-welcome-bonuses-canadian-players-2025"
                        className="block w-full bg-gradient-to-r from-firebrick-200 to-firebrick-100 text-white font-semibold py-3 text-center rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                      >
                        Read Article
                      </Link>
                    </div>
                  </article>

                  <article className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <div className="relative h-48 bg-gradient-to-br from-green-500 to-teal-500 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                          Security
                        </span>
                      </div>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <time className="text-sm text-gray-100">December 10, 2024</time>
                        <span className="text-xs text-gray-100">5 min read</span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-300 leading-tight">
                          How to Choose Safe and Licensed Online Casinos in Canada
                        </h3>
                        <p className="text-sm text-gray-100 leading-relaxed">
                          Learn the essential criteria for identifying trustworthy online casinos with proper licensing and security measures.
                        </p>
                      </div>
                      <Link 
                        href="/blog/safe-licensed-online-casinos-canada"
                        className="block w-full bg-gradient-to-r from-firebrick-200 to-firebrick-100 text-white font-semibold py-3 text-center rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                      >
                        Read Article
                      </Link>
                    </div>
                  </article>

                  <article className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-500 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                          Payments
                        </span>
                      </div>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <time className="text-sm text-gray-100">December 5, 2024</time>
                        <span className="text-xs text-gray-100">6 min read</span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-300 leading-tight">
                          Fastest Withdrawal Methods for Canadian Online Casino Players
                        </h3>
                        <p className="text-sm text-gray-100 leading-relaxed">
                          Compare the fastest and most reliable withdrawal options available to Canadian casino players in 2024.
                        </p>
                      </div>
                      <Link 
                        href="/blog/fastest-withdrawal-methods-canadian-players"
                        className="block w-full bg-gradient-to-r from-firebrick-200 to-firebrick-100 text-white font-semibold py-3 text-center rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                      >
                        Read Article
                      </Link>
                    </div>
                  </article>
                </>
              )}
            </div>
          </div>

          {/* View All Articles Button */}
          <div className="flex justify-center">
            <Link href="/blog" className="flex items-center gap-2 border border-gray-300 rounded-lg px-8 py-3 hover:bg-gray-50 transition-colors max-w-sm">
              <span className="font-bold text-lg text-gray-300">View All Articles</span>
              <Image src="/ArrowRight.svg" alt="" width={20} height={20} />
            </Link>
                        												</div>
                      											</div>
      </section>
      {/* FAQ Section */}
      <section className="bg-white py-20 px-4 lg:px-[120px]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 max-w-4xl">
            <h2 className="text-3xl lg:text-[40px] leading-[130%] font-bold text-gray-300 mb-4">
              Common Questions About Best Online Casino Canada
            </h2>
                        												</div>
          {/* FAQ Accordion */}
          <div className="max-w-4xl space-y-4">
            {/* FAQ Item 1 */}
            <div className="bg-white border border-silver rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="flex-1 text-xl font-bold text-gray-300 leading-[130%]">
                  What is the best online casino Canada for real money play?
                </h3>
                <Image src="/CaretDown.svg" alt="" width={24} height={26} className="flex-shrink-0" />
                        												</div>
                      											</div>

            {/* FAQ Item 2 - Expanded */}
            <div className="bg-white border border-silver rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="flex-1 text-xl font-bold text-gray-300 leading-[130%]">
                  What payment methods are common for Canadian players?
                </h3>
                <Image src="/CaretUp.svg" alt="" width={24} height={26} className="flex-shrink-0" />
                        												</div>
              <p className="text-lg leading-[150%] text-gray-100 font-onest">
                Canadian players frequently use Interac for deposits and withdrawals due to its convenience, security, and direct integration with Canadian banks. Other popular options include major credit cards (Visa, Mastercard), various e-wallets (e.g., EcoPayz, MuchBetter), and increasingly, cryptocurrencies. We assess each casino's banking options for Canadian compatibility and efficiency.
              </p>
                          													</div>

            {/* FAQ Item 3 */}
            <div className="bg-white border border-silver rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="flex-1 text-xl font-bold text-gray-300 leading-[130%]">
                  Can I play on my mobile device at Canadian online casinos?
                </h3>
                <Image src="/CaretDown.svg" alt="" width={24} height={26} className="flex-shrink-0" />
                        												</div>
                      											</div>

            {/* FAQ Item 4 */}
            <div className="bg-white border border-silver rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="flex-1 text-xl font-bold text-gray-300 leading-[130%]">
                  Are winnings from online casinos taxed in Canada?
                </h3>
                <Image src="/CaretDown.svg" alt="" width={24} height={26} className="flex-shrink-0" />
                      											</div>
                    										</div>
                  									</div>
                								</div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-200 py-10 px-4 lg:px-[120px] text-white">
        <div className="max-w-7xl mx-auto">
          {/* Footer Top */}
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

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center lg:justify-between gap-4 lg:gap-6 py-6 text-lg font-bold">
            <Link href="/" className="hover:text-gray-100 transition-colors">Home</Link>
            <Link href="/casinos/categories" className="hover:text-gray-100 transition-colors">Casino Categories</Link>
            <Link href="/blog" className="hover:text-gray-100 transition-colors">Blog</Link>
            <Link href="/about-us" className="hover:text-gray-100 transition-colors">About Us</Link>
            <Link href="/responsible-gambling" className="hover:text-gray-100 transition-colors">Responsible Gambling</Link>
            <Link href="/privacy-policy" className="hover:text-gray-100 transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-gray-100 transition-colors">Terms & Conditions</Link>
          </nav>

          {/* Footer Bottom */}
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
      <StructuredData data={generateOrganizationStructuredData()} />
      <StructuredData data={generateWebsiteStructuredData()} />
    </div>
  );
};

export default HomePage;