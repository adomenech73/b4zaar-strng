// Strongops agent
// must come at the top of your module before any other  require
require('strong-agent').profile();

var loopback = require('loopback');
var path = require('path');
// Create a instance of PassportConfigurator
// must be before app.boot()
var PassportConfigurator = require('loopback-component-passport').PassportConfigurator;
var app = module.exports = loopback();
var passportConfigurator = new PassportConfigurator(app);


var boot = require('loopback-boot');


app.use(loopback.session({
  secret: 'keyboard cat',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

// Load provider configurations
var config = {};

try {
  config = require('./providers.json');
} catch (err) {
  console.error('Please configure your passport strategy in `providers.json`.');
  console.error('Copy `providers.json.template` to `providers.json` and replace the clientID/clientSecret values with your own.');
  process.exit(1);
}

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

// Initialize passport
// must be after app.boot()
passportConfigurator.init();

// Set up related models
/* passportConfigurator.setupModels({
 userModel: app.models.user,
 userIdentityModel: app.models.userIdentity,
 userCredentialModel: app.models.userCredential
 }); */

// If you don't extend User model, UserIdentity model and UserCredential model, you could just call
passportConfigurator.setupModels();

// load and configure passport strategies for third party auth providers
for (var s in config) {
  var c = config[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}
