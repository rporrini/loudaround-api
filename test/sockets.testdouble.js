const socket = require('ws');
const app = require('../src/sockets.js');

const PORT = 6666;

module.exports = {
  start: () => app.startOn(PORT),
  connect: () => socket(`ws://localhost:${PORT}`)
}
