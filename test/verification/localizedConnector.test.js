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
		socket.emit('message', JSON.stringify({}));

		return expect(spy.called).to.be.true;
	});

	it('should track the latest sent position', function () {
		const socket = new event();

		connector(socketConnector(socket)).receiving(() => {});
		socket.emit('message', JSON.stringify({
			position: 'the position'
		}));

		return expect(socket.position).to.be.equal('the position');
	});
});
