const promise = require("bluebird");
const timeoutAfterTenSeconds = onWhat => {
	onWhat.timeout(5000);
};
const openConnections = (times, callback) => {
	return [...Array(times).keys()].map(() => {
		return new promise(callback);
	});
};

describe('websocket server', function () {

	timeoutAfterTenSeconds(this);

	it('should handle at least 250 concurrent connections', function () {

		const howMany = 250;
		const onMessageReceived = success => {
			sockets.post().on('message', success);
		};

		const connections = openConnections(howMany, onMessageReceived);

		sockets.post().on('open', function () {
			this.send('hello world!');
		});

		return promise.all(connections);
	});
});
