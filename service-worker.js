// service-worker.js
// BrightEdge IT - Service Worker for PWA Support

const CACHE_NAME = 'brightedgeit-v1.0.8';
const STATIC_CACHE = 'brightedgeit-static-v1.0.8';
const DYNAMIC_CACHE = 'brightedgeit-dynamic-v1.0.8';

// Files to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/services.html',
  '/about.html',
  '/contact.html',
  '/testimonials.html',
  '/style.min.css',
  '/script.min.js',
  '/favicon.svg',
  '/favicon.png',
  '/manifest.json',
  '/assets/logo1.png',
  '/assets/og-image.webp'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== STATIC_CACHE && cache !== DYNAMIC_CACHE) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network first, then cache fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }
  
  // For HTML pages - network first
  if (request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clone the response
          const responseClone = response.clone();
          
          // Cache the new version
          caches.open(DYNAMIC_CACHE)
            .then(cache => cache.put(request, responseClone));
          
          return response;
        })
        .catch(() => {
          // If network fails, try cache
          return caches.match(request);
        })
    );
    return;
  }
  
  // For other assets - cache first
  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          return response;
        }
        
        // If not in cache, fetch from network
        return fetch(request).then(response => {
          // Don't cache if not successful
          if (!response || response.status !== 200) {
            return response;
          }
          
          // Clone the response
          const responseClone = response.clone();
          
          // Add to dynamic cache
          caches.open(DYNAMIC_CACHE)
            .then(cache => cache.put(request, responseClone));
          
          return response;
        });
      })
  );
});

// Listen for messages from the client
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
