const localization = require('./localizedConnector');
const application = require('./application');

const port = process.env.PORT || 3000;
const range = 500;

application(localization(range)).startOn(port);
