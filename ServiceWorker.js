const cacheName = "unity-webgl-cache-v1";
const contentToCache = [
  "index.html",
  "Build/webgl.loader.js",
  "Build/webgl.framework.js",
  "Build/webgl.data",
  "Build/webgl.wasm",
  "TemplateData/style.css",
  "manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");

  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("[Service Worker] Caching all required files");
      return cache.addAll(contentToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Jika ada di cache, gunakan cache
      if (response) {
        console.log(
          `[Service Worker] Serving from cache: ${event.request.url}`
        );
        return response;
      }

      // Jika tidak ada di cache, ambil dari jaringan (saat online)
      console.log(
        `[Service Worker] Fetching from network: ${event.request.url}`
      );
      return fetch(event.request).catch(() => {
        console.error(`[Service Worker] Failed to fetch: ${event.request.url}`);
      });
    })
  );
});
