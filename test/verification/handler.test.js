const handler = require('../../src/handler');

describe('handler', function () {
	it('should wrap a function', function () {
		const spy = sinon.spy();

		handler(spy)();

		return expect(spy.called).to.be.true;
	});
	it('should pass a connector to the handler', function () {
		const spy = sinon.spy();
		const socket = {
			the: 'socket'
		};

		handler(spy)(socket);

		return expect(spy.lastCall.args[0].socket()).to.be.equal(socket);
	});
	it('should not block the execution on exceptions', function () {
		const error = new Error();
		const send = sinon.stub().throws(error);
		const console = sinon.spy();

		handler(send, console)();

		return expect(console.lastCall.args[0]).to.be.equal(error);
	});
});
