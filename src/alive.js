module.exports = () => connector => {
	connector.send('OK').close();
};
