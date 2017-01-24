describe('/post socket', function () {

	it('should listen for incoming connections', function () {

		return expect(application.post().open()).to.be.eventually.fulfilled;

	});

	it('should broadcast messages to every other connected sockets', function () {

		const spy = sinon.spy();

		application
			.post()
			.receiving(spy)
			.open()
			.then(socket => socket.send(message()));

		return application
			.post()
			.open()
			.then(socket => socket.send(message()))
			.delay(50)
			.then(() => expect(spy.calledWith(message())).to.be.true);

	});

	it('should broadcast messages only to sockets connected to /post', function () {

		const spy = sinon.spy();

		application
			.any()
			.receiving(spy)
			.open();

		return application
			.post()
			.open()
			.then(socket => socket.send(message()))
			.delay(50)
			.then(() => expect(spy.called).to.be.false);

	});

	it('should not broadcast messages to the originating client', function () {

		const spy = sinon.spy();

		return application
			.post()
			.receiving(spy)
			.open()
			.then(socket => socket.send(message()))
			.delay(50)
			.then(() => expect(spy.called).to.be.false);
	});
});
