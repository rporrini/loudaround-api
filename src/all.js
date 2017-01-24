const connector = require('./socketConnector');

module.exports = sockets => socket => sockets
	.filter(client => client !== socket)
	.map(client => connector(client));
