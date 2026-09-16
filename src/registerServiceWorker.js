// Service Worker Registration Helper for MediNova PWA

export function registerSW() {
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[MediNova PWA] Service Worker registered successfully:', registration.scope);

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    console.log('[MediNova PWA] New app version available. Will refresh on next launch.');
                  } else {
                    console.log('[MediNova PWA] Content cached for offline app usage.');
                  }
                }
              };
            }
          };
        })
        .catch((error) => {
          console.warn('[MediNova PWA] Service Worker registration failed:', error);
        });
    });
  }
}

export function unregisterSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
