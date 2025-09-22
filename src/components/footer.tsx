// Footer
import { useState } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { whatsappConfig } from "../config/emailjs-config";
import { Button } from "./ui/button";
import StarRating from "./ui/star-rating";
import { useReviews } from "../lib/reviews";
import Toast from "./ui/toast";

// Iconos de redes sociales adicionales (simulando TikTok)
const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.25-1.833-1.25-2.833V1H13.5v14.5c0 2.485-2.015 4.5-4.5 4.5S4.5 17.985 4.5 15.5 6.515 11 9 11c.414 0 .814.056 1.195.162V8.109A7.472 7.472 0 0 0 9 8c-4.142 0-7.5 3.358-7.5 7.5S4.858 23 9 23s7.5-3.358 7.5-7.5V8.696c1.295.875 2.775 1.304 4.321 1.304V7C19.961 7 19.14 6.41 19.321 5.562z"/>
  </svg>
);

export default function Footer() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { addReview } = useReviews();

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && rating > 0 && comment.trim()) {
      addReview(name.trim(), rating, comment.trim());
      setIsSubmitted(true);
      setShowToast(true);
      setName("");
      setRating(0);
      setComment("");
      setTimeout(() => setIsSubmitted(false), 1000);
    }
  };

  const socialLinks = [
    { 
      name: "Facebook", 
      icon: Facebook, 
      url: "https://facebook.com/creativelegacy", 
      color: "hover:text-blue-400" 
    },
    { 
      name: "Instagram", 
      icon: Instagram, 
      url: "https://instagram.com/creativelegacy", 
      color: "hover:text-pink-400" 
    },
    { 
      name: "TikTok", 
      icon: TikTokIcon, 
      url: "https://tiktok.com/@creativelegacy", 
      color: "hover:text-red-400" 
    },
    { 
      name: "LinkedIn", 
      icon: Linkedin, 
      url: "https://linkedin.com/company/creativelegacy", 
      color: "hover:text-blue-300" 
    }
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-black to-gray-900 border-t border-[#4fd1ff]/30 text-white">
      {/* Sección principal del footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        
        {/* Sección de reseñas - Destacada arriba */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-10">
              <h3 className="font-orbitron text-2xl md:text-3xl lg:text-4xl font-bold text-[#4fd1ff] drop-shadow-[0_0_15px_#4fd1ff] mb-3 md:mb-4">
                Comparte tu experiencia
              </h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Tu opinión nos ayuda a mejorar. Califica nuestro servicio y déjanos tus comentarios.
              </p>
            </div>
            
            {/* Formulario con diseño de tarjeta */}
            <div className="bg-black/40 backdrop-blur-sm border border-[#4fd1ff]/20 rounded-2xl p-6 md:p-8 shadow-[0_0_40px_#4fd1ff]/10">
              <form onSubmit={handleReviewSubmit} className="space-y-6">
                
                {/* Fila superior: Nombre y Calificación lado a lado */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Nombre - 2 columnas en desktop */}
                  <div className="lg:col-span-2 space-y-2">
                    <label className="text-gray-300 text-sm font-orbitron font-medium block">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre completo"
                      className="w-full px-4 py-3 rounded-lg bg-black/60 border border-[#4fd1ff]/30 text-white font-orbitron text-sm focus:outline-none focus:ring-2 focus:ring-[#4fd1ff] focus:border-[#4fd1ff] placeholder:text-gray-500 transition-all duration-200"
                      required
                    />
                  </div>
                  
                  {/* Calificación - 1 columna en desktop */}
                  <div className="space-y-2">
                    <label className="text-gray-300 text-sm font-orbitron font-medium block">
                      Calificación
                    </label>
                    <div className="flex justify-center lg:justify-start items-center h-[48px]">
                      <StarRating 
                        rating={rating} 
                        onRatingChange={setRating}
                        size="md"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Comentario - Ancho completo */}
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-orbitron font-medium block">
                    Tu experiencia
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Cuéntanos sobre tu experiencia con nuestros servicios..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-black/60 border border-[#4fd1ff]/30 text-white font-orbitron text-sm focus:outline-none focus:ring-2 focus:ring-[#4fd1ff] focus:border-[#4fd1ff] placeholder:text-gray-500 resize-none transition-all duration-200"
                    required
                  />
                </div>
                
                {/* Botón centrado */}
                <div className="flex justify-center pt-2">
                  <Button
                    type="submit"
                    disabled={!name.trim() || rating === 0 || !comment.trim()}
                    className="px-8 py-3 bg-[#4fd1ff] text-black hover:bg-[#4fd1ff]/80 font-orbitron font-bold transition-all duration-300 shadow-[0_0_20px_#4fd1ff]/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm rounded-lg hover:shadow-[0_0_30px_#4fd1ff]/50"
                  >
                    {isSubmitted ? "✓ ¡Enviado!" : "Enviar Reseña"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Secciones de navegación */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          
          {/* Empresa */}
          <div className="text-center md:text-left">
            <h4 className="font-orbitron text-lg md:text-xl font-bold text-[#4fd1ff] mb-6 md:mb-8 relative">
              <span className="relative z-10">Nuestra Empresa</span>
              <div className="absolute bottom-0 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 w-16 h-0.5 bg-[#4fd1ff] shadow-[0_0_10px_#4fd1ff]"></div>
            </h4>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
              Creamos experiencias digitales excepcionales que impulsan el crecimiento de tu negocio.
            </p>
          </div>

          {/* Servicios */}
          <div className="text-center md:text-left">
            <h4 className="font-orbitron text-lg md:text-xl font-bold text-[#4fd1ff] mb-6 md:mb-8 relative">
              <span className="relative z-10">Servicios</span>
              <div className="absolute bottom-0 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 w-16 h-0.5 bg-[#4fd1ff] shadow-[0_0_10px_#4fd1ff]"></div>
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <a 
                  href="#services" 
                  className="text-gray-300 hover:text-[#4fd1ff] font-orbitron text-sm md:text-base block py-1 hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="relative">
                    Desarrollo Web
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4fd1ff] group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  className="text-gray-300 hover:text-[#4fd1ff] font-orbitron text-sm md:text-base block py-1 hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="relative">
                    Diseño UX/UI
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4fd1ff] group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  className="text-gray-300 hover:text-[#4fd1ff] font-orbitron text-sm md:text-base block py-1 hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="relative">
                    Marketing Digital
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4fd1ff] group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  className="text-gray-300 hover:text-[#4fd1ff] font-orbitron text-sm md:text-base block py-1 hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="relative">
                    Consultoría
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4fd1ff] group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div className="text-center md:text-left">
            <h4 className="font-orbitron text-lg md:text-xl font-bold text-[#4fd1ff] mb-6 md:mb-8 relative">
              <span className="relative z-10">Recursos</span>
              <div className="absolute bottom-0 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 w-16 h-0.5 bg-[#4fd1ff] shadow-[0_0_10px_#4fd1ff]"></div>
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <a 
                  href="#portfolio" 
                  className="text-gray-300 hover:text-[#4fd1ff] font-orbitron text-sm md:text-base block py-1 hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="relative">
                    Portafolio
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4fd1ff] group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-gray-300 hover:text-[#4fd1ff] font-orbitron text-sm md:text-base block py-1 hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="relative">
                    Casos de Estudio
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4fd1ff] group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-gray-300 hover:text-[#4fd1ff] font-orbitron text-sm md:text-base block py-1 hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="relative">
                    Blog
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4fd1ff] group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-gray-300 hover:text-[#4fd1ff] font-orbitron text-sm md:text-base block py-1 hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="relative">
                    Documentación
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4fd1ff] group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto - Solo en desktop como 4ta columna */}
          <div className="hidden lg:block text-center md:text-left">
            <h4 className="font-orbitron text-lg md:text-xl font-bold text-[#4fd1ff] mb-6 md:mb-8 relative">
              <span className="relative z-10">Contacto</span>
              <div className="absolute bottom-0 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 w-16 h-0.5 bg-[#4fd1ff] shadow-[0_0_10px_#4fd1ff]"></div>
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <a 
                  href="#contact" 
                  className="text-gray-300 hover:text-[#4fd1ff] font-orbitron text-sm md:text-base block py-1 hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="relative">
                    Trabajar Juntos
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4fd1ff] group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${whatsappConfig.phoneNumber}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-[#4fd1ff] font-orbitron text-sm md:text-base block py-1 hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="relative">
                    WhatsApp
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4fd1ff] group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-gray-300 hover:text-[#4fd1ff] font-orbitron text-sm md:text-base block py-1 hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="relative">
                    Nuestro Equipo
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4fd1ff] group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-gray-300 hover:text-[#4fd1ff] font-orbitron text-sm md:text-base block py-1 hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="relative">
                    Ubicación
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4fd1ff] group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barra inferior con copyright y links legales */}
      <div className="border-t border-[#4fd1ff]/20 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            
            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left order-2 lg:order-1">
              <span className="font-orbitron text-[#4fd1ff] text-lg md:text-xl font-bold">
                Creative Legacy
              </span>
              <span className="text-gray-400 text-sm md:text-base">
                © {new Date().getFullYear()} Todos los derechos reservados
              </span>
            </div>

            {/* Redes sociales */}
            <div className="flex items-center gap-3 md:gap-4 order-1 lg:order-2">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_currentColor] p-2.5 rounded-full bg-black/60 border border-gray-700 hover:border-[#4fd1ff]/60`}
                    aria-label={social.name}
                  >
                    <IconComponent size={16} className="md:w-5 md:h-5" />
                  </a>
                );
              })}
            </div>

            {/* Links legales */}
            <div className="flex items-center gap-4 md:gap-6 text-sm md:text-base order-3">
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#4fd1ff] transition-all duration-300 font-orbitron px-3 py-2 rounded-lg hover:bg-[#4fd1ff]/10 border border-transparent hover:border-[#4fd1ff]/30"
              >
                Política de Privacidad
              </a>
              <div className="w-px h-4 bg-gray-600"></div>
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#4fd1ff] transition-all duration-300 font-orbitron px-3 py-2 rounded-lg hover:bg-[#4fd1ff]/10 border border-transparent hover:border-[#4fd1ff]/30"
              >
                Términos de Servicio
              </a>
            </div>
          </div>
          
          {/* Línea decorativa */}
          <div className="mt-6 md:mt-8 flex justify-center">
            <div className="w-32 md:w-48 h-px bg-gradient-to-r from-transparent via-[#4fd1ff]/60 to-transparent"></div>
          </div>
        </div>
      </div>
      
      {/* Toast notification */}
      <Toast
        show={showToast}
        message="¡Reseña enviada exitosamente! Gracias por tu opinión."
        type="success"
        onClose={() => setShowToast(false)}
      />
    </footer>
  );
}
