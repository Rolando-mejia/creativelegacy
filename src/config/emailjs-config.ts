// Configuración de EmailJS y WhatsApp
// IMPORTANTE: Reemplaza estos valores con los tuyos obtenidos de https://emailjs.com

export const emailjsConfig = {
  // 1. Crea una cuenta en https://emailjs.com
  // 2. Ve a "Email Services" y conecta tu servicio de email (Gmail, Outlook, etc.)
  // 3. Copia el Service ID aquí:
  serviceId: 'service_kghwg0u',
  
  // 4. Ve a "Email Templates" y crea un template
  // 5. Copia el Template ID aquí:
  templateId: 'template_sorfdoh',
  
  // 6. Ve a "Account" > "API Keys" y copia tu Public Key aquí:
  publicKey: 'JHkq0mWuLI3s335AV',
  
  // 7. Tu email donde quieres recibir los mensajes:
  toEmail: 'creativelegacy01@gmail.com'
};

// Configuración de WhatsApp
export const whatsappConfig = {
  // Número de WhatsApp con código de país (SIN espacios, guiones o signos +)
  // Ejemplo: Guatemala = 50212345678, México = 521234567890, España = 34612345678
  phoneNumber: '50488966764', // 🔧 CAMBIA ESTE NÚMERO POR EL TUYO
};

// Template sugerido para EmailJS:
/*
Subject: Nuevo contacto desde Creative Legacy - {{service_interest}}

Hola!

Has recibido un nuevo mensaje de contacto desde Creative Legacy:

👤 Nombre: {{from_name}}
📧 Email: {{from_email}}
🏢 Empresa: {{company}}
🎯 Servicio de interés: {{service_interest}}

💬 Mensaje:
{{message}}

---
Este mensaje fue enviado desde el formulario de contacto de Creative Legacy.
*/