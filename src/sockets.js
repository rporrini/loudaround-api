const express = require('express');
const application = express();
const sockets = require('express-ws')(application);

const startOn = port => {

  application.ws('/alive', (ws, req) => {
    ws.send('OK');
  });

  application.ws('/post', (ws, req) => {
    ws.onmessage = message => {
      sockets.getWss().clients.forEach( client => {
        client.send(message.data);
      });
    };
  });

  application.listen(port);
};

module.exports = {
  startOn: startOn
}
