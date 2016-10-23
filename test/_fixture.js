global.expect = require('chai').expect;
global.sockets = require('./sockets.testdouble.js');

before(function(){
  sockets.start();
});

afterEach(function(){
  sockets.dropActiveConnections();
});
