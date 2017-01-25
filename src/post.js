const connector = require('./connector');

module.exports = (sockets, localized) => requestConnector => {
	localized(requestConnector)
		.receiving(message => {
			sockets
				.filter(socket => socket !== requestConnector.socket())
				.map(connector)
				.map(localized)
				.forEach(connector => connector.send(message));
		});
};
