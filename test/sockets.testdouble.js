const socket = require('ws');
const server = require('../src/sockets.js');

const PORT = 6666;
const openSockets = [];

module.exports = {
  start: () => {
    server.startOn(PORT)
  },
  connect: (path) => {
    const newSocket = socket(`ws://localhost:${PORT}${path}`);
    openSockets.push(newSocket);
    return newSocket;
  },
  dropActiveConnections: () => {
    openSockets.forEach(socket => socket.close());
  }
}
