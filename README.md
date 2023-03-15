# service-worker-intro

Serve the app locally with `npx http-server`.

This is a very basic app to demonstrate the manifest.json file and how Service Workers are used for caching assets for offline use. You can also check your app's readiness to be considered a Progressive Web App using the Lighthouse dev tool.

### The `manifest.json` file
Basically contains the metadata of your application, which is necessary if you want to have it work as a native installable app.
You can check [here](https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/web-app-manifests) for a quick intro on it or check the MDN docs [here](https://developer.mozilla.org/en-US/docs/Web/Manifest).

One great trick to create all the icons you need is to use `npx pwa-asset-generator icon.png icons` - where `icon.png` is the starter icon from which all others will be generated, and `icons` being the output folder. The command line prompt will also give you the JSON to copy-paste into your manifest icons array, and the links to add to your HTML head for apple-specific devices.

### The `sw.js` file
The app will save `"/", "/converter.js", "/converter.css", "/icon.png"` into the cache at the start. When the internet connection goes offline, the app will still work.

It will also invalidate old caches when you update your app. For example, if you uncomment out the `h4` on line 18 of `index.html`, then bump up the cache version in `sw.js` from `temperature-converter-v1` to `v2` you will see the new version of the app with the header.

An example of dynamic caching is also provided, though without actual use in this rudimentary app.

### Resources
Some excellent resources to learn more about PWAs and Service Workers:

- https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/service-workers
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers
- https://web.dev/service-worker-lifecycle/
- https://web.dev/learn/pwa/
- https://www.youtube.com/playlist?list=PL4cUxeGkcC9gTxqJBcDmoi5Q2pzDusSL7 (fantastic and concise video series)
