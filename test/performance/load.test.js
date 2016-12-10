const promise = require('bluebird');
const sinon = require('sinon');

const timeoutAfterSixtySeconds = onWhat => {
	onWhat.timeout(60000);
};

describe('websocket server', function () {

	timeoutAfterSixtySeconds(this);

	const howManyUsers = 1500;
	const timeout = 2000;

	it(`should handle at least ${howManyUsers} concurrent connections`, function () {

		const connectedSockets = [...Array(howManyUsers).keys()].map(() => {
			return new promise((resolve, reject) => {
				sockets.post()
					.on('open', resolve)
					.on('error', reject);
			});
		});

		return promise.all(connectedSockets);
	});

	it(`should deliver messages to at least ${howManyUsers} connected users in at least ${timeout} ms`, function () {

		const messages = [];

		const connectedSockets = [...Array(howManyUsers).keys()].map(() => {
			return new promise((resolve, reject) => {
				const spy = sinon.spy();
				sockets.post()
					.on('open', resolve)
					.on('error', reject)
					.on('message', spy);
				messages.push(spy);
			});
		});

		return promise
			.all(connectedSockets)
			.then(() => {
				sockets.post().on('open', function () {
					this.send('ping');
				});
			})
			.delay(timeout)
			.then(() => {
				expect(messages.filter(message => message.called).length).to.be.equal(messages.length);
			});
	});
});
