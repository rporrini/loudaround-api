const path = require('path');
const express = require('express');
const application = express();
const sockets = require('express-ws')(application);
const clients = sockets.getWss().clients;

const alive = require('./alive');
const post = require('./post');
const connector = require('./socketConnector');

const connect = handler => client => {
	handler(connector(client));
};

module.exports = localization => {
	return {
		startOn: port => application
			.use('/status', express.static(path.join(__dirname, '..', 'status')))
			.ws('/alive', connect(alive()))
			.ws('/post', connect(post(clients, localization)))
			.listen(port)
	};
};
