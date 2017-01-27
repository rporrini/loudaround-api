const geo = require('geopoint');
const decorate = require('./decorate');

const inKilometers = true;
const asMeters = 1000;
const message = raw => JSON.parse(raw);
const asGeo = position => {
	return new geo(position.lat, position.lon);
};
const trackPosition = (connector, original) => callback => original(rawMessage => {
	connector.position = message(rawMessage).position;
	callback(rawMessage);
});
const forwardWithin = meters => (connector, original) => raw => {
	const position = connector.position;
	if (position) {
		const last = asGeo(position);
		const current = asGeo(message(raw).position);
		const distance = last.distanceTo(current, inKilometers) * asMeters;
		if (distance < meters) {
			return original(raw);
		}
	}
	return this;
};

module.exports = meters => connector => {
	decorate(connector, 'receiving', trackPosition);
	decorate(connector, 'send', forwardWithin(meters));
	return connector;
};
