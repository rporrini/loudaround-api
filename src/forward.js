const connector = require('./connector');

module.exports = console => handler => client => {
	try {
		handler(connector(client));
	} catch (error) {
		console(error);
	}
};
