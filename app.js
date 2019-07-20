var url = require('url');
var fs = require('fs');
var module_router = require('./router');

// get the sitemap and create routing object
let routemap = JSON.parse(fs.readFileSync(__dirname + '/sitemap.json'));
var router = new module_router.Router(routemap);
// this function runs every time the listener detects a request
module.exports = {
	handleRequest: function(request, response) {
		// parse the request, get the routing key
		let path = url.parse(request.url).pathname;
		// attempt to find response on filesystem
		// *this will need to be updated for SPA apis, query string-based calls don't return files necessarily
		let route = router.route(path);
		console.log(route.target);
		fs.readFile( __dirname + route.target, null, function(error, data) {
			if (error) {
				// TODO figure out how to find the difference
				// between readFile errors and invalid requests
				// fails on readFile should return code 500 not 404
				// only requests for non existent pages or assets should return 404
				// if error on looking for view file then respond 404 page view
				response.writeHead(404);
				fs.readFile(__dirname + router.route('/404.html').target, null, function(error, data) {
					console.log(error);
					response.write(data);
				});
			} else {
				// if we found the request, send data with appropriate type in header
				response.writeHead(200, {'Content-Type': route.type});
				response.write(data);
			}
			response.end();
		});
	}
};
console.log('app.js:exit 0');
