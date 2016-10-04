'use strict';

global.api = {};

api.http = require('http');
api.host = '127.0.0.1';
api.port = 3000;

let me = {
	name: 'jura',
	age: 22
};

let routing = {
	'/': '<h1>welcome to homepage</h1>',
	'/user': me,
	'/user/name': () => me.name,
	'/user/age': () => me.age
};

let types = {
	object: obj => JSON.stringify(obj),
	string: str => str,
	undefined: () => 'Not Found',
	function: (fn, req, res) => fn(req, res) + '',
};

api.http.createServer( (req, res) => {
	let data = routing[req.url];
	let result = types[typeof data](data, req, res);

	res.end(result);
}).listen(api.port, () => {
	console.log(`Listening at http://${api.host}:${api.port}/`);
});

