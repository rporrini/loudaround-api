const connector = require('./socketConnector');

module.exports = sockets => {
	return socket => {
		return sockets
			.filter(client => client !== socket)
			.map(client => connector(client));
	};
};
