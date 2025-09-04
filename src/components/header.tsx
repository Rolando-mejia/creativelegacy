
import Logo from "./logo";
import { Button } from "./ui/button";

const navLinks = [
  { name: "Inicio", href: "#hero" },
  { name: "Servicios", href: "#services" },
  { name: "Portafolio", href: "#portfolio" },
  { name: "Nosotros", href: "#about" },
  { name: "Contacto", href: "#contact" },
];

export default function Header() {
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
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 rounded-lg border border-[#4fd1ff] text-[#4fd1ff] font-semibold hover:bg-[#101c2c] hover:text-white transition-all duration-200 shadow-neon text-sm font-orbitron"
              >
                {link.name}
              </a>
            ))}
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
          <button className="lg:hidden flex flex-col gap-1 p-2 ml-2" aria-label="Menú">
            <span className="w-6 h-0.5 bg-[#4fd1ff] rounded"></span>
            <span className="w-6 h-0.5 bg-[#4fd1ff] rounded"></span>
            <span className="w-6 h-0.5 bg-[#4fd1ff] rounded"></span>
          </button>
        </div>
        </div>
      </div>
      
      {/* Menú móvil desplegable - puedes implementar la funcionalidad después */}
      <div className="lg:hidden border-t border-[#4fd1ff]/30 bg-black/95 backdrop-blur hidden">
        <nav className="flex flex-col gap-2 p-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-3 rounded-lg border border-[#4fd1ff] text-[#4fd1ff] font-semibold hover:bg-[#101c2c] hover:text-white transition-all duration-200 shadow-neon text-center font-orbitron"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
