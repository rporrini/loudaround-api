describe('post socket', function() {

  it('should listen for incoming connections', function(done) {

    sockets.connect('/post').on('open', function() {
      this.close();
      done();
    });

  });

  it('should broadcast messages to every other connected socket', function(done) {

    sockets.connect('/post').on('message', function(data) {
      expect(data).to.be.equal('hello world!');
      this.close();
      done();
    });

    sockets.connect('/post').on('open', function() {
      this.send('hello world!');
      this.close();
    });

  });
});
