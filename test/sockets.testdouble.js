const socket = require('ws');
const app = require('../src/sockets.js');

const PORT = 6666;

module.exports = {
  start: () => app.startOn(PORT),
  connect: (path) => socket(`ws://localhost:${PORT}${path}`)
}
