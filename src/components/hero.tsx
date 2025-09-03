// Sección Hero
import Logo from "./logo";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-[70vh] bg-black text-white py-16 px-4"
    >
      <div className="flex flex-col items-center gap-6">
        <Logo />
        <h1 className="text-4xl md:text-6xl font-orbitron font-bold tracking-widest text-[#4fd1ff] drop-shadow-[0_0_24px_#4fd1ff] text-center">
          Creatividad que deja huella
        </h1>
        <p className="max-w-xl text-lg md:text-2xl text-gray-300 text-center font-light">
          Agencia creativa digital. Branding, diseño, desarrollo web y marketing para tu legado.
        </p>
        <a
          href="https://wa.me/521234567890"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            className="text-[#4fd1ff] border-[#4fd1ff] text-xl px-8 py-3 font-orbitron shadow-[0_0_24px_#4fd1ff] hover:bg-[#101c2c] hover:text-white"
          >
            ¡Contáctanos por WhatsApp!
          </Button>
        </a>
      </div>
      {/* Efecto de fondo animado neon */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[400px] h-[400px] rounded-full bg-[#4fd1ff]/10 blur-3xl animate-pulse" />
      </div>
    </section>
  );
}
