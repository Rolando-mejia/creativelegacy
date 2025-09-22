import { useReviews } from '../lib/reviews';
import type { Review } from '../lib/reviews';
import StarRating from './ui/star-rating';
import { Card } from './ui/card';
import Carousel from './ui/carousel';
import type { CarouselRef } from './ui/carousel';
import { User, Clock } from 'lucide-react';
import { useRef, useEffect } from 'react';

export default function Reviews() {
  const { reviews, getAverageRating, totalReviews } = useReviews();
  const carouselRef = useRef<CarouselRef>(null);

  // Mostrar mensaje si no hay reseñas pero no ocultar la sección completamente
  const hasReviews = reviews.length > 0;

  // Ir al primer slide cuando se añadan nuevas reseñas
  useEffect(() => {
    if (hasReviews && carouselRef.current) {
      // Pequeño delay para permitir que el DOM se actualice
      const timeout = setTimeout(() => {
        carouselRef.current?.goToFirst();
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [reviews.length, hasReviews]);

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Lo que dicen nuestros
            <span className="text-[#4fd1ff] drop-shadow-[0_0_12px_#4fd1ff]"> clientes</span>
          </h2>
          
          {hasReviews ? (
            <>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="flex items-center gap-2">
                  <StarRating rating={getAverageRating()} readonly size="lg" />
                  <span className="text-[#4fd1ff] font-orbitron text-lg sm:text-xl font-bold">
                    {getAverageRating()}/5
                  </span>
                </div>
                <span className="text-gray-300 font-orbitron text-sm sm:text-base">
                  Basado en {totalReviews} reseña{totalReviews !== 1 ? 's' : ''}
                </span>
              </div>
              
              <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto font-orbitron leading-relaxed">
                La satisfacción de nuestros clientes es nuestra mayor prioridad. 
                Aquí puedes ver las experiencias reales de quienes han confiado en nosotros.
              </p>
            </>
          ) : (
            <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto font-orbitron leading-relaxed">
              Sé el primero en compartir tu experiencia con Creative Legacy. 
              Tu opinión es muy importante para nosotros.
            </p>
          )}
        </div>

        {/* Reviews Carousel */}
        {hasReviews ? (
          <div className="px-4 sm:px-6 lg:px-8">
            <Carousel 
              ref={carouselRef}
              itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
              gap={20}
              autoHeight={false}
            >
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </Carousel>
          </div>
        ) : (
          <div className="flex justify-center px-4">
            <div className="w-full max-w-md p-6 sm:p-8 rounded-lg border border-[#4fd1ff]/20 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-[#4fd1ff]/10 border border-[#4fd1ff]/30 flex items-center justify-center">
                  <StarRating rating={0} readonly size="md" />
                </div>
                <p className="text-gray-300 font-orbitron text-sm">
                  No hay reseñas aún. ¡Sé el primero en compartir tu experiencia!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Call to action */}
        <div className="text-center mt-10 sm:mt-12 lg:mt-16">
          <p className="text-gray-300 font-orbitron mb-3 sm:mb-4 text-sm sm:text-base">
            ¿Has trabajado con nosotros? ¡Comparte tu experiencia!
          </p>
          <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-[#4fd1ff]/30 via-[#4fd1ff] to-[#4fd1ff]/30 rounded-full mx-auto"></div>
        </div>
      </div>
    </section>
  );
}

interface ReviewCardProps {
  review: Review;
}

function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-[#4fd1ff]/20 hover:border-[#4fd1ff]/40 transition-all duration-300 hover:shadow-[0_0_30px_#4fd1ff]/20 hover:scale-105 group h-full">
      <div className="p-4 sm:p-6 h-full flex flex-col">
        {/* Header con usuario y fecha */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#4fd1ff]/20 to-[#4fd1ff]/40 flex items-center justify-center border border-[#4fd1ff]/30 flex-shrink-0">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#4fd1ff]" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-orbitron font-bold text-white text-base sm:text-lg group-hover:text-[#4fd1ff] transition-colors truncate">
                {review.name}
              </h3>
              <div className="flex items-center gap-1 text-gray-400 text-xs sm:text-sm">
                <Clock className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{formatDate(review.date)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <StarRating rating={review.rating} readonly size="md" />
        </div>

        {/* Comment */}
        <blockquote className="text-gray-300 font-orbitron leading-relaxed italic text-sm sm:text-base flex-grow">
          "{review.comment}"
        </blockquote>

        {/* Decorative element */}
        <div className="mt-6 h-1 w-full bg-gradient-to-r from-transparent via-[#4fd1ff]/30 to-transparent rounded-full"></div>
      </div>
    </Card>
  );
}