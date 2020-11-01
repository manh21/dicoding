// REGISTER SERVICE WORKER
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker.register('/service-worker.js')
			.then(function () {
				console.log('Pendaftaran ServiceWorker berhasil');
			})
			.catch(function () {
				console.log('Pendaftaran ServiceWorker gagal');
			});
	});
} else {
	console.log('ServiceWorker belum didukung browser ini.');
}

// Periksa fitur Notification API
if ('Notification' in window) {
	requestPermission();
} else {
	console.error('Browser tidak mendukung notifikasi.');
}

// Meminta ijin menggunakan Notification API
function requestPermission () {
	navigator.serviceWorker.ready.then(() => {
		Notification.requestPermission().then(function (result) {
			if (result === 'denied') {
				console.log('Fitur notifikasi tidak diijinkan.');
				return;
			} else if (result === 'default') {
				console.error('Pengguna menutup kotak dialog permintaan ijin.');
				return;
			}

			console.log('Fitur notifikasi diijinkan.');
		});
		if (('PushManager' in window)) {
			navigator.serviceWorker.getRegistration().then(function (registration) {
				registration.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: urlBase64ToUint8Array('BKzBEuqCc8-qGlUE5e_Rt4z6pIT2dLnAi-fwuA6f7GXBGq3lsshBGGTXu2YfNTMnDykTP1P7nsXwQXhOZOg3zSg')
				}).then(function (subscribe) {
					console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
					console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
						null, new Uint8Array(subscribe.getKey('p256dh')))));
					console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
						null, new Uint8Array(subscribe.getKey('auth')))));
				}).catch(function (e) {
					console.error('Tidak dapat melakukan subscribe ', e.message);
				});
			});
		}
	});
}

function urlBase64ToUint8Array (base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/-/g, '+')
		.replace(/_/g, '/');
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

function checkIfPushIsEnabled () {
	// ---check if push notification permission
	// has been denied by the user---
	if (Notification.permission === 'denied') {
		alert('User has blocked push notification.');
		return;
	}
	// ---check if push notification is
	// supported or not---
	if (!('PushManager' in window)) {
		alert('Sorry, Push notification is ' +
              'not supported on this browser.');
		return;
	}
	// ---get push notification subscription
	// if serviceWorker is registered and ready---
	navigator.serviceWorker.ready
		.then(function (registration) {
			registration.pushManager.getSubscription()
				.then(function (subscription) {
					console.log(subscription);
				})
				.catch(function (error) {
					console.error(
						'Error occurred enabling push ',
						error);
				});
		});
}


// ---check if push notification is supported---
checkIfPushIsEnabled();
