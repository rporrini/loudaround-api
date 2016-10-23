const PORT = 6666;

module.exports = {
  start: () => require('../src/sockets.js').startOn(PORT),
  connect: (path) => require('ws')(`ws://localhost:${PORT}${path}`)
}
