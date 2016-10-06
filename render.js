'use strict';

let types = {
    object: obj => JSON.stringify(obj),
    string: str => str,
    undefined: () => 'Not Found',
    function: (fn, param, client) => fn(client, param) + '',
};

module.exports = (route, param, client) => {
    return types[typeof route](route, param, client);
};
