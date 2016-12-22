const express = require('express');
const application = express();
const sockets = require('express-ws')(application);
const path = require('path');
const connector = require('./socketConnector');

const startOn = port => {

	application.use('/status', express.static(path.join(__dirname, '..', '/status')));

	application.ws('/alive', (ws, req) => {
		connector(ws)
			.send('OK')
			.close();
	});

	application.ws('/post', (ws, req) => {

		connector(ws)
			.receiving(function (message) {
				sockets
					.getWss()
					.clients
					.filter(client => client !== ws)
					.map(c => connector(c))
					.forEach(c => c.send(message));
			});

	});

	return application.listen(port);
};

module.exports = {
	startOn: startOn
};
