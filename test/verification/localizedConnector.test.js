const connector = require('../../src/localizedConnector');
const socketConnector = require('../../src/socketConnector');
const event = require('events');

describe('localizedConnector', function () {

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
		socket.emit('message', message('the position'));

		return expect(socket.position).to.be.equal('the position');
	});

	it('should forward messages', function () {
		const send = sinon.spy();

		connector({
			send
		}).send(message('the message'));

		return expect(send.calledWith(message('the message'))).to.be.true;
	});

	xit('should not forward messages if they are sent too far from the last tracked position', function () {
		const send = sinon.spy();
		const socket = new event();
		socket.send = send;
		const oneKilometer = 1000;
		const c = connector(socketConnector(socket), oneKilometer);
		socket.emit('message', message('a position'));
		c.send(message('another position'));

		return expect(send.called).to.be.false;
	});
});
