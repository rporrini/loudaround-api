const express = require('express');
const application = express();
const sockets = require('express-ws')(application);
const path = require('path');
const connector = require('./socketConnector');

const alive = (ws, req) => {
	connector(ws)
		.send('OK')
		.close();
};

const post = (ws, req) => {

	connector(ws)
		.receiving(function (message) {
			sockets
				.getWss()
				.clients
				.filter(client => client !== ws)
				.map(c => connector(c))
				.forEach(c => c.send(message));
		});

};

module.exports = {
	startOn: port => application
		.use('/status', express.static(path.join(__dirname, '..', '/status')))
		.ws('/alive', alive)
		.ws('/post', post)
		.listen(port)
};
