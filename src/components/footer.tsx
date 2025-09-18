// Footer
import { useState } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { whatsappConfig } from "../config/emailjs-config";
import { Button } from "./ui/button";

// Iconos de redes sociales adicionales (simulando TikTok y Threads)
const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.25-1.833-1.25-2.833V1H13.5v14.5c0 2.485-2.015 4.5-4.5 4.5S4.5 17.985 4.5 15.5 6.515 11 9 11c.414 0 .814.056 1.195.162V8.109A7.472 7.472 0 0 0 9 8c-4.142 0-7.5 3.358-7.5 7.5S4.858 23 9 23s7.5-3.358 7.5-7.5V8.696c1.295.875 2.775 1.304 4.321 1.304V7C19.961 7 19.14 6.41 19.321 5.562z"/>
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Aquí podrías integrar con un servicio de newsletter como EmailJS o Mailchimp
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
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
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <h3 className="font-orbitron text-xl font-bold text-[#4fd1ff] drop-shadow-[0_0_8px_#4fd1ff] mb-4">
              Mantente conectado
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Suscríbete para recibir las últimas noticias y actualizaciones de Creative Legacy.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-black/60 border border-[#4fd1ff]/30 text-white font-orbitron focus:outline-none focus:ring-2 focus:ring-[#4fd1ff] focus:border-transparent placeholder:text-gray-400"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#4fd1ff] text-black hover:bg-[#4fd1ff]/80 font-orbitron font-bold transition-all duration-300 shadow-[0_0_20px_#4fd1ff]/50"
              >
                {isSubscribed ? "¡Suscrito!" : "Suscribirse al newsletter"}
              </Button>
            </form>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="font-orbitron text-lg font-bold text-[#4fd1ff] mb-6">Recursos</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-300 hover:text-[#4fd1ff] transition-colors font-orbitron">Servicios</a></li>
              <li><a href="#portfolio" className="text-gray-300 hover:text-[#4fd1ff] transition-colors font-orbitron">Portafolio</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-[#4fd1ff] transition-colors font-orbitron">Casos de estudio</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-[#4fd1ff] transition-colors font-orbitron">Trabaja con nosotros</a></li>
            </ul>
          </div>

          {/* Acerca de */}
          <div>
            <h4 className="font-orbitron text-lg font-bold text-[#4fd1ff] mb-6">Acerca de</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-300 hover:text-[#4fd1ff] transition-colors font-orbitron">Blog</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-[#4fd1ff] transition-colors font-orbitron">Nuestra historia</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-[#4fd1ff] transition-colors font-orbitron">Equipo</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-[#4fd1ff] transition-colors font-orbitron">Agencias</a></li>
            </ul>
          </div>

          {/* Comunidad */}
          <div>
            <h4 className="font-orbitron text-lg font-bold text-[#4fd1ff] mb-6">Comunidad</h4>
            <ul className="space-y-3">
              <li><a href="#contact" className="text-gray-300 hover:text-[#4fd1ff] transition-colors font-orbitron">Contribuir</a></li>
              <li><a href={`https://wa.me/${whatsappConfig.phoneNumber}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#4fd1ff] transition-colors font-orbitron">WhatsApp</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-[#4fd1ff] transition-colors font-orbitron">Inspiración</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-[#4fd1ff] transition-colors font-orbitron">Eventos</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barra inferior con redes sociales y copyright */}
      <div className="border-t border-[#4fd1ff]/20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Logo y copyright */}
            <div className="flex items-center gap-4">
              <span className="font-orbitron text-[#4fd1ff] text-xl font-bold drop-shadow-[0_0_8px_#4fd1ff]">
                Creative Legacy
              </span>
              <span className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Todos los derechos reservados
              </span>
            </div>

            {/* Redes sociales */}
            <div className="flex items-center gap-6">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_currentColor]`}
                    aria-label={social.name}
                  >
                    <IconComponent size={24} />
                  </a>
                );
              })}
            </div>

            {/* Links legales */}
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-[#4fd1ff] transition-colors font-orbitron">
                Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4fd1ff] transition-colors font-orbitron">
                Términos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
