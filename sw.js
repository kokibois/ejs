const CACHE = "emujs-cache-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
];

// 初回インストール
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
});

// fetchハンドリング（オフラインでも動く）
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return (
        res ||
        fetch(e.request).then((networkRes) => {
          return networkRes;
        })
      );
    })
  );
});
