const geo = require('geopoint');

const message = raw => JSON.parse(raw);
const asGeo = position => {
	return new geo(position.lat, position.lon);
};
const receiving = (connector, original) => callback => {
	return original(rawMessage => {
		connector.position = message(rawMessage).position;
		callback(rawMessage);
	});
};
const send = range => (connector, original) => raw => {
	const position = connector.position;
	if (position) {
		const last = asGeo(position);
		const current = asGeo(message(raw).position);
		const distance = last.distanceTo(current, true) * 1000;
		if (distance < range) {
			return original(raw);
		}
	}
	return this;
};
const decorate = (connector, method, newMethod) => {
	const decorated = connector[method];
	connector[method] = newMethod(connector, decorated);
};

module.exports = range => connector => {
	decorate(connector, 'receiving', receiving);
	decorate(connector, 'send', send(range));
	return connector;
};
