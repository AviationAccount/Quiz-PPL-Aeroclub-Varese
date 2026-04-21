const CACHE_NAME = 'quiz-store-v1.3.3'; // <--- CAMBIA QUESTO NUMERO OGNI VOLTA
const ASSETS = [
  '/Quiz-PPL-Aeroclub-Varese/',
  '/Quiz-PPL-Aeroclub-Varese/index.html',
  // Aggiungi qui il tuo file CSV se vuoi che funzioni offline!
  // '/Quiz-PPL-Aeroclub-Varese/tuo-file-dati.csv' 
];

// Installazione: crea la nuova cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Forza l'attivazione immediata
});

// Attivazione: cancella le vecchie versioni della cache
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// Fetch: serve i file dalla cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
