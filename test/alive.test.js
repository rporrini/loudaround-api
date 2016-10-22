const socket = require('ws');
const app = require('../src/application.js');

describe('alive socket', function() {

  beforeEach(function(){
    app.startOn(6666);
  });

  afterEach(function(){
    app.stop();
  });

  it('should listen for incoming connections', function(done) {
    socket('ws://localhost:6666/alive')
    .on('open', function open() {
      done();
    });
  });
});
