describe('post socket', function() {

  it('should listen for incoming connections', function(done) {

    sockets.post().on('open', function() {
      done();
    });

  });

  it('should broadcast messages to every other connected socket', function(done) {

    sockets.post().on('message', function(data) {
      expect(data).to.be.equal('hello world!');
      done();
    });

    sockets.post().on('open', function() {
      this.send('hello world!');
    });

  });
});
