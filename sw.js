/* PWA sudah dihapus. File ini sengaja dipertahankan agar browser yang pernah memasang
   service worker lama menghapus cache-nya dan berhenti memakai service worker. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key);
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate(client.url);
  })());
});
