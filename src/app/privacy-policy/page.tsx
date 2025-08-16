import type { NextPage } from 'next';
import Image from "next/image";
import Link from "next/link";
import { getFAQItems, getMockFAQItems } from '@/lib/strapi';
import { FAQItem } from '@/types/casino';
import FAQ from '@/components/FAQ';

const PrivacyPolicyPage: NextPage = async () => {
  let faqItems: FAQItem[] = [];
  
  try {
    const faqResponse = await getFAQItems('privacy');
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

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 lg:px-[120px]">
          <div className="flex justify-center">
            <div className="flex">
              <div className="px-8 py-4 text-firebrick-200 border-b-2 border-firebrick-200 font-semibold">
                Privacy
              </div>
              <Link 
                href="/terms-conditions" 
                className="px-8 py-4 text-gray-300 hover:text-firebrick-200 transition-colors border-b-2 border-transparent hover:border-firebrick-200"
              >
                Terms
              </Link>
              <Link 
                href="/responsible-gambling" 
                className="px-8 py-4 text-gray-300 hover:text-firebrick-200 transition-colors border-b-2 border-transparent hover:border-firebrick-200"
              >
                Play Safe
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4 lg:px-[120px]">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-[48px] leading-[130%] font-bold text-gray-300 mb-4">
              Privacy Policy – Canadian Casino Review Site
            </h1>
            <p className="text-lg leading-[150%] text-gray-100 font-onest">
              Our Privacy Policy outlines data use on our Canadian casino review site. We use cookies for analytics, protect your data, comply with PIPEDA, and never share information.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Privacy Policy Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-300 mb-4">
                Privacy Policy: Safeguarding Your Data on Our Canadian Online Casino Review Site
              </h2>
              <p className="text-lg leading-[150%] text-gray-100 font-onest">
                Your privacy is a top priority for our independent online casino review website. This Privacy Policy details how we handle information when you visit our site. We are committed to protecting your data and ensuring transparency in our practices. Our aim is to provide unbiased casino analysis Canada while maintaining the highest standards of data privacy.
              </p>
            </section>

            {/* Our Approach Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-300 mb-4">
                Our Approach to Data Collection and Usage
              </h2>
              <p className="text-lg leading-[150%] text-gray-100 font-onest">
                We operate with a clear philosophy regarding data: to collect only what is necessary to improve your experience and the quality of our content. We prioritize your anonymity and control over your personal information.
              </p>
            </section>

            {/* Use of Cookies Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-300 mb-4">
                Use of Cookies and Anonymous Analytics
              </h2>
              <p className="text-lg leading-[150%] text-gray-100 font-onest">
                Our website utilizes cookies and anonymous analytics tools. These technologies help us understand how users interact with our site, such as identifying which pages are most popular or how long visitors stay. This data is entirely anonymous; it does not identify you personally. The purpose of this collection is purely to evaluate website traffic and enhance our user interface, ensuring a better browse experience for all our visitors seeking trusted casino review site Canada insights.
              </p>
            </section>

            {/* No Collection Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-300 mb-4">
                No Collection of Personal Data Without Consent
              </h2>
              <p className="text-lg leading-[150%] text-gray-100 font-onest">
                We do not gather any personal data without your explicit consent. This means we will not collect identifiable information such as your name, email address, or other personal details unless you voluntarily provide it to us, for instance, when submitting a contact form. Our operations are designed to respect your privacy by default, ensuring your interactions with our site remain confidential.
              </p>
            </section>
          </div>

          {/* FAQ Section */}
          <FAQ 
            items={faqItems}
            title="FAQ – Your Privacy Questions Answered"
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

export default PrivacyPolicyPage;
