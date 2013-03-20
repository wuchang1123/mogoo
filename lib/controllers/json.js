var path     = require("path"),
	fs       = require('fs'),
	utils    = require('../utils'),
	exists   = fs.existsSync || path.existsSync,
	datatool = require('../data');

module.exports = function(global, app, mongoose, config) {
	var rootPath = global.rootPath,
		jsonPath = path.join(rootPath, "assets", "api");
	
	function getdata(file, req) {
		var data = JSON.stringify(utils.loadJson(file, true)),
			query = req.query;
		//req.query
		//console.log(file, data);
		(function(udf) {
			data = data.replace(/\"\{\{([^\}]+)\}\}\"/g, function($0, $1) {
				//console.log($0, $1);
				var q = query[$1];
				if (!/^\d+$/.test(q)) {
					q = '"' + q + '"';
				}
				return q !== udf ? q : $0;
			});
		})();
		return data;
	}
	
	app.get(/\/(.*)\.(?:json|do)$/, function(req, res, next) {
		var file = req.params[0] + ".json";
		var data = getdata(file, req);
		res.send(data);
		//var data = getdata("pages/index");
		//global.loadData("pages/index");
		//req.session.test = 99999;
		//console.log(req.session.test);
		//res.send('hello world');
		//res.render('pages/index.vm', getdata("pages/index"));
	});

}