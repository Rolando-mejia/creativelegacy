// Sección Portafolio
import portfolioData from "../data/portfolio.json";

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-16 px-4 bg-black text-white">
      <div className="max-w-5xl mx-auto flex flex-col gap-8 items-center">
        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-[#4fd1ff] drop-shadow-[0_0_16px_#4fd1ff] mb-2 text-center">
          Portafolio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {portfolioData.map((item) => (
            <div key={item.title} className="rounded-xl border border-[#4fd1ff] bg-black/80 shadow-neon p-6 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img src={`/${item.thumb}`} alt={item.title} className="w-24 h-24 object-cover rounded-lg drop-shadow-[0_0_12px_#4fd1ff]" />
                <div>
                  <h3 className="text-2xl font-orbitron text-[#4fd1ff]">{item.title}</h3>
                  <span className="text-sm text-gray-400 font-orbitron">{item.category}</span>
                </div>
              </div>
              <p className="text-gray-200 text-lg">{item.summary}</p>
              <div className="flex gap-6">
                {Object.entries(item.metrics).map(([k, v]) => (
                  <div key={k} className="px-3 py-1 rounded-lg border border-[#4fd1ff] text-[#4fd1ff] font-orbitron text-sm shadow-neon bg-black/70">
                    {k}: <span className="font-bold">{v}</span>
                  </div>
                ))}
              </div>
              <blockquote className="mt-2 text-gray-200 italic border-l-4 border-[#4fd1ff] pl-4">
                “{item.testimonial.quote}”
                <footer className="mt-2 text-[#4fd1ff] font-orbitron font-bold">{item.testimonial.nombre}, {item.testimonial.rol}</footer>
              </blockquote>
              <div className="flex gap-2 mt-4">
                {item.gallery.map((img, i) => (
                  <img key={i} src={`/${img}`} alt={`Galería ${i + 1}`} className="w-16 h-16 object-cover rounded-md border border-[#4fd1ff] shadow-neon" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
