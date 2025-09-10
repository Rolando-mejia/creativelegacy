// Sección Acerca de
import aboutData from "../data/about.json";

export default function About() {
  return (
    <section id="about" className="py-16 px-4 bg-black text-white relative min-h-screen flex items-center">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/about-background.jpg" 
          alt="Creative Legacy Team Background" 
          className="w-full h-full object-cover"
        />
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        {/* Overlay con gradiente neon */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4fd1ff]/20 via-transparent to-[#4fd1ff]/10" />
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header con título y descripción principal */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-[#4fd1ff] drop-shadow-[0_0_30px_#4fd1ff] mb-8">
            Acerca de Creative Legacy
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-white leading-relaxed font-light backdrop-blur-sm bg-black/30 p-6 rounded-2xl border border-[#4fd1ff]/30 shadow-[0_0_30px_#4fd1ff]/20">
              {aboutData.aboutText}
            </p>
          </div>
        </div>

        {/* Grid de contenido */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Nuestro Proceso */}
          <div className="backdrop-blur-sm bg-black/50 p-8 rounded-2xl border border-[#4fd1ff] shadow-[0_0_30px_#4fd1ff]/20">
            <h3 className="text-3xl font-orbitron text-[#4fd1ff] mb-6 text-center drop-shadow-[0_0_15px_#4fd1ff]">
              Nuestro Proceso
            </h3>
            <div className="space-y-4">
              {aboutData.process.map((step, i) => (
                <div key={step} className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-[#4fd1ff]/50 hover:bg-black/60 hover:border-[#4fd1ff] transition-all duration-300 hover:shadow-[0_0_20px_#4fd1ff]/30">
                  <div className="w-10 h-10 rounded-full bg-[#4fd1ff] text-black font-orbitron font-bold flex items-center justify-center text-lg">
                    {i + 1}
                  </div>
                  <span className="text-white font-medium flex-1">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Valores */}
          <div className="backdrop-blur-sm bg-black/50 p-8 rounded-2xl border border-[#4fd1ff] shadow-[0_0_30px_#4fd1ff]/20">
            <h3 className="text-3xl font-orbitron text-[#4fd1ff] mb-6 text-center drop-shadow-[0_0_15px_#4fd1ff]">
              Nuestros Valores
            </h3>
            <div className="space-y-4">
              {aboutData.values.map((value, index) => (
                <div key={value} className="p-4 rounded-xl bg-black/40 border border-[#4fd1ff]/50 hover:bg-black/60 hover:border-[#4fd1ff] transition-all duration-300 hover:shadow-[0_0_20px_#4fd1ff]/30 text-center">
                  <span className="text-white font-orbitron font-medium text-lg">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonios */}
        <div className="text-center">
          <h3 className="text-3xl font-orbitron text-[#4fd1ff] mb-8 drop-shadow-[0_0_15px_#4fd1ff]">
            Lo que dicen nuestros clientes
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {aboutData.testimonials.map((t, index) => (
              <blockquote key={t.nombre} className="backdrop-blur-sm bg-black/50 p-6 rounded-2xl border border-[#4fd1ff]/30 shadow-[0_0_20px_#4fd1ff]/20 hover:shadow-[0_0_30px_#4fd1ff]/30 transition-all duration-300">
                <p className="text-white italic text-lg mb-4 leading-relaxed">
                  "{t.quote}"
                </p>
                <footer className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#4fd1ff] flex items-center justify-center text-black font-bold text-lg">
                    {t.nombre.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="text-[#4fd1ff] font-orbitron font-bold">{t.nombre}</div>
                    <div className="text-gray-300 text-sm">{t.rol}</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>

      {/* Elementos decorativos adicionales */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-[#4fd1ff]/10 blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full bg-[#4fd1ff]/5 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-3/4 left-1/3 w-24 h-24 rounded-full bg-[#4fd1ff]/8 blur-lg animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
    </section>
  );
}
