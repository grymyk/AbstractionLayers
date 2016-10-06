'use strict';

module.exports = (req) => {
    let date = new Date().toISOString();

    console.log( [date, req.method, req.url].join('  ') );
};
