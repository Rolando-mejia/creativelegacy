import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({ 
  rating, 
  onRatingChange, 
  readonly = false, 
  size = 'md' 
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5 sm:w-6 sm:h-6',
    lg: 'w-6 h-6 sm:w-7 sm:h-7'
  };

  const handleMouseEnter = (starIndex: number) => {
    if (!readonly) {
      setHoverRating(starIndex);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const handleClick = (starIndex: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starIndex);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const isFilled = starIndex <= (hoverRating || rating);
        
        return (
          <button
            key={starIndex}
            type="button"
            disabled={readonly}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
            className={`
              ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} 
              transition-all duration-200 
              ${!readonly ? 'focus:outline-none focus:ring-2 focus:ring-[#4fd1ff]/50 rounded' : ''}
            `}
          >
            <Star
              className={`
                ${sizeClasses[size]} 
                transition-all duration-200
                ${isFilled 
                  ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_4px_#facc15]' 
                  : 'text-gray-400 hover:text-yellow-300'
                }
              `}
            />
          </button>
        );
      })}
    </div>
  );
}