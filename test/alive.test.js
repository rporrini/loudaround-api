describe('alive socket', function() {

  it('should listen for incoming connections', function(done) {

    sockets.connect('/alive').on('open', function() {
      this.close();
      done();
    });

  });

  it('should answer with an OK message', function(done) {

    sockets.connect('/alive').on('message', function(data) {
      expect(data).to.be.equal('OK');
      this.close();
      done();
    });

  });
});
