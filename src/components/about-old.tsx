// Sección Acerca de
import aboutData from "../data/about.json";

export default function About() {
  return (
    <section id="about" className="py-16 px-4 bg-black text-white">
      <div className="max-w-4xl mx-auto flex flex-col gap-8 items-center">
        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-[#4fd1ff] drop-shadow-[0_0_16px_#4fd1ff] mb-2 text-center">
          Acerca de Creative Legacy
        </h2>
        <p className="text-lg md:text-xl text-gray-300 text-center max-w-2xl font-light mb-4">
          {aboutData.aboutText}
        </p>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex-1">
            <h3 className="text-xl font-orbitron text-[#4fd1ff] mb-2">Nuestro Proceso</h3>
            <ol className="flex flex-row md:flex-col gap-4 md:gap-2 justify-center items-center">
              {aboutData.process.map((step, i) => (
                <li key={step} className="relative px-4 py-2 rounded-lg border border-[#4fd1ff] text-[#4fd1ff] font-semibold shadow-neon bg-black/70">
                  <span className="font-orbitron">{i + 1}. {step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-orbitron text-[#4fd1ff] mb-2">Valores</h3>
            <ul className="flex flex-row md:flex-col gap-4 md:gap-2 justify-center items-center">
              {aboutData.values.map((value) => (
                <li key={value} className="px-4 py-2 rounded-lg border border-[#4fd1ff] text-[#4fd1ff] font-semibold shadow-neon bg-black/70 font-orbitron">
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 w-full flex flex-col items-center gap-4">
          <h3 className="text-xl font-orbitron text-[#4fd1ff] mb-2">Testimonios</h3>
          {aboutData.testimonials.map((t) => (
            <blockquote key={t.nombre} className="max-w-xl text-gray-200 italic border-l-4 border-[#4fd1ff] pl-4">
              “{t.quote}”
              <footer className="mt-2 text-[#4fd1ff] font-orbitron font-bold">{t.nombre}, {t.rol}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
