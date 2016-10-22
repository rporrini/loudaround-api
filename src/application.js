const express = require('express');
const application = express();
const sockets = require('express-ws')(application);

const startOn = (port) => {
  application.ws('/alive', function(ws, req) {});
  application.listen(port);
}

module.exports = {
  startOn: startOn,
  stop: () => {}
}
