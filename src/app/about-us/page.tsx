import type { NextPage } from 'next';
import Image from "next/image";
import Link from "next/link";
import { getTeamMembers, getTestimonials, getMockTeamMembers, getMockTestimonials } from '@/lib/strapi';
import { TeamMember, Testimonial } from '@/types/casino';
import ReviewForm from '@/components/ReviewForm';

const AboutUsPage: NextPage = async () => {
  let teamMembers: TeamMember[] = [];
  let testimonials: Testimonial[] = [];

  try {
    const [teamResponse, testimonialsResponse] = await Promise.all([
      getTeamMembers(),
      getTestimonials(1, 8)
    ]);
    
    teamMembers = teamResponse.data;
    testimonials = testimonialsResponse.data;
  } catch (error) {
    console.error('Failed to fetch from Strapi, using mock data:', error);
    teamMembers = await getMockTeamMembers();
    testimonials = await getMockTestimonials();
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
            <span className="text-firebrick-200 font-semibold">About Us</span>
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
      <div className="py-12 px-4 lg:px-[120px]">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-[48px] leading-[130%] font-bold text-gray-300 mb-2">
              About Us
            </h1>
            <h2 className="text-3xl lg:text-[40px] leading-[130%] font-medium text-gray-300 mb-6">
              – Independent Canadian Online Casino Reviews 2025
            </h2>
            <p className="text-lg leading-[150%] text-gray-100 font-onest max-w-4xl mx-auto">
              Discover our independent casino review process for Canadians. We provide unbiased information about top online casinos, focusing on player safety and fair play since 2016.
            </p>
          </div>

          {/* Our Mission Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-300 mb-6">Our Mission</h2>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-lg leading-[150%] text-gray-100 font-onest">
                We are an independent casino review dedicated to Canadian players, committed to helping you navigate the online gambling landscape with confidence. Our team of experienced reviewers creates unbiased content on casino platforms that respect responsible gaming, offer transparent content on all casino games, reviews. Our mission is to empower players by offering credible and transparent, and factual information.
              </p>
            </div>
          </section>

          {/* Meet Our Team Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-300 mb-8 text-center">
              Meet Our Team of Industry Experts
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                  {/* Avatar */}
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-300 mb-1">{member.attributes.name}</h3>
                    <h4 className="text-lg font-semibold text-firebrick-200 mb-2">Expertise: {member.attributes.expertise}</h4>
                    <p className="text-base text-gray-100 font-onest">{member.attributes.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What We Stand For Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-300 mb-8 text-center">
              What We Stand For
            </h2>
            <p className="text-lg leading-[150%] text-gray-100 font-onest text-center mb-12 max-w-4xl mx-auto">
              We are dedicated to empowering players. Each casino we recommend meets our strict criteria, and promoting platforms that support responsible play without financial incentives.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Licensing */}
              <div className="text-center">
                <div className="w-16 h-16 bg-mistyrose rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Image src="/Certificate.svg" alt="" width={32} height={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-300 mb-2">Licensing</h3>
                <p className="text-base text-gray-100 font-onest">
                  Valid and authentic gaming licenses (e.g., MGA, Curacao, Kahnawake).
                </p>
              </div>

              {/* Security */}
              <div className="text-center">
                <div className="w-16 h-16 bg-paleturquoise rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Image src="/ShieldCheck.svg" alt="" width={32} height={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-300 mb-2">Security</h3>
                <p className="text-base text-gray-100 font-onest">
                  SSL encryption, data privacy policies, RNG-certified games and trustworthy payments.
                </p>
              </div>

              {/* Game Variety */}
              <div className="text-center">
                <div className="w-16 h-16 bg-khaki rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Image src="/Joystick.svg" alt="" width={32} height={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-300 mb-2">Game Variety</h3>
                <p className="text-base text-gray-100 font-onest">
                  Diverse selection of slots, table games, live casino and specialty entertainment.
                </p>
              </div>

              {/* Payment Options */}
              <div className="text-center">
                <div className="w-16 h-16 bg-lavender rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Image src="/CreditCard.svg" alt="" width={32} height={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-300 mb-2">Payment Options</h3>
                <p className="text-base text-gray-100 font-onest">
                  Support for key CA. Interac, major credit cards, e-wallets, and popular cryptocurrencies.
                </p>
              </div>

              {/* Withdrawal Speed */}
              <div className="text-center">
                <div className="w-16 h-16 bg-mistyrose rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Image src="/Timer.svg" alt="" width={32} height={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-300 mb-2">Withdrawal Speed</h3>
                <p className="text-base text-gray-100 font-onest">
                  Efficient processing times, typically within 24-72 hours for verified accounts.
                </p>
              </div>

              {/* Customer Support */}
              <div className="text-center">
                <div className="w-16 h-16 bg-paleturquoise rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Image src="/Headset.svg" alt="" width={32} height={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-300 mb-2">Customer Support</h3>
                <p className="text-base text-gray-100 font-onest">
                  Fast response times (live chat, email, and phone), with knowledgeable and helpful agents.
                </p>
              </div>

              {/* Mobile Experience */}
              <div className="text-center">
                <div className="w-16 h-16 bg-khaki rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Image src="/DeviceMobileSpeaker.svg" alt="" width={32} height={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-300 mb-2">Mobile Experience</h3>
                <p className="text-base text-gray-100 font-onest">
                  Fully optimized mobile or dedicated apps for gaming on all mobile devices.
                </p>
              </div>

              {/* Responsible Gaming */}
              <div className="text-center">
                <div className="w-16 h-16 bg-lavender rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Image src="/Heart.svg" alt="" width={32} height={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-300 mb-2">Responsible Gaming</h3>
                <p className="text-base text-gray-100 font-onest">
                  Comprehensive tools like deposit limits, time limits, and for support organizations.
                </p>
              </div>
            </div>
          </section>

          {/* What Our Readers Say */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-300 mb-6">What Our Readers Say</h2>
            <p className="text-lg leading-[150%] text-gray-100 font-onest mb-8">
              Our readers consistently praise the transparency and depth of our reviews. Their trust fuels our commitment to excellence in every evaluation.
            </p>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-seagreen rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">{testimonial.attributes.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-300 mb-2">{testimonial.attributes.name}</h4>
                      <p className="text-base text-gray-100 font-onest">
                        {testimonial.attributes.review}
                      </p>
                      {testimonial.attributes.city && (
                        <p className="text-sm text-gray-100 mt-1">{testimonial.attributes.city}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button className="bg-white border border-gray-300 text-gray-300 font-bold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors">
                Load More
              </button>
            </div>
          </section>

          {/* Leave a Review Form */}
          <ReviewForm />

          {/* Play Responsibly Section */}
          <section className="mt-16 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-300 mb-4">Play Responsibly – For 18+ Only</h3>
            <p className="text-base text-gray-100 mb-6 font-onest">
              Gambling Canada promotes responsible gambling. Please game you're choosing for entertainment purposes of increasing, if you're struggling you require time to discontinue. For a trusted resource.
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-300 mb-2">Gambling Anonymous:</h4>
                <Link href="#" className="text-firebrick-200 underline">www.gamblersanonymous.org</Link>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-300 mb-2">BeGambleAware.org:</h4>
                <Link href="#" className="text-firebrick-200 underline">www.begambleaware.org</Link>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-300 mb-2">Responsible Gambling Council:</h4>
                <Link href="#" className="text-firebrick-200 underline">www.responsiblegambling.org</Link>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-6">
              <Image src="/18+.svg" alt="18+" width={60} height={30} />
              <Image src="/Certificate.svg" alt="GamCare" width={60} height={30} />
              <Image src="/Certificate.svg" alt="GamStop" width={60} height={30} />
              <Image src="/Certificate.svg" alt="GambleAware" width={60} height={30} />
              <Image src="/Certificate.svg" alt="BeGambleAware" width={60} height={30} />
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
    </div>
  );
};

export default AboutUsPage;
