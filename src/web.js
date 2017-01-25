const localizedWithin = require('./localization');
const application = require('./application');

const port = process.env.PORT || 3000;
const fiveHundredMeters = 500;

application(localizedWithin(fiveHundredMeters)).startOn(port);
