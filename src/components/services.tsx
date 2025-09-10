// Sección Servicios - Grid de Cards
import services from '../data/services.json';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { 
  Code, 
  Palette, 
  Megaphone, 
  Users, 
  Target, 
  CircleDot, 
  ArrowRight, 
  Zap,
  Globe,
  Camera,
  Instagram,
  TrendingUp,
  Monitor,
  Video
} from 'lucide-react';

type Service = {
  title: string;
  shortDesc: string;
  bullets: string[];
  icon: string;
};

export default function Services() {
  const servicesArray = services as Service[];

  // Mapear iconos específicos para cada servicio
  const iconMap = {
    target: Target,        // Estrategia
    instagram: Instagram,  // Social Media  
    palette: Palette,      // Branding
    globe: Globe,          // Web
    megaphone: Megaphone,  // Ads
    camera: Camera,        // Producción
    // Iconos adicionales por si se agregan más servicios
    code: Code,
    users: Users,
    circle: CircleDot,
    zap: Zap,
    trending: TrendingUp,
    monitor: Monitor,
    video: Video
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Code;
    return <IconComponent size={60} strokeWidth={2} />;
  };

  return (
    <section id="services" className="py-16 px-4 bg-black text-white relative min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-[#4fd1ff] drop-shadow-[0_0_30px_#4fd1ff] mb-6">
            Servicios
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transformamos ideas en experiencias digitales excepcionales con tecnología de vanguardia
          </p>
        </div>

        {/* Grid de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {servicesArray.map((service, index) => (
            <Card 
              key={index} 
              className="group bg-black/90 border-2 border-[#4fd1ff] rounded-2xl shadow-[0_0_30px_#4fd1ff] hover:shadow-[0_0_50px_#4fd1ff] hover:scale-105 transition-all duration-500 backdrop-blur-sm relative overflow-hidden"
            >
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4fd1ff]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardHeader className="text-center pb-4 relative z-10">
                {/* Icono */}
                <div className="mx-auto mb-4 p-4 rounded-full bg-[#4fd1ff]/10 border border-[#4fd1ff] text-[#4fd1ff] group-hover:bg-[#4fd1ff] group-hover:text-black transition-all duration-500 group-hover:scale-110 inline-flex">
                  {getIcon(service.icon)}
                </div>
                
                <CardTitle className="text-2xl font-orbitron font-bold text-[#4fd1ff] group-hover:text-white transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative z-10 space-y-4">
                {/* Descripción */}
                <p className="text-gray-300 text-center leading-relaxed group-hover:text-white transition-colors duration-300">
                  {service.shortDesc}
                </p>
                
                {/* Bullets */}
                <ul className="space-y-3">
                  {service.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex items-start gap-3 text-gray-200 group-hover:text-white transition-colors duration-300">
                      <ArrowRight 
                        size={16} 
                        className="text-[#4fd1ff] mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" 
                        strokeWidth={3}
                      />
                      <span className="text-sm leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="pt-4">
                  <button className="w-full bg-transparent border-2 border-[#4fd1ff] text-[#4fd1ff] py-3 px-6 rounded-xl font-orbitron font-bold hover:bg-[#4fd1ff] hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_#4fd1ff] group/btn">
                    <span className="flex items-center justify-center gap-2">
                      Conocer Más
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action Final */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#4fd1ff]/10 via-[#4fd1ff]/20 to-[#4fd1ff]/10 border border-[#4fd1ff] rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-3xl font-orbitron font-bold text-[#4fd1ff] mb-4">
              ¿Listo para transformar tu negocio?
            </h3>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              Combinamos estrategia, diseño y tecnología para crear soluciones que impulsan resultados reales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#4fd1ff] text-black py-4 px-8 rounded-xl font-orbitron font-bold hover:bg-white hover:shadow-[0_0_30px_#4fd1ff] transition-all duration-300 hover:scale-105">
                Solicitar Propuesta
              </button>
              <button className="border-2 border-[#4fd1ff] text-[#4fd1ff] py-4 px-8 rounded-xl font-orbitron font-bold hover:bg-[#4fd1ff] hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_#4fd1ff]">
                Ver Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-[#4fd1ff]/10 blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full bg-[#4fd1ff]/5 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-3/4 left-1/3 w-24 h-24 rounded-full bg-[#4fd1ff]/8 blur-lg animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
    </section>
  );
}

