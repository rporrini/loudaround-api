describe('alive socket', function() {
  it('should listen for incoming connections', function(done) {
    sockets.connect('/alive').on('open', function open() {
      done();
    });
  });
});
