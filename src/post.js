const localized = require('./localizedConnector');

module.exports = clients => connector => {
	localized(connector)
		.receiving(message => {
			clients(connector.socket()).forEach(client => localized(client).send(message));
		});
};
