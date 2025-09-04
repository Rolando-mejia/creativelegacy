// Sección Hero
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

// Array de imágenes del carrusel
const carouselImages = [
  "/images/hero-slide-1.jpg",
  "/images/hero-slide-2.jpg", 
  "/images/hero-slide-3.jpg",
  "/images/hero-slide-4.jpg"
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Cambio automático cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-[80vh] bg-black text-white overflow-hidden"
    >
      {/* Carrusel de imágenes de fondo */}
      <div className="absolute inset-0">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-70" : "opacity-0"
            }`}
          >
            {/* Imagen para desktop (1024px+) */}
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="hidden lg:block w-full h-full object-cover"
            />
            {/* Imagen para tablet (768px-1023px) */}
            <img
              src={image.replace('.jpg', '-tablet.jpg')}
              alt={`Slide ${index + 1} tablet`}
              className="hidden md:block lg:hidden w-full h-full object-cover object-center"
            />
            {/* Imagen para móvil (hasta 767px) */}
            <img
              src={image.replace('.jpg', '-mobile.jpg')}
              alt={`Slide ${index + 1} móvil`}
              className="block md:hidden w-full h-full object-cover object-center"
            />
            {/* Overlay oscuro adaptativo */}
            <div className="absolute inset-0 bg-black/60 md:bg-black/55 lg:bg-black/50"></div>
          </div>
        ))}
      </div>

      {/* Contenido del Hero */}
      <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6 lg:gap-8 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-orbitron font-bold tracking-widest text-[#4fd1ff] drop-shadow-[0_0_32px_#4fd1ff] text-center leading-tight">
          Creatividad que deja huella
        </h1>
        <a
          href="https://wa.me/521234567890"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            className="text-[#4fd1ff] border-[#4fd1ff] text-base md:text-lg lg:text-xl px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 font-orbitron shadow-[0_0_32px_#4fd1ff] hover:bg-[#101c2c] hover:text-white transition-all duration-300"
          >
            ¡Contáctanos por WhatsApp!
          </Button>
        </a>
      </div>

      {/* Indicadores del carrusel */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-[#4fd1ff] shadow-[0_0_12px_#4fd1ff]" 
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Efecto de fondo animado neon */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-[#4fd1ff]/10 blur-3xl animate-pulse" />
      </div>
    </section>
  );
}
