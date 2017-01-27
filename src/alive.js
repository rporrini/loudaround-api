module.exports = () => connector => {
	connector.send('OK');
	connector.close();
};
