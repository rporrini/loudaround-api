const socket = require('ws');
const application = require('../src/application');
const connector = require('../src/socketConnector');

const PORT = 6666;
const openedSockets = [];
const withoutPositionTracking = connector => connector;

let server;

const connection = (path) => {
	const newSocket = new socket(`ws://localhost:${PORT}${path}`);
	openedSockets.push(newSocket);
	return newSocket;
};
const wakeUp = () => {
	server = application(withoutPositionTracking).startOn(PORT);
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
