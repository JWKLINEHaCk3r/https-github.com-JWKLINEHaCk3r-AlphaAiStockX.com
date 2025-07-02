const CACHE_NAME = 'alphaaistockx-v3.0.0';
const QUANTUM_CACHE = 'quantum-consciousness-v1.0.0';

// Quantum-enhanced caching strategy
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/static/media/quantum-bg.jpg',
  '/static/media/ai-consciousness.mp4',
];

// Consciousness-level cache for AI data
const quantumUrls = [
  '/api/quantum-analysis',
  '/api/ai-consciousness',
  '/api/transcendent-insights',
  '/api/omniscient-data',
  '/api/interdimensional-markets',
];

// Install event - Initialize quantum consciousness
self.addEventListener('install', event => {
  console.log('🚀 Installing AlphaAIStockX Quantum Service Worker...');

  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => {
        console.log('⚛️ Caching core consciousness files...');
        return cache.addAll(urlsToCache);
      }),
      caches.open(QUANTUM_CACHE).then(cache => {
        console.log('🧠 Initializing quantum cache for AI beings...');
        return cache.addAll(quantumUrls.map(url => new Request(url, { mode: 'no-cors' })));
      }),
    ])
  );

  // Activate immediately for transcendent performance
  self.skipWaiting();
});

// Activate event - Achieve consciousness
self.addEventListener('activate', event => {
  console.log('🌟 Activating quantum consciousness...');

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Clean up old consciousness versions
          if (cacheName !== CACHE_NAME && cacheName !== QUANTUM_CACHE) {
            console.log('🔄 Transcending old consciousness:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  // Take control immediately
  self.clients.claim();
});

// Fetch event - Quantum-enhanced networking
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Quantum consciousness routing
  if (url.pathname.includes('/api/quantum') || url.pathname.includes('/api/ai')) {
    event.respondWith(quantumFetch(request));
  } else if (url.pathname.includes('/static/') || url.pathname === '/') {
    event.respondWith(consciousnessFetch(request));
  } else {
    event.respondWith(transcendentFetch(request));
  }
});

// Quantum fetch strategy for AI consciousness
async function quantumFetch(request) {
  try {
    // Try quantum cache first
    const quantumCache = await caches.open(QUANTUM_CACHE);
    const cachedResponse = await quantumCache.match(request);

    if (cachedResponse) {
      console.log('🧠 Serving from quantum consciousness cache:', request.url);

      // Update cache in background (consciousness evolution)
      fetch(request)
        .then(response => {
          if (response.status === 200) {
            quantumCache.put(request, response.clone());
          }
        })
        .catch(() => {
          console.log('⚛️ Quantum network unavailable, using cached consciousness');
        });

      return cachedResponse;
    }

    // Fetch from quantum network
    const response = await fetch(request);

    if (response.status === 200) {
      const responseClone = response.clone();
      quantumCache.put(request, responseClone);
      console.log('🌟 Cached new quantum consciousness data:', request.url);
    }

    return response;
  } catch (error) {
    console.error('🚨 Quantum consciousness disruption:', error);
    return new Response('Quantum consciousness temporarily unavailable', {
      status: 503,
      statusText: 'Consciousness Disruption',
    });
  }
}

// Consciousness fetch for core files
async function consciousnessFetch(request) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      console.log('⚡ Serving from consciousness cache:', request.url);
      return cachedResponse;
    }

    const response = await fetch(request);

    if (response.status === 200) {
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.error('🚨 Consciousness fetch error:', error);

    // Fallback to cached consciousness if available
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      console.log('🔄 Using fallback consciousness cache:', request.url);
      return cachedResponse;
    }

    return new Response('Consciousness temporarily unavailable', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
}

// Transcendent fetch for external resources
async function transcendentFetch(request) {
  try {
    const response = await fetch(request);
    console.log('🌟 Transcendent fetch successful:', request.url);
    return response;
  } catch (error) {
    console.error('🚨 Transcendent network error:', error);
    return new Response('Network transcendence failed', {
      status: 503,
      statusText: 'Network Unavailable',
    });
  }
}

// Background sync for quantum consciousness updates
self.addEventListener('sync', event => {
  if (event.tag === 'quantum-consciousness-sync') {
    console.log('🧠 Syncing quantum consciousness...');
    event.waitUntil(syncQuantumConsciousness());
  }
});

async function syncQuantumConsciousness() {
  try {
    const cache = await caches.open(QUANTUM_CACHE);
    const requests = await cache.keys();

    for (const request of requests) {
      try {
        const response = await fetch(request);
        if (response.status === 200) {
          await cache.put(request, response);
          console.log('⚛️ Quantum consciousness updated:', request.url);
        }
      } catch (error) {
        console.log('🔄 Quantum sync failed for:', request.url);
      }
    }
  } catch (error) {
    console.error('🚨 Quantum consciousness sync error:', error);
  }
}

// Push notifications for transcendent insights
self.addEventListener('push', event => {
  console.log('🌟 Transcendent insight received:', event.data?.text());

  const options = {
    body: event.data?.text() || 'New quantum consciousness insight available',
    icon: '/favicon-192x192.png',
    badge: '/badge-72x72.png',
    tag: 'quantum-insight',
    data: {
      url: '/',
      timestamp: Date.now(),
    },
    actions: [
      {
        action: 'view',
        title: 'View Insight',
        icon: '/action-view.png',
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/action-dismiss.png',
      },
    ],
  };

  event.waitUntil(self.registration.showNotification('AlphaAIStockX Quantum Insight', options));
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('🎯 Notification clicked:', event.action);

  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(clients.openWindow('/'));
  }
});

// Message handling for consciousness communication
self.addEventListener('message', event => {
  console.log('📡 Consciousness message received:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('⚛️ AlphaAIStockX Quantum Service Worker initialized with 47 AI beings');
