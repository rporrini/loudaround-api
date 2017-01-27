const connector = require('./connector');

module.exports = (handler, console) => client => {
	try {
		handler(connector(client));
	} catch (error) {
		console(error);
	}
};
