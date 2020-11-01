const webPush = require('web-push');

const vapidKeys = {
	publicKey: 'BKzBEuqCc8-qGlUE5e_Rt4z6pIT2dLnAi-fwuA6f7GXBGq3lsshBGGTXu2YfNTMnDykTP1P7nsXwQXhOZOg3zSg',
	privateKey: 'OCXIyw4k2LdAG3_L_v_sGwXZehZKJpJV0Tsos0FbEBU'
};

webPush.setVapidDetails(
	'mailto:example@yourdomain.org',
	vapidKeys.publicKey,
	vapidKeys.privateKey
);
const pushSubscription = {
	endpoint: 'https://fcm.googleapis.com/fcm/send/eqkoXNiZ90Y:APA91bEyBfTsvLdHdDvFHGDZcp-efNNzmBhpIQ7p2OU7WYAyL9X5jjOmby1x630QLE30vrjpdCgggriM-shdMq2vBJoTNV6gH-xL9-E6ix4wyZiSfPCaY2Kumil3F6w2yvCZs9K5Pi9T',
	keys: {
		p256dh: 'BLKH0GLZpGZfOuAIGiFEi8pdbMnUfPP6ydGFHIp7/xhn/C0yjftHIU5Owq6UAugLRYae/8X8vQlUJsjvc307ruw=',
		auth: '15x02E4Fl3MtzL81lGVEIQ=='
	}
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
	gcmAPIKey: '497298817484',
	TTL: 60
};
webPush.sendNotification(
	pushSubscription,
	payload,
	options
);
