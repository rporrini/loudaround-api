const connector = require('../../src/connector');
const event = require('events');

describe('connector', function () {

	it('should return a promised opened connection', function () {

		const socket = new event();

		const connection = connector(socket).open();
		socket.emit('open');

		return expect(connection).to.eventually.be.eql(socket);
	});

	it('should listen for messages', function () {

		const socket = new event();
		const spy = sinon.spy();

		connector(socket).receiving(spy);
		socket.emit('message', 'the message');

		return expect(spy.called).to.be.true;
	});

	it('should forward messages', function () {

		const socket = new event();
		const spy = sinon.spy();

		connector(socket).receiving(spy);
		socket.emit('message', 'the message');

		return expect(spy.calledWith('the message'));
	});

	it('should return a rejected promise on errors', function () {

		const socket = new event();

		const connection = connector(socket).open();
		socket.emit('error');

		return expect(connection).to.eventually.be.rejected;
	});

	it('should propagate the error details', function () {

		const socket = new event();

		const connection = connector(socket).open();
		const error = new Error();
		socket.emit('error', error);

		return expect(connection).to.eventually.be.rejectedWith(error);
	});

	it('should send a message', function () {
		const send = sinon.spy();

		connector({
			send
		}).send('the message');

		return expect(send.calledWith('the message')).to.be.true;
	});
});
