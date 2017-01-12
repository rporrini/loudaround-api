module.exports = function (connector) {
	const decoratedReceiving = connector.receiving;

	connector.receiving = function (callback) {
		return decoratedReceiving(message => {
			connector.socket().position = JSON.parse(message).position;
			callback(message);
		});
	};

	return connector;
};
