const path = require('path');
const express = require('express');
const application = express();
const sockets = require('express-ws')(application);
const clients = sockets.getWss().clients;

const alive = require('./alive');
const post = require('./post');
const forward = require('./forward')(console.log);

module.exports = localization => {
	return {
		startOn: port => application
			.use('/status', express.static(path.join(__dirname, '..', 'status')))
			.ws('/alive', forward(alive()))
			.ws('/post', forward(post(clients, localization)))
			.listen(port)
	};
};
