'use client';

import { useEffect } from 'react';

/**
 * Registers the minimal service worker (/sw.js) so Android Chrome treats the
 * chat as an installable PWA and creates a real home-screen app with the
 * manifest icon (instead of a generic bookmark shortcut). Renders nothing.
 *
 * Registration failures are swallowed — they must never affect the chat
 * itself; the worst case is simply falling back to the old shortcut behavior.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }
    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        /* non-fatal */
      });
    };
    if (document.readyState === 'complete') {
      register();
    } else {
      window.addEventListener('load', register, { once: true });
      return () => window.removeEventListener('load', register);
    }
  }, []);

  return null;
}
