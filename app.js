// tutorial stuff


// NEW VERSION //

var url = require('url');
var fs = require('fs');
var module_router = require('./router');

let routemap = JSON.parse(fs.readFileSync(__dirname + '/sitemap.json'));
var router = new module_router.Router(routemap);

module.exports = {
	handleRequest: function(request, response) {
		response.writeHead(200, {'Content-Type': 'text/html'});
		console.log(request.url);
		let path = url.parse(request.url).pathname;
		// attempt to find response on filesystem
		// this will need to be updated for SPA apis, query string-based calls don't return files necessarily
		let route = router.route(path);
		fs.readFile( __dirname + route.target, null, function(error, data) {
			if (error) {
				// if error on looking for view file then respond 404 page view
				response.writeHead(404);
				fs.readFile(__dirname + router.route('/404.html').target, null, function(error, data) {
					console.log(error);
					response.write(data);
				});
			} else {
				response.writeHead(200, {'Content-Type': route.type});
				response.write(data);
			}
			response.end();
		});
	}
};


// // tutorial 15

// function log(msg) {
// 	console.log(msg);
// }


// var http = require('http');
// var fs = require('fs');
// var router = require('./router.js');

// var routemap = JSON.parse(fs.readFileSync(__dirname + "/sitemap.json"));
// log(routemap);

// var server = http.createServer( function (req, res) {
// 	let response_type;
// 	let response;
// 	log(req.url);

// 	if ( routemap[req.url] === undefined ) {
// 		response_type = "text/html";
// 		response_path = __dirname + "/view/html/404.html";
// 	} else {
// 		response_type = routemap[req.url].type;
// 		response_path = __dirname + routemap[req.url.toString()].target;
// 	}
// 	res.writeHead(200, {'Content-Type': response_type});
// 	var rs = fs.createReadStream(response_path);
// 	rs.pipe(res);
// });

// var routes = array (
// 	"/":"/view/html/home.html",
// 	"/about":"/view/html/about.html",
// 	"/contact":"/view/html/contact.html".
// 	"/view/assets/menu.svg":"/view/assets/menu.svg"
// )

// server.listen(3000, '127.0.0.1');
// console.log('listening on 127.0.0.1:3000');

// tutorial 15

// var http = require('http');
// var fs = require('fs');

// var rs = fs.createReadStream(__dirname + '/readme.txt');
// var ws = fs.createWriteStream(__dirname + '/writeme.txt');
// console.log('hello');
// rs.on('data', function(chunk) { 
// 	console.log('received chunk');
// 	ws.write(chunk);
// });

//tutorial 14

// var http = require('http');
// var fs = require('fs');

// var rs = fs.createReadStream(__dirname + '/readme.txt');

// rs.on('data', function(chunk) { 
// 	console.log('new chunk receieved: ');
// 	console.log(chunk);
// });

// tutorial 12

// var http = require('http');

// var server = http.createServer( function(req, res) {
// 	console.log('request: ' + req.url );
// 	res.writeHead(200, {'Content-Type': 'HTML'} );
// 	res.end('<h1> Hello World! <\/h1>');	
// });

// server.listen(3000,'127.0.0.1');
// console.log('listening on 127.0.0.1:3000');


// tutorial 10

// var fs = require('fs');
// fs.unlink('writeme.txt', function() { console.log('back')} ); 

// fs.rmdirSync('tutstuff');

// tutorial 9

// var fs = require('fs');

// fs.readFile('readme.txt', 'utf8', function(err, data) {
// 	fs.writeFile('writeme.txt', data, function() {} );
// });


// console.log('asynctest--runme');

//tutorial 8

// var events = require('events');
// var util = require('util');

// var Person = function(name) {
// 	this.name = name;
// };

// util.inherits(Person, events.EventEmitter);

// var james = new Person('james');
// var mary = new Person('mary');

// var people = [james, mary];

// people.forEach( function(person) {
// 	person.on('speak', function(msg) {
// 		console.log(person.name + ` said: ` + msg )	
// 	})
// });

// james.emit('speak', 'hey dude');

// onclick event syntax
// element.on('click', function() {} ); 

// var myEmitter = new events.EventEmitter();

// // var msg = 'emitting event';
// myEmitter.on('myEvent', function( msg ) {
// 	console.log(msg);
// } );

// myEmitter.emit('myEvent', 'emitting');

//tutorial 6,7

// var stuff = require('./stuff');

// console.log(stuff.counter(['shaun', 'devellis','teju']));
// console.log(stuff.pi);
// tutorial 5
// function myfunct() {
// 	console.log('myfunct');
// }

// //function expression
// var foo = function(){
// 	console.log('bar');
// };

// foo();

// console.log(__dirname);
// console.log(__filename);

// var time = 0;

// var timer = setInterval( function () {
// 	time += 2;
// 	console.log(time + ' seconds have passed');

// 	if ( time > 5 ) {
// 		clearInterval(timer);
// 	}
// }, 2000);

// setTimeout( function() { 
// 	console.log('timeout');
// }, 1000);
