import Image from 'next/image';
import { Casino } from '@/types/casino';
import { getStrapiMediaURL } from '@/lib/strapi';

interface CasinoHeaderProps {
  casino: Casino;
}

const CasinoHeader: React.FC<CasinoHeaderProps> = ({ casino }) => {
  const { attributes } = casino;
  const logoUrl = attributes.logo ? getStrapiMediaURL(attributes.logo) : '/Logo.svg';

  const getTags = () => {
    const tags = [];
    if (attributes.isNew) tags.push({ label: "New", color: "bg-mistyrose", textColor: "text-firebrick-100" });
    if (attributes.fastPayouts) tags.push({ label: "Fast Payouts", color: "bg-skyblue", textColor: "text-darkslategray" });
    if (attributes.noDeposit) tags.push({ label: "No Deposit", color: "bg-yellowgreen", textColor: "text-darkolivegreen" });
    return tags;
  };

  return (
    <section className="bg-steelblue text-white py-12 px-4 lg:px-[120px] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-[48px] font-bold leading-tight mb-4">
            Is {attributes.name} Casino Worth Your Time in 2025?
          </h1>
          <p className="text-xl leading-relaxed opacity-90 max-w-3xl mx-auto font-onest">
            {attributes.description}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Casino Logo */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <Image 
                  src={logoUrl}
                  alt={attributes.name}
                  width={100}
                  height={60}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            {/* Casino Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                {getTags().map((tag, index) => (
                  <span key={index} className={`${tag.color} ${tag.textColor} text-sm font-semibold px-3 py-1 rounded-full`}>
                    {tag.label}
                  </span>
                ))}
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">{attributes.name}</h2>
              <p className="text-lg opacity-90 mb-4 font-onest">
                {attributes.shortDescription || attributes.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold mb-1">{attributes.rating}</div>
                  <div className="text-sm opacity-70">Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">2000+</div>
                  <div className="text-sm opacity-70">Games</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">{attributes.withdrawalSpeed || '24h'}</div>
                  <div className="text-sm opacity-70">Payout</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">{attributes.minDeposit || '$10'}</div>
                  <div className="text-sm opacity-70">Min Deposit</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0">
              <a
                href={attributes.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-firebrick-200 hover:bg-firebrick-100 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
              >
                Play Now →
              </a>
            </div>
          </div>

          {/* Bonus Info */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Image src="/Gift.svg" alt="" width={24} height={24} />
                <span className="font-semibold">{attributes.bonusAmount}</span>
              </div>
              <div className="flex items-center gap-3">
                <Image src="/Star.svg" alt="" width={24} height={24} />
                <span className="font-semibold">{attributes.freeSpins}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasinoHeader;
