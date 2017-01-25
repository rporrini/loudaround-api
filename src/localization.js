const geo = require('geopoint');
const message = raw => JSON.parse(raw);
const asGeo = position => {
	return new geo(position.lat, position.lon);
};

module.exports = range => connector => {

	const decoratedReceiving = connector.receiving;
	connector.receiving = function (callback) {
		return decoratedReceiving(rawMessage => {
			connector.socket().position = message(rawMessage).position;
			callback(rawMessage);
		});
	};

	const decoratedSend = connector.send;
	connector.send = function (rawMessage) {
		const position = connector.socket().position;
		if (position) {
			const last = asGeo(position);
			const current = asGeo(message(rawMessage).position);
			const distance = last.distanceTo(current, true) * 1000;
			if (distance < range) {
				return decoratedSend(rawMessage);
			}
		}
		return this;
	};

	return connector;
};
