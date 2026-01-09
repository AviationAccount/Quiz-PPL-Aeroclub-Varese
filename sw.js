self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('quiz-store').then((cache) => cache.addAll([
      '/Quiz-PPL-Aeroclub-Varese/',
      '/Quiz-PPL-Aeroclub-Varese/index.html',
      // Aggiungi qui altri file CSS o JS se ne hai di esterni
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
