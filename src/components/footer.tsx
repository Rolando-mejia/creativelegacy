// Footer
export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-[#4fd1ff]/30 py-8 px-4 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-orbitron text-[#4fd1ff] text-lg font-bold drop-shadow-[0_0_8px_#4fd1ff]">Creative Legacy</span>
          <span className="text-gray-400 text-sm">© {new Date().getFullYear()} Todos los derechos reservados</span>
        </div>
        <nav className="flex gap-4">
          <a href="#hero" className="font-orbitron text-[#4fd1ff] hover:text-white transition">Inicio</a>
          <a href="#services" className="font-orbitron text-[#4fd1ff] hover:text-white transition">Servicios</a>
          <a href="#portfolio" className="font-orbitron text-[#4fd1ff] hover:text-white transition">Portafolio</a>
          <a href="#about" className="font-orbitron text-[#4fd1ff] hover:text-white transition">Nosotros</a>
          <a href="#contact" className="font-orbitron text-[#4fd1ff] hover:text-white transition">Contacto</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="https://wa.me/521234567890" target="_blank" rel="noopener noreferrer" className="font-orbitron text-[#4fd1ff] hover:text-white transition">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
