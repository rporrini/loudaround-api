const connector = require('./socketConnector');

module.exports = () => {
	return socket => {
		connector(socket)
			.send('OK')
			.close();
	};
};
