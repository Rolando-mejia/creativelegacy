// Sección Portafolio con Cards Parallax - Scroll Horizontal
import portfolioData from "../data/portfolio.json";
import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Eye, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Portfolio() {
  const [scrollX, setScrollX] = useState(0);
  const [activeZone, setActiveZone] = useState(0);
  const [projectWidth, setProjectWidth] = useState(1200);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Establecer ancho del proyecto basado en viewport
  useEffect(() => {
    const updateWidth = () => {
      setProjectWidth(window.innerWidth);
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Scroll automático suave cada 8 segundos
  useEffect(() => {
    const scrollToZoneAuto = (zoneIndex: number) => {
      const targetScroll = zoneIndex * projectWidth;
      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      }
    };

    const timer = setInterval(() => {
      if (!isDragging) {
        const nextZone = (activeZone + 1) % portfolioData.length;
        scrollToZoneAuto(nextZone);
      }
    }, 8000);
    return () => clearInterval(timer);
  }, [activeZone, isDragging, projectWidth]);

  // Detectar zona activa basada en scroll
  useEffect(() => {
    const newActiveZone = Math.round(scrollX / projectWidth);
    if (newActiveZone !== activeZone && newActiveZone >= 0 && newActiveZone < portfolioData.length) {
      setActiveZone(newActiveZone);
    }
  }, [scrollX, projectWidth, activeZone]);

  const scrollToNextZone = () => {
    const nextZone = (activeZone + 1) % portfolioData.length;
    scrollToZone(nextZone);
  };

  const scrollToPrevZone = () => {
    const prevZone = (activeZone - 1 + portfolioData.length) % portfolioData.length;
    scrollToZone(prevZone);
  };

  const scrollToZone = (zoneIndex: number) => {
    const targetScroll = zoneIndex * projectWidth;
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  // Manejar scroll manual
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    setScrollX(scrollLeft);
  };

  // Drag to scroll functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Multiplicador para sensibilidad
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Calcular efecto parallax para backgrounds
  const getParallaxOffset = (index: number) => {
    const zoneOffset = index * projectWidth;
    const relativeScroll = scrollX - zoneOffset;
    return relativeScroll * 0.5; // Factor de parallax
  };

  // Generar gradientes dinámicos para cada zona
  const getZoneGradient = (index: number) => {
    const colors = [
      'from-blue-900/20 via-cyan-900/30 to-blue-800/20',
      'from-purple-900/20 via-pink-900/30 to-purple-800/20',
      'from-green-900/20 via-emerald-900/30 to-green-800/20',
      'from-orange-900/20 via-red-900/30 to-orange-800/20',
      'from-indigo-900/20 via-blue-900/30 to-indigo-800/20'
    ];
    return colors[index % colors.length];
  };

  return (
    <section id="portfolio" className="py-8 md:py-12 lg:py-16 bg-black text-white relative min-h-[85vh] md:min-h-[88vh] lg:min-h-[90vh] overflow-hidden">
      <div className="max-w-full mx-auto flex flex-col gap-6 md:gap-8 lg:gap-10">
        {/* Header fijo */}
        <div className="text-center px-4 md:px-6 lg:px-8 relative z-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-orbitron font-bold text-[#4fd1ff] drop-shadow-[0_0_30px_#4fd1ff] mb-3 md:mb-4 lg:mb-6">
            Portafolio
          </h2>
          <p className="text-gray-300 text-base md:text-lg lg:text-xl mb-6 md:mb-8 lg:mb-10 max-w-2xl mx-auto">
            Explora nuestros proyectos deslizando horizontalmente
          </p>
        </div>

        {/* Container de scroll horizontal con parallax */}
        <div 
          ref={containerRef}
          className="relative w-full h-[65vh] md:h-[70vh] lg:h-[75vh] overflow-x-auto overflow-y-hidden scrollbar-hide cursor-grab active:cursor-grabbing"
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
        >
          {/* Contenedor de todas las zonas */}
          <div 
            className="flex h-full"
            style={{ width: `${portfolioData.length * 100}vw` }}
          >
            {portfolioData.map((item, index) => (
              <div 
                key={index}
                className="relative flex-shrink-0 h-full flex items-center justify-center px-2 md:px-4 lg:px-6"
                style={{ width: '100vw' }}
              >
                {/* Background parallax optimizado */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${getZoneGradient(index)} opacity-20 will-change-transform`}
                  style={{
                    transform: `translate3d(${getParallaxOffset(index)}px, 0, 0)`,
                  }}
                />
                
                {/* Elementos decorativos optimizados */}
                <div 
                  className="absolute inset-0 pointer-events-none will-change-transform"
                  style={{
                    transform: `translate3d(${getParallaxOffset(index) * 0.3}px, 0, 0)`,
                  }}
                >
                  <div className="w-full h-full relative">
                    <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#4fd1ff]/10 blur-xl opacity-60" />
                    <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-[#4fd1ff]/5 blur-2xl opacity-60" />
                  </div>
                </div>

                {/* Card del proyecto */}
                <div className="relative z-10 w-full h-full flex items-center justify-center px-1 md:px-2 lg:px-4">
                  <div 
                    className="bg-black/90 border-2 border-[#4fd1ff] rounded-2xl md:rounded-3xl shadow-[0_0_40px_#4fd1ff] p-4 md:p-6 lg:p-8 backdrop-blur-sm group hover:shadow-[0_0_60px_#4fd1ff] transition-all duration-500 hover:scale-[1.02] w-full max-w-[98vw] md:max-w-[95vw] lg:max-w-[92vw] h-[95%] md:h-[90%] lg:h-[88%] will-change-transform"
                  >
                    {/* Mobile: Layout vertical, Tablet+: Layout horizontal */}
                    <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8 items-center h-full">
                      {/* Sección de imagen - Mobile: full width, Desktop: 3 cols */}
                      <div className="relative w-full lg:col-span-3 h-1/2 lg:h-full flex flex-col justify-center">
                        <div className="relative overflow-hidden rounded-xl lg:rounded-2xl border-2 border-[#4fd1ff] shadow-[0_0_30px_#4fd1ff] h-full max-h-[280px] md:max-h-[350px] lg:max-h-[500px]">
                          <img 
                            src={`/${item.thumb}`} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading={index === 0 ? "eager" : "lazy"}
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          
                          {/* Badge de categoría */}
                          <div className="absolute top-2 md:top-3 lg:top-4 left-2 md:left-3 lg:left-4">
                            <span className="bg-[#4fd1ff] text-black px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-orbitron font-bold">
                              {item.category}
                            </span>
                          </div>

                          {/* Botones de acción */}
                          <div className="absolute top-2 md:top-3 lg:top-4 right-2 md:right-3 lg:right-4 flex gap-1 md:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="bg-black/80 border border-[#4fd1ff] text-[#4fd1ff] p-1.5 md:p-2 rounded-full hover:bg-[#4fd1ff] hover:text-black transition-colors duration-200">
                              <Eye size={14} className="md:w-4 md:h-4 lg:w-[18px] lg:h-[18px]" />
                            </button>
                            <button className="bg-black/80 border border-[#4fd1ff] text-[#4fd1ff] p-1.5 md:p-2 rounded-full hover:bg-[#4fd1ff] hover:text-black transition-colors duration-200">
                              <ExternalLink size={14} className="md:w-4 md:h-4 lg:w-[18px] lg:h-[18px]" />
                            </button>
                          </div>
                        </div>

                        {/* Galería miniatura - Oculta en mobile */}
                        <div className="hidden md:flex gap-2 lg:gap-3 mt-3 lg:mt-4 justify-center">
                          {item.gallery.slice(0, 4).map((img, i) => (
                            <img 
                              key={i} 
                              src={`/${img}`} 
                              alt={`Galería ${i + 1}`} 
                              className="w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14 object-cover rounded-lg border border-[#4fd1ff] shadow-[0_0_15px_#4fd1ff] hover:scale-110 transition-transform duration-200 cursor-pointer"
                              loading="lazy"
                              decoding="async"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Sección de contenido - Mobile: full width, Desktop: 2 cols */}
                      <div className="w-full lg:col-span-2 h-1/2 lg:h-full flex flex-col justify-center space-y-3 md:space-y-4 lg:space-y-6">
                        {/* Título y descripción */}
                        <div>
                          <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-orbitron font-bold text-[#4fd1ff] drop-shadow-[0_0_20px_#4fd1ff] mb-2 md:mb-3 lg:mb-4">
                            {item.title}
                          </h3>
                          <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-300">
                            {item.summary}
                          </p>
                        </div>

                        {/* Métricas destacadas */}
                        <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4">
                          {Object.entries(item.metrics).slice(0, 4).map(([k, v]) => (
                            <div key={k} className="bg-[#101c2c] border border-[#4fd1ff] rounded-lg lg:rounded-xl p-2 md:p-3 lg:p-4 text-center hover:shadow-[0_0_20px_#4fd1ff] transition-all duration-300">
                              <div className="text-sm md:text-lg lg:text-xl font-orbitron font-bold text-[#4fd1ff]">{v}</div>
                              <div className="text-gray-300 text-xs md:text-sm">{k}</div>
                            </div>
                          ))}
                        </div>

                        {/* Testimonial - Oculto en mobile muy pequeño */}
                        <blockquote className="hidden sm:block bg-[#101c2c] border-l-4 border-[#4fd1ff] p-3 md:p-4 lg:p-5 rounded-r-lg lg:rounded-r-xl">
                          <p className="text-gray-200 italic text-sm md:text-base lg:text-lg mb-2 md:mb-3">
                            "{item.testimonial.quote}"
                          </p>
                          <footer className="flex items-center gap-2 md:gap-3">
                            <div className="w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 bg-[#4fd1ff] rounded-full flex items-center justify-center text-black font-bold text-sm md:text-base lg:text-lg">
                              {item.testimonial.nombre.charAt(0)}
                            </div>
                            <div>
                              <div className="text-[#4fd1ff] font-orbitron font-bold text-sm md:text-base">
                                {item.testimonial.nombre}
                              </div>
                              <div className="text-gray-400 text-xs md:text-sm">
                                {item.testimonial.rol}
                              </div>
                            </div>
                          </footer>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navegación e indicadores */}
        <div className="relative z-20 px-4 md:px-6 lg:px-8">
          {/* Indicadores de zona */}
          <div className="flex justify-center gap-2 md:gap-3 lg:gap-4 mb-4 md:mb-5 lg:mb-6">
            {portfolioData.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToZone(index)}
                className={`transition-all duration-300 ${
                  index === activeZone 
                    ? "w-8 md:w-10 lg:w-12 h-2 md:h-3 bg-[#4fd1ff] shadow-[0_0_20px_#4fd1ff] rounded-full" 
                    : "w-2 md:w-3 h-2 md:h-3 bg-white/30 hover:bg-white/60 rounded-full hover:scale-125"
                }`}
              />
            ))}
          </div>

          {/* Botones de navegación */}
          <div className="flex justify-center gap-3 md:gap-4 lg:gap-5">
            <button 
              onClick={scrollToPrevZone}
              className="bg-black/90 border-2 border-[#4fd1ff] rounded-full p-2 md:p-3 lg:p-3 text-[#4fd1ff] hover:bg-[#101c2c] hover:shadow-[0_0_30px_#4fd1ff] hover:scale-110 transition-all duration-300 touch-manipulation"
            >
              <ArrowLeft size={16} className="md:w-5 md:h-5 lg:w-6 lg:h-6" strokeWidth={3} />
            </button>
            
            <button 
              onClick={scrollToNextZone}
              className="bg-black/90 border-2 border-[#4fd1ff] rounded-full p-2 md:p-3 lg:p-3 text-[#4fd1ff] hover:bg-[#101c2c] hover:shadow-[0_0_30px_#4fd1ff] hover:scale-110 transition-all duration-300 touch-manipulation"
            >
              <ArrowRight size={16} className="md:w-5 md:h-5 lg:w-6 lg:h-6" strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      {/* Fondo base con efecto parallax */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div 
          className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-black"
          style={{
            transform: `translateX(${scrollX * 0.1}px)`,
          }}
        />
      </div>
    </section>
  );
}
