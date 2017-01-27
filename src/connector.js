const promise = require('bluebird');
const decorate = require('./decorate');

const receiving = socket => callback => {
	socket.on('message', callback);
	return socket;
};
const open = socket => () => new promise((resolve, reject) => {
	socket
		.on('open', () => {
			resolve(socket);
		})
		.on('error', error => {
			reject(error);
		});
});

module.exports = socket => {
	decorate(socket, 'receiving', receiving);
	decorate(socket, 'open', open);
	return socket;
};
