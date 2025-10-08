// Sección Acerca de
import aboutData from "../data/about.json";

export default function About() {
  return (
    <section id="about" className="py-10 px-4 bg-black text-white relative min-h-[60vh] flex items-center">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/about-background.jpg.png" 
          alt="Creative Legacy Team Background" 
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        {/* Overlay con gradiente neon */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4fd1ff]/20 via-transparent to-[#4fd1ff]/10" />
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header con título y descripción principal */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-[#4fd1ff] drop-shadow-[0_0_30px_#4fd1ff] mb-6">
            Acerca de Creative Legacy
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-white leading-relaxed font-light backdrop-blur-sm bg-black/30 p-6 rounded-2xl border border-[#4fd1ff]/30 shadow-[0_0_30px_#4fd1ff]/20">
              {aboutData.aboutText}
            </p>
          </div>
        </div>
      </div>

      {/* Elementos decorativos optimizados */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-[#4fd1ff]/10 blur-xl opacity-60" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full bg-[#4fd1ff]/5 blur-2xl opacity-40" />
        <div className="absolute top-3/4 left-1/3 w-24 h-24 rounded-full bg-[#4fd1ff]/8 blur-lg opacity-50" />
      </div>
    </section>
  );
}
