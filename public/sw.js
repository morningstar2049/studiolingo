// Minimal service worker — its only job is to make the site installable as a
// real PWA on Android. Chrome requires a registered service worker that has a
// fetch handler before it will create a true home-screen app (WebAPK) with the
// manifest icon; without one it only makes a generic bookmark shortcut.
//
// It deliberately does NOT cache anything: every request goes straight to the
// network, so the chat always loads fresh and there is no stale-content risk.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', () => {
  // No-op: let the browser handle every request normally (network).
  // The mere presence of this fetch handler is what satisfies Chrome's
  // installability check.
});
