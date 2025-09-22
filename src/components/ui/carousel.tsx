import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: React.ReactNode[];
  itemsPerView?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap?: number;
  autoHeight?: boolean;
}

export interface CarouselRef {
  goToFirst: () => void;
  goToSlide: (index: number) => void;
}

const Carousel = forwardRef<CarouselRef, CarouselProps>(({ 
  children, 
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 24,
  autoHeight = false
}, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [translateOffset, setTranslateOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(itemsPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(itemsPerView.tablet);
      } else {
        setItemsToShow(itemsPerView.desktop);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  const maxIndex = Math.max(0, children.length - itemsToShow);

  // Touch/Mouse event handlers
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
    setTranslateOffset(0);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    
    const diff = clientX - startX;
    setCurrentX(clientX);
    setTranslateOffset(diff);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    const diff = currentX - startX;
    const threshold = 50; // Minimum distance to trigger slide
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex > 0) {
        // Swipe right - go to previous
        goToPrevious();
      } else if (diff < 0 && currentIndex < maxIndex) {
        // Swipe left - go to next
        goToNext();
      }
    }
    
    // Reset drag state
    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
    setTranslateOffset(0);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      e.preventDefault(); // Prevent scroll while swiping
    }
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Mouse events (for desktop testing)
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(maxIndex, Math.max(0, index)));
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    goToFirst: () => setCurrentIndex(0),
    goToSlide
  }));

  const baseTranslateX = -(currentIndex * (100 / itemsToShow));
  const dragTranslateX = isDragging ? (translateOffset / (carouselRef.current?.offsetWidth || 1)) * 100 : 0;
  const translateX = baseTranslateX + dragTranslateX;

  // Add global mouse event listeners when dragging
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const diff = e.clientX - startX;
        setCurrentX(e.clientX);
        setTranslateOffset(diff);
      };
      
      const handleGlobalMouseUp = () => {
        const diff = currentX - startX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
          if (diff > 0 && currentIndex > 0) {
            setCurrentIndex(prev => Math.max(0, prev - 1));
          } else if (diff < 0 && currentIndex < maxIndex) {
            setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
          }
        }
        
        setIsDragging(false);
        setStartX(0);
        setCurrentX(0);
        setTranslateOffset(0);
      };

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, startX, currentX, currentIndex, maxIndex]);

  return (
    <div className="relative w-full">
      {/* Navigation buttons */}
      {children.length > itemsToShow && (
        <>
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-[#4fd1ff]/20 border border-[#4fd1ff]/40 text-[#4fd1ff] hover:bg-[#4fd1ff]/30 hover:border-[#4fd1ff]/60 hover:shadow-[0_0_20px_#4fd1ff]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 backdrop-blur-sm hover:scale-110 disabled:hover:scale-100"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 mx-auto drop-shadow-[0_0_4px_#4fd1ff]" />
          </button>
          
          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-[#4fd1ff]/20 border border-[#4fd1ff]/40 text-[#4fd1ff] hover:bg-[#4fd1ff]/30 hover:border-[#4fd1ff]/60 hover:shadow-[0_0_20px_#4fd1ff]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 backdrop-blur-sm hover:scale-110 disabled:hover:scale-100"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6 mx-auto drop-shadow-[0_0_4px_#4fd1ff]" />
          </button>
        </>
      )}

      {/* Carousel container */}
      <div 
        ref={carouselRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
        style={{ 
          height: autoHeight ? 'auto' : undefined,
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className={`flex ${isDragging ? '' : 'transition-transform duration-500 ease-in-out'}`}
          style={{ 
            transform: `translateX(${translateX}%)`,
            gap: `${gap}px`,
            width: `${(children.length / itemsToShow) * 100}%`,
            willChange: isDragging ? 'transform' : 'auto'
          }}
        >
          {children.map((child, index) => (
            <div 
              key={index}
              className="flex-shrink-0 select-none"
              style={{ 
                width: `calc(${100 / itemsToShow}% - ${(gap * (itemsToShow - 1)) / itemsToShow}px)`,
                pointerEvents: isDragging ? 'none' : 'auto'
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      {children.length > itemsToShow && (
        <div className="flex justify-center mt-8 gap-3">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-[#4fd1ff] shadow-[0_0_8px_#4fd1ff] scale-125'
                  : 'bg-gray-600 hover:bg-gray-500 hover:scale-110'
              }`}
              aria-label={`Ir a página ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
});

Carousel.displayName = 'Carousel';

export default Carousel;