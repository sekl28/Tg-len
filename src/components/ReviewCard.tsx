import Image from 'next/image';
import { Review } from '@/types/casino';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Image 
        key={i} 
        src="/Star.svg" 
        alt="" 
        width={16} 
        height={16}
        className={i < rating ? 'opacity-100' : 'opacity-30'}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-white">
                {review.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="font-semibold text-gray-300">{review.author}</div>
              {review.verified && (
                <div className="flex items-center gap-1 text-xs text-seagreen">
                  <Image src="/ShieldCheck.svg" alt="" width={12} height={12} />
                  Verified Player
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex gap-1 mb-1">
            {renderStars(review.rating)}
          </div>
          <div className="text-sm text-gray-100">{formatDate(review.date)}</div>
        </div>
      </div>
      
      <h4 className="font-bold text-gray-300 mb-2">{review.title}</h4>
      <p className="text-gray-100 leading-relaxed mb-3 font-onest">{review.content}</p>
      
      <div className="flex items-center justify-between text-sm">
        <div className="text-gray-100">
          Was this helpful?
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-gray-100 hover:text-seagreen transition-colors">
            <Image src="/Heart.svg" alt="" width={14} height={14} />
            <span>{review.helpful}</span>
          </button>
          <div className="flex gap-2">
            <button className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-green-50 hover:border-green-300 transition-colors">
              <Image src="/Check.svg" alt="Yes" width={12} height={12} />
            </button>
            <button className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors">
              <Image src="/X.svg" alt="No" width={12} height={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
