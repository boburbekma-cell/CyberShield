// Service Worker — ilovani internetsiz ham ishlatish uchun fayllarni keshlaydi.
// Fayllar o'zgarsa, VERSION raqamini oshiring.
const VERSION = "csg-v7";
const FILES = [
  "./",
  "index.html",
  "css/app.css",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/apple-touch-icon.png",
  "js/data.js",
  "js/store.js",
  "js/ui.js",
  "js/views/home.js",
  "js/views/test.js",
  "js/views/learn.js",
  "js/views/phishing.js",
  "js/views/social.js",
  "js/views/account.js",
  "js/views/info.js",
  "js/views/library.js",
  "js/views/results.js",
  "js/views/profile.js",
  "js/app.js",
  "js/bg.js"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Avval tarmoqdan (yangilanishlar darhol ko'rinadi), internet bo'lmasa — keshdan
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== location.origin) return;
  event.respondWith(
    fetch(event.request)
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(cache => cache.put(event.request, copy)); }
        return res;
      })
      .catch(() => caches.match(event.request).then(hit => hit || caches.match("index.html")))
  );
});
