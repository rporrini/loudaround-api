module.exports = () => socket => {
	socket.send('OK').close();
};
