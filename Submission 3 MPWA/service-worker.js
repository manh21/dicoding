importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
	console.log('Workbox berhasil dimuat');
} else {
	console.log('Workbox gagal dimuat');
}

// Precahcing App Shell
workbox.precaching.precacheAndRoute([
	{ url: '/index.html', revision: '1' },
	{ url: '/nav.html', revision: '1' },
	{ url: '/manifest.json', revision: '1' },
	{ url: '/pages/about.html', revision: '1' },
	{ url: '/pages/jadwal.html', revision: '1' },
	{ url: '/pages/home.html', revision: '1' },
	{ url: '/pages/findus.html', revision: '1' },
	{ url: '/pages/myteams.html', revision: '1' },
	{ url: '/assets/css/style.css', revision: '1' },
	{ url: '/assets/css/materialize.min.css', revision: '1' },
	{ url: '/assets/js/materialize.min.js', revision: '1' },
	{ url: '/assets/js/main.js', revision: '1' },
	{ url: '/assets/js/moment.js', revision: '1' },
	{ url: '/assets/js/moment-timezone-with-date.js', revision: '1' },
	{ url: '/assets/js/data/api.js', revision: '1' },
	{ url: '/assets/js/data/data.js', revision: '1' },
	{ url: '/assets/js/comp/fav.js', revision: '1' },
	{ url: '/assets/js/comp/home.js', revision: '1' },
	{ url: '/assets/js/comp/jadwal.js', revision: '1' },
	{ url: '/assets/js/comp/myTeams.js', revision: '1' },
	{ url: '/assets/js/comp/utilities.js', revision: '1' },
	{ url: '/assets/js/sw-register.js', revision: '1' },
	{ url: '/assets/favicon/favicon-16x16.png', revision: '1' },
	{ url: '/assets/favicon/favicon-32x32.png', revision: '1' },
	{ url: '/assets/favicon/favicon.ico', revision: '1' },
	{ url: '/assets/favicon/maskable_icon.png', revision: '1' },
	{ url: '/assets/favicon/android-chrome-192x192.png', revision: '1' },
	{ url: '/assets/favicon/android-chrome-512x512.png', revision: '1' },
	{ url: '/assets/favicon/apple-touch-icon.png', revision: '1' },
	{ url: 'https://unpkg.com/dexie@latest/dist/dexie.js', revision: '1' },
	{ url: 'https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js', revision: '1' }
]);

// Cache Pages
workbox.routing.registerRoute(
	new RegExp('/pages/'),
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'pages'
	})
);

// Cache API
workbox.routing.registerRoute(
	RegExp('https://api.football-data.org/v2/', 'i'),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'api-cache',
		plugins: [
			new workbox.cacheableResponse.Plugin({
				statuses: [200, 404]
			})
		]
	})
);

// Cache Images
workbox.routing.registerRoute(
	/\.(?:png|gif|jpg|jpeg|svg)$/,
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'images',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 60,
				maxAgeSeconds: 30 * 24 * 60 * 60 // 30 hari
			})
		]
	})
);

workbox.routing.registerRoute(
	new RegExp('https://crests.football-data.org/'),
	new workbox.strategies.NetworkFirst({
		cacheName: 'crests-images',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 60,
				maxAgeSeconds: 30 * 24 * 60 * 60 // 30 hari
			})
		]
	})
);

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
	/^https:\/\/fonts\.googleapis\.com/,
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'google-fonts-stylesheets'
	})
);

// Menyimpan cache dari font awesome
workbox.routing.registerRoute(
	/^https:\/\/kit\.fontawesome\.com/,
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'font-awesome'
	})
);

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
	/^https:\/\/fonts\.gstatic\.com/,
	workbox.strategies.cacheFirst({
		cacheName: 'google-fonts-webfonts',
		plugins: [
			new workbox.cacheableResponse.Plugin({
				statuses: [0, 200]
			}),
			new workbox.expiration.Plugin({
				maxAgeSeconds: 60 * 60 * 24 * 365,
				maxEntries: 30
			})
		]
	})
);

// event push notification
self.addEventListener('push', (event) => {
	console.log('[Service Worker] Push Received.');
	console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
	let body;

	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}

	const title = 'Push Notification.';
	const options = {
		body: body,
		icon: 'assets/favicon/favicon-32x32.png',
		vibrate: [100, 50, 100],
		dateOfArrival: Date.now(),
		primaryKey: 1
	};

	const notificationPromise = self.registration.showNotification(title, options);
	event.waitUntil(notificationPromise);
});

// Klik notifikasi
self.addEventListener('notificationclick', (event) => {
	console.log('[Service Worker] Notification click Received.');

	event.notification.close();

	event.waitUntil(
		clients.openWindow('https://dicoding.com/')
	);
});
