// Utilidad para generar links de WhatsApp
export function getWhatsappLink(number: string, text: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
