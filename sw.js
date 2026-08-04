const CACHE_NAME = 'slot-machine-v1';

// 需要快取的檔案清單
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  // 動漫與卡通 LOGO 圖片（請確保檔名與資料夾名稱正確）
  './anime-logo/One-Piece-Logo.png',
  './anime-logo/naruto.png',
  './anime-logo/dandadan.png',
  './anime-logo/bleach-.png',
  './anime-logo/dragonball.png',
  './anime-logo/slamdunk.png',
  './anime-logo/jujutsu-kaisen.png',
  './anime-logo/demon.png',
  './anime-logo/Hunter-X-Hunter-.png',
  './anime-logo/坂本日常.png',
  './anime-logo/EVA.png',
  './anime-logo/妖精的尾巴.png',
  './anime-logo/我的英雄學院.png',
  './anime-logo/pokemon.png',
  './anime-logo/disney.png',
  './anime-logo/Pixar-Logo.png',
  './anime-logo/宮崎駿.png',
  './anime-logo/DreamWorks.png'
];

// 安裝階段：寫入快取
self.addEventListener('install', (event) => {
  self.skipWaiting(); // 讓新版 SW 立即生效
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 啟用階段：刪除舊版快取
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 讀取資源：優先使用快取，沒有才走網路請求
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});