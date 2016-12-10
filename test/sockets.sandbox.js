const socket = require('ws');
const sockets = require('../src/sockets.js');

const PORT = 6666;
const openedSockets = [];
let server;

const connect = (path) => {
	const newSocket = new socket(`ws://localhost:${PORT}${path}`);
	openedSockets.push(newSocket);
	return newSocket;
};
const wakeUp = () => {
	server = sockets.startOn(PORT);
};
const shutDown = () => {
	openedSockets.forEach(socket => socket.close());
	server.close();
};

module.exports = {
	start: wakeUp,
	stop: shutDown,
	post: () => connect('/post'),
	alive: () => connect('/alive'),
	any: () => connect('/'),
};
