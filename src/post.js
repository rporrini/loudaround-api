const localized = require('./localizedConnector');
const connector = require('./socketConnector');

module.exports = clients => {
	return socket => {
		localized(connector(socket))
			.receiving(message => {
				clients(socket).forEach(client => client.send(message));
			});
	};
};
