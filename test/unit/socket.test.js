const connector = require('./socket');
const event = require('events');

describe('socket', function () {

	it('should return a promised opened connection', function () {

		const socket = new event();
		const connection = connector(socket);
		socket.emit('open');

		return expect(connection).to.eventually.be.eql(socket);
	});

	it('should return a rejected promise on errors', function () {

		const socket = new event();
		const connection = connector(socket);
		socket.emit('error');

		return expect(connection).to.eventually.be.rejected;
	});

	it('should return propagate the error details', function () {

		const socket = new event();
		const connection = connector(socket);
		const error = new Error();
		socket.emit('error', error);

		return expect(connection).to.eventually.be.rejectedWith(error);
	});

});
