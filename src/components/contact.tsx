// Sección Contacto
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";

const schema = z.object({
  nombre: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Email inválido"),
  mensaje: z.string().min(10, "Mensaje muy corto"),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    // Aquí podrías enviar el formulario a un backend o servicio externo
    alert("¡Gracias por contactarnos! Pronto te responderemos.");
    reset();
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
              className="px-4 py-2 rounded-lg bg-black/60 border border-[#4fd1ff] text-white font-orbitron focus:outline-none focus:ring-2 focus:ring-[#4fd1ff]"
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
              className="px-4 py-2 rounded-lg bg-black/60 border border-[#4fd1ff] text-white font-orbitron focus:outline-none focus:ring-2 focus:ring-[#4fd1ff]"
              autoComplete="email"
            />
            {errors.email && (
              <span className="text-red-400 text-sm">{errors.email.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="mensaje" className="font-orbitron text-[#4fd1ff]">Mensaje</label>
            <textarea
              id="mensaje"
              {...register("mensaje")}
              rows={4}
              className="px-4 py-2 rounded-lg bg-black/60 border border-[#4fd1ff] text-white font-orbitron focus:outline-none focus:ring-2 focus:ring-[#4fd1ff]"
            />
            {errors.mensaje && (
              <span className="text-red-400 text-sm">{errors.mensaje.message}</span>
            )}
          </div>
          <Button
            type="submit"
            variant="outline"
            className="text-[#4fd1ff] border-[#4fd1ff] text-xl px-8 py-3 font-orbitron shadow-[0_0_24px_#4fd1ff] hover:bg-[#101c2c] hover:text-white"
          >
            Enviar mensaje
          </Button>
          {isSubmitSuccessful && (
            <span className="text-green-400 text-center font-orbitron">¡Mensaje enviado!</span>
          )}
        </form>
      </div>
    </section>
  );
}
