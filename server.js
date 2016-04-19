// required modules
var http = require('http');


// backend modules
var Assets = require('./backend/Assets');
var API = require('./backend/API');
var Default = require('./backend/Default');

// settings
var files = {};
var port = 3000;
var host = '127.0.0.1';

// start server
var app = http.createServer(assets).listen(port, host);
console.log("Listening on " + host + ":" + port);
