import Image from "next/image";
import Link from "next/link";
import { Casino } from "@/types/casino";
import { getStrapiMediaURL } from "@/lib/strapi";
import { memo, useMemo } from "react";

interface CasinoCardProps {
  casino: Casino;
  priority?: boolean; // For image loading optimization
}

const CasinoCard: React.FC<CasinoCardProps> = memo(({ casino, priority = false }) => {
  const { attributes } = casino;

  // Memoize tags computation for better performance
  const tags = useMemo(() => {
    const tagList = [];
    if (attributes.isNew) {
      tagList.push({ 
        label: "New", 
        className: "bg-gradient-to-r from-firebrick-200 to-firebrick-100 text-white" 
      });
    }
    if (attributes.fastPayouts) {
      tagList.push({ 
        label: "Fast Payouts", 
        className: "bg-gradient-to-r from-seagreen to-emerald-600 text-white" 
      });
    }
    if (attributes.noDeposit) {
      tagList.push({ 
        label: "No Deposit", 
        className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white" 
      });
    }
    return tagList;
  }, [attributes.isNew, attributes.fastPayouts, attributes.noDeposit]);

  // Memoize media URLs
  const { logoUrl, heroImageUrl } = useMemo(() => ({
    logoUrl: attributes.logo ? getStrapiMediaURL(attributes.logo) : '/Logo.svg',
    heroImageUrl: attributes.heroImage ? getStrapiMediaURL(attributes.heroImage) : null
  }), [attributes.logo, attributes.heroImage]);

  return (
    <article className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      {/* Casino Image */}
      <div className="relative bg-gradient-to-br from-steelblue to-blue-600 h-36 sm:h-40 overflow-hidden">
        {heroImageUrl ? (
          <Image 
            src={heroImageUrl}
            alt={`${attributes.name} casino preview`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Image 
              src={logoUrl}
              alt={`${attributes.name} logo`}
              width={120}
              height={60}
              className="opacity-90 transition-opacity duration-300 group-hover:opacity-100"
              priority={priority}
            />
          </div>
        )}
        
        {/* Ratings - Improved positioning and readability */}
        <div className="absolute top-3 right-3 flex gap-2">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1.5 flex items-center gap-1.5 shadow-sm">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-bold text-gray-700">{attributes.rating}</span>
          </div>
          {attributes.userRating && (
            <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1.5 flex items-center gap-1.5 shadow-sm">
              <svg className="w-4 h-4 text-seagreen" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-bold text-gray-700">{attributes.userRating}</span>
            </div>
          )}
        </div>
        
        {/* License Badge - Cleaner design */}
        <div className="absolute top-3 left-3">
          <div className="bg-seagreen/90 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-white text-xs font-medium">Licensed</span>
          </div>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        {/* Tags - Improved spacing and design */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className={`${tag.className} text-xs font-medium px-2.5 py-1 rounded-full shadow-sm`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}
        
        {/* Casino Info - Better typography */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-300 leading-tight line-clamp-1">
            {attributes.name}
          </h3>
          <p className="text-sm text-gray-100 leading-relaxed line-clamp-2">
            {attributes.shortDescription || attributes.description}
          </p>
        </div>
        
        {/* Bonus Features - Cleaner presentation */}
        <div className="space-y-2">
          {attributes.bonusAmount && (
            <div className="flex items-center gap-2 text-seagreen">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-sm">{attributes.bonusAmount}</span>
            </div>
          )}
          {attributes.freeSpins && (
            <div className="flex items-center gap-2 text-seagreen">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-sm">{attributes.freeSpins}</span>
            </div>
          )}
        </div>
        
        {/* Action Buttons - Enhanced design and accessibility */}
        <div className="space-y-3 pt-2">
          <a
            href={attributes.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-firebrick-200 to-firebrick-100 text-white font-semibold py-3.5 text-center rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-firebrick-200 focus:ring-offset-2"
            aria-label={`Claim bonus at ${attributes.name} casino`}
          >
            Claim Bonus
          </a>
          <Link
            href={`/casinos/${attributes.slug}`}
            className="block w-full border-2 border-gray-200 text-gray-300 font-semibold py-3.5 text-center rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            aria-label={`Read full review of ${attributes.name} casino`}
          >
            Full Review
          </Link>
        </div>
        
        {/* Payment Methods - Simplified and cleaner */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-300">Payment Methods</span>
            <div className="flex items-center gap-1">
              {/* Payment Icons - Using SVG instead of images for better performance */}
              <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded text-white text-xs flex items-center justify-center font-bold">
                V
              </div>
              <div className="w-8 h-5 bg-gradient-to-r from-red-600 to-red-700 rounded text-white text-xs flex items-center justify-center font-bold">
                M
              </div>
              <div className="w-8 h-5 bg-gradient-to-r from-purple-600 to-purple-700 rounded text-white text-xs flex items-center justify-center font-bold">
                S
              </div>
              <span className="text-xs text-gray-100 ml-1">+5 more</span>
            </div>
          </div>
          
          {/* License Info - Cleaner presentation */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-seagreen rounded-full flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xs text-gray-100">
              Licensed by <span className="font-semibold text-gray-300">
                {attributes.licenseInfo || "Gaming Commission"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
});

export default CasinoCard;
