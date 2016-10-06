'use strict';

const person = require('./person.json');
const cookiesParser = require('./cookie.js');

api.fs = require('fs');

module.exports = (client) => {
    let req = client.req;
    let res = client.res;

    cookiesParser(req);

    /// Serve from cache
    if (api.cache[req.url] && req.method === 'GET') {
        console.log('cache');

        res.writeHead(200);
        res.end( api.cache[req.url] );
    } else {
        console.log('real');

        // Routing
        if (req.url === '/') {
            if (req.method === 'GET') {
                res.writeHead(200, {
                    'Set-Cookie': 'mycookie=test',
                    'Content-Type': 'text/html'
                });

                let ip = req.connection.remoteAddress;

                res.write('<h1>Welcome</h1>Your IP: ' + ip);
                res.end('<pre>' + JSON.stringify(api.cookies) + '</pre>');
            }
        } else if (req.url === '/person') {
            if (req.method === 'GET') {

                logic(client);

            } else if (req.method === 'POST') {
                // Receiving POST data
                let body = [];

                req.on('data', (chunk) => {
                    body.push(chunk);
                }).on('end', () => {
                    let data = Buffer.concat(body).toString();
                    let obj = JSON.parse(data);

                    if (obj.name) {
                        obj.name = obj.name.trim();
                    }

                    data = JSON.stringify(obj);
                    api.cache[req.url] = data;

                    api.fs.writeFile('./person.json', data, (err) => {
                        if (!err) {
                            res.writeHead(200);
                            res.end('File saved');
                        } else {
                            res.writeHead(500);
                            res.end('Write error');
                        }
                    });
                });
            }
        } else {
            res.writeHead(404);
            res.end('Path not found');
        }
    }
};
