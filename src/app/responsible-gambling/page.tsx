import type { NextPage } from 'next';
import Image from "next/image";
import Link from "next/link";
import { getFAQItems, getMockFAQItems } from '@/lib/strapi';
import { FAQItem } from '@/types/casino';
import FAQ from '@/components/FAQ';

const ResponsibleGamblingPage: NextPage = async () => {
  let faqItems: FAQItem[] = [];
  
  try {
    const faqResponse = await getFAQItems('responsible-gambling');
    faqItems = faqResponse.data;
  } catch (error) {
    console.error('Failed to fetch FAQ from Strapi, using mock data:', error);
    faqItems = await getMockFAQItems();
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
          
          <nav className="hidden lg:flex items-center gap-6 text-lg text-gray-300">
            <Link href="/" className="hover:text-firebrick-200 transition-colors">Home</Link>
            <Link href="/casinos/categories" className="flex items-center gap-1 hover:text-firebrick-200 transition-colors">
              <span>Casino Categories</span>
              <Image src="/CaretDown.svg" alt="" width={14} height={16} />
            </Link>
            <Link href="/blog" className="hover:text-firebrick-200 transition-colors">Blog</Link>
            <Link href="/about-us" className="hover:text-firebrick-200 transition-colors">About Us</Link>
            <span className="text-firebrick-200 font-semibold">Responsible Gambling</span>
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

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 lg:px-[120px]">
          <div className="flex justify-center">
            <div className="flex">
              <Link 
                href="/privacy-policy" 
                className="px-8 py-4 text-gray-300 hover:text-firebrick-200 transition-colors border-b-2 border-transparent hover:border-firebrick-200"
              >
                Privacy
              </Link>
              <Link 
                href="/terms-conditions" 
                className="px-8 py-4 text-gray-300 hover:text-firebrick-200 transition-colors border-b-2 border-transparent hover:border-firebrick-200"
              >
                Terms
              </Link>
              <div className="px-8 py-4 text-firebrick-200 border-b-2 border-firebrick-200 font-semibold">
                Play Safe
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4 lg:px-[120px]">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-[48px] leading-[130%] font-bold text-gray-300 mb-6">
              Responsible Gambling Policy
            </h1>
            <p className="text-lg leading-[150%] text-gray-100 font-onest">
              Gambling should always be a form of entertainment, not a source of income or a way to escape problems. At Gamdom Casino, we are committed to promoting responsible gambling and helping users stay in control of their habits.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Play Responsibly Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-300 mb-6">Play Responsibly</h2>
              <p className="text-lg leading-[150%] text-gray-100 font-onest mb-6">
                We encourage all our visitors to follow these basic guidelines:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Image src="/CheckCircle.svg" alt="" width={24} height={24} className="text-seagreen mt-1" />
                  <p className="text-lg text-gray-100 font-onest">Set time and budget limits before you play</p>
                </div>
                <div className="flex items-start gap-3">
                  <Image src="/CheckCircle.svg" alt="" width={24} height={24} className="text-seagreen mt-1" />
                  <p className="text-lg text-gray-100 font-onest">Never chase losses</p>
                </div>
                <div className="flex items-start gap-3">
                  <Image src="/CheckCircle.svg" alt="" width={24} height={24} className="text-seagreen mt-1" />
                  <p className="text-lg text-gray-100 font-onest">Take regular breaks</p>
                </div>
                <div className="flex items-start gap-3">
                  <Image src="/CheckCircle.svg" alt="" width={24} height={24} className="text-seagreen mt-1" />
                  <p className="text-lg text-gray-100 font-onest">Only gamble with money you can afford to lose</p>
                </div>
                <div className="flex items-start gap-3">
                  <Image src="/CheckCircle.svg" alt="" width={24} height={24} className="text-seagreen mt-1" />
                  <p className="text-lg text-gray-100 font-onest">Avoid gambling when feeling stressed or emotional</p>
                </div>
              </div>
            </section>

            {/* Age Restrictions Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-300 mb-6">Age Restrictions</h2>
              
              <div className="bg-yellow-100 border border-yellow-300 rounded-2xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">!</span>
                  </div>
                  <p className="text-base text-gray-300 font-onest">
                    Access to our platform is strictly limited to users 18 years of age or older, or the legal age in your jurisdiction, whichever is higher. We do not tolerate underage gambling.
                  </p>
                </div>
              </div>
              
              <p className="text-lg leading-[150%] text-gray-100 font-onest">
                We employ verification processes to ensure compliance with age restrictions.
              </p>
            </section>

            {/* Tools for Self-Control Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-300 mb-6">Tools for Self-Control</h2>
              <p className="text-lg leading-[150%] text-gray-100 font-onest mb-6">
                We support user autonomy by offering:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Image src="/CheckCircle.svg" alt="" width={24} height={24} className="text-seagreen mt-1" />
                  <p className="text-lg text-gray-100 font-onest">Self-exclusion options</p>
                </div>
                <div className="flex items-start gap-3">
                  <Image src="/CheckCircle.svg" alt="" width={24} height={24} className="text-seagreen mt-1" />
                  <p className="text-lg text-gray-100 font-onest">Deposit and session limits</p>
                </div>
                <div className="flex items-start gap-3">
                  <Image src="/CheckCircle.svg" alt="" width={24} height={24} className="text-seagreen mt-1" />
                  <p className="text-lg text-gray-100 font-onest">Cool-off periods</p>
                </div>
              </div>
              
              <p className="text-lg leading-[150%] text-gray-100 font-onest mt-6">
                To request these features, please contact our support team.
              </p>
            </section>

            {/* Get Support Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-300 mb-6">Get Support</h2>
              <p className="text-lg leading-[150%] text-gray-100 font-onest mb-6">
                If you or someone you know may be struggling with gambling addiction, contact these professional organizations:
              </p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <Link href="#" className="text-firebrick-200 underline text-lg font-semibold">Gamblers Anonymous</Link>
                </div>
                <div>
                  <Link href="#" className="text-firebrick-200 underline text-lg font-semibold">BeGambleAware</Link>
                </div>
                <div>
                  <Link href="#" className="text-firebrick-200 underline text-lg font-semibold">Responsible Gambling Council</Link>
                </div>
              </div>

              {/* Support Organization Logos */}
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <Image src="/18+.svg" alt="18+" width={60} height={40} />
                <Image src="/Certificate.svg" alt="GamCare" width={80} height={40} />
                <Image src="/Certificate.svg" alt="GamStop" width={80} height={40} />
                <Image src="/Certificate.svg" alt="GambleAware" width={80} height={40} />
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              </div>
            </section>
          </div>

          {/* FAQ Section */}
          <FAQ 
            items={faqItems}
            title="FAQ – Responsible Gaming Questions Answered"
            className="mt-16"
          />
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
    </div>
  );
};

export default ResponsibleGamblingPage;
