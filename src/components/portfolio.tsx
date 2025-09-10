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
    <section id="portfolio" className="py-12 bg-black text-white relative min-h-[88vh] overflow-hidden">
      <div className="max-w-full mx-auto flex flex-col gap-8">
        {/* Header fijo */}
        <div className="text-center px-4 relative z-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-[#4fd1ff] drop-shadow-[0_0_30px_#4fd1ff] mb-4">
            Portafolio
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Explora nuestros proyectos deslizando horizontalmente
          </p>
        </div>

        {/* Container de scroll horizontal con parallax */}
        <div 
          ref={containerRef}
          className="relative w-full h-[75vh] overflow-x-auto overflow-y-hidden scrollbar-hide cursor-grab active:cursor-grabbing"
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
                className="relative flex-shrink-0 h-full flex items-center justify-center px-4"
                style={{ width: '100vw' }}
              >
                {/* Background parallax para cada zona */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${getZoneGradient(index)} opacity-20`}
                  style={{
                    transform: `translateX(${getParallaxOffset(index)}px)`,
                  }}
                />
                
                {/* Elementos decorativos con parallax */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    transform: `translateX(${getParallaxOffset(index) * 0.3}px)`,
                  }}
                >
                  <div className="w-full h-full relative">
                    <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#4fd1ff]/10 blur-xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-[#4fd1ff]/5 blur-2xl animate-pulse" 
                         style={{ animationDelay: '1s' }} />
                  </div>
                </div>

                {/* Card del proyecto */}
                <div className="relative z-10 w-full h-full flex items-center justify-center px-2">
                  <div 
                    className="bg-black/90 border-2 border-[#4fd1ff] rounded-3xl shadow-[0_0_40px_#4fd1ff] p-8 backdrop-blur-sm group hover:shadow-[0_0_60px_#4fd1ff] transition-all duration-500 hover:scale-[1.02] w-full max-w-[95vw] h-[90%]"
                    style={{
                      transform: `translateY(${Math.sin((scrollX / projectWidth + index) * 0.5) * 8}px)`,
                    }}
                  >
                    <div className="grid md:grid-cols-5 gap-8 items-center h-full">
                      {/* Columna izquierda - Imagen principal (más ancha) */}
                      <div className="relative md:col-span-3 h-full flex flex-col justify-center">
                        <div className="relative overflow-hidden rounded-2xl border-2 border-[#4fd1ff] shadow-[0_0_30px_#4fd1ff] h-full max-h-[500px]">
                          <img 
                            src={`/${item.thumb}`} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          
                          {/* Badge de categoría */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-[#4fd1ff] text-black px-3 py-1 rounded-full text-sm font-orbitron font-bold">
                              {item.category}
                            </span>
                          </div>

                          {/* Botones de acción */}
                          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="bg-black/80 border border-[#4fd1ff] text-[#4fd1ff] p-2 rounded-full hover:bg-[#4fd1ff] hover:text-black transition-colors duration-200">
                              <Eye size={18} />
                            </button>
                            <button className="bg-black/80 border border-[#4fd1ff] text-[#4fd1ff] p-2 rounded-full hover:bg-[#4fd1ff] hover:text-black transition-colors duration-200">
                              <ExternalLink size={18} />
                            </button>
                          </div>
                        </div>

                        {/* Galería miniatura */}
                        <div className="flex gap-3 mt-4 justify-center">
                          {item.gallery.slice(0, 4).map((img, i) => (
                            <img 
                              key={i} 
                              src={`/${img}`} 
                              alt={`Galería ${i + 1}`} 
                              className="w-14 h-14 object-cover rounded-lg border border-[#4fd1ff] shadow-[0_0_15px_#4fd1ff] hover:scale-110 transition-transform duration-200 cursor-pointer" 
                            />
                          ))}
                        </div>
                      </div>

                      {/* Columna derecha - Contenido (más compacta) */}
                      <div className="space-y-6 md:col-span-2 h-full flex flex-col justify-center">
                        <div>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-orbitron font-bold text-[#4fd1ff] drop-shadow-[0_0_20px_#4fd1ff] mb-4">
                            {item.title}
                          </h3>
                          <p className="text-base md:text-lg leading-relaxed">
                            {item.summary}
                          </p>
                        </div>

                        {/* Métricas destacadas */}
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(item.metrics).slice(0, 4).map(([k, v]) => (
                            <div key={k} className="bg-[#101c2c] border border-[#4fd1ff] rounded-xl p-4 text-center hover:shadow-[0_0_20px_#4fd1ff] transition-all duration-300">
                              <div className="text-lg md:text-xl font-orbitron font-bold text-[#4fd1ff]">{v}</div>
                              <div className="text-gray-300 text-xs md:text-sm">{k}</div>
                            </div>
                          ))}
                        </div>

                        {/* Testimonial */}
                        <blockquote className="bg-[#101c2c] border-l-4 border-[#4fd1ff] p-5 rounded-r-xl">
                          <p className="text-gray-200 italic text-base md:text-lg mb-3">
                            "{item.testimonial.quote}"
                          </p>
                          <footer className="flex items-center gap-3">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#4fd1ff] rounded-full flex items-center justify-center text-black font-bold">
                              {item.testimonial.nombre.charAt(0)}
                            </div>
                            <div>
                              <div className="text-[#4fd1ff] font-orbitron font-bold text-base">
                                {item.testimonial.nombre}
                              </div>
                              <div className="text-gray-400 text-sm">
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
        <div className="relative z-20 px-4">
          {/* Indicadores de zona */}
          <div className="flex justify-center gap-3 mb-4">
            {portfolioData.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToZone(index)}
                className={`transition-all duration-300 ${
                  index === activeZone 
                    ? "w-10 h-3 bg-[#4fd1ff] shadow-[0_0_20px_#4fd1ff] rounded-full" 
                    : "w-3 h-3 bg-white/30 hover:bg-white/60 rounded-full hover:scale-125"
                }`}
              />
            ))}
          </div>

          {/* Botones de navegación */}
          <div className="flex justify-center gap-3">
            <button 
              onClick={scrollToPrevZone}
              className="bg-black/90 border-2 border-[#4fd1ff] rounded-full p-2 text-[#4fd1ff] hover:bg-[#101c2c] hover:shadow-[0_0_30px_#4fd1ff] hover:scale-110 transition-all duration-300"
            >
              <ArrowLeft size={18} strokeWidth={3} />
            </button>
            
            <button 
              onClick={scrollToNextZone}
              className="bg-black/90 border-2 border-[#4fd1ff] rounded-full p-2 text-[#4fd1ff] hover:bg-[#101c2c] hover:shadow-[0_0_30px_#4fd1ff] hover:scale-110 transition-all duration-300"
            >
              <ArrowRight size={18} strokeWidth={3} />
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
