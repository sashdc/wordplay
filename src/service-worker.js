/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'your-app-cache-v1';
const urlsToCache = [
  '/', // Cache the root route
  '/index.html', // Cache the main HTML file
  '/index.js', // Cache the main JavaScript file
  '/index.css', // Cache the main CSS file
  '/icon.png', // Cache the logo file
  '/manifest.json', // Cache the manifest file
  '/robots.txt', // Cache the robots file
  '/favicon.ico', // Cache the favicon file
  '/logo192.png', // Cache the logo192 file
  '/logo512.png', // Cache the logo512 file
  '/service-worker.js', // Cache the service-worker file
  '/src/pages/Home.js', // Cache the Home.js file
  '/src/pages/Play.js', // Cache the Play.js file
  '/src/pages/Rules.js', // Cache the Rules.js file
  '/src/pages/WordBank.js', // Cache the WordBank.js file
  '/src/components/DarkMode.js', // Cache the DarkMode.js file
  '/src/components/InstallButton.js', // Cache the InstallButton.js file
  '/src/components/Keyboard.js', // Cache the Keyboard.js file
  '/src/components/WordbankLegend.js', // Cache the WordbankLegend.js file
  '/src/App.js', // Cache the App.js file
  '/src/App.css', // Cache the App.css file
  '/noisy-background.jpg', // Cache the noisy-background file
  '/src/styles/Darkmode.css', // Cache the Darkmode.css file
  '/src/styles/home.css', // Cache the home.css file
  '/src/styles/play.css', // Cache the play.css file
  '/src/styles/rules.css', // Cache the rules.css file
  '/src/styles/wordbank.css', // Cache the wordbank.css file
  '/src/styles/keyboard.css', // Cache the keyboard.css file
];
const serviceWorker = self;  // Use a variable

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
});

/* eslint-enable no-restricted-globals */
/* eslint-enable no-unused-vars */