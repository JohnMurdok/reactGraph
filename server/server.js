//Use babel for transpiling
require('babel/register');
var request = require('request');

//Declaring resources
var app  = require('./api/application');
var port = 9000;

// start server
var server = app.listen(port, () => {
  console.log('Listening at port', server.address().port);
});
