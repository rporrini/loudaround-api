const promise = require('bluebird');
const sinon = require('sinon');
const open = require('../unit/socketConnector');

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
			.map(() => open(sockets.post()));

		it(`concurrent connections`, function () {

			return promise.all(openConnections());

		});

		it(`message delivery`, function () {

			const messages = [];

			const connectedSockets = openConnections()
				.map(socket => socket.then(socket => {
					const spy = sinon.spy();
					socket.on('message', spy);
					messages.push(spy);
				}));

			return promise
				.all(connectedSockets)
				.then(() => open(sockets.post()))
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
