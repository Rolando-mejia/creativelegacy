// Sección Servicios
import services from '../data/services.json';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Code, Palette, Megaphone, Users, Target, CircleDot } from 'lucide-react';

type Service = {
  title: string;
  shortDesc: string;
  bullets: string[];
  icon: string;
};

export default function Services() {
  const servicesArray = services as Service[];
  
  // Configuración responsiva - Siempre 3 por slide excepto móvil y tablet
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;  // Desktop: 3 cards
      if (window.innerWidth >= 768) return 2;   // Tablet: 2 cards
      return 1; // Mobile: 1 card
    }
    return 3;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  
  // Crear array infinito duplicando servicios
  const originalSlides = Math.ceil(servicesArray.length / itemsPerView);
  
  // Inicializar en el conjunto medio para permitir scroll infinito en ambas direcciones
  const [currentSlide, setCurrentSlide] = useState(originalSlides);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Actualizar items por vista al redimensionar
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerView = getItemsPerView();
      setItemsPerView(newItemsPerView);
      // Resetear al conjunto medio cuando cambia el viewport
      const newOriginalSlides = Math.ceil(servicesArray.length / newItemsPerView);
      setCurrentSlide(newOriginalSlides);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [servicesArray.length]);

  const infiniteServices = [...servicesArray, ...servicesArray, ...servicesArray];
  const totalSlides = originalSlides * 3; // Triple para scroll infinito
  
  // Manejar transición infinita
  useEffect(() => {
    if (currentSlide >= originalSlides * 2) {
      // Cuando llega al final del segundo set, saltar al inicio del primer set
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(originalSlides);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500);
      return () => clearTimeout(timer);
    } else if (currentSlide < originalSlides) {
      // Cuando está antes del primer set completo, saltar al segundo set
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(originalSlides + currentSlide);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, originalSlides]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => prev - 1);
  };

  return (
    <section id="services" className="py-8 lg:py-12 px-2 lg:px-4 bg-black text-white relative min-h-screen flex flex-col">
      <div className="w-full max-w-full mx-auto flex flex-col gap-6 lg:gap-8 items-center h-full flex-1">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-[#4fd1ff] drop-shadow-[0_0_30px_#4fd1ff] mb-2 lg:mb-4 text-center">
          Servicios
        </h2>
        
        {/* Carrusel Container - Ocupa completamente la sección */}
        <div className="relative w-full h-full flex-1 flex items-center justify-center overflow-hidden min-h-[500px] lg:min-h-[600px]">
          {/* Botón Anterior - En el extremo izquierdo */}
          <button
            onClick={prevSlide}
            className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/90 border-2 border-[#4fd1ff] rounded-full p-4 lg:p-6 text-[#4fd1ff] hover:bg-[#101c2c] hover:shadow-[0_0_30px_#4fd1ff] hover:scale-110 transition-all duration-300 backdrop-blur"
            aria-label="Anterior"
          >
            <ChevronLeft size={32} strokeWidth={3} />
          </button>

          {/* Botón Siguiente - En el extremo derecho */}
          <button
            onClick={nextSlide}
            className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/90 border-2 border-[#4fd1ff] rounded-full p-4 lg:p-6 text-[#4fd1ff] hover:bg-[#101c2c] hover:shadow-[0_0_30px_#4fd1ff] hover:scale-110 transition-all duration-300 backdrop-blur"
            aria-label="Siguiente"
          >
            <ChevronRight size={32} strokeWidth={3} />
          </button>

          {/* Cards Container - Máximo ancho posible */}
          <div className="w-full h-full flex items-center justify-center px-20 lg:px-28">
            <div 
              className={`flex items-center ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{ 
                transform: `translateX(-${currentSlide * (100 / originalSlides)}%)`,
                width: `${totalSlides * (100 / originalSlides)}%`,
                gap: itemsPerView === 1 ? '0px' : '32px'
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                const startIndex = slideIndex * itemsPerView;
                const slidServices = infiniteServices.slice(startIndex, startIndex + itemsPerView);
                
                return (
                  <div 
                    key={slideIndex} 
                    className="flex w-full h-full items-center justify-center"
                    style={{ 
                      gap: itemsPerView === 1 ? '0px' : '32px',
                      flex: `0 0 ${100 / originalSlides}%`
                    }}
                  >
                    {slidServices.map((service, idx) => {
                      
                      // Mapeo de iconos específicos
                      const getIcon = (iconName: string) => {
                        const iconSize = itemsPerView >= 3 ? 40 : 48;
                        switch (iconName.toLowerCase()) {
                          case 'code': return <Code size={iconSize} strokeWidth={2.5} className="text-[#4fd1ff] drop-shadow-[0_0_15px_#4fd1ff]" />;
                          case 'palette': return <Palette size={iconSize} strokeWidth={2.5} className="text-[#4fd1ff] drop-shadow-[0_0_15px_#4fd1ff]" />;
                          case 'megaphone': return <Megaphone size={iconSize} strokeWidth={2.5} className="text-[#4fd1ff] drop-shadow-[0_0_15px_#4fd1ff]" />;
                          case 'users': return <Users size={iconSize} strokeWidth={2.5} className="text-[#4fd1ff] drop-shadow-[0_0_15px_#4fd1ff]" />;
                          case 'target': return <Target size={iconSize} strokeWidth={2.5} className="text-[#4fd1ff] drop-shadow-[0_0_15px_#4fd1ff]" />;
                          default: return <CircleDot size={iconSize} strokeWidth={2.5} className="text-[#4fd1ff] drop-shadow-[0_0_15px_#4fd1ff]" />;
                        }
                      };
                      return (
                        <Card
                          key={slideIndex * itemsPerView + idx}
                          className="bg-black/80 border-2 border-[#4fd1ff] rounded-2xl shadow-[0_0_30px_#4fd1ff] hover:scale-[1.03] hover:shadow-[0_0_50px_#4fd1ff] transition-all duration-300 flex flex-col"
                          style={{ 
                            flex: `0 0 calc(${100 / itemsPerView}% - ${itemsPerView > 1 ? '16px' : '0px'})`,
                            height: itemsPerView >= 3 ? '420px' : '480px',
                            width: itemsPerView >= 3 ? '320px' : '480px',
                            maxHeight: itemsPerView >= 3 ? '420px' : '480px',
                            minHeight: itemsPerView >= 3 ? '420px' : '480px',
                            maxWidth: itemsPerView >= 3 ? '320px' : '480px',
                            aspectRatio: itemsPerView >= 3 ? '3/4' : '1/1'
                          }}
                        >
                          <CardHeader className="flex flex-col items-center gap-4 lg:gap-6 pb-3 lg:pb-4 pt-6 lg:pt-8">
                            <span className="bg-[#101c2c] rounded-full p-4 lg:p-6 flex items-center justify-center border-2 border-[#4fd1ff] shadow-[0_0_20px_#4fd1ff]">
                              {getIcon(service.icon)}
                            </span>
                            <CardTitle className={`font-orbitron text-[#4fd1ff] drop-shadow-[0_0_15px_#4fd1ff] text-center px-2 lg:px-4 ${
                              itemsPerView >= 3 ? 'text-lg lg:text-xl' : 'text-xl lg:text-2xl'
                            }`}>
                              {service.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-2 lg:pt-4 flex-1 flex flex-col px-4 lg:px-6 pb-6 lg:pb-8 overflow-hidden">
                            <div className={`text-gray-200 mb-3 lg:mb-4 leading-relaxed font-light text-center line-clamp-3 ${
                              itemsPerView >= 3 ? 'text-sm lg:text-base' : 'text-base lg:text-lg'
                            }`}>
                              {service.shortDesc}
                            </div>
                            <ul className={`list-disc pl-4 lg:pl-6 text-[#4fd1ff] space-y-1 font-orbitron overflow-hidden flex-1 ${
                              itemsPerView >= 3 ? 'text-xs lg:text-sm' : 'text-sm lg:text-base'
                            }`}>
                              {service.bullets.slice(0, itemsPerView >= 3 ? 3 : 4).map((b, i) => <li key={i} className="truncate">{b}</li>)}
                            </ul>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Indicadores de slide - Más grandes y visibles */}
        <div className="flex gap-4 lg:gap-6 mt-4 lg:mt-6">
          {Array.from({ length: originalSlides }).map((_, index) => {
            // Calcular el slide actual normalizado para los indicadores
            const normalizedSlide = currentSlide % originalSlides;
            return (
              <button
                key={index}
                onClick={() => {
                  // Ir al slide correspondiente en el conjunto actual
                  const targetSlide = Math.floor(currentSlide / originalSlides) * originalSlides + index;
                  setCurrentSlide(targetSlide);
                }}
                className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full transition-all duration-300 ${
                  index === normalizedSlide 
                    ? "bg-[#4fd1ff] shadow-[0_0_25px_#4fd1ff] scale-125" 
                    : "bg-white/30 hover:bg-white/60 hover:scale-110"
                }`}
              />
            );
          })}
        </div>
      </div>
      
      {/* Fondo animado neon - Múltiples capas para más impacto */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[1000px] h-[1000px] rounded-full bg-[#4fd1ff]/8 blur-3xl animate-pulse" />
        <div className="absolute w-[800px] h-[800px] rounded-full bg-[#4fd1ff]/6 blur-2xl animate-pulse" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[#4fd1ff]/4 blur-xl animate-pulse" />
      </div>
    </section>
  );
}

