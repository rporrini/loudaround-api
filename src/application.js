const path = require('path');
const express = require('express');
const application = express();
const sockets = require('express-ws')(application);
const clients = sockets.getWss().clients;

const alive = require('./alive');
const post = require('./post');
const all = require('./all');

module.exports = {
	startOn: port => application
		.use('/status', express.static(path.join(__dirname, '..', '/status')))
		.ws('/alive', alive())
		.ws('/post', post(all(clients)))
		.listen(port)
};
