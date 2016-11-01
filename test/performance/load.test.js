describe('websocket server', function () {

	this.timeout(20000);

	it('should handle at least one thousand of concurrent connections', function (done) {

		const wasReceived = function (data) {
			this.received = true;
		};
		const wasOpened = function (data) {
			this.opened = true;
		};

		const connections = [];
		for (let i = 0; i < 1000; i++) {
			const connection = sockets.post();
			connection.on('open', wasOpened);
			connection.on('message', wasReceived);
			connections.push(connection);
		}

		sockets.post().on('open', function () {
			this.send('hello world!');
		});

		setTimeout(function () {
			expect(connections.length).to.be.equal(connections.filter(connection => connection.opened).length, 'aaa');
			expect(connections.length).to.be.equal(connections.filter(connection => connection.received).length);
			done();
		}, 19000);
	});

});
