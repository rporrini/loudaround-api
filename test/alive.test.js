describe('alive socket', function() {
  it('should listen for incoming connections', function(done) {
    sockets.connect().on('open', function open() {
      done();
    });
  });
});
