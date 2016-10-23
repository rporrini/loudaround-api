const express = require('express');
const application = express();
const sockets = require('express-ws')(application);

const startOn = port => {
  application.ws('/alive', function(ws, req) {
    ws.send('OK');
  });
  application.listen(port);
}

module.exports = {
  startOn: startOn
}
