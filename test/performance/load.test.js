const promise = require('bluebird');
const connector = require('../../src/socketConnector');

load(10, 100);
load(100, 1000);
load(1000, 1000);
load(2000, 2500);

function timeoutAfterSixtySeconds(onWhat) {
	onWhat.timeout(60000);
}

function load(howManyUsers, timeout) {

	describe(`websocket server - ${howManyUsers} connections - ${timeout} ms timeout`, function () {

		timeoutAfterSixtySeconds(this);

		const openConnections = () => [...Array(howManyUsers).keys()]
			.map(() => sockets.post());

		it(`concurrent connections`, function () {

			const connections = openConnections().map(c => c.open());

			return expect(promise.all(connections)).to.eventually.be.fulfilled;

		});

		it(`message delivery`, function () {

			const messages = [];

			const connectedSockets = openConnections()
				.map(connector => {
					const spy = sinon.spy();
					messages.push(spy);
					return connector.receiving(spy).open();
				});

			return promise
				.all(connectedSockets)
				.then(() => sockets.post().open())
				.then(socket => {
					socket.send('ping');
				})
				.delay(timeout)
				.then(() => {
					expect(messages.filter(message => message.called).length).to.be.equal(messages.length);
				});
		});
	});
}
