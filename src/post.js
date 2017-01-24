const localized = require('./localizedConnector');

module.exports = clients => connector => {
	localized(connector)
		.receiving(message => {
			clients(connector.socket()).forEach(client => client.send(message));
		});
};
