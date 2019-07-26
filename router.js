//router

module.exports.Route = class Route {

	constructor( request_str, target_path, content_type ) {
		this.request = request_str;
		this.target = target_path;
		this.type = content_type;
	}
}

module.exports.Router = class Router {
	/*
	@param json:routes json list of routes with type and target fields
	*/
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
		return this.routes[request_str.toString()];
	}
}

// module.exports.PageRouter = class PageRouter extends Router {

// }

// module.exports.AssetRouter = class AssetRouter extends Router {

// }