const socket = require('ws');
const server = require('../src/sockets.js');

const PORT = 6666;
const openSockets = [];

const connect = (path) => {
	const newSocket = socket(`ws://localhost:${PORT}${path}`);
	openSockets.push(newSocket);
	return newSocket;
};
const wakeUp = () => {
	server.startOn(PORT);
};
const reset = () => {
	openSockets.forEach(socket => socket.close());
};

module.exports = {
	start: wakeUp,
	post: () => connect('/post'),
	alive: () => connect('/alive'),
	any: () => connect('/'),
	dropActiveConnections: reset
};
