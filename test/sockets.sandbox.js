const socket = require('ws');
const server = require('../src/sockets.js');

const PORT = 6666;
const openSockets = [];
const connect = (path) => {
	const newSocket = socket(`ws://localhost:${PORT}${path}`);
	openSockets.push(newSocket);
	return newSocket;
};

module.exports = {

	start: () => {
		server.startOn(PORT);
	},

	post: () => connect('/post'),
	alive: () => connect('/alive'),
	any: () => connect('/'),

	dropActiveConnections: () => {
		openSockets.forEach(socket => socket.close());
	}
};
