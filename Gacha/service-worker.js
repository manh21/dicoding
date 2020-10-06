const CACHE_NAME = 'gacha-v1';
var urlsToCache = [
	'/',
	'/manifest.json',
	'/character.json',
	'/nav.html',
	'/index.html',
	'/pages/home.html',
	'/pages/about.html',
	'/pages/findus.html',
	'/pages/characterlist.html',
	'/pages/character.html',
	'/assets/css/materialize.min.css',
	'/assets/css/style.css',
	'/assets/js/materialize.min.js',
	'/assets/js/main.js',
	'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
	'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0',
	'/assets/favicon/site.webmanifest',
	'/assets/favicon/apple-touch-icon.png',
	'/assets/favicon/maskable_icon.png',
	'/assets/favicon/favicon-16x16.png',
	'/assets/favicon/favicon-32x32.png',
	'/assets/favicon/android-chrome-192x192.png',
	'/assets/favicon/android-chrome-512x512.png',
	'/assets/images/cover1.webp',
	'/assets/images/NoImage.webp',
	'/assets/images/Traveler_Female_Card.webp',
	'/assets/images/Character_Venti_Card.webp',
	'/assets/images/Character_Qiqi_Card.webp',
	'/assets/images/Character_Mona_Card.webp',
	'/assets/images/Character_Klee_Card.webp',
	'/assets/images/Character_Keqing_Card.webp',
	'/assets/images/Character_Jean_Card.webp',
	'/assets/images/Character_Diluc_Card.webp'
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
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(function(response) {
			if(response){
				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}
			
			console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});

