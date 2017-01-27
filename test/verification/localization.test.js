const withinTenMeters = 10;
const fromBeautifulPlace = {
	lat: 45,
	lon: 8
};
const fromPlaceFarAway = {
	lat: 46,
	lon: 8
};
const connector = require('../../src/localization')(withinTenMeters);
const socketConnector = require('../../src/connector');
const event = require('events');

describe('localization', function () {

	it('should decorate an object', function () {
		const toBeDecorated = {
			a: 'property'
		};
		return expect(connector(toBeDecorated).a).to.be.equal('property');
	});

	it('should forward the receiving callback to the decorated connector', function () {
		const socket = new event();
		const spy = sinon.spy();

		connector(socketConnector(socket)).receiving(spy);
		socket.emit('message', message());

		return expect(spy.called).to.be.true;
	});

	it('should track the latest sent position', function () {
		const socket = new event();

		connector(socketConnector(socket)).receiving(() => {});
		socket.emit('message', message());

		return expect(socket.position).to.be.eql(JSON.parse(message()).position);
	});

	it('should not forward messages if the latest position is unknown', function () {
		const send = sinon.spy();

		connector(socketConnector({
			send
		})).send(message());

		return expect(send.called).to.be.false;
	});

	it('should forward messages if they are sent within the last tracked position', function () {
		const send = sinon.spy();
		const socket = new event();
		socket.send = send;

		const c = connector(socketConnector(socket));
		c.receiving(() => {});
		socket.emit('message', message(fromBeautifulPlace));
		c.send(message(fromBeautifulPlace));

		return expect(send.called).to.be.true;
	});

	it('should not forward messages if they are too far from the last tracked position', function () {
		const send = sinon.spy();
		const socket = new event();
		socket.send = send;

		const c = connector(socketConnector(socket));
		c.receiving(() => {});
		socket.emit('message', message(fromBeautifulPlace));
		c.send(message(fromPlaceFarAway));

		return expect(send.called).to.be.false;
	});
});
