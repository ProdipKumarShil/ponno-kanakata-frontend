import { Star } from 'lucide-react';
import { cn, toBengaliNumber } from '@/lib/utils';
import { useLanguage } from '@/context/language-context';



export default function Rating({ rating, reviewCount, className }) {
  const { language } = useLanguage();
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"
            )}
          />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs text-muted-foreground">({language === 'bn' ? toBengaliNumber(reviewCount) : reviewCount})</span>
      )}
    </div>
  );
}
