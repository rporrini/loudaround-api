const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

global.expect = chai.expect;
global.sockets = require('./sockets.sandbox.js');

beforeEach(function () {
	sockets.start();
});

afterEach(function () {
	sockets.stop();
});
