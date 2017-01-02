describe('application', function () {

	it('should not allow the connection of a socket to an arbitrary url', function () {

		const connection = application.any()
			.open()
			.then(socket => socket.send('F**k ddos'));

		return expect(connection).to.be.eventually.rejected;

	});
});
