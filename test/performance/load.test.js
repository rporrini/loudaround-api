const promise = require('bluebird');
const sinon = require('sinon');

load(10, 100);
load(100, 1000);
load(1000, 1000);
load(2000, 2000);

function timeoutAfterSixtySeconds(onWhat) {
	onWhat.timeout(60000);
}

function load(howManyUsers, timeout) {

	describe(`websocket server - ${howManyUsers} connections - ${timeout} ms timeout`, function () {

		timeoutAfterSixtySeconds(this);

		it(`concurrent connections`, function () {

			const connectedSockets = [...Array(howManyUsers).keys()].map(() => {
				return new promise((resolve, reject) => {
					sockets.post()
						.on('open', resolve)
						.on('error', reject);
				});
			});

			return promise.all(connectedSockets);
		});

		it(`message delivery`, function () {

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
}
