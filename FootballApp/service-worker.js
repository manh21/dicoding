const CACHE_NAME = 'gacha-v1';
var urlsToCache = [
	'/',
	'/manifest.json',
	'/nav.html',
	'/index.html',
	'/pages/home.html',
	'/pages/about.html',
	'/pages/findus.html',
	'/assets/css/materialize.min.css',
	'/assets/js/materialize.min.js',
	'/assets/js/main.js',
	'/assets/css/style.css',
	'/assets/js/sw-register.js',
	'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0',
    'https://unpkg.com/dexie@latest/dist/dexie.js',
	'/assets/favicon/apple-touch-icon.png',
	'/assets/favicon/maskable_icon.png',
	'/assets/favicon/favicon-16x16.png',
	'/assets/favicon/favicon-32x32.png',
	'/assets/favicon/android-chrome-192x192.png',
	'/assets/favicon/android-chrome-512x512.png'
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){	
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
    // event.respondWith(
    //     caches.open(CACHE_NAME).then(function(cache) {
    //         return cache.match(event.request).then(function(response) {
    //             var fetchPromise = fetch(event.request).then(function(networkResponse) {
    //                 cache.put(event.request, networkResponse.clone());
    //                 console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
    //                 return networkResponse;
    //             })
    //             return response || fetchPromise;
    //         })
    //     })
    // );
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(function(response) {
			if(response){
				// console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}
			
			// console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});

