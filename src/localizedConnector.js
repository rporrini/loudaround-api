const message = raw => JSON.parse(raw);

module.exports = function (connector, range) {

	const decoratedReceiving = connector.receiving;
	connector.receiving = function (callback) {
		return decoratedReceiving(rawMessage => {
			connector.socket().position = message(rawMessage).position;
			callback(rawMessage);
		});
	};

	const decoratedSend = connector.send;
	connector.send = function (message) {
		return decoratedSend(message);
	};

	return connector;
};
