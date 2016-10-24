const express = require('express');
const application = express();
const sockets = require('express-ws')(application);
const path = require('path');

const startOn = port => {

	application.use('/status', express.static(path.join(__dirname, '..', '/status')));

	application.ws('/alive', (ws, req) => {
		ws.send('OK');
		ws.close();
	});

	application.ws('/post', (ws, req) => {
		ws.onmessage = message => {
			sockets
				.getWss()
				.clients
				.filter(client => client !== ws)
				.forEach(client => {
					try {
						client.send(message.data);
					} catch (e) {
						console.log(e);
					}
				});
		};
	});

	application.listen(port);
};

module.exports = {
	startOn: startOn
};
