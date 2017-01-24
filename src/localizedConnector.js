const message = require('./message');

module.exports = function (connector) {
	const decoratedReceiving = connector.receiving;

	connector.receiving = function (callback) {
		return decoratedReceiving(rawMessage => {
			connector.socket().position = message(rawMessage).position;
			callback(rawMessage);
		});
	};

	return connector;
};
