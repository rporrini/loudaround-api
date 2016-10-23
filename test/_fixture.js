global.expect = require('chai').expect;
global.sockets = require('./sockets.sandbox.js');

before(function(){
  sockets.start();
});

afterEach(function(){
  sockets.dropActiveConnections();
});
