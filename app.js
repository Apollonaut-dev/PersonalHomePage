var url = require('url');
var fs = require('fs');
var module_router = require('./router');
var qs = require('querystring');

// get the sitemap and create routing object
let routemap = JSON.parse(fs.readFileSync(__dirname + '/sitemap.json'));
var router = new module_router.Router(routemap);
// this function runs every time the listener detects a request
module.exports = {
	handleRequest: function(request, response) {
		console.log(request.connection.remoteAddress);
		// parse the request, get the routing key
		let path = url.parse(request.url).pathname;
		// attempt to find response on filesystem
		// *this will need to be updated for SPA apis, query string-based calls don't return files necessarily
		let route = router.route(path);
		let dir = __dirname;
		let stat_code = 200;
		console.log(route);
		// check if route exists, else we have a 404 
		if ( route === undefined ) {
			route = router.route('/404');
			stat_code = 404;
		}
		dir += route.target;
		console.log("request: " + path);
		console.log("resolution: " + dir);
		if ( route.type === "text/html" || 
			 route.type === "text/css" ||
			 route.type === "image/svg+xml" ||
			 route.type === "image/png" ||
			 route.type === "image/jpeg" ||
			 route.type === "video/mp4" 
			) {
			fs.readFile( dir, null, function(error, data) {
				if (error) {
					console.log(error);
					// TODO figure out how to find the difference
					// between readFile errors and invalid requests
					// fails on readFile should return code 500 not 404
					// only requests for non existent pages or assets should return 404
					// if error on looking for view file then respond 404 page view
					stat_code = 500;
					response.writeHead(stat_code);
					fs.readFile(__dirname + router.route('/500').target, null, function(error, data) {
						response.write(data);
					});
				} else {
					// if we found the request, send data with appropriate type in header
					response.writeHead(stat_code, {'Content-Type': route.type});
					response.write(data);
				}
				response.end();
			});
		} else if ( route.type === "multipart/form-data" ) {
			if ( request.method == 'POST') {
				var body = '';
				request.on('data', function (data) {
					body += data;

					if ( body.length > 1e6 ) {
						// dont accept too much data too fast
						request.connection.destroy();
					}
				});
				request.on('end', function() {
					var post = qs.parse(body);
					console.log(post['name']);
					console.log(post['email']);
					console.log(post['description']);
				});
			}
		}	
	}
};
console.log('app.js:exit 0');
