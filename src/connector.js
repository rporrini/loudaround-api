const promise = require('bluebird');

module.exports = socket => {
	socket.receiving = function (callback) {
		socket.on('message', callback);
		return socket;
	};
	socket.open = () => new promise((resolve, reject) => {
		socket
			.on('open', () => {
				resolve(socket);
			})
			.on('error', error => {
				reject(error);
			});
	});
	return socket;
};
