# Lab 8 - Fetch API & Service Workers

## Lab Partners
- Benjamin Kettor Jr

## Deployed GitHub Pages URL
 https://bkj05.github.io/Lab8_Starter/

## PWA Installation Screenshot
![PWA App](pwa.png)
Note: For some reason the icon is only apppering on my github repo url not deployed website url.

## Graceful Degradation and Service Workers

Graceful degradation is a design philosophy where web applications are built with full functionality and progressively fall back to simpler experiences when advanced features are unavailable. Service workers are a technical implementation of this philosophy - they act as network proxies that intercept requests and serve cached responses when offline. Without service workers, a web app completely fails when network connectivity is lost (hard degradation). With service workers, the app can continue to function by serving cached HTML, CSS, JavaScript, and even API data, allowing core functionality to remain available. This creates a resilient user experience that handles network failures gracefully rather than crashing or displaying error screens.

