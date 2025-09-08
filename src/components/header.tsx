
import Logo from "./logo";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Inicio", href: "#hero" },
  { name: "Servicios", href: "#services" },
  { name: "Portafolio", href: "#portfolio" },
  { name: "Nosotros", href: "#about" },
  { name: "Contacto", href: "#contact" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detectar sección activa al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "services", "portfolio", "about", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para scroll animado personalizado
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Cerrar menú móvil al navegar
      setMobileMenuOpen(false);
      
      // Añadir clase de animación temporal
      targetElement.style.transform = 'scale(1.02)';
      targetElement.style.transition = 'transform 0.3s ease-out';
      
      // Scroll suave
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      
      // Remover animación después de un tiempo
      setTimeout(() => {
        targetElement.style.transform = 'scale(1)';
        setTimeout(() => {
          targetElement.style.transition = '';
          targetElement.style.transform = '';
        }, 300);
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur border-b border-[#4fd1ff]/30 shadow-lg">
      <div className="w-full flex items-center py-3 px-4 lg:px-6">
        {/* Logo y texto bien a la izquierda - 90% */}
        <div className="flex items-center gap-2 flex-shrink-0 w-[45%]">
          <div className="scale-125">
            <Logo />
          </div>
          <span className="text-xl lg:text-2xl font-bold tracking-widest text-[#4fd1ff] drop-shadow-neon font-orbitron">
            CREATIVE LEGACY
          </span>
        </div>
        
        {/* Navegación bien a la derecha - 90% */}
        <div className="flex items-center justify-end w-[55%] gap-4">
          <nav className="hidden lg:flex gap-2">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`px-3 py-2 rounded-lg border border-[#4fd1ff] font-semibold transition-all duration-300 text-sm font-orbitron transform hover:scale-105 hover:rotate-1 ${
                    isActive 
                      ? 'bg-[#4fd1ff]/20 text-white shadow-[0_0_20px_#4fd1ff] nav-link-active' 
                      : 'text-[#4fd1ff] hover:bg-[#101c2c] hover:text-white shadow-neon'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Botón WhatsApp - siempre visible */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/521234567890"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-[#4fd1ff] text-[#4fd1ff] hover:bg-[#101c2c] hover:text-white shadow-neon text-sm px-3 py-2 font-orbitron">
                WhatsApp
              </Button>
            </a>
            
            {/* Menú hamburguesa para móvil */}
            <button 
              className="lg:hidden flex flex-col gap-1 p-2 ml-2 transition-transform duration-300 hover:scale-110" 
              aria-label="Menú"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className={`w-6 h-0.5 bg-[#4fd1ff] rounded transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-[#4fd1ff] rounded transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-[#4fd1ff] rounded transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Menú móvil desplegable */}
      <div className={`lg:hidden border-t border-[#4fd1ff]/30 bg-black/95 backdrop-blur transition-all duration-300 ease-in-out ${
        mobileMenuOpen 
          ? 'max-h-96 opacity-100 visible' 
          : 'max-h-0 opacity-0 invisible overflow-hidden'
      }`}>
        <nav className="flex flex-col gap-2 p-4">
          {navLinks.map((link, index) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`px-4 py-3 rounded-lg border font-semibold transition-all duration-300 text-center font-orbitron transform hover:scale-105 ${
                  isActive
                    ? 'border-[#4fd1ff] bg-[#4fd1ff]/20 text-white shadow-[0_0_15px_#4fd1ff]'
                    : 'border-[#4fd1ff] text-[#4fd1ff] hover:bg-[#101c2c] hover:text-white shadow-neon'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: mobileMenuOpen ? 'slideInFromRight 0.3s ease-out forwards' : 'none'
                }}
              >
                {link.name}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
