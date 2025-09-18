// Sección Contacto
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import { Button } from "./ui/button";
import servicesData from "../data/services.json";
import { emailjsConfig, whatsappConfig } from "../config/emailjs-config";

const schema = z.object({
  nombre: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Email inválido"),
  empresa: z.string().min(1, "Empresa requerida"),
  servicio: z.string().min(1, "Selecciona un servicio"),
  mensaje: z.string().min(10, "Mensaje muy corto"),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Preparar los datos para el template de EmailJS
      const templateParams = {
        from_name: data.nombre,
        from_email: data.email,
        company: data.empresa,
        service_interest: data.servicio,
        message: data.mensaje,
        to_email: emailjsConfig.toEmail,
      };

      // Enviar email usando EmailJS
      await emailjs.send(
        emailjsConfig.serviceId, 
        emailjsConfig.templateId, 
        templateParams, 
        emailjsConfig.publicKey
      );

      // Éxito
      setSubmitMessage("¡Mensaje enviado exitosamente! Te contactaremos pronto.");
      reset();

      // También abrir WhatsApp como alternativa
      const whatsappMessage = `
Hola! Soy ${data.nombre} de ${data.empresa}.
Estoy interesado en el servicio: ${data.servicio}

${data.mensaje}

Email de contacto: ${data.email}
      `.trim();

      const whatsappNumber = whatsappConfig.phoneNumber;
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Abrir WhatsApp después de 2 segundos
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
      }, 2000);

    } catch (error) {
      console.error('Error enviando email:', error);
      setSubmitMessage("Error al enviar el mensaje. Por favor, intenta nuevamente.");
      
      // Como fallback, abrir WhatsApp directamente
      const whatsappMessage = `
Hola! Soy ${data.nombre} de ${data.empresa}.
Estoy interesado en el servicio: ${data.servicio}

${data.mensaje}

Email de contacto: ${data.email}
      `.trim();

      const whatsappNumber = whatsappConfig.phoneNumber;
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappURL, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 bg-black text-white">
      <div className="max-w-lg mx-auto flex flex-col gap-8 items-center">
        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-[#4fd1ff] drop-shadow-[0_0_16px_#4fd1ff] mb-2 text-center">
          Contáctanos
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6 bg-black/80 border border-[#4fd1ff] rounded-xl p-8 shadow-neon"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="nombre" className="font-orbitron text-[#4fd1ff]">Nombre</label>
            <input
              id="nombre"
              {...register("nombre")}
              placeholder="Tu nombre completo"
              className="px-4 py-2 rounded-lg bg-black/60 border border-[#4fd1ff] text-white font-orbitron focus:outline-none focus:ring-2 focus:ring-[#4fd1ff] placeholder:text-gray-400"
              autoComplete="name"
            />
            {errors.nombre && (
              <span className="text-red-400 text-sm">{errors.nombre.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-orbitron text-[#4fd1ff]">Email</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="tu.email@empresa.com"
              className="px-4 py-2 rounded-lg bg-black/60 border border-[#4fd1ff] text-white font-orbitron focus:outline-none focus:ring-2 focus:ring-[#4fd1ff] placeholder:text-gray-400"
              autoComplete="email"
            />
            {errors.email && (
              <span className="text-red-400 text-sm">{errors.email.message}</span>
            )}
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="empresa" className="font-orbitron text-[#4fd1ff]">Empresa</label>
            <input
              id="empresa"
              {...register("empresa")}
              placeholder="Nombre de tu empresa o negocio"
              className="px-4 py-2 rounded-lg bg-black/60 border border-[#4fd1ff] text-white font-orbitron focus:outline-none focus:ring-2 focus:ring-[#4fd1ff] placeholder:text-gray-400"
              autoComplete="organization"
            />
            {errors.empresa && (
              <span className="text-red-400 text-sm">{errors.empresa.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="servicio" className="font-orbitron text-[#4fd1ff]">Servicio de interés</label>
            <select
              id="servicio"
              {...register("servicio")}
              className="px-4 py-2 rounded-lg bg-black/60 border border-[#4fd1ff] text-white font-orbitron focus:outline-none focus:ring-2 focus:ring-[#4fd1ff]"
            >
              <option value="" className="text-gray-400">¿En qué servicio estás interesado?</option>
              {servicesData.map((service) => (
                <option key={service.title} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
            {errors.servicio && (
              <span className="text-red-400 text-sm">{errors.servicio.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="mensaje" className="font-orbitron text-[#4fd1ff]">Mensaje</label>
            <textarea
              id="mensaje"
              {...register("mensaje")}
              rows={4}
              placeholder="Cuéntanos sobre tu proyecto, objetivos, presupuesto estimado y cualquier detalle que consideres importante..."
              className="px-4 py-2 rounded-lg bg-black/60 border border-[#4fd1ff] text-white font-orbitron focus:outline-none focus:ring-2 focus:ring-[#4fd1ff] placeholder:text-gray-400 resize-none"
            />
            {errors.mensaje && (
              <span className="text-red-400 text-sm">{errors.mensaje.message}</span>
            )}
          </div>
          <Button
            type="submit"
            variant="outline"
            disabled={isSubmitting}
            className="text-[#4fd1ff] border-[#4fd1ff] text-xl px-8 py-3 font-orbitron shadow-[0_0_24px_#4fd1ff] hover:bg-[#101c2c] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
          </Button>
          
          {submitMessage && (
            <div className={`text-center font-orbitron p-4 rounded-lg ${
              submitMessage.includes("Error") 
                ? "text-red-400 bg-red-900/20 border border-red-500" 
                : "text-green-400 bg-green-900/20 border border-green-500"
            }`}>
              {submitMessage}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
