const port = process.env.PORT || 3000;
const range = 500;
require('./application')(require('./localizedConnector')(range)).startOn(port);
