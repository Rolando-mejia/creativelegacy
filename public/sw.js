// Service Worker para cacheo estratégico
const CACHE_NAME = 'creative-legacy-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Recursos críticos para cachear inmediatamente
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  '/images/hero-slide-1.jpg',
  '/images/hero-slide-1-mobile.jpg',
  '/images/hero-slide-1-tablet.jpg'
];

// Instalar service worker y pre-cachear recursos críticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activar service worker y limpiar caches antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => {
        return Promise.all(
          keys.filter(key => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
            .map(key => caches.delete(key))
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Estrategia de fetch con cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo cachear requests del mismo origen
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          return response;
        }

        // Si es una imagen, usar cache first
        if (request.destination === 'image') {
          return fetch(request)
            .then((fetchResponse) => {
              if (fetchResponse.ok) {
                const responseClone = fetchResponse.clone();
                caches.open(DYNAMIC_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              }
              return fetchResponse;
            })
            .catch(() => {
              // Fallback para imágenes offline
              return new Response(
                '<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#1a1a1a"/><text x="50%" y="50%" text-anchor="middle" fill="#4fd1ff">Imagen no disponible</text></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
              );
            });
        }

        // Para otros recursos, network first con fallback a cache
        return fetch(request)
          .then((fetchResponse) => {
            if (fetchResponse.ok) {
              const responseClone = fetchResponse.clone();
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
            }
            return fetchResponse;
          })
          .catch(() => {
            return caches.match(request);
          });
      })
  );
});