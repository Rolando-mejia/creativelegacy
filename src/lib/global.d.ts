// Declaración global para window.gtag y window.fbq
interface Window {
  gtag?: (command: string, event: string, params?: Record<string, unknown>) => void;
  fbq?: (command: string, event: string, params?: Record<string, unknown>) => void;
}
