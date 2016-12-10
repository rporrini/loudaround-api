const promise = require('bluebird');

module.exports = function open(socket) {
	return new promise((resolve, reject) => {
		socket
			.on('open', function () {
				resolve(this);
			})
			.on('error', function (error) {
				reject(error);
			});
	});
};
