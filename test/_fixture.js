global.expect = require('chai').expect;
global.sockets = require('./sockets.testdouble.js');

beforeEach(function(){
  sockets.start();
});
