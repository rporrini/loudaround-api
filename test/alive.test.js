describe('/alive socket', function() {

  it('should listen for incoming connections', function(done) {

    sockets.alive().on('open', function() {
      done();
    });

  });

  it('should answer with an OK message', function(done) {

    sockets.alive().on('message', function(data) {
      expect(data).to.be.equal('OK');
      done();
    });

  });

  it('should close the connection', function(done) {

    sockets.alive().on('close', function() {
      done();
    });

  });
});
