const promise = require('bluebird');

module.exports = socket => {

	return {

		receiving: function (callback) {
			socket.on('message', callback);
			return this;
		},

		send: function (message) {
			try {
				socket.send(message);
			} catch (e) {
				console.log(e);
			} finally {
				return this;
			}
		},

		close: function () {
			socket.close();
		},

		open: () => new promise((resolve, reject) => {
			socket
				.on('open', function () {
					resolve(this);
				})
				.on('error', function (error) {
					reject(error);
				});
		}),

		socket: () => socket
	};
};
