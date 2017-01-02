const connector = require('./socketConnector');

module.exports = clients => {
	return socket => {
		connector(socket)
			.receiving(message => {
				clients(socket).forEach(client => client.send(message));
			});
	};
};
