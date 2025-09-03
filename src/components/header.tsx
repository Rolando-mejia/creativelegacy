
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
      <div className="max-w-6xl mx-auto flex items-center justify-between py-2 px-4">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="ml-2 text-2xl font-bold tracking-widest text-[#4fd1ff] drop-shadow-neon font-orbitron">CREATIVE LEGACY</span>
        </div>
        <nav className="hidden md:flex gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-2 rounded-lg border border-[#4fd1ff] text-[#4fd1ff] font-semibold hover:bg-[#101c2c] hover:text-white transition-all duration-200 shadow-neon"
            >
              {link.name}
            </a>
          ))}
        </nav>
        <a
          href="https://wa.me/521234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4"
        >
          <Button variant="outline" className="border-[#4fd1ff] text-[#4fd1ff] hover:bg-[#101c2c] hover:text-white shadow-neon">
            WhatsApp
          </Button>
        </a>
      </div>
    </header>
  );
}
