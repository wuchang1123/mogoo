var path     = require("path"),
	utils    = require('../utils'),
	fs       = require('fs'),
	exists   = fs.existsSync || path.existsSync,
	datatool = require('../data');

module.exports = function(global, app, mongoose, config) {
	var rootPath = global.rootPath,
		tplPagePath = path.join(rootPath, "assets", "templates", "pages");
	
	function getdata(jsonPath) {
		var data = utils.loadJson('common.json', true),
			pdata = utils.loadJson(jsonPath + ".json", true);
		for(var key in pdata) {
			data[key] = pdata[key];
		}
		return data;
	}
	
	app.get('/', function(req, res, next) {
		var data = getdata("pages/index");
		//global.loadData("pages/index");
		//req.session.test = 99999;
		//console.log(req.session.test);
		//res.send('hello world');
		res.render('pages/index.vm', getdata("pages/index"));
	});
	
	app.get(/(.+)/, function(req, res, next) {
		var pagefile = path.join(tplPagePath, req.params[0]) + ".vm";
		if (exists(pagefile)) {
			res.render(path.join("pages", req.params[0] + '.vm'), getdata(path.join("pages", req.params[0])));
		} else {
			next();
		}
	});
	
	app.get('/mos/:id', function(req, res, next) {
		res.render('pages/endpage/mo.vm', getdata("pages/endpage/mo"));
	});

}