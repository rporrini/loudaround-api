const promise = require('bluebird');

module.exports = socket => {

	return {

		receiving: function (callback) {
			this.socket().on('message', callback);
			return this;
		},

		send: function (message) {
			try {
				this.socket().send(message);
			} catch (e) {
				console.log(e);
			} finally {
				return this;
			}
		},

		close: function () {
			this.socket().close();
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

		requested: function (regex) {
			return this.socket().upgradeReq.url.match(regex);
		},

		equals: function (connector) {
			return this.socket() === connector.socket();
		},

		socket: () => socket
	};
};
