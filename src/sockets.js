const express = require('express');
const application = express();
const sockets = require('express-ws')(application);
const path = require('path');
const connector = require('./socketConnector');

const alive = (socket) => {
	return {
		process: () => socket.send('OK').close()
	};
};

const broadcast = (socket, clients) => {
	return {
		process: () => socket.receiving(function (message) {
			clients
				.filter(client => !client.equals(socket))
				.forEach(client => client.send(message));
		})
	};
};

const startOn = port => {

	application.use('/status', express.static(path.join(__dirname, '..', '/status')));

	application.ws('/alive', (ws, req) => {
		const socket = connector(ws);
		alive(socket).process();
	});

	application.ws('/post', (ws, req) => {
		const socket = connector(ws);
		const clients = sockets
			.getWss()
			.clients
			.map(connector)
			.filter(c => c.requested(/\/post/));

		broadcast(socket, clients).process();
	});

	return application.listen(port);
};

module.exports = {
	startOn: startOn
};
