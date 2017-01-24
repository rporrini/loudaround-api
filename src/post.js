const localized = require('./localizedConnector');

module.exports = (clients, range) => connector => {
	localized(connector)
		.receiving(message => {
			clients(connector.socket()).forEach(client => localized(client, range).send(message));
		});
};
