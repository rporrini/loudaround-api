describe('/alive socket', function () {

	it('should listen for incoming connections', function () {

		return expect(application.alive().open()).to.be.eventually.fulfilled;

	});

	it('should answer with an OK message', function (done) {

		application.alive()
			.open()
			.then(socket => socket.on('message', function (data) {
				expect(data).to.be.equal('OK');
				done();
			}));
	});

	it('should close the connection', function (done) {

		application.alive()
			.open()
			.then(socket => socket.on('close', function (data) {
				done();
			}));

	});
});
