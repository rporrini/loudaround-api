module.exports = (clients, localized) => connector => {
	localized(connector)
		.receiving(message => {
			clients(connector.socket()).forEach(client => localized(client).send(message));
		});
};
