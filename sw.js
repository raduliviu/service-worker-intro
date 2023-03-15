const CACHE_NAME = "temperature-converter-v1";
// const DYNAMIC_CACHE = "temperature-dynamic-v1";
const assets = ["/", "/converter.js", "/converter.css", "/icon.png"];

// Use the install event to pre-cache all initial resources.
self.addEventListener("install", (event) => {
  // It does not install until the code in waitUntil finishes executing
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// usually used to clean cache, when changing to a new SW version
// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers#clearing_the_cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keys);
      // Promise.all takes an array of promises and returns a single Promise, i.e. it waits for all the Promises in it to resolve
      return Promise.all(
        keys
          // Here we're building an array of all the caches that are NOT our current cache, then deleting them
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  // console.log("fetch event", event);
  // https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith
  // respondWith method functions as a proxy server between the app and the network
  // prevents the browser's default fetch handling, and allows you to provide a promise for a Response yourself.
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return cacheRes || fetch(event.request);
    })
  );
});

// Updated version of fetch listener for Dynamic Caching - just for example purposes
// Dynamic caching is good for when you have an app with a ton of pages and you don't want to cache all of them at the start
// But rather add to the cache the pages that the user is visiting, so he will access them faster on subsequent visits
// No real way to demonstrate it in the app for now
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((cacheRes) => {
//       return (
//         // We're saying if the request is in the cache, serve that, 
//         // if not, then fetch it, open the specified cache, put the response in the cache, and also return the response to the user
//         cacheRes ||
//         fetch(event.request).then((fetchRes) => {
//           return caches.open(DYNAMIC_CACHE).then((cache) => {
//             // Think of it like event.request.url as the key, and the fetchRes.clone is the value of the cache
//             cache.put(event.request.url, fetchRes.clone());
//             return fetchRes;
//           });
//         })
//       );
//     })
//   );
// });
