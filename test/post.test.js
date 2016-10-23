describe('/post socket', function() {

  it('should listen for incoming connections', function(done) {

    sockets.post().on('open', function() {
      done();
    });

  });

  it('should broadcast messages to every other connected sockets', function(done) {

    sockets.post().on('message', function(data) {
      expect(data).to.be.equal('hello world!');
      done();
    });

    sockets.post().on('open', function() {
      this.send('hello world!');
    });

  });

  it('should broadcast messages only to sockets connected to /post', function(done) {

    sockets.any().on('message', function(data) {
      done('Received a non wanted message from the socket: ' + data);
    });

    sockets.post().on('open', function() {
      this.send('hello world!');
      setTimeout(function() {
        done();
      }, 20);
    });

  });

  it('should not broadcast messages to the originating client', function(done) {

    sockets.post().on('message', function(data) {

      done('Received a non wanted message from the socket: ' + data);

    }).on('open', function() {

      this.send('hello world!');
      setTimeout(function() {
        done();
      }, 20);
    });
  });
});
