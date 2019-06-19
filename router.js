//router

module.exports.Route = class Route {

	constructor( request_str, target_path, content_type ) {
		this.request = request_str;
		this.target = target_path;
		this.type = content_type;
	}
}

module.exports.Router = class Router {
	constructor( routes ) {
		if ( routes ) {
			this.routes = routes;
		} else {
			this.routes = [];
		}
	}

	addRoute( request_str, target_path, content_type ) {
		this.routes.push({
			request_str: {
				type: content_type,
				target: target_path
			}
		});
	}

	route( request_str ) {
		return this.routes[request_str.toString()]
	}
}