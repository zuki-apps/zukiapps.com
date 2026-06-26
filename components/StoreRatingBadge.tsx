import { getAppStoreRating } from '@/lib/appStoreRatings';
import { Star } from 'lucide-react';

type StoreRatingBadgeProps = {
  appPath: string;
  className?: string;
};

export default function StoreRatingBadge({ appPath, className = '' }: StoreRatingBadgeProps) {
  const rating = getAppStoreRating(appPath);
  if (!rating) return null;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm text-gray-200 ${className}`}
      aria-label={`${rating.ratingValue} out of 5 stars from ${rating.ratingCount} ratings`}
    >
      <div className="flex items-center gap-0.5 text-amber-400" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.round(rating.ratingValue) ? 'fill-amber-400' : 'fill-transparent'}`}
          />
        ))}
      </div>
      <span className="font-semibold text-white">{rating.ratingValue.toFixed(1)}</span>
      <span className="text-gray-400">({rating.ratingCount.toLocaleString()})</span>
    </div>
  );
}
