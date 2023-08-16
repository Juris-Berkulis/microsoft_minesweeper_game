// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

import type { KitOfTranslatedWords } from '@/types/localeLanguages';
import { ref, type Ref } from 'vue';

export const messageFromServiceWorker: Ref<keyof KitOfTranslatedWords> = ref('theServiceWorkerMessage_emptedMessage');

export const resetMessageFromServiceWorker = (): void => {
  messageFromServiceWorker.value = 'theServiceWorkerMessage_emptedMessage';
};

const isLocalhost: boolean = Boolean(
  window.location.hostname === 'localhost' 
  ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' 
  ||
  // 127.0.0.0/8 are considered localhost for IPv4.
  window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

const registerValidSW = (swUrl: any, config: any): void => {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration: ServiceWorkerRegistration) => {
      registration.onupdatefound = (): void => {
        const installingWorker: ServiceWorker | null = registration.installing;
        if (installingWorker === null) {
          return;
        }
        installingWorker.onstatechange = (): void => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log('New content is available and will be used when all tabs for this page are closed.');
              messageFromServiceWorker.value = 'theServiceWorkerMessage_updatesInstalled';

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');
              messageFromServiceWorker.value = 'theServiceWorkerMessage_appSavedForOffline';

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error: Error) => {
      console.error('Error during service worker registration:', error);
    });
};

const checkValidServiceWorker = (swUrl: any, config: any): void => {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response: Response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType: string | null = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration: ServiceWorkerRegistration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
};

const registerServiceWorker = (config?: any): void => {
  window.addEventListener('load', (): void => {
    const swUrl = `/service-worker.js`;

    if (isLocalhost) {
      // This is running on localhost. Let's check if a service worker still exists or not.
      checkValidServiceWorker(swUrl, config);

      // Add some additional logging to localhost, pointing developers to the
      // service worker/PWA documentation.
      navigator.serviceWorker.ready.then(() => {
        console.log('This web app is being served cache-first by a service worker.');
      });
    } else {
      // Is not localhost. Just register service worker
      registerValidSW(swUrl, config);
    }
  });
};

const unregisterServiceWorker = (): void => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration: ServiceWorkerRegistration) => {
        console.log('Service worker disabled');
        registration.unregister();
      })
      .catch((error: Error) => {
        console.error(error.message);
      });
  } else {
    console.log('This browser does not have a service worker');
  }
};

const deferredPromptForPWA: Ref<any> = ref(null);
export const isShowBtnForInstallPWA: Ref<boolean> = ref(false);

const setDeferredPromptForPWAAction = (event: Event | null): void => {
  deferredPromptForPWA.value = event;
};

const setIsShowBtnForInstallPWAAction = (isShowBtn: boolean): void => {
  isShowBtnForInstallPWA.value = isShowBtn;
};

export const isRegisterServiceWorker = (): void => {
  if (!isLocalhost && 'serviceWorker' in navigator) {
    //* Register a service-worker:
    registerServiceWorker();

    const onBeforeInstallPrompt = (event: Event): void => {
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPromptForPWAAction(event);
      // Update UI notify the user they can install the PWA
      setIsShowBtnForInstallPWAAction(true);
      // Optionally, send analytics event that PWA install promo was shown.
      console.log('This application can be installed on the home screen.');
    };

    const onAppInstalled = (): void => {
      // Hide the app-provided install promotion
      setIsShowBtnForInstallPWAAction(false);
      // Clear the deferredPrompt so it can be garbage collected
      setDeferredPromptForPWAAction(null);
      // Optionally, send analytics event to indicate successful install
      console.log('The application has been successfully installed.');
      messageFromServiceWorker.value = 'theServiceWorkerMessage_appSuccessfullyInstalled';
    };

    //* Подробнее на сайте: "https://web.dev/i18n/ru/customize-install/":
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);
  } else {
    //* Do not register a service-worker:
    unregisterServiceWorker();
  }
};

export const installTheAppAsPWA = async () => {
  // Hide the app provided install promotion
  setIsShowBtnForInstallPWAAction(false);
  // Show the install prompt
  deferredPromptForPWA.value.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPromptForPWA.value.userChoice;
  // Optionally, send analytics event with outcome of user choice
  console.log(`User response to the install prompt: ${outcome}`);
  // We've used the prompt, and can't use it again, throw it away
  setDeferredPromptForPWAAction(null);
};
