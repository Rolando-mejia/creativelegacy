// Sección Servicios
import services from '../data/services.json';
import * as lucideIcons from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

type Service = {
  title: string;
  shortDesc: string;
  bullets: string[];
  icon: string;
};


export default function Services() {
  return (
    <section id="services" className="py-16 px-4 bg-black text-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 items-center">
        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-[#4fd1ff] drop-shadow-[0_0_16px_#4fd1ff] mb-2 text-center">
          Servicios
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {(services as Service[]).map((service, idx) => {
            const Icon = (lucideIcons as any)[capitalize(service.icon)] || lucideIcons['Circle'];
            return (
              <Card
                key={idx}
                className="bg-black/80 border border-[#4fd1ff] rounded-xl shadow-neon hover:scale-[1.03] hover:shadow-[0_0_32px_#4fd1ff] transition-transform duration-200 flex flex-col h-full"
              >
                <CardHeader className="flex flex-row items-center gap-4 pb-0">
                  <span className="bg-[#101c2c] rounded-full p-3 flex items-center justify-center border border-[#4fd1ff] shadow-neon">
                    <Icon size={32} strokeWidth={2.5} className="text-[#4fd1ff] drop-shadow-[0_0_8px_#4fd1ff]" />
                  </span>
                  <CardTitle className="text-xl font-orbitron text-[#4fd1ff] drop-shadow-[0_0_8px_#4fd1ff]">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 flex-1 flex flex-col">
                  <div className="text-gray-200 mb-3 text-base leading-relaxed font-light">
                    {service.shortDesc}
                  </div>
                  <ul className="list-disc pl-5 text-sm text-[#4fd1ff] space-y-1 font-orbitron">
                    {service.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      {/* Fondo animado neon */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[400px] h-[400px] rounded-full bg-[#4fd1ff]/10 blur-3xl animate-pulse" />
      </div>
    </section>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

