const socket = require('ws');
const sockets = require('../src/sockets.js');
const connector = require('../src/socketConnector');

const PORT = 6666;
const openedSockets = [];
let server;

const connection = (path) => {
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
	post: () => connector(connection('/post')),
	alive: () => connector(connection('/alive')),
	any: () => connector(connection('/')),
};
