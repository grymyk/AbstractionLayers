'use strict';

const cookiesParser = require('./cookie.js');
const logger = require('./logger.js');
const router = require('./router.js');

api.cookies = {};
api.cache = {};

module.exports = (req, res) => {
    logger(req);
    api.cookies = cookiesParser(req);

    if (api.cache[req.url] && req.method === 'GET') {
        console.log('cache');

        res.writeHead(200);
        res.end( api.cache[req.url] );
    } else {
        console.log('real');

        let result = router({req, res});

        res.writeHead(200);
        res.end(result);
    }
};
