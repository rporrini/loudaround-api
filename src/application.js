const path = require('path');
const express = require('express');
const application = express();
const sockets = require('express-ws')(application);
const clients = sockets.getWss().clients;

const alive = require('./alive');
const post = require('./post');
const all = require('./all');
const connector = require('./socketConnector');

const connect = handler => client => {
	handler(connector(client));
};

module.exports = {
	startOn: (port, range) => application
		.use('/status', express.static(path.join(__dirname, '..', 'status')))
		.ws('/alive', connect(alive()))
		.ws('/post', connect(post(all(clients), range)))
		.listen(port)
};
