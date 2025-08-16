import type { NextPage } from 'next';
import Image from "next/image";
import Link from "next/link";
import { getSiteSettings, getMockSiteSettings } from '@/lib/strapi';
import { SiteSettings } from '@/types/casino';
import ContactForm from '@/components/ContactForm';

const ContactUsPage: NextPage = async () => {
  let siteSettings: SiteSettings | null = null;
  
  try {
    const settingsResponse = await getSiteSettings();
    siteSettings = settingsResponse.data[0] || null;
  } catch (error) {
    console.error('Failed to fetch site settings from Strapi, using mock data:', error);
    siteSettings = await getMockSiteSettings();
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
            <span className="text-firebrick-200 font-semibold">Contact Us</span>
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

      {/* Main Content */}
      <div className="py-16 px-4 lg:px-[120px]">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-[48px] leading-[130%] font-bold text-gray-300 mb-4">
              Contact Us
            </h1>
            <p className="text-lg leading-[150%] text-gray-100 font-onest">
              Get in touch with our team for any questions about our casino reviews and recommendations.
            </p>
          </div>

          {/* Contact Form */}
          <ContactForm />

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-firebrick-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Image src="/Envelope.svg" alt="Email" width={24} height={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-300 mb-2">Email</h3>
              <p className="text-base text-gray-100">
                {siteSettings?.attributes.contactEmail || 'support@myhighroller.ca'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-firebrick-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Image src="/ChatCircleDots.svg" alt="Live Chat" width={24} height={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-300 mb-2">Live Chat</h3>
              <p className="text-base text-gray-100">Available 24/7</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-firebrick-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Image src="/Timer.svg" alt="Response Time" width={24} height={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-300 mb-2">Response Time</h3>
              <p className="text-base text-gray-100">
                {siteSettings?.attributes.responseTime || 'Within 24 hours'}
              </p>
            </div>
          </div>
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

export default ContactUsPage;
