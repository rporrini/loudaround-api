global.expect = require('chai').expect;
global.sockets = require('./sockets.sandbox.js');

beforeEach(function () {
	sockets.start();
});

afterEach(function () {
	sockets.stop();
});
