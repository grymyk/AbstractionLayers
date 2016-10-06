'use strict';

module.exports = (cache, client) => {
    let req = client.req;
    let res = client.res;

    api.fs.readFile('./person.json', (err, data) => {
        if (!err) {
            let obj = JSON.parse(data);
            obj.birth = new Date(obj.birth);

            let difference = new Date() - obj.birth;
            obj.age = Math.floor(difference / 31536000000);

            delete obj.birth;

            let data = JSON.stringify(obj);
            cache[req.url] = data;

            // HTTP reply
            res.writeHead(200);
            res.end(data);
        } else {
            res.writeHead(500);
            res.end('Read error');
        }
    });
};
