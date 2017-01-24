const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

global.expect = chai.expect;
global.sinon = require('sinon');
global.application = require('./application.sandbox.js');
global.message = require('./message.testdouble');

beforeEach(function () {
	application.start();
});

afterEach(function () {
	application.stop();
});
