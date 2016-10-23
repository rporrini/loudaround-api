const express = require('express');
const application = express();
const sockets = require('express-ws')(application);

const startOn = port => {

  application.ws('/alive', (ws, req) => {
    ws.send('OK');
    ws.close();
  });

  application.ws('/post', (ws, req) => {
    ws.onmessage = message => {
      sockets.getWss()
             .clients
             .filter(client => client !== ws)
             .forEach(client => client.send(message.data));
    };
  });

  application.listen(port);
};

module.exports = {
  startOn: startOn
}
