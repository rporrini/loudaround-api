describe('application', function () {

	it('should reject the connection to any arbitrary url', function () {

		const connection = application.any()
			.open()
			.then(socket => socket.send('F**k ddos'));

		return expect(connection).to.be.eventually.rejected;

	});
});
