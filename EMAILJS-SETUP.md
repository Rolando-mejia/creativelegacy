# Configuración de EmailJS para Creative Legacy

## 📧 Pasos para configurar EmailJS

### 1. Crear cuenta en EmailJS
1. Ve a [https://emailjs.com](https://emailjs.com)
2. Crea una cuenta gratuita
3. Verifica tu email

### 2. Configurar servicio de email
1. En el dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta
5. **Copia el Service ID** que aparece

### 3. Crear template de email
1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Usa este template sugerido:

```
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
```

4. **Copia el Template ID** que aparece

### 4. Obtener Public Key
1. Ve a **"Account"** > **"API Keys"**
2. **Copia tu Public Key**

### 5. Configurar en el proyecto
1. Abre el archivo `src/config/emailjs-config.ts`
2. Reemplaza los valores:
   - `YOUR_SERVICE_ID` → Tu Service ID
   - `YOUR_TEMPLATE_ID` → Tu Template ID  
   - `YOUR_PUBLIC_KEY` → Tu Public Key
   - `tu-email@ejemplo.com` → Tu email real

### 6. Variables del template
Asegúrate de que tu template de EmailJS incluya estas variables:
- `{{from_name}}` - Nombre del contacto
- `{{from_email}}` - Email del contacto
- `{{company}}` - Empresa del contacto
- `{{service_interest}}` - Servicio de interés
- `{{message}}` - Mensaje del contacto

## ✅ ¿Funciona correctamente?

Una vez configurado, el formulario:
1. ✅ Enviará un email a tu bandeja de entrada
2. ✅ Mostrará un mensaje de confirmación
3. ✅ Abrirá WhatsApp como respaldo
4. ✅ Si falla el email, solo abrirá WhatsApp

## 🆓 Límites del plan gratuito
- 200 emails por mes
- Perfecto para comenzar
- Puedes actualizar si necesitas más

## 🔧 Troubleshooting
- **Email no llega**: Verifica que el Service ID, Template ID y Public Key sean correctos
- **Error 401**: El Public Key es incorrecto
- **Error 404**: El Service ID o Template ID son incorrectos
- **Emails en spam**: Configura SPF/DKIM en EmailJS (plan de pago)