importScripts('serviceworker-cache-polyfill.js');

// 1. Save the files to the user's device
// The "install" event is called when the ServiceWorker starts up.
// All ServiceWorker code must be inside events.

const targetUrl = [
                '',
                'https://oncohub.github.io/managers/index.html',
                'https://oncohub.github.io/managers/templates/about.min.html',
                'https://oncohub.github.io/managers/templates/detail.min.html',
                'https://oncohub.github.io/managers/templates/home.min.html',
                'https://oncohub.github.io/managers/templates/info.min.html',
                'https://oncohub.github.io/managers/templates/install.min.html',
                'https://oncohub.github.io/managers/templates/privacy.min.html',
                'https://oncohub.github.io/managers/templates/term.min.html',
                'https://oncohub.github.io/managers/templates/third.min.html',
                'https://oncohub.github.io/managers/js/data.min.js',
                'https://oncohub.github.io/managers/js/xlsx.full.min.js',
                'https://oncohub.github.io/managers/js/script-obfuscated.min.js',
                'https://oncohub.github.io/managers/js/script.min.js',
                'https://oncohub.github.io/managers/css/style.min.css',
                'https://oncohub.github.io/managers/ionic/angular/angular.min.js',
                'https://oncohub.github.io/managers/ionic/angular/angular-animate.min.js',
                'https://oncohub.github.io/managers/ionic/angular/angular-sanitize.min.js',
                'https://oncohub.github.io/managers/ionic/ionic.min.js',
                'https://oncohub.github.io/managers/ionic/ionic-angular.min.js',
                'https://oncohub.github.io/managers/ionic/angular-ui/angular-ui-router.min.js',
                'https://oncohub.github.io/managers/ionic/ionic.min.css',
                'https://oncohub.github.io/managers/ionic/ionic.filter.bar.min.js',
                'https://oncohub.github.io/managers/ionic/fonts/ionicons.eot',
                'https://oncohub.github.io/managers/ionic/fonts/ionicons.svg',
                'https://oncohub.github.io/managers/ionic/fonts/ionicons.ttf',
                'https://oncohub.github.io/managers/ionic/fonts/ionicons.woff',
                'https://oncohub.github.io/managers/images/barcode.gif',
                'https://oncohub.github.io/managers/images/logo/mail.svg',
                'https://oncohub.github.io/managers/images/logo/facebook.svg',
                'https://oncohub.github.io/managers/images/logo/twitter.svg',
                'https://oncohub.github.io/managers/images/icons/icon-32x32.png',
                'https://oncohub.github.io/managers/images/icons/icon-128x128.png',
                'https://oncohub.github.io/managers/images/icons/icon-144x144.png',
                'https://oncohub.github.io/managers/images/icons/icon-152x152.png',
                'https://oncohub.github.io/managers/images/icons/icon-192x192.png',
                'https://oncohub.github.io/managers/images/icons/icon-256x256.png',
                'https://oncohub.github.io/managers/images/icons/icon-512x512.png',
                'https://oncohub.github.io/managers/images/icons/icon-1024x1024.png',
                'https://oncohub.github.io/managers/images/logo/logo.png'
            ];
self.addEventListener('install', function (e) {
    console.log('install', e);

    // waitUntil tells the browser that the install event is not finished until we have
    // cached all of our files
    e.waitUntil(
        // Here we call our cache "myonsenuipwa", but you can name it anything unique
        caches.open('managers-cache').then(cache => {
            // If the request for any of these resources fails, _none_ of the resources will be
            // added to the cache.
            console.log(cache, targetUrl);
            return cache.addAll(targetUrl);
            //return cache.addAll(targetUrl.map(url => new Request(url, {credentials: 'same-origin'})));
        })
    );
});

// 2. Intercept requests and return the cached version instead
self.addEventListener("fetch", function (event) {
    console.log("Request -->", event.request.url);

    //To tell browser to evaluate the result of event
    event.respondWith(
        caches.match(event.request) //To match current request with cached request it
        .then(function (response) {
            //If response found return it, else fetch again.
            return response || fetch(event.request);
        })
        .catch(function (error) {
            console.log("Error: ", error);
        })
    );
});
self.addEventListener('activate', function (event) {
    var cacheKeeplist = ['managers-cache'];
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (cacheKeeplist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});
