describe('/post socket', function () {

	it('should listen for incoming connections', function () {

		return expect(sockets.post().open()).to.be.eventually.fulfilled;

	});

	it('should broadcast messages to every other connected sockets', function () {

		const spy = sinon.spy();

		sockets
			.post()
			.receiving(spy)
			.open();

		return sockets
			.post()
			.open()
			.then(socket => {
				socket.send('hello world');
			})
			.delay(10)
			.then(() => expect(spy.calledWith('hello world')).to.be.true);

	});

	it('should broadcast messages only to sockets connected to /post', function () {

		const spy = sinon.spy();

		sockets
			.any()
			.receiving(spy)
			.open();

		return sockets
			.post()
			.open()
			.then(socket => {
				socket.send('hello world');
			})
			.delay(10)
			.then(() => expect(spy.called).to.be.false);

	});

	it('should not broadcast messages to the originating client', function () {

		const spy = sinon.spy();

		return sockets
			.post()
			.receiving(spy)
			.open()
			.then(socket => {
				socket.send('a message');
			})
			.delay(10)
			.then(() => expect(spy.called).to.be.false);
	});
});
