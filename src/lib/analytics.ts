// Funciones para eventos de analítica (GA4, Meta Pixel)
export function trackEvent(event: string, params?: Record<string, unknown>) {
  // GA4
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params || {});
  }
  // Meta Pixel (ejemplo futuro)
  // if (window.fbq) window.fbq('track', event, params);
}
