// Offline support: serve from cache first, refresh in the background.
const CACHE = 'notes-mwhiy6cg';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('notes-') && k !== CACHE && k !== 'notes-offline').map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const net = fetch(req).then(res => { if (res.ok) cache.put(req, res.clone()); return res; });
    try {
      // network first so new notes show up; fall back to any cached copy when offline
      return await net;
    } catch (err) {
      const hit = (await cache.match(req, { ignoreSearch: true })) || (await caches.match(req, { ignoreSearch: true }));
      if (hit) return hit;
      throw err;
    }
  })());
});
