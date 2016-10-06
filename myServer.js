'use strict';

global.api = {};

let http = require('http');
let config = require('./config.js');

let server = new http.Server();

server.on('request', require('./handler.js') );

server.listen(config.port, () => {
    console.log(`Listening at http://${config.host}:${config.port}/`);
});
