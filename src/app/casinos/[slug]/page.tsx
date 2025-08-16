import type { NextPage } from 'next';
import Image from "next/image";
import Link from "next/link";
import { notFound } from 'next/navigation';
import { getCasinoBySlug, getMockCasinos, getStrapiMediaURL } from '@/lib/strapi';
import { Casino, Review } from '@/types/casino';
import ReviewCard from '@/components/ReviewCard';

interface CasinoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: 1,
    author: "Player123",
    rating: 5,
    title: "Great experience overall!",
    content: "I've been playing here for 3 months now and the experience has been fantastic. Fast withdrawals and great customer support.",
    date: "2024-01-15",
    verified: true,
    helpful: 12
  },
  {
    id: 2,
    author: "CasinoFan",
    rating: 4,
    title: "Good selection of games",
    content: "The game variety is impressive, especially the live dealer section. Only complaint is that some bonuses have high wagering requirements.",
    date: "2024-01-10",
    verified: true,
    helpful: 8
  },
  {
    id: 3,
    author: "HighRoller88",
    rating: 5,
    title: "Best for high stakes players",
    content: "As someone who plays with larger amounts, I appreciate the high table limits and VIP treatment. Withdrawals are processed quickly.",
    date: "2024-01-08",
    verified: true,
    helpful: 15
  }
];

const CasinoPage: NextPage<CasinoPageProps> = async ({ params }) => {
  const { slug } = await params;
  let casino: Casino | null = null;

  try {
    const response = await getCasinoBySlug(slug);
    casino = response.data[0] || null;
  } catch (error) {
    console.error('Failed to fetch casino from Strapi, using mock data:', error);
    const mockCasinos = await getMockCasinos();
    casino = {
      ...mockCasinos[0],
      attributes: {
        ...mockCasinos[0].attributes,
        slug: slug
      }
    };
  }

  if (!casino) {
    notFound();
  }

  const { attributes } = casino;
  const logoUrl = attributes.logo ? getStrapiMediaURL(attributes.logo) : '/Logo.svg';
  const heroImageUrl = attributes.heroImage ? getStrapiMediaURL(attributes.heroImage) : null;

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
            <Link href="/casinos/categories" className="hover:text-firebrick-200 transition-colors">Casino Categories</Link>
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
          <Link href="/casinos/categories" className="hover:text-gray-300 transition-colors">Online Casinos</Link>
          <Image src="/CaretRight.svg" alt="" width={8} height={8} />
          <span className="text-gray-300">{attributes.name}</span>
        </div>
      </div>

      {/* Casino Hero Section */}
      <section className="py-8 px-4 lg:px-[120px]">
        <div className="max-w-6xl mx-auto">
          {/* Hero Image with Casino Logo */}
          <div className="relative bg-steelblue rounded-2xl h-[400px] mb-6 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center relative">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <div className="text-4xl">🎮</div>
                </div>
                <h1 className="text-4xl font-bold mb-2">{attributes.name}</h1>
              </div>
              
              {/* Ratings - Top Right */}
              <div className="absolute top-6 right-6 flex gap-2">
                <div className="bg-khaki rounded-lg px-3 py-2 flex items-center gap-1">
                  <Image src="/Star.svg" alt="" width={16} height={16} />
                  <span className="text-sm font-bold text-olive">{attributes.rating}</span>
                </div>
                <div className="bg-paleturquoise rounded-lg px-3 py-2 flex items-center gap-1">
                  <Image src="/UsersThree.svg" alt="" width={16} height={16} />
                  <span className="text-sm font-bold text-seagreen">{attributes.userRating}</span>
                </div>
              </div>
              
              {/* Tags - Bottom Left */}
              <div className="absolute bottom-6 left-6 flex gap-2">
                {attributes.isNew && (
                  <span className="bg-mistyrose text-firebrick-100 text-sm font-semibold px-3 py-1 rounded-full">New</span>
                )}
                {attributes.fastPayouts && (
                  <span className="bg-skyblue text-darkslategray text-sm font-semibold px-3 py-1 rounded-full">Fast Payouts</span>
                )}
                {attributes.noDeposit && (
                  <span className="bg-yellowgreen text-darkolivegreen text-sm font-semibold px-3 py-1 rounded-full">No Deposit</span>
                )}
              </div>
            </div>
          </div>

          {/* Casino Overview */}
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-[40px] leading-[130%] font-bold text-gray-300 mb-4">
              Is {attributes.name} Casino Worth Your Time in 2025?
            </h2>
            <p className="text-lg leading-[150%] text-gray-100 font-onest max-w-4xl mx-auto">
              Our experts reviewed {attributes.name} to help you make informed decisions about online gaming. We've tested everything, from the user experience to licensing, to determine if this casino is right for Canadian players.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-8 px-4 lg:px-[120px]">
        <div className="max-w-6xl mx-auto">
          {/* Overview & Key Highlights */}
          <section className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-300 mb-6">Overview & Key Highlights</h2>
            <p className="text-lg text-gray-100 leading-relaxed mb-8 font-onest">
              {attributes.description}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-firebrick-200 mb-2">{attributes.rating}/5</div>
                <div className="text-sm text-gray-100 font-semibold">Overall Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-firebrick-200 mb-2">2000+</div>
                <div className="text-sm text-gray-100 font-semibold">Games</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-firebrick-200 mb-2">{attributes.withdrawalSpeed || '24-48h'}</div>
                <div className="text-sm text-gray-100 font-semibold">Withdrawal Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-firebrick-200 mb-2">{attributes.minDeposit || '$10'}</div>
                <div className="text-sm text-gray-100 font-semibold">Min Deposit</div>
              </div>
            </div>
          </section>

          {/* Game Selection */}
          <section className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-300 mb-4">Game Selection at {attributes.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((game) => (
                <div key={game} className="relative rounded-lg overflow-hidden aspect-square bg-gradient-to-br from-blue-500 to-purple-600">
                  <div className="absolute inset-0 flex items-center justify-center text-white text-2xl">
                    🎰
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-100 font-onest">
              Choose from over 2000 games including slots, table games, and live dealer options from top providers.
            </p>
          </section>

          {/* Payment Options */}
          <section className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-300 mb-4">Fast & Secure Payment Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg text-gray-300 mb-3">Deposits</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Image src="/CreditCard.svg" alt="Visa" width={60} height={38} className="border rounded p-1" />
                  <Image src="/CreditCard.svg" alt="Mastercard" width={60} height={38} className="border rounded p-1" />
                  <Image src="/CreditCard.svg" alt="Skrill" width={60} height={38} className="border rounded p-1" />
                  <Image src="/CreditCard.svg" alt="Neteller" width={60} height={38} className="border rounded p-1" />
                  <span className="flex items-center text-gray-100">+5</span>
                </div>
                <p className="text-sm text-gray-100">Min: {attributes.minDeposit || '$10'} • Max: $50,000</p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-300 mb-3">Withdrawals</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Image src="/CreditCard.svg" alt="Visa" width={60} height={38} className="border rounded p-1" />
                  <Image src="/CreditCard.svg" alt="Mastercard" width={60} height={38} className="border rounded p-1" />
                  <Image src="/CreditCard.svg" alt="Skrill" width={60} height={38} className="border rounded p-1" />
                  <span className="flex items-center text-gray-100">+3</span>
                </div>
                <p className="text-sm text-gray-100">Processing: {attributes.withdrawalSpeed || '24-48 hours'}</p>
              </div>
            </div>
          </section>

          {/* Customer Support */}
          <section className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-300 mb-4">Customer Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Image src="/ChatCircleDots.svg" alt="Live Chat" width={40} height={40} className="mx-auto mb-2" />
                <div className="font-bold text-gray-300">Live Chat</div>
                <div className="text-sm text-gray-100">24/7</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Image src="/Envelope.svg" alt="Email" width={40} height={40} className="mx-auto mb-2" />
                <div className="font-bold text-gray-300">Email</div>
                <div className="text-sm text-gray-100">support@casino.com</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Image src="/Phone.svg" alt="Phone" width={40} height={40} className="mx-auto mb-2" />
                <div className="font-bold text-gray-300">Phone</div>
                <div className="text-sm text-gray-100">+1-800-123-4567</div>
              </div>
            </div>
          </section>

          {/* Pros and Cons */}
          <section className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-300 mb-4">What We Like and What Could Be Better</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg text-seagreen mb-3 flex items-center gap-2">
                  <Image src="/CheckCircle.svg" alt="" width={20} height={20} />
                  What We Like
                </h3>
                <ul className="space-y-2">
                  {(attributes.pros || [
                    "Fast withdrawals",
                    "Great game selection", 
                    "Generous bonuses",
                    "Mobile-friendly",
                    "24/7 customer support"
                  ]).map((pro, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-100">
                      <Image src="/Check.svg" alt="" width={16} height={16} className="text-seagreen" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg text-firebrick-100 mb-3 flex items-center gap-2">
                  <Image src="/XCircle.svg" alt="" width={20} height={20} />
                  What Could Be Better
                </h3>
                <ul className="space-y-2">
                  {(attributes.cons || [
                    "Limited customer support languages",
                    "High wagering requirements on some bonuses"
                  ]).map((con, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-100">
                      <Image src="/X.svg" alt="" width={16} height={16} className="text-firebrick-100" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* User Reviews */}
          <section className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-300 mb-6">User Reviews</h2>
            <div className="space-y-6 mb-8">
              {mockReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            <div className="text-center">
              <button className="bg-firebrick-200 text-white px-8 py-3 rounded-lg hover:bg-firebrick-100 transition-colors font-bold">
                Load More Reviews
              </button>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-300 mb-6">Common Questions About Best Online Casino Canada</h2>
            
            <div className="space-y-4">
              {/* FAQ Item 1 */}
              <div className="border border-gray-200 rounded-xl p-6">
                <button className="flex items-center justify-between w-full text-left">
                  <h3 className="text-lg font-bold text-gray-300">What is the best online casino Canada for real money play?</h3>
                  <Image src="/CaretDown.svg" alt="" width={20} height={20} />
                </button>
              </div>

              {/* FAQ Item 2 - Expanded */}
              <div className="border border-gray-200 rounded-xl p-6">
                <button className="flex items-center justify-between w-full text-left mb-4">
                  <h3 className="text-lg font-bold text-gray-300">What payment methods are common for Canadian players?</h3>
                  <Image src="/CaretUp.svg" alt="" width={20} height={20} />
                </button>
                <p className="text-base leading-relaxed text-gray-100 font-onest">
                  Canadian players frequently use Interac for deposits and withdrawals due to its convenience, security, and direct integration with Canadian banks. Other popular options include major credit cards (Visa, Mastercard), various e-wallets (e.g., EcoPayz, MuchBetter), and increasingly, cryptocurrencies. We assess each casino's banking options for Canadian compatibility and efficiency.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="border border-gray-200 rounded-xl p-6">
                <button className="flex items-center justify-between w-full text-left">
                  <h3 className="text-lg font-bold text-gray-300">Can I play on my mobile device at Canadian online casinos?</h3>
                  <Image src="/CaretDown.svg" alt="" width={20} height={20} />
                </button>
              </div>

              {/* FAQ Item 4 */}
              <div className="border border-gray-200 rounded-xl p-6">
                <button className="flex items-center justify-between w-full text-left">
                  <h3 className="text-lg font-bold text-gray-300">Are winnings from online casinos taxed in Canada?</h3>
                  <Image src="/CaretDown.svg" alt="" width={20} height={20} />
                </button>
              </div>
            </div>
          </section>

          {/* Final Verdict */}
          <section className="bg-seagreen rounded-2xl p-8 text-white text-center mb-8">
            <h2 className="text-2xl font-bold mb-6">Final Verdict on {attributes.name}</h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <div className="text-4xl">🎮</div>
              </div>
              <div className="text-left">
                <div className="text-4xl font-bold">{attributes.rating}/5</div>
                <div className="text-lg opacity-90">Overall Rating</div>
              </div>
            </div>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              {attributes.name} stands out as an excellent choice for Canadian players seeking fast payouts, generous bonuses, and a vast game selection. With proper licensing and responsive customer support, it offers a secure and enjoyable gaming experience.
            </p>
            <a
              href={attributes.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-seagreen font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Play Now
            </a>
          </section>

          {/* Responsible Gaming */}
          <section className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Image src="/18+.svg" alt="18+" width={32} height={32} />
              <h3 className="text-xl font-bold text-gray-300">Play Responsibly – For 18+ Only</h3>
            </div>
            <p className="text-base text-gray-100 mb-6 font-onest">
              Gambling can be addictive. Please play responsibly and within your means. For support, visit BeGambleAware.org or contact GamCare.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Image src="/18+.svg" alt="18+ MGA" width={60} height={30} />
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
    </div>
  );
};

export default CasinoPage;
